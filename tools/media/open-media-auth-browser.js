/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const DEFAULTS = {
  cdpPort: Number(process.env.CDP_PORT || 9231),
  profileDir: path.join(process.cwd(), ".agents", "media", "browser-profile"),
  target: "all",
  browser: process.env.MEDIA_BROWSER || "edge",
};

const TARGETS = {
  instagram: ["https://www.instagram.com/lead_americas/"],
  linkedin: ["https://www.linkedin.com/company/leadmindsetorg/posts/?feedView=all"],
  all: [
    "https://www.instagram.com/lead_americas/",
    "https://www.linkedin.com/company/leadmindsetorg/posts/?feedView=all",
  ],
};

function usage() {
  return `Usage:
  node tools/media/open-media-auth-browser.js [options]

Options:
  --target <all|instagram|linkedin>  Pages to open. Default: all
  --browser <edge|chrome>            Browser to open. Default: edge
  --cdp-port <n>                     Remote debugging port. Default: 9231
  --profile-dir <path>               Browser profile directory. Default: .agents/media/browser-profile
`;
}

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--target") args.target = argv[++i];
    else if (arg === "--browser") args.browser = argv[++i];
    else if (arg === "--cdp-port") args.cdpPort = Number(argv[++i]);
    else if (arg === "--profile-dir") args.profileDir = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!TARGETS[args.target]) throw new Error(`Unknown target: ${args.target}`);
  if (!["chrome", "edge"].includes(args.browser)) {
    throw new Error(`Unknown browser: ${args.browser}`);
  }
  return args;
}

function browserCandidates(browser) {
  const chrome = [
    process.env.CHROME_PATH || process.env.BROWSER_PATH,
    path.join(process.env.ProgramFiles || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env["ProgramFiles(x86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env.LocalAppData || "", "Google", "Chrome", "Application", "chrome.exe"),
  ];
  const edge = [
    process.env.EDGE_PATH || process.env.BROWSER_PATH,
    path.join(process.env.ProgramFiles || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env.LocalAppData || "", "Microsoft", "Edge", "Application", "msedge.exe"),
  ];
  return (browser === "edge" ? edge : chrome).filter(Boolean);
}

function findBrowser(browser) {
  for (const candidate of browserCandidates(browser)) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `Could not find ${browser}. Set ${browser === "edge" ? "EDGE_PATH" : "CHROME_PATH"} to the browser executable.`
  );
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  fs.mkdirSync(args.profileDir, { recursive: true });
  const browser = findBrowser(args.browser);
  const urls = TARGETS[args.target];
  const child = spawn(
    browser,
    [
      `--remote-debugging-port=${args.cdpPort}`,
      `--user-data-dir=${args.profileDir}`,
      "--no-first-run",
      "--new-window",
      ...urls,
    ],
    {
      detached: true,
      stdio: "ignore",
      windowsHide: false,
    }
  );
  child.unref();

  console.log(`[auth-browser] opened ${path.basename(browser)} on CDP port ${args.cdpPort}`);
  console.log(`[auth-browser] profile: ${args.profileDir}`);
  console.log("[auth-browser] log in manually if the pages ask, then run: npm run media:auth-check");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
