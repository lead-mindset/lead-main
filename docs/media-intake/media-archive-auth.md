# LEAD Media Archive Auth

This repo should not depend on decrypting personal Edge or Chrome cookies from the shell. On current Windows browser builds, those cookies can be locked while the browser is open and may also fail DPAPI decryption from CLI tools.

Use a controlled Edge profile instead. The profile lives under `.agents/media/browser-profile`, which is ignored by git.

## Start The Auth Browser

```powershell
npm run media:auth-browser
```

This opens Instagram and LinkedIn in a visible browser with remote debugging enabled. Log in manually if either page asks.

## Check Auth

```powershell
npm run media:auth-check
```

Expected result:

```text
[auth-check] ready
```

If the result is `[auth-check] needs-login`, keep the browser open, finish login in the visible tabs, and run the check again.

## If Instagram Shows reCAPTCHA

Do not try to bypass Instagram's security check. Use one of these legitimate paths instead:

1. For LEAD-owned accounts, request an Instagram Accounts Center export with media quality set high. This is the most reliable way to get original files without scraping.
2. For professional accounts where LEAD has admin access, use the Instagram Graph API to list account media and download the returned media URLs.
3. For public posts where we already know the post URL, use the URL-based fallback tools for individual posts only. This does not solve full profile discovery.
4. For chapters where LEAD does not have account admin access, ask chapter owners for either an account export, admin/API access, or an official post URL list.

## If Another Browser Or Machine Is Already Logged In

A normal browser window is not automatically usable by the archive tools. Instaloader and gallery-dl need either:

- a browser cookie store they can read, or
- a Netscape `cookies.txt` export, or
- a saved Instaloader session file.

If Instagram refuses login on this machine, export cookies from a different trusted machine/browser where Instagram web is already logged in. Store the export under `.agents/media/secrets/instagram-cookies.txt`.

Use the cookie file directly with gallery-dl:

```powershell
gallery-dl --cookies ".agents/media/secrets/instagram-cookies.txt" --range 1 "https://www.instagram.com/lead_americas/"
```

Convert the same cookie file into an Instaloader session:

```powershell
npm run media:ig-import-cookies -- --cookies ".agents/media/secrets/instagram-cookies.txt" --username YOUR_IG_USERNAME --out ".agents/media/secrets/instaloader-session-YOUR_IG_USERNAME"
```

Then test Instaloader:

```powershell
instaloader --login YOUR_IG_USERNAME --sessionfile ".agents/media/secrets/instaloader-session-YOUR_IG_USERNAME" --count 1 lead_americas
```

Treat `cookies.txt` and Instaloader session files like passwords. Keep them inside `.agents/media/secrets`, never commit them, and delete them when the archive is done.

## Archive Flow

Instagram profile downloads use `gallery-dl` with a logged-in Netscape `cookies.txt` export:

```powershell
npm run media:instagram -- --source lead_americas --range 1
```

The older CDP/SSSInstagram archive command remains available for manual fallback:

```powershell
npm run media:archive -- discover-instagram --source lead_americas
npm run media:archive -- download-instagram --source lead_americas --limit-posts 3
```

LinkedIn company post discovery should use an authenticated Playwright session, LinkedIn's official APIs if LEAD has approved access, or the existing visible-browser workflow. Direct public post URLs can still be sent to Taplio for video fallback:

```powershell
npm run media:linkedin -- --limit 1
```

## Tool Reality Check

- Instaloader is still useful when a valid Instagram session can be created, but `--load-cookies edge` failed on this machine because Edge cookies could not be decrypted from the shell.
- gallery-dl is installed and supports browser-cookie loading, but it has the same Windows cookie-decryption limitation when pointed at Edge.
- yt-dlp is useful for individual Instagram/LinkedIn video URLs and supports browser cookies, but `--cookies-from-browser edge` hit the same DPAPI decryption failure here.
- linkedin-scraper is installed for LinkedIn company posts; it expects a saved authenticated Playwright session rather than raw browser-cookie extraction.
