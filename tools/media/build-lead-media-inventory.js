/* eslint-disable @typescript-eslint/no-require-imports */

const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".m4v", ".webm"]);

const defaults = {
  registry: path.join(process.cwd(), "tools", "media", "lead-media-sources.json"),
  instagramRoot: path.join(process.cwd(), ".agents", "media", "archive", "instagram-gallery-dl"),
  linkedinRoot: path.join(process.cwd(), ".agents", "media", "linkedin-ytdlp"),
  retryNotes: path.join(process.cwd(), "tools", "media", "lead-media-retry-notes.json"),
  outDir: path.join(process.cwd(), ".agents", "media", "archive", "inventory"),
  report: path.join(process.cwd(), "docs", "media-intake", "lead-media-archive-report.md"),
};

function usage() {
  return `Usage:
  node tools/media/build-lead-media-inventory.js [options]

Options:
  --registry <path>        Source registry. Default: tools/media/lead-media-sources.json
  --instagram-root <path>  Instagram raw root. Default: .agents/media/archive/instagram-gallery-dl
  --linkedin-root <path>   LinkedIn raw root. Default: .agents/media/linkedin-ytdlp
  --retry-notes <path>     Known retry notes. Default: tools/media/lead-media-retry-notes.json
  --out <path>             Inventory output folder. Default: .agents/media/archive/inventory
  --report <path>          Markdown report path. Default: docs/media-intake/lead-media-archive-report.md
`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--registry") args.registry = path.resolve(argv[++i]);
    else if (arg === "--instagram-root") args.instagramRoot = path.resolve(argv[++i]);
    else if (arg === "--linkedin-root") args.linkedinRoot = path.resolve(argv[++i]);
    else if (arg === "--retry-notes") args.retryNotes = path.resolve(argv[++i]);
    else if (arg === "--out") args.outDir = path.resolve(argv[++i]);
    else if (arg === "--report") args.report = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function listFiles(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function sha256(filePath) {
  const hash = crypto.createHash("sha256");
  const file = await fs.open(filePath, "r");
  try {
    for await (const chunk of file.createReadStream()) hash.update(chunk);
  } finally {
    await file.close();
  }
  return hash.digest("hex");
}

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      shell: process.platform === "win32",
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.on("error", (error) => resolve({ code: 1, stdout, stderr: error.message }));
  });
}

async function imageMetadata(filePath) {
  try {
    const sharp = require("sharp");
    const meta = await sharp(filePath).metadata();
    return {
      validation_status: "ok",
      width: meta.width || null,
      height: meta.height || null,
      duration_seconds: null,
      codec: meta.format || null,
      validation_error: null,
    };
  } catch (error) {
    return {
      validation_status: "failed",
      width: null,
      height: null,
      duration_seconds: null,
      codec: null,
      validation_error: error.message,
    };
  }
}

async function videoMetadata(filePath) {
  const result = await run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration:stream=codec_type,codec_name,width,height",
    "-of",
    "json",
    filePath,
  ]);
  if (result.code !== 0) {
    return {
      validation_status: "failed",
      width: null,
      height: null,
      duration_seconds: null,
      codec: null,
      validation_error: result.stderr.trim() || `ffprobe exited ${result.code}`,
    };
  }
  try {
    const parsed = JSON.parse(result.stdout);
    const video = (parsed.streams || []).find((stream) => stream.codec_type === "video") || {};
    return {
      validation_status: "ok",
      width: video.width || null,
      height: video.height || null,
      duration_seconds: parsed.format?.duration ? Number(parsed.format.duration) : null,
      codec: video.codec_name || null,
      validation_error: null,
    };
  } catch (error) {
    return {
      validation_status: "failed",
      width: null,
      height: null,
      duration_seconds: null,
      codec: null,
      validation_error: error.message,
    };
  }
}

function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(rows) {
  const columns = [
    "platform",
    "account",
    "account_kind",
    "source_name",
    "post_id",
    "post_shortcode",
    "post_url",
    "published_at",
    "caption_or_title",
    "media_type",
    "local_path",
    "file_name",
    "extension",
    "file_size",
    "sha256",
    "width",
    "height",
    "duration_seconds",
    "codec",
    "download_tool",
    "validation_status",
    "validation_error",
  ];
  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");
}

function sourceByAccount(registry) {
  const map = new Map();
  for (const source of registry.sources || []) {
    map.set(source.account, source);
  }
  return map;
}

async function instagramRows(args, registry) {
  const rows = [];
  const accountMap = sourceByAccount(registry);
  const dirs = (await listFiles(args.instagramRoot)).filter((entry) => entry.isDirectory());

  for (const dirent of dirs) {
    const account = dirent.name;
    const source = accountMap.get(account) || {
      account,
      kind: "unknown",
      name: account,
      url: `https://www.instagram.com/${account}/`,
    };
    const accountDir = path.join(args.instagramRoot, account);
    const files = (await listFiles(accountDir)).filter((entry) => {
      if (!entry.isFile()) return false;
      const ext = path.extname(entry.name).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext);
    });

    for (const file of files) {
      const filePath = path.join(accountDir, file.name);
      const stat = await fs.stat(filePath);
      const ext = path.extname(file.name).toLowerCase();
      const mediaType = VIDEO_EXTENSIONS.has(ext) ? "video" : "image";
      const metadata = await readJson(`${filePath}.json`, {});
      const validation =
        mediaType === "video" ? await videoMetadata(filePath) : await imageMetadata(filePath);

      rows.push({
        platform: "instagram",
        account,
        account_kind: source.kind || "unknown",
        source_name: source.name || account,
        post_id: metadata.post_id || metadata.sidecar_media_id || null,
        post_shortcode: metadata.post_shortcode || metadata.sidecar_shortcode || null,
        post_url: metadata.post_url || null,
        published_at: metadata.date || metadata.post_date || null,
        caption_or_title: metadata.description || "",
        media_type: mediaType,
        local_path: filePath,
        file_name: file.name,
        extension: ext,
        file_size: stat.size,
        sha256: await sha256(filePath),
        width: validation.width,
        height: validation.height,
        duration_seconds: validation.duration_seconds,
        codec: validation.codec,
        download_tool: "gallery-dl",
        validation_status: validation.validation_status,
        validation_error: validation.validation_error,
      });
    }
  }
  return rows;
}

async function linkedinRows(args) {
  const manifest = await readJson(path.join(args.linkedinRoot, "manifest.json"), { posts: [] });
  const rows = [];
  for (const post of manifest.posts || []) {
    const filePath = post.file || path.join(args.linkedinRoot, `${post.slug}.mp4`);
    if (!(await exists(filePath))) continue;
    const info = await readJson(post.info || `${filePath.replace(/\.mp4$/i, "")}.info.json`, {});
    const stat = await fs.stat(filePath);
    const validation = await videoMetadata(filePath);
    rows.push({
      platform: "linkedin",
      account: "leadmindsetorg",
      account_kind: "company",
      source_name: "LEAD LinkedIn Company Page",
      post_id: post.id || info.id || null,
      post_shortcode: "",
      post_url: post.url || info.webpage_url || null,
      published_at: info.release_timestamp || info.timestamp || null,
      caption_or_title: info.title || info.description || post.note || "",
      media_type: "video",
      local_path: filePath,
      file_name: path.basename(filePath),
      extension: path.extname(filePath).toLowerCase(),
      file_size: stat.size,
      sha256: await sha256(filePath),
      width: validation.width,
      height: validation.height,
      duration_seconds: validation.duration_seconds,
      codec: validation.codec,
      download_tool: "yt-dlp",
      validation_status: validation.validation_status,
      validation_error: validation.validation_error,
    });
  }
  return rows;
}

function groupBy(rows, key) {
  const grouped = new Map();
  for (const row of rows) {
    const value = row[key] || "";
    grouped.set(value, (grouped.get(value) || 0) + 1);
  }
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function sourceFailures(args) {
  return readJson(path.join(args.instagramRoot, "manifest.json"), { sources: [] }).then((manifest) =>
    (manifest.sources || []).filter((source) => source.status !== "ok")
  );
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell ?? "").replace(/\|/g, "\\|")).join(" | ")} |`),
  ].join("\n");
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

async function writeReport(args, rows, failures, retryNotes) {
  const totalBytes = rows.reduce((sum, row) => sum + Number(row.file_size || 0), 0);
  const instagramRowsOnly = rows.filter((row) => row.platform === "instagram");
  const linkedinRowsOnly = rows.filter((row) => row.platform === "linkedin");
  const duplicateGroups = groupBy(rows, "sha256").filter(([, count]) => count > 1);
  const invalidRows = rows.filter((row) => row.validation_status !== "ok");
  const accountRows = groupBy(rows, "account").map(([account, count]) => [
    account,
    count,
    rows.filter((row) => row.account === account && row.media_type === "image").length,
    rows.filter((row) => row.account === account && row.media_type === "video").length,
  ]);
  const failureRows = failures.map((failure) => [
    failure.account,
    failure.name,
    failure.status,
    String(failure.error || "").slice(0, 180),
  ]);
  const retryRows = retryNotes.map((note) => [
    note.account,
    note.status,
    String(note.evidence || "").slice(0, 180),
    String(note.next_action || "").slice(0, 180),
  ]);

  const report = `# LEAD Media Archive Report

Generated: ${new Date().toISOString()}

## Summary

- Total validated asset rows: ${rows.length}
- Instagram assets: ${instagramRowsOnly.length}
- LinkedIn assets: ${linkedinRowsOnly.length}
- Total raw archive size indexed: ${formatBytes(totalBytes)}
- Duplicate SHA-256 groups: ${duplicateGroups.length}
- Validation failures: ${invalidRows.length}
- Source-level failures/retries: ${failures.length}
- Manual retry notes: ${retryNotes.length}

## Counts By Account

${markdownTable(["Account", "Assets", "Images", "Videos"], accountRows)}

## Source-Level Failures And Retries

${failureRows.length ? markdownTable(["Account", "Name", "Status", "Error"], failureRows) : "No source-level failures recorded."}

## Manual Retry Notes

${retryRows.length ? markdownTable(["Account", "Status", "Evidence", "Next Action"], retryRows) : "No manual retry notes recorded."}

## Inventory Files

- JSON: ${path.join(args.outDir, "lead-media-inventory.json")}
- CSV: ${path.join(args.outDir, "lead-media-inventory.csv")}
- Summary: ${path.join(args.outDir, "lead-media-summary.json")}

## Notes

- Raw media remains under \`.agents/media\` and is intentionally ignored by git.
- Instagram was archived with \`gallery-dl\` and exported cookies.
- LinkedIn known videos were archived with \`yt-dlp\`.
- Public website asset selection, compression, clipping, and naming are deferred.
- Rotate/logout the Instagram session used for cookie export after the archive batch is complete.
`;

  await fs.mkdir(path.dirname(args.report), { recursive: true });
  await fs.writeFile(args.report, report, "utf8");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  await fs.mkdir(args.outDir, { recursive: true });
  const registry = await readJson(args.registry, { sources: [] });
  const rows = [...(await instagramRows(args, registry)), ...(await linkedinRows(args))].sort((a, b) =>
    [a.platform, a.account, a.post_id || "", a.file_name].join("|").localeCompare(
      [b.platform, b.account, b.post_id || "", b.file_name].join("|")
    )
  );
  const failures = await sourceFailures(args);
  const retryNotes = await readJson(args.retryNotes, []);
  const summary = {
    generated_at: new Date().toISOString(),
    total_assets: rows.length,
    total_bytes: rows.reduce((sum, row) => sum + Number(row.file_size || 0), 0),
    by_platform: Object.fromEntries(groupBy(rows, "platform")),
    by_account: Object.fromEntries(groupBy(rows, "account")),
    by_media_type: Object.fromEntries(groupBy(rows, "media_type")),
    validation_failures: rows.filter((row) => row.validation_status !== "ok").length,
    source_failures: failures,
    retry_notes: retryNotes,
  };

  await fs.writeFile(path.join(args.outDir, "lead-media-inventory.json"), `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(args.outDir, "lead-media-inventory.csv"), `${toCsv(rows)}\n`, "utf8");
  await fs.writeFile(path.join(args.outDir, "lead-media-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  await writeReport(args, rows, failures, retryNotes);

  console.log(`[inventory] assets=${rows.length}`);
  console.log(`[inventory] wrote ${path.join(args.outDir, "lead-media-inventory.json")}`);
  console.log(`[inventory] wrote ${args.report}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
