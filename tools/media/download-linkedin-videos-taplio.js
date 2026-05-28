/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

const defaults = {
  cdpPort: Number(process.env.CDP_PORT || 9231),
  input: path.join(process.cwd(), "tools", "media", "lead-linkedin-video-posts.json"),
  outDir: path.join(process.cwd(), ".agents", "media", "linkedin"),
  delayMs: Number(process.env.TAPLIO_DELAY_MS || 45000),
  taplioUrl: "https://taplio.com/linkedin-video-downloader",
};

function usage() {
  return `Usage:
  node tools/media/download-linkedin-videos-taplio.js [options]

Options:
  --input <path>       JSON list of LinkedIn post URLs. Default: tools/media/lead-linkedin-video-posts.json
  --out <path>         Output folder for videos and manifest. Default: .agents/media/linkedin
  --cdp-port <number>  Chrome remote debugging port. Default: 9231
  --delay-ms <number>  Delay between Taplio requests. Default: 45000
  --force             Re-download existing files
  --limit <number>     Download only the first N posts

Chrome must already be running with remote debugging enabled. Example PowerShell:
  & "$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe" --remote-debugging-port=9231 --user-data-dir="$PWD\\.agents\\linkedin-chrome-profile" https://taplio.com/linkedin-video-downloader
`;
}

function parseArgs(argv) {
  const args = { ...defaults, force: false, limit: Infinity };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--force") {
      args.force = true;
    } else if (arg === "--input") {
      args.input = path.resolve(argv[++i]);
    } else if (arg === "--out") {
      args.outDir = path.resolve(argv[++i]);
    } else if (arg === "--cdp-port") {
      args.cdpPort = Number(argv[++i]);
    } else if (arg === "--delay-ms") {
      args.delayMs = Number(argv[++i]);
    } else if (arg === "--limit") {
      args.limit = Number(argv[++i]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const handlers = new Map();

    ws.onopen = () => {
      resolve({
        on(method, handler) {
          if (!handlers.has(method)) handlers.set(method, []);
          handlers.get(method).push(handler);
        },
        send(method, params = {}) {
          const msgId = ++id;
          ws.send(JSON.stringify({ id: msgId, method, params }));
          return new Promise((res, rej) =>
            pending.set(msgId, { res, rej, method })
          );
        },
        close() {
          try {
            ws.close();
          } catch {}
        },
      });
    };

    ws.onerror = reject;
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const item = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) item.rej(new Error(`${item.method}: ${msg.error.message}`));
        else item.res(msg.result || {});
        return;
      }
      if (msg.method) {
        for (const handler of handlers.get(msg.method) || []) {
          handler(msg.params || {});
        }
      }
    };
  });
}

async function createTarget(port, url) {
  const res = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`,
    { method: "PUT" }
  );
  if (!res.ok) {
    throw new Error(`Could not open Chrome target on port ${port}: ${res.status}`);
  }
  return res.json();
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readPosts(inputPath) {
  const raw = await fs.readFile(inputPath, "utf8");
  const posts = JSON.parse(raw);
  if (!Array.isArray(posts)) {
    throw new Error("Input JSON must be an array.");
  }
  return posts.map((post, index) => ({
    id: String(post.id || post.url || index),
    slug: String(post.slug || `linkedin-video-${index + 1}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    url: post.url,
    note: post.note || "",
  }));
}

async function download(url, filePath) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136 Safari/537.36",
      accept: "video/mp4,video/*,*/*",
    },
  });
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} ${res.statusText}`);
  }
  const bytes = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, bytes);
  return bytes.length;
}

async function runFfprobe(filePath) {
  return new Promise((resolve) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration,size:stream=index,codec_type,codec_name,width,height,duration",
      "-of",
      "json",
      filePath,
    ]);
    let stdout = "";
    let stderr = "";
    ffprobe.stdout.on("data", (chunk) => (stdout += chunk));
    ffprobe.stderr.on("data", (chunk) => (stderr += chunk));
    ffprobe.on("close", (code) => {
      if (code !== 0) {
        resolve({ error: stderr.trim() || `ffprobe exited ${code}` });
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        resolve({ error: String(error.message || error) });
      }
    });
    ffprobe.on("error", (error) => {
      resolve({ error: String(error.message || error) });
    });
  });
}

function extractVideoUrls(apiBodies, domVideoUrl) {
  const urls = [];
  for (const item of apiBodies) {
    if (!item.body) continue;
    try {
      const parsed = JSON.parse(item.body);
      for (const key of ["video_url", "videoUrl", "url"]) {
        if (/^https?:\/\//.test(parsed[key] || "")) urls.push(parsed[key]);
      }
    } catch {}
  }
  if (domVideoUrl && !domVideoUrl.startsWith("blob:")) {
    urls.push(domVideoUrl);
  }
  return [...new Set(urls)];
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  await fs.mkdir(args.outDir, { recursive: true });
  const posts = (await readPosts(args.input)).slice(0, args.limit);

  const target = await createTarget(args.cdpPort, args.taplioUrl);
  const client = await connect(target.webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable", {
    maxTotalBufferSize: 100000000,
    maxResourceBufferSize: 50000000,
  });

  const apiRequests = new Map();
  const apiBodies = [];
  client.on("Network.responseReceived", (params) => {
    const url = params.response?.url || "";
    if (url.includes("linkedIn-video-downloader")) {
      apiRequests.set(params.requestId, {
        url,
        status: params.response.status,
        mimeType: params.response.mimeType,
      });
    }
  });
  client.on("Network.loadingFinished", async (params) => {
    const meta = apiRequests.get(params.requestId);
    if (!meta) return;
    try {
      const body = await client.send("Network.getResponseBody", {
        requestId: params.requestId,
      });
      apiBodies.push({ ...meta, ...body, seenAt: Date.now() });
    } catch (error) {
      apiBodies.push({
        ...meta,
        bodyError: String(error.message || error),
        seenAt: Date.now(),
      });
    }
  });

  const evalIn = (expression) =>
    client.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });

  const manifest = [];
  for (let index = 0; index < posts.length; index += 1) {
    const post = posts[index];
    const filePath = path.join(args.outDir, `${post.slug}.mp4`);

    if (!args.force && (await fileExists(filePath))) {
      const probe = await runFfprobe(filePath);
      manifest.push({
        post,
        status: "skipped-existing",
        filePath,
        probe,
      });
      console.log(`[skip] ${post.slug} already exists`);
      continue;
    }

    const before = apiBodies.length;
    await client.send("Page.navigate", { url: args.taplioUrl });
    await delay(5500);

    const clicked = await evalIn(`(async () => {
      const input = document.querySelector("#postUrl");
      const button = document.querySelector("#downloadButton");
      if (!input || !button) return { ok: false, reason: "missing form" };
      input.focus();
      input.value = ${JSON.stringify(post.url)};
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 450));
      button.click();
      return { ok: true, text: button.innerText };
    })()`);

    await delay(26000);

    const dom = await evalIn(`(() => {
      const video = document.querySelector("video");
      return {
        bodyStart: document.body.innerText.slice(0, 450),
        videoSrc: video?.currentSrc || video?.src || ""
      };
    })()`);

    const bodies = apiBodies.slice(before);
    const videoUrls = extractVideoUrls(bodies, dom.result?.value?.videoSrc);
    const apiStatus = bodies.map((item) => item.status);

    try {
      if (!videoUrls[0]) {
        throw new Error(`No direct video URL returned. API statuses: ${apiStatus.join(", ") || "none"}`);
      }
      const bytes = await download(videoUrls[0], filePath);
      const probe = await runFfprobe(filePath);
      manifest.push({
        post,
        status: "downloaded",
        filePath,
        bytes,
        sourceUrl: videoUrls[0],
        clicked: clicked.result?.value,
        apiStatus,
        probe,
      });
      console.log(`[ok] ${post.slug} -> ${filePath}`);
    } catch (error) {
      manifest.push({
        post,
        status: "failed",
        error: String(error.message || error),
        clicked: clicked.result?.value,
        apiStatus,
        apiPreview: bodies.map((item) => item.body?.slice(0, 220) || item.bodyError || ""),
      });
      console.log(`[fail] ${post.slug}: ${String(error.message || error)}`);
    }

    if (index < posts.length - 1) {
      await delay(args.delayMs);
    }
  }

  const manifestPath = path.join(args.outDir, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);
  client.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
