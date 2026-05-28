/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

const defaults = {
  registry: path.join(process.cwd(), "tools", "media", "lead-media-sources.json"),
  outDir: path.join(process.cwd(), ".agents", "media", "archive", "instagram-gallery-dl"),
  cookies: path.join(process.cwd(), ".agents", "media", "secrets", "instagram-cookies.txt"),
  source: null,
  kind: null,
  limitSources: Infinity,
  range: null,
  force: false,
};

function usage() {
  return `Usage:
  node tools/media/download-instagram-gallery-dl.js [options]

Options:
  --registry <path>       Source registry. Default: tools/media/lead-media-sources.json
  --out <path>            Output root. Default: .agents/media/archive/instagram-gallery-dl
  --cookies <path>        Netscape Instagram cookies.txt. Default: .agents/media/secrets/instagram-cookies.txt
  --source <account>      Run one source, e.g. lead_americas
  --kind <kind>           Filter source kind, e.g. main or chapter
  --limit-sources <n>     Process first N matching Instagram sources
  --range <range>         gallery-dl range, e.g. 1, 1-12, or 20-40
  --force                 Ignore gallery-dl archive skip file
`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--registry") args.registry = path.resolve(argv[++i]);
    else if (arg === "--out") args.outDir = path.resolve(argv[++i]);
    else if (arg === "--cookies") args.cookies = path.resolve(argv[++i]);
    else if (arg === "--source") args.source = argv[++i];
    else if (arg === "--kind") args.kind = argv[++i];
    else if (arg === "--limit-sources") args.limitSources = Number(argv[++i]);
    else if (arg === "--range") args.range = argv[++i];
    else if (arg === "--force") args.force = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function postsUrl(source) {
  const account = source.account || "";
  const base = source.url || `https://www.instagram.com/${account}/`;
  const normalized = base.replace(/\/?$/, "/");
  return normalized.endsWith("/posts/") ? normalized : `${normalized}posts/`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
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

async function loadSources(args) {
  const registry = JSON.parse(await fs.readFile(args.registry, "utf8"));
  return registry.sources
    .filter((source) => source.platform === "instagram")
    .filter((source) => !args.source || source.account === args.source)
    .filter((source) => !args.kind || source.kind === args.kind)
    .slice(0, args.limitSources);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }
  if (!(await fileExists(args.cookies))) {
    throw new Error(
      `Instagram cookies file not found: ${args.cookies}. Export a logged-in Netscape cookies.txt first.`
    );
  }

  await fs.mkdir(args.outDir, { recursive: true });
  const sources = await loadSources(args);
  const manifest = {
    tool: "gallery-dl",
    created_at: new Date().toISOString(),
    registry: args.registry,
    out_dir: args.outDir,
    range: args.range,
    sources: [],
  };

  for (const source of sources) {
    const accountDir = path.join(args.outDir, slugify(source.account));
    const archiveFile = path.join(accountDir, "gallery-dl-downloads.txt");
    await fs.mkdir(accountDir, { recursive: true });

    const galleryArgs = [
      "--cookies",
      args.cookies,
      "--write-metadata",
      "--write-info-json",
      "--directory",
      accountDir,
      "--filename",
      "{shortcode}_{num}.{extension}",
    ];
    if (!args.force) galleryArgs.push("--download-archive", archiveFile);
    if (args.range) galleryArgs.push("--range", args.range);
    galleryArgs.push(postsUrl(source));

    console.log(`[instagram:gallery-dl] ${source.account}: ${postsUrl(source)}`);
    const result = await run("gallery-dl", galleryArgs, { pipe: true });
    manifest.sources.push({
      account: source.account,
      name: source.name,
      kind: source.kind,
      url: postsUrl(source),
      out_dir: accountDir,
      archive_file: archiveFile,
      status: result.code === 0 ? "ok" : "failed",
      error: result.code === 0 ? null : result.stderr.trim() || result.stdout.trim(),
    });
  }

  const manifestPath = path.join(args.outDir, "manifest.json");
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`[instagram:gallery-dl] wrote ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
