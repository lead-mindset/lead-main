# LEAD Media Archive Runbook

This runbook saves the working setup for archiving LEAD-owned media from LinkedIn and Instagram.

Raw downloads stay under `.agents/media`, which is ignored by git. Public-site-ready assets should be curated later into `public/media/lead/...`.

## What Is Confirmed

| Platform | Asset type | Confirmed method | Auth needed |
|---|---|---|---|
| LinkedIn | Video posts | `yt-dlp` against LinkedIn feed update URLs | No for the tested LEAD videos |
| LinkedIn | Post metadata for video posts | `yt-dlp --write-info-json` | No for the tested LEAD videos |
| LinkedIn | Video thumbnails | URLs inside the `*.info.json` files | No for the tested LEAD videos |
| LinkedIn | Image-only posts | Not yet fully validated; use logged-in browser/network capture or official API as fallback | Usually yes |
| Instagram | Profile posts, images, reels, videos | `gallery-dl` with exported logged-in `cookies.txt` | Yes |
| Instagram | Single known videos | `yt-dlp` or SSSInstagram fallback | Sometimes no, but cookies are safer |
| Instagram | Instaloader session | Cookie import helper exists, but gallery-dl is the confirmed path here | Yes |

## Required Local Tools

```powershell
yt-dlp --version
gallery-dl --version
ffprobe -version
```

Known working versions from this machine:

- `yt-dlp`: `2026.03.17`
- `gallery-dl`: `1.32.1`
- `ffprobe`: `8.1`

## Secret Files

Keep cookies and session files here:

```text
.agents/media/secrets/
```

Never commit these files. Treat them like passwords.

Instagram cookies must be Netscape `cookies.txt` format and include:

```text
csrftoken
ds_user_id
sessionid
```

Validate cookie names without printing values:

```powershell
Get-Content ".agents\media\secrets\instagram-cookies.txt" |
  ForEach-Object { $_ -replace '^#HttpOnly_', '' } |
  Where-Object { $_ -match 'instagram\.com' -and $_ -notmatch '^#' } |
  ForEach-Object { ($_ -split "`t")[5] } |
  Sort-Object -Unique
```

If a cookies export was written by PowerShell and tools reject it, remove the UTF-8 BOM:

```powershell
$cookiePath = ".agents\media\secrets\instagram-cookies.txt"
$text = [System.IO.File]::ReadAllText((Resolve-Path $cookiePath)).TrimStart([char]0xFEFF)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path $cookiePath), $text, $utf8NoBom)
```

## LinkedIn Videos

Source list:

```text
tools/media/lead-linkedin-video-posts.json
```

Run all known LEAD LinkedIn videos:

```powershell
npm run media:linkedin
```

Useful options:

```powershell
npm run media:linkedin -- --limit 1
npm run media:linkedin -- --force
npm run media:linkedin -- --out ".agents/media/linkedin-ytdlp"
npm run media:linkedin -- --cookies ".agents/media/secrets/linkedin-cookies.txt"
```

Output:

```text
.agents/media/linkedin-ytdlp/<slug>.mp4
.agents/media/linkedin-ytdlp/<slug>.info.json
.agents/media/linkedin-ytdlp/manifest.json
```

Validation is automatic through `ffprobe` and saved in `manifest.json`.

Confirmed on May 27, 2026:

- `women-in-stem`: 20.9s, 720x1280, H.264 + AAC
- `ai-agents`: 99.7s, 1280x720, H.264 + AAC
- `discover-day`: 89.8s, 720x1280, H.264 + AAC
- `lead-origin-community`: 8.3s, 720x1150, H.264 + AAC

Taplio fallback is still available, but should not be first choice:

```powershell
npm run media:linkedin:taplio
```

## LinkedIn Images And Image-Only Posts

For video posts, thumbnails are saved as URLs in the `*.info.json` files. Download them only if they are useful as poster images.

For image-only LinkedIn posts, this setup is not fully validated yet. Use one of these fallback paths:

1. Try `yt-dlp` on the LinkedIn feed update URL.
2. Use a logged-in browser and capture network media URLs from DevTools.
3. Use LinkedIn's official API if LEAD has page admin/API access.

Do not claim image-only LinkedIn archival is complete until a post URL has been tested and saved with metadata.

## Instagram Posts, Images, Reels, Videos

Source list:

```text
tools/media/lead-media-sources.json
```

Confirmed working path:

```powershell
npm run media:instagram -- --source lead_americas --range 1
```

Run all sources from the registry:

```powershell
npm run media:instagram
```

Run only chapters:

```powershell
npm run media:instagram -- --kind chapter
```

Useful options:

```powershell
npm run media:instagram -- --source lead_americas --range 1-12
npm run media:instagram -- --limit-sources 2 --range 1
npm run media:instagram -- --cookies ".agents/media/secrets/instagram-cookies.txt"
npm run media:instagram -- --out ".agents/media/archive/instagram-gallery-dl"
```

Output:

```text
.agents/media/archive/instagram-gallery-dl/<account>/
.agents/media/archive/instagram-gallery-dl/<account>/gallery-dl-downloads.txt
.agents/media/archive/instagram-gallery-dl/manifest.json
```

The wrapper runs `gallery-dl` with:

```text
--cookies
--write-metadata
--write-info-json
--download-archive
--filename "{shortcode}_{num}.{extension}"
```

## Instagram Single Video Fallback

For a known post/reel URL:

```powershell
yt-dlp --cookies ".agents/media/secrets/instagram-cookies.txt" `
  -o ".agents/media/archive/instagram-single/%(id)s.%(ext)s" `
  "https://www.instagram.com/p/DVpQ834DL3_/"
```

If `yt-dlp` fails for a single public video, use the existing SSSInstagram workflow only as a fallback and record that in metadata.

## Instaloader Fallback

The helper can convert a Netscape Instagram cookie export into an Instaloader session:

```powershell
npm run media:ig-import-cookies -- --cookies ".agents/media/secrets/instagram-cookies.txt" --username YOUR_IG_USERNAME --out ".agents/media/secrets/instaloader-session-YOUR_IG_USERNAME"
```

Then:

```powershell
instaloader --login YOUR_IG_USERNAME --sessionfile ".agents/media/secrets/instaloader-session-YOUR_IG_USERNAME" --count 1 lead_americas
```

On this machine, Instaloader hung during the first test, while gallery-dl worked. Use gallery-dl first.

## Operating Rules

- Archive official LEAD accounts only.
- Save every discovered post metadata record even when media fails later.
- Keep raw originals first; optimize/crop/clip later.
- Keep cookies and sessions under `.agents/media/secrets`.
- Use hash/dedupe before moving files into public assets.
- After using a pasted or exported live cookie, rotate/logout the session when the archive batch is complete.
- Do not commit `.agents/media`.
