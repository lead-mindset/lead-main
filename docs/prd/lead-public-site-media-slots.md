# LEAD Public Site Media Slots

Date: 2026-05-27
Branch: `codex/lead-public-redesign`

## Purpose

This file documents the current public-site media placeholders and where final LEAD assets should replace them. The site can keep using placeholders while the design is reviewed, but production should use intentional media in the same slots instead of adding loose duplicate files.

## Canonical Asset Folders

- Partner logos: `public/allies/`
- About and community photos: `public/about-us/`
- Chapter photos: `public/chapters/`
- 3D models: `public/models/`
- Public videos: `public/`

Do not add loose root-level copies of partner logos. The root files `microsoft.svg`, `microsoftmini.png`, `peruviansinstem.jpg`, and `shpe.webp` are ignored because the canonical copies already live in `public/allies/`.

## Active Media Slots

| Slot | Current file | Used by | Final asset needed |
| --- | --- | --- | --- |
| Homepage video hero | `public/video2.mp4` | `app/page.tsx`, `components/public/video-hero.tsx` | A short LEAD hero video with students, chapters, or events. |
| Homepage hero poster | `public/about-us/2.jpg` | `app/page.tsx` | Static poster from the same hero video. |
| About community video | `public/video2.mp4` | `app/about-us/page.tsx` | Community proof video showing real LEAD people and activity. |
| Programs carousel videos | `public/video.mp4`, `public/video2.mp4`, `public/video3.mp4` | `lib/public-site/content.ts` | One short video per program or experience. |
| Program posters | `public/about-us/*.jpg`, `public/chapters/*.jpg` | `lib/public-site/content.ts` | Poster image for each program video. |
| Get Involved rocket | `public/models/rocket.glb` | `components/public/get-involved-rocket-hero.tsx` | Keep unless a lighter optimized rocket model is provided. |
| Regional Earth | `public/models/earthbase.glb` | `components/public/regional-earth-stage.tsx` | Keep unless an optimized LEAD-specific globe model is provided. |
| Partner logos | `public/allies/*` | `lib/public-site/content.ts` | Confirm final logo set and preferred versions. |
| LEAD highlights | `public/about-us/*.jpg`, `public/chapters/*.jpg` | `lib/public-site/content.ts` | Replace with confirmed highlight/event images or videos. |

## Production Rules

- Use one canonical file per asset.
- Prefer compressed MP4/WebM videos with poster images.
- Keep video copy meaningful in nearby text so videos are decorative, not the only source of information.
- Keep partner logos in `public/allies/` and avoid distorted aspect ratios.
- Do not commit generated QA screenshots unless a reviewer explicitly asks for them in the repo.
