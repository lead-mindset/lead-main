# LEAD Public Site Production UX Issues V8

Source PRD: `docs/prd/lead-public-site-production-ux-polish-v8.md`
Source audit: `.agents/audit/production-ux-final-2026-05-29`

## Issue 1: Restore trust in the About team section

Priority: P0

Affected:
- `app/about-us/page.tsx`

Problem:
The team section can show empty circular frames instead of real headshots. This makes the page feel broken at a high-trust moment.

Plan:
- Replace fill-based tiny avatar images with explicit image dimensions.
- Bypass unnecessary optimization for already-local team portraits.
- Preserve circular framing, gradient ring, and responsive layout.

Validation:
- Desktop and mobile screenshots of the team section show visible portraits.
- No image request failures.

## Issue 2: Make interactive content swaps feel seamless

Priority: P1

Affected:
- `components/public/programs-video-carousel.tsx`
- `components/public/partner-path-selector.tsx`

Problem:
Program and partner content changes are correct but visually abrupt. Premium UX needs state changes to feel continuous.

Plan:
- Add content-level enter transitions for program media/copy and partner tab panels.
- Keep panel heights stable to avoid layout jump.
- Preserve keyboard access and tab semantics.

Validation:
- Click next/previous program and partner tabs.
- Screenshots at 200ms and after settle show smooth, readable states.

## Issue 3: Fix final CTA visibility and perceived clickability

Priority: P1

Affected:
- `components/public/public-route-chooser.tsx`

Problem:
The shared route chooser can look dim or disabled on desktop while reveal animation is pending. It is a final conversion moment and must be immediately legible.

Plan:
- Do not hide final CTA links behind card reveal animation.
- Improve hover/focus/active motion without changing the LEAD visual system.
- Tighten the default copy so it is useful but not redundant.

Validation:
- Final CTA screenshots on Home, About, and Get Involved are legible on desktop and mobile.
- Keyboard focus remains visible.

## Issue 4: Smooth modal and button motion across the site

Priority: P1

Affected:
- `components/ui/alert-dialog.tsx`
- `components/ui/button.tsx`

Problem:
Modals and buttons feel more functional than polished. Some transitions are short and color-only, so clicks can feel harsh.

Plan:
- Use one LEAD motion curve for buttons, active press, and focus states.
- Lengthen modal open/close timing slightly and add small transform motion.
- Keep reduced-motion behavior intact.

Validation:
- Modal screenshots show no cut-off content.
- Buttons remain accessible and do not shift layout.

## Issue 5: Improve mobile/header touch confidence and reduce redundant Get Involved copy

Priority: P2

Affected:
- `components/global/navigation/NavBar.tsx`
- `components/global/navigation/MobMenu.tsx`
- `app/get-involved/page.tsx`

Problem:
The mobile menu trigger and compact header actions are slightly small for comfortable touch. Get Involved still repeats role/path guidance after the redundant chooser was removed.

Plan:
- Increase header touch targets without making the nav feel heavy.
- Make mobile menu motion feel more deliberate.
- Tighten Get Involved hero copy and helper pill.

Validation:
- Mobile screenshot confirms menu target is comfortable.
- Get Involved top copy is concise and non-redundant.
