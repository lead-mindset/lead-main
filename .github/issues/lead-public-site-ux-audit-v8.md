# Issues: LEAD Public Site UX Audit V8

## Issue 1 - Protect Home Hero CTA Readability

Problem:
- Burned-in video captions appear under the Home hero CTA area.
- On mobile this looks like broken overlapping text and reduces trust.

Files:
- `components/public/video-hero.tsx`

Acceptance criteria:
- Hero CTA area has enough navy wash to suppress burned-in captions.
- CTAs remain high contrast.
- Hero media still feels cinematic.
- No new copy is introduced.

Validation:
- Screenshot: Home hero desktop.
- Screenshot: Home hero mobile.
- `npx eslint components/public/video-hero.tsx`
- `npm run build`

## Issue 2 - Prevent Get Involved Hero Object/Copy Collision

Problem:
- On desktop, the rocket/asteroid overlaps the headline and supporting copy.
- The hero becomes visually memorable but less readable.

Files:
- `app/get-involved/page.tsx`
- `components/public/get-involved-rocket-hero.tsx`

Acceptance criteria:
- Desktop headline and paragraph sit in clear negative space.
- Rocket remains visible and expressive.
- Mobile hero remains visually balanced.
- No horizontal overflow is introduced.

Validation:
- Screenshot: Get Involved hero desktop.
- Screenshot: Get Involved hero mobile.
- `npx eslint app/get-involved/page.tsx components/public/get-involved-rocket-hero.tsx`
- `npm run build`

## Issue 3 - Fix Pathway Contrast Without Removing Motion

Problem:
- GSAP fades entire pathway rows with opacity.
- Colored numbers and labels fail contrast while inactive or entering viewport.

Files:
- `components/public/lead-pathway.tsx`
- `app/globals.css`

Acceptance criteria:
- Pathway text and stage numbers remain fully opaque.
- Motion uses position/transform, not text opacity.
- Accessible LEAD-derived tones are used for small colored labels.
- Axe contrast violations are resolved for the pathway.

Validation:
- Screenshot: Home pathway desktop.
- Screenshot: Home pathway mobile.
- Axe check: no pathway color-contrast violations.
- `npx eslint components/public/lead-pathway.tsx`
- `npm run build`

## Issue 4 - Make Horizontal Media Regions Keyboard Accessible

Problem:
- Partner marquee and highlights carousel are scrollable visual regions.
- Axe reports that the scrollable regions do not have keyboard access.

Files:
- `components/public/partner-logo-marquee.tsx`
- `components/public/lead-highlights-carousel.tsx`
- `app/about-us/page.tsx`

Acceptance criteria:
- Scrollable regions can receive keyboard focus.
- Regions have accessible labels.
- Focus state is visible and consistent with LEAD styles.
- Visual layout remains unchanged.

Validation:
- Screenshot: Home partners desktop/mobile.
- Screenshot: Home highlights desktop/mobile.
- Screenshot: About leadership mobile.
- Axe check: no `scrollable-region-focusable` violations for these regions.
- `npx eslint app/about-us/page.tsx components/public/partner-logo-marquee.tsx components/public/lead-highlights-carousel.tsx`
- `npm run build`

## Issue 5 - Fix Impact Counter Semantics

Problem:
- The LEAD numbers section uses `dt` and `dd` elements nested inside extra layout wrappers.
- Axe reports `definition-list` and `dlitem` violations.

Files:
- `components/public/starfield-impact-counters.tsx`

Acceptance criteria:
- Stats remain visually unchanged.
- Label/value pairs remain clear to sighted users and assistive technologies.
- Axe no longer reports definition-list violations.

Validation:
- Screenshot: Home numbers desktop/mobile.
- Axe check: no `definition-list` or `dlitem` violations.
- `npx eslint components/public/starfield-impact-counters.tsx`
- `npm run build`
