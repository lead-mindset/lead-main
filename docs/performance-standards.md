# Performance standards - LEAD public site

Budgets are enforced by `node scripts/check-media-budget.mjs` (fails the build/PR if exceeded).

## Media budgets

| asset | budget | notes |
|---|---|---|
| image (webp/jpg/png/avif) | **≤ 200 KB** | webp preferred |
| background / hero video | **≤ 1.5 MB**, ≤ ~20 s | h264 mp4, **no audio**, 720p max, `+faststart` |
| autoplay video | max **one per page** | `muted playsInline loop` + `poster`, `preload="metadata"` |

## Rules

- Use `next/image` with explicit `width`/`height` (or `fill` + `sizes`). Lazy by default; `priority`/`eager` **only** for the LCP element.
- Never commit unreferenced files under `public/` - the check flags dead weight.
- Fonts go through `next/font`.
- No new runtime dependency without review (it ships to every visitor).

## Encoding recipes

```bash
# video -> 720p, no audio, streamable
ffmpeg -y -i in.mp4 -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -crf 30 -preset veryfast -pix_fmt yuv420p \
  -movflags +faststart -an out.mp4

# image -> webp, capped at 1600px
magick in.png -resize "1600x1600>" -quality 80 out.webp
```

## Why this exists

The biggest regressions came from: a 4.5 MB 1080p autoplay hero, eager 4 MB of PNG team photos,
and multi-MB program videos. The check + budgets keep those from coming back.
