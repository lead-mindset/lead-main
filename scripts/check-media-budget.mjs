#!/usr/bin/env node
/**
 * Media budget gate for the LEAD public site.
 *
 * Fails (exit 1) when a tracked asset in /public exceeds the budget, so heavy
 * media can't silently ship again. Also lists assets that no source file
 * references (dead weight).
 *
 * Run: node scripts/check-media-budget.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);

const IMAGE_BUDGET = 200 * 1024; // 200 KB
const VIDEO_BUDGET = 1.5 * 1024 * 1024; // 1.5 MB

// assets that are legitimately referenced by crawlers/config, not source
const ALLOW_UNREFERENCED = new Set([
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.json",
  "og.jpg",
  "leadl2.svg",
]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function collectSource() {
  const dirs = ["app", "components", "lib"];
  let text = "";
  for (const d of dirs) {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) continue;
    for (const f of walk(abs)) {
      if (/\.(tsx?|css|mdx?)$/.test(f)) text += fs.readFileSync(f, "utf8");
    }
  }
  return text;
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

const files = walk(PUBLIC_DIR);
const source = collectSource();

const violations = [];
const unreferenced = [];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const size = fs.statSync(file).size;
  const rel = "/" + path.relative(PUBLIC_DIR, file);
  const referenced = ALLOW_UNREFERENCED.has(path.basename(file)) || source.includes(path.basename(file));

  // dead weight is warned, not budget-failed (it never reaches a visitor)
  if (!referenced) {
    unreferenced.push(rel);
    continue;
  }

  if (IMAGE_EXT.has(ext) && size > IMAGE_BUDGET) {
    violations.push(`image ${kb(size)} > 200KB  ${rel}`);
  }
  if (VIDEO_EXT.has(ext) && size > VIDEO_BUDGET) {
    violations.push(`video ${kb(size)} > 1.5MB  ${rel}`);
  }
}

if (unreferenced.length) {
  console.log(`\n⚠️  ${unreferenced.length} unreferenced asset(s) under public/ (dead weight):`);
  for (const u of unreferenced) console.log(`   ${u}`);
}

if (violations.length) {
  console.log(`\n❌ ${violations.length} asset(s) over budget:`);
  for (const v of violations) console.log(`   ${v}`);
  console.log("\nEncode: video → 720p crf 30, no audio, +faststart; image → webp q80, ≤1600px.\n");
  process.exit(1);
}

console.log(`\n✅ media budget OK (${files.length} assets scanned)`);
