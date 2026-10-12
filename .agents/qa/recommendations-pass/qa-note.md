# Recommendations Pass QA

Date: 2026-05-11

## Recommendations Applied

- Replaced internal design-process copy with visitor-facing LEAD copy across the cinematic video and 3D sections.
- Marked autoplaying video and decorative 3D canvases as non-semantic media so headings and descriptions carry the accessibility meaning.
- Added reduced media affordances for cinematic videos, including reduced-motion pause behavior, non-focusable video, and disabled picture-in-picture.
- Softened 3D interaction with damping and lower rotation speed so the model moments remain controlled.

## Verification

- `npm run build` passed.
- Production preview checked at `http://127.0.0.1:3003`.
- Captured screenshots:
  - `home-video-recommendations.png`
  - `home-earth-recommendations.png`
  - `get-involved-recommendations-desktop.png`
  - `get-involved-recommendations-mobile.png`
  - `about-recommendations.png`
