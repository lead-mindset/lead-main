# Video and Controlled 3D Motion QA

Date: 2026-05-11

## Scope

- Added Apple-style cinematic video panels to the public home, about, and get-involved flows.
- Added controlled Three.js model stages for the home ecosystem and get-involved chapter launch moments.
- Kept GSAP motion scoped to subtle scroll-linked rotation and ambient floating, with reduced-motion handling.

## Verification

- `npm run build` passed.
- Production preview checked at `http://127.0.0.1:3003`.
- Captured targeted screenshots:
  - `home-video-section-final.png`
  - `home-earth-section-final.png`
  - `get-involved-video-rocket-final.png`
  - `get-involved-video-rocket-mobile-final.png`

## Notes

- Full-page screenshots are not reliable for these pages because scroll reveal animations intentionally hide sections until they enter the viewport.
- The 3D canvases rendered nonblank in desktop and mobile screenshots. Automated canvas pixel sampling was not added because Playwright is not installed as a local repo dependency; screenshots were captured through the Playwright CLI.
