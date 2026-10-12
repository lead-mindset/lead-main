# LEAD Media Archive Plan

Archive every official LEAD-owned media source we have identified, with raw originals preserved first and production curation deferred. The workflow uses confirmed local tools first: `gallery-dl` for Instagram with exported cookies, `yt-dlp` for LinkedIn videos, and DOM/network capture only when LinkedIn post media cannot be downloaded directly.

## Scope

- In:
  - LEAD main Instagram: `lead_americas`
  - Every chapter Instagram source in `tools/media/lead-media-sources.json`
  - LEAD LinkedIn company page post URLs discovered during this archive pass
  - Videos, images, captions, source URLs, dates where available, metadata JSON, manifests, hashes, dimensions, durations, and retry/failure records
- Out:
  - Stories, highlights, tagged posts, reposts, and mentions for v1
  - Public website asset selection, clipping, compression, cropping, posters, and final `public/media/lead` placement
  - Any non-official source that is not published by a LEAD-owned account

## Source Inventory

- Instagram main account: 1
- Instagram chapter accounts: 15
- LinkedIn company source: 1
- Current known LinkedIn video posts: 4

## Action Items

[ ] Verify archive prerequisites

- Confirm `yt-dlp --version`, `gallery-dl --version`, and `ffprobe -version`.
- Confirm `.agents/media/secrets/instagram-cookies.txt` exists and includes `csrftoken`, `ds_user_id`, and `sessionid` without printing cookie values.
- Remove UTF-8 BOM from cookies file if tools reject it.

[ ] Run Instagram main-account pilot

- Command: `npm run media:instagram -- --source lead_americas --range 1-12`
- Validate downloaded files, `*.json` metadata, `info.json`, and `gallery-dl-downloads.txt`.
- Confirm images/videos are real files, not login/error HTML.

[ ] Archive full LEAD main Instagram

- Command: `npm run media:instagram -- --source lead_americas`
- Save output under `.agents/media/archive/instagram-gallery-dl/lead_americas`.
- Record count, failures, and retry status in the generated manifest.

[ ] Archive every chapter Instagram in controlled batches

- Use the registry in `tools/media/lead-media-sources.json`.
- Start with `npm run media:instagram -- --kind chapter --limit-sources 2 --range 1` as a session-health smoke test.
- Then run all chapter sources with `npm run media:instagram -- --kind chapter`.
- If Instagram rate-limits or session checks appear, pause and continue from `gallery-dl-downloads.txt` later.

[ ] Archive known LinkedIn videos

- Command: `npm run media:linkedin`
- Save output under `.agents/media/linkedin-ytdlp`.
- Confirm each `*.mp4` has `ffprobe` validation in `manifest.json`.
- Current confirmed posts: `women-in-stem`, `ai-agents`, `discover-day`, `lead-origin-community`.

[ ] Discover additional LinkedIn company posts

- Collect additional official LEAD company post URLs from `https://www.linkedin.com/company/leadmindsetorg/posts/?feedView=all`.
- Classify each discovered post as video, image-only, multi-image, text-only, or manual-needed.
- Add video post URLs to `tools/media/lead-linkedin-video-posts.json` only after confirming they are official LEAD company posts.

[ ] Download LinkedIn media with fallback order

- First try `yt-dlp` on the feed update URL.
- If `yt-dlp` fails, use logged-in browser DOM/network capture to locate `.mp4`, `.m3u8`, `dms.licdn.com`, or LinkedIn media API URLs.
- Save any DOM/network-captured media with provenance: source post URL, capture timestamp, media URL, tool used, and validation result.

[ ] Build combined archive inventory

- Generate a combined JSON/CSV inventory across Instagram and LinkedIn.
- Required columns: platform, account, account kind, post URL, post ID/shortcode, published date when available, date status, caption/title snippet, local file path, media type, SHA-256, width, height, duration, file size, download tool, status.

[ ] Validate and dedupe raw archive

- Hash every downloaded asset.
- Use `sharp` for images and `ffprobe` for videos.
- Flag duplicates, corrupt files, missing metadata, login/error pages, and posts that need retry.

[ ] Save archive report

- Write a final archive report in `docs/media-intake/` and copy it to the Obsidian LEAD media archive folder.
- Include source counts, downloaded media counts, failures, retries, skipped items, and next decisions for raw archive curation.
- Include a reminder to rotate/logout any Instagram session cookie that was pasted or exported.

## Validation

- `npm run media:instagram -- --source lead_americas --range 1`
- `npm run media:linkedin -- --limit 1`
- `ffprobe` validates every video in the manifests.
- Image metadata validates every sampled Instagram image as a real image file.
- No raw media, cookies, or sessions are committed because `.agents/media/` is ignored.

## Risks

- Instagram cookies may expire or trigger rate limits during full chapter download.
- LinkedIn image-only posts may require DOM/network capture because the confirmed path is video-first.
- Some CDN URLs are signed and temporary; source post URLs and metadata must be saved immediately.
- Raw archives may be large; keep them out of git until curated assets are chosen.
