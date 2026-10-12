/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

const defaults = {
  input: path.join(process.cwd(), "tools", "media", "lead-linkedin-video-posts.json"),
  outDir: path.join(process.cwd(), ".agents", "media", "linkedin-ytdlp"),
  cookies: null,
  limit: Infinity,
};

function usage() {
  return `Usage:
  node tools/media/download-linkedin-videos-ytdlp.js [options]

Options:
  --input <path>     JSON list of LinkedIn post URLs. Default: tools/media/lead-linkedin-video-posts.json
  --out <path>       Output folder. Default: .agents/media/linkedin-ytdlp
  --cookies <path>   Optional Netscape cookies.txt for posts that need login
  --limit <number>   Download only the first N posts
  --force            Re-download existing files
`;
}

function parseArgs(argv) {
  const args = { ...defaults, force: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--input") args.input = path.resolve(argv[++i]);
    else if (arg === "--out") args.outDir = path.resolve(argv[++i]);
    else if (arg === "--cookies") args.cookies = path.resolve(argv[++i]);
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--force") args.force = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readPosts(inputPath) {
  const raw = await fs.readFile(inputPath, "utf8");
  const posts = JSON.parse(raw);
  if (!Array.isArray(posts)) throw new Error("Input JSON must be an array.");
  return posts.map((post, index) => ({
    id: String(post.id || index + 1),
    slug: slugify(post.slug || post.id || `linkedin-video-${index + 1}`),
    url: post.url,
    note: post.note || "",
  }));
}

function run(command, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd || process.cwd(),
      shell: process.platform === "win32",
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (options.pipe) process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      if (options.pipe) process.stderr.write(chunk);
    });
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.on("error", (error) =>
      resolve({ code: 1, stdout, stderr: `${stderr}\n${error.message}` })
    );
  });
}

async function runFfprobe(filePath) {
  const result = await run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration,size:stream=index,codec_type,codec_name,width,height,duration",
    "-of",
    "json",
    filePath,
  ]);
  if (result.code !== 0) {
    return { error: result.stderr.trim() || `ffprobe exited ${result.code}` };
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    return { error: error.message };
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  await fs.mkdir(args.outDir, { recursive: true });
  const posts = (await readPosts(args.input)).slice(0, args.limit);
  const manifestPath = path.join(args.outDir, "manifest.json");
  const manifest = {
    tool: "yt-dlp",
    created_at: new Date().toISOString(),
    input: args.input,
    out_dir: args.outDir,
    posts: [],
  };

  for (const post of posts) {
    const mp4Path = path.join(args.outDir, `${post.slug}.mp4`);
    const infoPath = path.join(args.outDir, `${post.slug}.info.json`);

    if (!args.force && (await fileExists(mp4Path))) {
      const ffprobe = await runFfprobe(mp4Path);
      manifest.posts.push({ ...post, status: "skipped_existing", file: mp4Path, info: infoPath, ffprobe });
      console.log(`[linkedin:ytdlp] ${post.slug}: already exists`);
      continue;
    }

    const ytArgs = [
      "--no-playlist",
      "--no-mtime",
      "--write-info-json",
      "--no-overwrites",
      "-o",
      path.join(args.outDir, `${post.slug}.%(ext)s`),
    ];
    if (args.cookies) ytArgs.unshift("--cookies", args.cookies);
    ytArgs.push(post.url);

    console.log(`[linkedin:ytdlp] ${post.slug}: downloading`);
    const result = await run("yt-dlp", ytArgs, { pipe: true });
    if (result.code !== 0) {
      manifest.posts.push({
        ...post,
        status: "failed",
        file: mp4Path,
        info: infoPath,
        error: result.stderr.trim() || result.stdout.trim(),
      });
      continue;
    }

    const downloaded = await fileExists(mp4Path);
    const ffprobe = downloaded ? await runFfprobe(mp4Path) : { error: "MP4 not found after yt-dlp run" };
    manifest.posts.push({
      ...post,
      status: downloaded && !ffprobe.error ? "downloaded" : "downloaded_unverified",
      file: mp4Path,
      info: infoPath,
      ffprobe,
    });
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`[linkedin:ytdlp] wrote ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
