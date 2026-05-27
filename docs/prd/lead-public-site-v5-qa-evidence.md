# LEAD Public Site V5 QA Evidence

Date: 2026-05-27
Branch: `codex/lead-public-redesign`
Issue: #33, V5 final QA evidence pack

## Validation Commands

- `npm run lint`: passed
- `npm run build`: passed
- Production QA server: `http://localhost:3017`
- Browser runtime/log errors during screenshot pass: `0`

## Visual Evidence

Generated local evidence under:

- `.agents/qa/v5-final-evidence/desktop-contact-sheet.png`
- `.agents/qa/v5-final-evidence/mobile-tablet-contact-sheet.png`
- `.agents/qa/v5-final-evidence/qa-results.json`

Screens covered:

- Home: hero, impact counters, regional earth, pathway, programs, chapter section
- About: hero, values, leadership
- Get Involved: hero, role cards, partner selector
- Interactions: mobile menu, chapter modal, partner modal
- Viewports: desktop `1440x1050`, mobile `390x844`, tablet `820x1180`

## QA Notes

- Home now opens on real LEAD video moments instead of a logo-only frame, with a stronger scrim for mobile readability.
- Programs carousel also previews real event footage before playback, avoiding the stale logo frame.
- Public pages use the shared LEAD public CTA surface and platform-aligned button/tailwind tokens.
- Get Involved role selection, partner selector, and modals were validated in desktop and mobile viewport screenshots.
- No browser console/runtime errors were captured during the final screenshot pass.

## Residual Watchlist

- Real production video assets should eventually replace any caption-burned footage if LEAD wants a fully premium, no-subtitle hero background.
- Partner logos and leadership images should be swapped with final approved assets before launch.
