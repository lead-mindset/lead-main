const DEFAULTS = {
  cdpPort: Number(process.env.CDP_PORT || 9231),
  target: "all",
  waitMs: Number(process.env.MEDIA_AUTH_WAIT_MS || 5000),
};

const CHECKS = {
  instagram: {
    url: "https://www.instagram.com/lead_americas/",
    expression: `(() => {
      const text = document.body.innerText || "";
      const anchors = [...document.querySelectorAll("a[href]")].map((a) => a.href);
      const postLinks = anchors.filter((href) => /instagram\\.com\\/(p|reel)\\//i.test(href));
      const loginWall = /log in|sign up|iniciar sesi/i.test(text) && postLinks.length === 0;
      const profileVisible = /lead_americas/i.test(text) || postLinks.length > 0;
      return { href: location.href, title: document.title, loginWall, profileVisible, postLinks: postLinks.length, textPreview: text.slice(0, 300) };
    })()`,
  },
  linkedin: {
    url: "https://www.linkedin.com/company/leadmindsetorg/posts/?feedView=all",
    expression: `(() => {
      const text = document.body.innerText || "";
      const anchors = [...document.querySelectorAll("a[href]")].map((a) => a.href);
      const postLinks = anchors.filter((href) => /linkedin\\.com\\/(posts|feed\\/update)\\//i.test(href));
      const loginWall = /join linkedin|sign in|login|iniciar sesi/i.test(text) && postLinks.length === 0;
      const companyVisible = /LEAD/i.test(text) && /followers|seguidores|non-profit|organization|organizaciones/i.test(text);
      return { href: location.href, title: document.title, loginWall, companyVisible, postLinks: postLinks.length, textPreview: text.slice(0, 300) };
    })()`,
  },
};

function usage() {
  return `Usage:
  node tools/media/check-media-auth.js [options]

Options:
  --target <all|instagram|linkedin>  Auth surface to check. Default: all
  --cdp-port <n>                     Remote debugging port. Default: 9231
  --wait-ms <n>                      Page settle wait. Default: 5000
`;
}

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--target") args.target = argv[++i];
    else if (arg === "--cdp-port") args.cdpPort = Number(argv[++i]);
    else if (arg === "--wait-ms") args.waitMs = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!["all", ...Object.keys(CHECKS)].includes(args.target)) {
    throw new Error(`Unknown target: ${args.target}`);
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

    ws.onopen = () => {
      resolve({
        send(method, params = {}) {
          const msgId = ++id;
          ws.send(JSON.stringify({ id: msgId, method, params }));
          return new Promise((res, rej) => pending.set(msgId, { res, rej, method }));
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
      if (!msg.id || !pending.has(msg.id)) return;
      const item = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) item.rej(new Error(`${item.method}: ${msg.error.message}`));
      else item.res(msg.result || {});
    };
  });
}

async function createTarget(port, url) {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT",
  });
  if (!res.ok) {
    throw new Error(
      `Could not connect to browser CDP port ${port}. Run: npm run media:auth-browser`
    );
  }
  return res.json();
}

async function checkOne(args, name) {
  const check = CHECKS[name];
  const target = await createTarget(args.cdpPort, check.url);
  const client = await connect(target.webSocketDebuggerUrl);
  try {
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await delay(args.waitMs);
    const result = await client.send("Runtime.evaluate", {
      expression: check.expression,
      awaitPromise: true,
      returnByValue: true,
    });
    const value = result.result?.value || {};
    const authenticated =
      name === "instagram"
        ? value.profileVisible && !value.loginWall
        : value.companyVisible && !value.loginWall;
    console.log(
      JSON.stringify(
        {
          platform: name,
          authenticated,
          href: value.href,
          title: value.title,
          login_wall: Boolean(value.loginWall),
          visible_post_links: value.postLinks || 0,
        },
        null,
        2
      )
    );
    return authenticated;
  } finally {
    client.close();
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  const targets = args.target === "all" ? Object.keys(CHECKS) : [args.target];
  const results = [];
  for (const target of targets) {
    results.push(await checkOne(args, target));
  }
  const ok = results.every(Boolean);
  console.log(`[auth-check] ${ok ? "ready" : "needs-login"}`);
  process.exitCode = ok ? 0 : 2;
}

main().catch((error) => {
  console.error(`[auth-check] ${error.message}`);
  process.exit(1);
});
