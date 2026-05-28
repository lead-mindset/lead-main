import argparse
import pickle
from pathlib import Path


REQUIRED_COOKIE_NAMES = {"csrftoken", "ds_user_id", "sessionid"}


def parse_netscape_cookies(cookie_file: Path) -> dict[str, str]:
    cookies: dict[str, str] = {}
    for raw_line in cookie_file.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#HttpOnly_"):
            line = line.removeprefix("#HttpOnly_")
        if not line or line.startswith("#"):
            continue

        parts = line.split("\t")
        if len(parts) < 7:
            continue
        domain, _include_subdomains, _path, _secure, _expires, name, value = parts[:7]
        if "instagram.com" not in domain.lower():
            continue
        cookies[name] = value
    return cookies


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Convert an Instagram Netscape cookies.txt export into an Instaloader session pickle."
    )
    parser.add_argument("--cookies", required=True, type=Path, help="Path to cookies.txt")
    parser.add_argument("--username", required=True, help="Instagram username that owns the session")
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(".agents/media/secrets/instaloader-session"),
        help="Output Instaloader session file",
    )
    args = parser.parse_args()

    cookies = parse_netscape_cookies(args.cookies)
    missing = sorted(REQUIRED_COOKIE_NAMES - set(cookies))
    if missing:
        print(f"Missing required Instagram cookies: {', '.join(missing)}")
        print("Export cookies from a browser that is already logged into instagram.com.")
        return 2

    args.out.parent.mkdir(parents=True, exist_ok=True)
    with args.out.open("wb") as handle:
        pickle.dump(cookies, handle)

    print(f"Wrote Instaloader session for {args.username}: {args.out}")
    print(f"Next test: instaloader --login {args.username} --sessionfile \"{args.out}\" --count 1 lead_americas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
