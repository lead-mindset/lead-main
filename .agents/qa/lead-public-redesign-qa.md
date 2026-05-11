# LEAD Public Redesign QA

Date: 2026-05-11
Branch: `codex/lead-public-redesign`

## Routes Reviewed

- `/`
- `/about-us`
- `/get-involved`

## Screenshot Evidence

Captured desktop and mobile screenshots under:

- `.agents/qa/screenshots/home-desktop.png`
- `.agents/qa/screenshots/home-pixel.png`
- `.agents/qa/screenshots/about-us-desktop.png`
- `.agents/qa/screenshots/about-us-pixel.png`
- `.agents/qa/screenshots/get-involved-desktop.png`
- `.agents/qa/screenshots/get-involved-pixel.png`

The first raw Chrome mobile screenshots behaved like narrow crops, so Pixel 5 Playwright device emulation was used for mobile review.

## Checks

- Desktop pages render with shared LEAD navigation, footer, dark Talent Platform-aligned surfaces, and restrained public visuals.
- Mobile pages render without the earlier text clipping after the shared container/min-width fix.
- Mobile navigation exposes the same major paths and keeps Join LEAD available inside the drawer.
- Homepage contains approved headline, proof stats, ally logos, audience routing, ecosystem model, pillars, programs, impact highlights, and final paths.
- About page contains why LEAD exists, mission, vision, Mentalidad/Proposito/Excelencia/Impacto, ecosystem positioning, curated leadership, and final CTAs.
- Get Involved contains student path, selective chapter interest process, non-guarantee language, partner segmentation, and progressive forms.
- Chapter interest and partnership API submissions validate structured intent payloads.
- Invalid API submissions return `400` with missing required fields.
- Reduced-motion content remains visible because GSAP reveal sets static visible state for reduced-motion users.
- Heavy old scroll locking, scroll hijacking, blank spacer sequences, and page-driving pinned motion were removed from the active routes.

## Validation Commands

- `npm run build`: passes.
- `npm run lint`: still fails on inherited inactive animation files under `components/scene/*` and `components/scroll/*`.

## Remaining Lint Scope

The remaining lint errors are not from the redesigned active pages. They are in legacy animation components that are no longer imported by the rebuilt routes:

- `components/scene/camera-animation.tsx`
- `components/scene/camera-animation3.tsx`
- `components/scene/galaxy.tsx`
- `components/scroll/action-lines.tsx`
- `components/scroll/canvas-reveal.tsx`

These should be handled in a separate cleanup issue if the legacy components will stay in the repo.

## Copy Alignment

- Mission and vision match the LEAD source docs.
- Public copy uses English-first language with Spanish-authentic operating terms.
- Talent Platform is positioned as the operational layer, not the whole LEAD identity.
- Chapter copy does not imply guaranteed selection, orientation, activation, or approval.
- Partner paths preserve Company, Professional or Mentor, and Community Organization.
- Impact proof uses real highlights from LEAD source docs instead of generic testimonials.
