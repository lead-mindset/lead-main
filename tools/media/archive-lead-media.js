/* eslint-disable @typescript-eslint/no-require-imports */

const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

const DEFAULTS = {
  cdpPort: Number(process.env.CDP_PORT || 9231),
  registry: path.join(process.cwd(), "tools", "media", "lead-media-sources.json"),
  archiveRoot: path.join(process.cwd(), ".agents", "media", "archive"),
  scrapeReferenceDate: "2026-05-27",
  discoverScrolls: Number(process.env.MEDIA_DISCOVER_SCROLLS || 80),
  discoverStableRounds: Number(process.env.MEDIA_DISCOVER_STABLE_ROUNDS || 8),
  discoverWaitMs: Number(process.env.MEDIA_DISCOVER_WAIT_MS || 1800),
  downloadWaitMs: Number(process.env.MEDIA_DOWNLOAD_WAIT_MS || 28000),
  betweenPostsMs: Number(process.env.MEDIA_BETWEEN_POSTS_MS || 30000),
  sssInstagramUrl: "https://sssinstagram.com/es",
};

function usage() {
  return `Usage:
  node tools/media/archive-lead-media.js <command> [options]

Commands:
  discover-instagram       Discover post/reel URLs from Instagram profile grids
  download-instagram       Download discovered Instagram posts via SSSInstagram
  inventory                Write a JSON/CSV inventory from archived metadata

Options:
  --source <account>       Run only one account, e.g. lead_americas
  --kind <kind>            Filter sources by kind, e.g. main or chapter
  --limit-sources <n>      Process only first N matching sources
  --limit-posts <n>        Process only first N posts per source
  --force                  Re-run even when output already exists
  --cdp-port <n>           Chrome remote debugging port. Default: 9231
  --archive-root <path>    Archive output root. Default: .agents/media/archive

Chrome must already be running with remote debugging enabled. Example:
  & "$env:ProgramFiles\\Google\\Chrome\\Application\\chrome.exe" --remote-debugging-port=9231 --user-data-dir="$PWD\\.agents\\media-chrome-profile" https://www.instagram.com/lead_americas/
`;
}

function parseArgs(argv) {
  const [command] = argv.slice(2);
  const args = {
    ...DEFAULTS,
    command: command === "--help" || command === "-h" ? null : command,
    source: null,
    kind: null,
    limitSources: Infinity,
    limitPosts: Infinity,
    force: false,
  };

  for (let i = 3; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--source") args.source = argv[++i];
    else if (arg === "--kind") args.kind = argv[++i];
    else if (arg === "--limit-sources") args.limitSources = Number(argv[++i]);
    else if (arg === "--limit-posts") args.limitPosts = Number(argv[++i]);
    else if (arg === "--force") args.force = true;
    else if (arg === "--cdp-port") args.cdpPort = Number(argv[++i]);
    else if (arg === "--archive-root") args.archiveRoot = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function canonicalInstagramUrl(url) {
  const match = String(url || "").match(/instagram\.com\/(p|reel|reels)\/([^/?#]+)/i);
  if (!match) return null;
  const kind = match[1].toLowerCase() === "p" ? "p" : "reel";
  return {
    postId: match[2],
    postType: kind === "p" ? "post" : "reel",
    url: `https://www.instagram.com/${kind}/${match[2]}/`,
  };
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

async function createBrowserClient(port, url) {
  const target = await createTarget(port, url);
  const client = await connect(target.webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable", {
    maxTotalBufferSize: 100000000,
    maxResourceBufferSize: 50000000,
  });
  return client;
}

function evalIn(client, expression) {
  return client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (fallback !== null) return fallback;
    throw error;
  }
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadRegistry(args) {
  const registry = await readJson(args.registry);
  const sources = registry.sources
    .filter((source) => !args.source || source.account === args.source)
    .filter((source) => !args.kind || source.kind === args.kind)
    .slice(0, args.limitSources);
  return {
    ...registry,
    scrape_reference_date:
      registry.scrape_reference_date || args.scrapeReferenceDate,
    sources,
  };
}

function sourceDir(args, source) {
  return path.join(
    args.archiveRoot,
    "sources",
    source.platform,
    slugify(source.account)
  );
}

function postDir(args, source, postId) {
  return path.join(sourceDir(args, source), "posts", slugify(postId));
}

function assetPath(args, sha256, extension) {
  return path.join(
    args.archiveRoot,
    "assets",
    "sha256",
    sha256.slice(0, 2),
    sha256.slice(2, 4),
    `${sha256}${extension}`
  );
}

async function discoverInstagram(args) {
  const registry = await loadRegistry(args);
  const sources = registry.sources.filter((source) => source.platform === "instagram");
  if (!sources.length) {
    console.log("No Instagram sources matched.");
    return;
  }

  for (const source of sources) {
    const accountUrl = source.url.replace(/\/?$/, "/");
    const outDir = sourceDir(args, source);
    await fs.mkdir(outDir, { recursive: true });

    const client = await createBrowserClient(args.cdpPort, accountUrl);
    const discovered = new Map();
    let stableRounds = 0;

    try {
      await delay(6500);
      for (let round = 0; round < args.discoverScrolls; round += 1) {
        const result = await evalIn(client, `(() => {
          const anchors = [...document.querySelectorAll("a[href]")].map((a) => a.href);
          const bodyText = document.body.innerText.slice(0, 2000);
          const title = document.title;
          const href = location.href;
          window.scrollBy(0, Math.max(window.innerHeight * 0.9, 700));
          return { anchors, bodyText, title, href, scrollY: window.scrollY, height: document.documentElement.scrollHeight };
        })()`);
        const value = result.result?.value || {};
        const beforeSize = discovered.size;
        for (const href of value.anchors || []) {
          const parsed = canonicalInstagramUrl(href);
          if (!parsed) continue;
          discovered.set(parsed.postId, {
            platform: "instagram",
            account: source.account,
            account_name: source.name,
            account_url: accountUrl,
            post_id: parsed.postId,
            post_type: parsed.postType,
            source_url: parsed.url,
            discovered_at: new Date().toISOString(),
            scrape_reference_date: registry.scrape_reference_date,
            discovery_source: "instagram_profile_dom",
            status: "discovered",
          });
        }

        stableRounds = discovered.size === beforeSize ? stableRounds + 1 : 0;
        console.log(
          `[discover] ${source.account}: ${discovered.size} posts after round ${round + 1}`
        );

        if (/log in|sign up|iniciar sesi/i.test(value.bodyText || "") && discovered.size === 0) {
          console.log(`[discover] ${source.account}: login wall detected; stopping.`);
          break;
        }
        if (stableRounds >= args.discoverStableRounds) {
          console.log(`[discover] ${source.account}: stable after ${stableRounds} rounds; stopping.`);
          break;
        }
        await delay(args.discoverWaitMs);
      }

      const posts = [...discovered.values()].sort((a, b) =>
        a.post_id.localeCompare(b.post_id)
      );
      await writeJson(path.join(outDir, "manifest.json"), {
        source,
        scrape_reference_date: registry.scrape_reference_date,
        discovered_at: new Date().toISOString(),
        count: posts.length,
        posts,
      });

      for (const post of posts) {
        const metaPath = path.join(postDir(args, source, post.post_id), "metadata.json");
        if (!args.force && (await exists(metaPath))) continue;
        await writeJson(metaPath, {
          ...post,
          published_at: null,
          date_status: "not_checked",
          assets: [],
          attempts: [],
        });
        await fs.writeFile(
          path.join(postDir(args, source, post.post_id), "source-url.txt"),
          `${post.source_url}\n`,
          "utf8"
        );
      }
    } finally {
      client.close();
    }
  }
}

function parseSssResultText(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const resultIndex = lines.findIndex((line) =>
    /^resultado de b[uú]squeda$|^search result$/i.test(line)
  );
  const start = resultIndex >= 0 ? resultIndex + 1 : 0;
  const useful = lines.slice(start).filter((line) => !/^descargar$|^download$/i.test(line));

  const relativeDateIndex = useful.findIndex((line) =>
    /\b(ago|hace|day|days|week|weeks|month|months|year|years|hora|horas|d[ií]a|d[ií]as|semana|semanas|mes|meses|a[nñ]o|a[nñ]os)\b/i.test(line)
  );
  const likesIndex = useful.findIndex((line) => /^\d[\d,.\s]*\s+(likes|me gusta)$/i.test(line));
  const commentsIndex = useful.findIndex((line) => /^\d[\d,.\s]*\s+(comments|comentarios)$/i.test(line));

  const captionEndCandidates = [relativeDateIndex, likesIndex, commentsIndex].filter((i) => i >= 0);
  const captionEnd = captionEndCandidates.length ? Math.min(...captionEndCandidates) : Math.min(useful.length, 1);
  const caption = useful.slice(0, captionEnd).join("\n\n").trim();

  return {
    caption,
    relative_date_text: relativeDateIndex >= 0 ? useful[relativeDateIndex] : null,
    likes: likesIndex >= 0 ? parseCount(useful[likesIndex]) : null,
    comments: commentsIndex >= 0 ? parseCount(useful[commentsIndex]) : null,
    raw_result_lines: useful.slice(0, 80),
  };
}

function parseCount(text) {
  const match = String(text || "").match(/[\d,.\s]+/);
  if (!match) return null;
  const normalized = match[0].replace(/[,\s.]/g, "");
  const count = Number(normalized);
  return Number.isFinite(count) ? count : null;
}

function contentExtension(contentType, url) {
  if (/video\/mp4/i.test(contentType) || /\.mp4(\?|$)/i.test(url)) return ".mp4";
  if (/image\/webp/i.test(contentType) || /\.webp(\?|$)/i.test(url)) return ".webp";
  if (/image\/png/i.test(contentType) || /\.png(\?|$)/i.test(url)) return ".png";
  if (/image\/jpe?g/i.test(contentType) || /\.jpe?g(\?|$)/i.test(url)) return ".jpg";
  return ".bin";
}

function mediaType(contentType, extension) {
  if (/video/i.test(contentType) || extension === ".mp4") return "video";
  if (/image/i.test(contentType) || [".jpg", ".png", ".webp"].includes(extension)) return "image";
  return "unknown";
}

function isLikelySssVideoUrl(url) {
  try {
    return /\.mp4(?:[?&#]|$)|filename=[^&#]*\.mp4/i.test(decodeURIComponent(url));
  } catch {
    return /\.mp4(?:[?&#]|$)|filename=[^&#]*\.mp4/i.test(String(url || ""));
  }
}

async function downloadBuffer(url, referer = "https://sssinstagram.com/") {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136 Safari/537.36",
      accept: "video/mp4,image/*,*/*",
      referer,
    },
  });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${res.statusText}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  return {
    bytes,
    contentType: res.headers.get("content-type") || "",
  };
}

async function collectInstagramDomPost(client, post) {
  await client.send("Page.navigate", { url: post.source_url });
  await delay(7500);

  const images = new Map();
  let hasNext = false;
  let hasVideo = post.post_type === "reel";
  let publishedAt = null;
  let caption = "";
  let pageText = "";
  const rounds = 14;

  for (let round = 0; round < rounds; round += 1) {
    const result = await evalIn(client, `(() => {
      const absUrl = (value) => {
        try { return new URL(value, location.href).href; } catch { return ""; }
      };
      const imageCandidates = [...document.querySelectorAll("img")].map((img) => {
        const rect = img.getBoundingClientRect();
        return {
          src: absUrl(img.currentSrc || img.src || ""),
          alt: img.alt || "",
          naturalWidth: img.naturalWidth || 0,
          naturalHeight: img.naturalHeight || 0,
          renderedWidth: Math.round(rect.width),
          renderedHeight: Math.round(rect.height),
          source_kind: "dom_img"
        };
      }).filter((item) =>
        /cdninstagram|fbcdn|instagram/i.test(item.src) &&
        item.naturalWidth >= 320 &&
        item.naturalHeight >= 320 &&
        item.renderedWidth >= 120 &&
        item.renderedHeight >= 120
      );

      const metaImages = [...document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')]
        .map((meta) => ({
          src: absUrl(meta.getAttribute("content") || ""),
          alt: "",
          naturalWidth: 0,
          naturalHeight: 0,
          renderedWidth: 0,
          renderedHeight: 0,
          source_kind: "meta_image"
        }))
        .filter((item) => /cdninstagram|fbcdn|instagram/i.test(item.src));

      const videos = [
        ...[...document.querySelectorAll("video")].map((video) => video.currentSrc || video.src || video.poster || ""),
        ...[...document.querySelectorAll('meta[property="og:video"], meta[property="og:video:url"], meta[name="twitter:player:stream"]')]
          .map((meta) => meta.getAttribute("content") || "")
      ].filter(Boolean);

      const time = document.querySelector("time[datetime]");
      const article = document.querySelector("article");
      const bodyText = document.body.innerText || "";
      const captionCandidate = article?.innerText || bodyText.slice(0, 4000);

      const next = [...document.querySelectorAll("button, [role=button]")]
        .find((el) => /next|siguiente/i.test(
          [el.getAttribute("aria-label") || "", el.innerText || "", el.textContent || ""].join(" ")
        ));
      const canClickNext = Boolean(next);
      if (next) next.click();

      return {
        href: location.href,
        title: document.title,
        bodyText: bodyText.slice(0, 3000),
        captionCandidate: captionCandidate.slice(0, 5000),
        publishedAt: time?.getAttribute("datetime") || null,
        imageCandidates: [...imageCandidates, ...metaImages],
        videos,
        hasVideo: videos.some((url) => /blob:|mp4|cdninstagram|fbcdn|instagram/i.test(url)),
        clickedNext: canClickNext
      };
    })()`);

    const value = result.result?.value || {};
    pageText = value.bodyText || pageText;
    caption = value.captionCandidate || caption;
    publishedAt = value.publishedAt || publishedAt;
    hasVideo = hasVideo || Boolean(value.hasVideo);
    hasNext = Boolean(value.clickedNext);

    for (const image of value.imageCandidates || []) {
      if (!image.src) continue;
      images.set(image.src, image);
    }

    if (!hasNext) break;
    await delay(1200);
  }

  return {
    published_at: publishedAt,
    date_status: publishedAt ? "confirmed" : "unknown",
    date_source: publishedAt ? "instagram_dom_time" : null,
    caption: cleanInstagramDomCaption(caption),
    body_text_preview: pageText,
    has_video: hasVideo,
    image_candidates: [...images.values()],
  };
}

function cleanInstagramDomCaption(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const noisy = /^(like|comment|share|save|follow|view all|add a comment|post|reel|more|meta|about|blog|jobs|help|api|privacy|terms|locations|instagram lite|threads)$/i;
  const filtered = lines.filter((line) => !noisy.test(line));
  return filtered.slice(0, 24).join("\n").trim();
}

async function materializeAsset(args, candidate, referer) {
  const downloaded = await downloadBuffer(candidate.href || candidate.src, referer);
  const sha256 = crypto.createHash("sha256").update(downloaded.bytes).digest("hex");
  const extension = contentExtension(downloaded.contentType, candidate.href || candidate.src);
  const type = mediaType(downloaded.contentType, extension);
  const finalPath = assetPath(args, sha256, extension);

  await fs.mkdir(path.dirname(finalPath), { recursive: true });
  if (!(await exists(finalPath))) {
    await fs.writeFile(finalPath, downloaded.bytes);
  }

  const probe = await probeAsset(finalPath, type);
  return {
    sha256,
    type,
    extension,
    content_type: downloaded.contentType,
    size_bytes: downloaded.bytes.length,
    archive_path: finalPath,
    source_download_url: candidate.href || candidate.src,
    source_kind: candidate.source_kind || null,
    source_link_text: candidate.text || null,
    alt: candidate.alt || null,
    probe,
  };
}

async function probeAsset(filePath, type) {
  if (type === "video") return runFfprobe(filePath);
  if (type === "image") return probeImage(filePath);
  return {};
}

async function probeImage(filePath) {
  try {
    const sharp = require("sharp");
    const meta = await sharp(filePath).metadata();
    return {
      width: meta.width || null,
      height: meta.height || null,
      format: meta.format || null,
    };
  } catch (error) {
    return { error: String(error.message || error) };
  }
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
    ffprobe.on("error", (error) => resolve({ error: String(error.message || error) }));
  });
}

async function downloadInstagram(args) {
  const registry = await loadRegistry(args);
  const sources = registry.sources.filter((source) => source.platform === "instagram");
  if (!sources.length) {
    console.log("No Instagram sources matched.");
    return;
  }

  const client = await createBrowserClient(args.cdpPort, "about:blank");
  try {
    for (const source of sources) {
      const manifestPath = path.join(sourceDir(args, source), "manifest.json");
      const manifest = await readJson(manifestPath, null);
      if (!manifest) {
        console.log(`[download] ${source.account}: no manifest; run discover-instagram first.`);
        continue;
      }

      const posts = manifest.posts.slice(0, args.limitPosts);
      for (const post of posts) {
        const dir = postDir(args, source, post.post_id);
        const metadataPath = path.join(dir, "metadata.json");
        const existing = await readJson(metadataPath, {
          ...post,
          assets: [],
          attempts: [],
        });

        if (!args.force && ["downloaded", "no_media"].includes(existing.status)) {
          console.log(`[skip] ${source.account}/${post.post_id}: ${existing.status}`);
          continue;
        }

        const htmlAttempt = {
          tool: "instagram_html",
          started_at: new Date().toISOString(),
          status: "started",
        };
        const attempts = [];

        try {
          const dom = await collectInstagramDomPost(client, post);
          const assets = [];

          for (const image of dom.image_candidates || []) {
            try {
              const asset = await materializeAsset(args, image, post.source_url);
              if (asset.type === "image") assets.push(asset);
            } catch (error) {
              htmlAttempt.image_error = String(error.message || error);
            }
          }

          htmlAttempt.finished_at = new Date().toISOString();
          htmlAttempt.status = assets.some((asset) => asset.type === "image")
            ? "downloaded_images"
            : "no_images";
          htmlAttempt.image_candidate_count = (dom.image_candidates || []).length;
          htmlAttempt.has_video = dom.has_video;
          attempts.push(htmlAttempt);

          let parsed = {
            caption: "",
            relative_date_text: null,
            likes: null,
            comments: null,
            raw_result_lines: [],
          };

          if (dom.has_video) {
            const sssAttempt = {
              tool: "sssinstagram_video",
              started_at: new Date().toISOString(),
              status: "started",
            };

            await client.send("Page.navigate", { url: args.sssInstagramUrl });
            await delay(6500);

            const submit = await evalIn(client, `(async () => {
              const input = [...document.querySelectorAll("input, textarea")].find((el) =>
                /url|link|instagram|enlace|pega|paste/i.test([el.name, el.id, el.placeholder, el.type].join(" "))
              ) || document.querySelector("input, textarea");
              if (!input) return { ok: false, reason: "missing input" };
              input.focus();
              input.value = ${JSON.stringify(post.source_url)};
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
              await new Promise((resolve) => setTimeout(resolve, 600));
              const button = [...document.querySelectorAll("button, input[type=submit], a")].find((el) =>
                /download|descargar|buscar|start|submit/i.test((el.innerText || el.value || el.id || el.className || ""))
              ) || document.querySelector("button, input[type=submit]");
              if (!button) return { ok: false, reason: "missing button" };
              button.click();
              return { ok: true, buttonText: button.innerText || button.value || "" };
            })()`);

            await delay(args.downloadWaitMs);

            const page = await evalIn(client, `(() => {
              const links = [...document.querySelectorAll("a[href]")].map((a) => ({
                text: (a.innerText || a.textContent || "").trim(),
                href: a.href || "",
                download: a.getAttribute("download") || "",
                className: String(a.className || "")
              }));
              return {
                title: document.title,
                href: location.href,
                bodyText: document.body.innerText,
                links: links.filter((item) =>
                  /media\\.sssinstagram\\.com\\/get|cdninstagram|fbcdn|\\.mp4|descargar|download/i.test(
                    [item.text, item.href, item.download, item.className].join(" ")
                  )
                ).slice(0, 120)
              };
            })()`);

            const value = page.result?.value || {};
            parsed = parseSssResultText(value.bodyText || "");
            const videoCandidates = [
              ...new Map(
                (value.links || [])
                  .filter((link) => /media\.sssinstagram\.com\/get/i.test(link.href))
                  .filter((link) => isLikelySssVideoUrl(link.href))
                  .map((link) => [link.href, link])
              ).values(),
            ];

            for (const candidate of videoCandidates) {
              const asset = await materializeAsset(
                args,
                { ...candidate, source_kind: "sssinstagram_video" },
                args.sssInstagramUrl
              );
              if (asset.type === "video") assets.push(asset);
            }

            sssAttempt.finished_at = new Date().toISOString();
            sssAttempt.status = videoCandidates.length ? "downloaded_videos" : "no_video_candidates";
            sssAttempt.candidate_count = videoCandidates.length;
            sssAttempt.submit = submit.result?.value || null;
            attempts.push(sssAttempt);
          }

          const uniqueAssets = [
            ...new Map(assets.map((asset) => [asset.sha256, asset])).values(),
          ];
          const exactDate = dom.published_at || null;
          const caption = dom.caption || parsed.caption || "";
          const status = uniqueAssets.length ? "downloaded" : "manual_needed";

          const next = {
            ...existing,
            ...post,
            scraped_at: new Date().toISOString(),
            scrape_reference_date: registry.scrape_reference_date,
            published_at: exactDate,
            date_precision: exactDate ? "second" : null,
            date_source: exactDate
              ? "instagram_dom_time"
              : parsed.relative_date_text
                ? "sssinstagram_relative_text"
                : null,
            date_status: exactDate
              ? "confirmed"
              : parsed.relative_date_text
                ? "relative_only"
                : "unknown",
            relative_date_text: exactDate ? null : parsed.relative_date_text,
            caption,
            engagement: {
              likes: parsed.likes,
              comments: parsed.comments,
              source:
                parsed.likes !== null || parsed.comments !== null
                  ? "sssinstagram_snapshot"
                  : null,
            },
            assets: uniqueAssets,
            status,
            raw: {
              instagram_body_text_preview: dom.body_text_preview,
              sssinstagram_result_lines: parsed.raw_result_lines,
            },
            attempts: [...(existing.attempts || []), ...attempts],
          };

          await writeJson(metadataPath, next);
          await fs.writeFile(path.join(dir, "caption.txt"), `${caption || ""}\n`, "utf8");
          await fs.writeFile(path.join(dir, "source-url.txt"), `${post.source_url}\n`, "utf8");
          console.log(`[${status}] ${source.account}/${post.post_id}: ${uniqueAssets.length} assets`);
        } catch (error) {
          htmlAttempt.finished_at = htmlAttempt.finished_at || new Date().toISOString();
          htmlAttempt.status = "failed";
          htmlAttempt.error = String(error.message || error);
          attempts.push(htmlAttempt);
          const next = {
            ...existing,
            ...post,
            scraped_at: new Date().toISOString(),
            status: "manual_needed",
            assets: existing.assets || [],
            attempts: [...(existing.attempts || []), ...attempts],
          };
          await writeJson(metadataPath, next);
          console.log(`[fail] ${source.account}/${post.post_id}: ${htmlAttempt.error}`);
        }

        await delay(args.betweenPostsMs);
      }
    }
  } finally {
    client.close();
  }
}
async function listMetadataFiles(root) {
  const files = [];
  async function walk(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name === "metadata.json") files.push(full);
    }
  }
  await walk(path.join(root, "sources"));
  return files;
}

function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function writeInventory(args) {
  const files = await listMetadataFiles(args.archiveRoot);
  const rows = [];
  for (const file of files) {
    const meta = await readJson(file);
    rows.push({
      platform: meta.platform || "",
      account: meta.account || "",
      post_id: meta.post_id || "",
      post_type: meta.post_type || "",
      source_url: meta.source_url || "",
      status: meta.status || "",
      published_at: meta.published_at || "",
      relative_date_text: meta.relative_date_text || "",
      date_status: meta.date_status || "",
      scraped_at: meta.scraped_at || "",
      asset_count: (meta.assets || []).length,
      video_count: (meta.assets || []).filter((asset) => asset.type === "video").length,
      image_count: (meta.assets || []).filter((asset) => asset.type === "image").length,
      likes: meta.engagement?.likes ?? "",
      comments: meta.engagement?.comments ?? "",
      caption_preview: (meta.caption || "").slice(0, 160),
      metadata_path: file,
    });
  }
  rows.sort((a, b) =>
    [a.platform, a.account, a.post_id].join("/").localeCompare([b.platform, b.account, b.post_id].join("/"))
  );

  const reportsDir = path.join(args.archiveRoot, "reports");
  await fs.mkdir(reportsDir, { recursive: true });
  await writeJson(path.join(reportsDir, "inventory.json"), rows);

  const headers = Object.keys(rows[0] || {
    platform: "",
    account: "",
    post_id: "",
    source_url: "",
    status: "",
  });
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((key) => csvEscape(row[key])).join(",")),
  ].join("\n");
  await fs.writeFile(path.join(reportsDir, "inventory.csv"), `${csv}\n`, "utf8");

  const summary = rows.reduce(
    (acc, row) => {
      acc.posts += 1;
      acc.assets += Number(row.asset_count || 0);
      acc.status[row.status] = (acc.status[row.status] || 0) + 1;
      return acc;
    },
    { posts: 0, assets: 0, status: {} }
  );
  await writeJson(path.join(reportsDir, "summary.json"), summary);
  console.log(JSON.stringify(summary, null, 2));
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.command) {
    console.log(usage());
    return;
  }

  if (args.command === "discover-instagram") return discoverInstagram(args);
  if (args.command === "download-instagram") return downloadInstagram(args);
  if (args.command === "inventory") return writeInventory(args);

  throw new Error(`Unknown command: ${args.command}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
