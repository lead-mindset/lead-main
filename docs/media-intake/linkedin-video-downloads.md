# LinkedIn Video Download Intake

This is the repeatable workflow for downloading LEAD-owned LinkedIn videos for review before adding them to the public site.

## What It Uses

- Public LinkedIn feed update URLs saved in `tools/media/lead-linkedin-video-posts.json`.
- `yt-dlp`'s LinkedIn extractor.
- Local output under `.agents/media/linkedin`, which is intentionally ignored by git.

Do not send LinkedIn cookies, passwords, or private session data to third-party downloaders. Use exported cookies only when a post requires login, and keep them under `.agents/media/secrets`.

## Run It

Run the local downloader:

```powershell
npm run media:linkedin
```

Useful options:

```powershell
npm run media:linkedin -- --limit 1
npm run media:linkedin -- --force
npm run media:linkedin -- --input tools/media/lead-linkedin-video-posts.json --out .agents/media/linkedin-ytdlp
npm run media:linkedin -- --cookies .agents/media/secrets/linkedin-cookies.txt
```

## Output

The script writes:

- `.agents/media/linkedin-ytdlp/<slug>.mp4`
- `.agents/media/linkedin-ytdlp/<slug>.info.json`
- `.agents/media/linkedin-ytdlp/manifest.json`

Each manifest entry includes the original post URL, status, output path, and `ffprobe` metadata when available.

## Notes From First Test

`yt-dlp` successfully downloaded and `ffprobe` validated the four known LEAD LinkedIn video posts on May 27, 2026, without Taplio and without LinkedIn cookies.

Taplio remains available as a fallback command:

```powershell
npm run media:linkedin:taplio
```
