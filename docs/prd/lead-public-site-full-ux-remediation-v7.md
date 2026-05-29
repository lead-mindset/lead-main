# PRD: LEAD Public Site Full UX Remediation V7

## Goal

Make the public LEAD website feel cohesive, trustworthy, and easy to act on across Home, About, and Get Involved by removing remaining friction in the action paths, improving mobile confidence, and tightening repeated components.

## Users

- Students discovering LEAD for the first time.
- Chapter builders deciding whether to submit interest.
- Companies, mentors, professionals, and community organizations exploring partnership.
- Returning LEAD community members looking for a clear path.
- Distracted mobile visitors scanning quickly.

## Problem

The site has strong identity and media, but the final decision moments still feel less polished than the main storytelling sections. Users can understand LEAD, but they may hesitate when the page asks them to act because repeated CTA cards are dim, role content repeats, and forms feel slightly less refined on mobile.

## Success Criteria

- Users can identify the next action in under 5 seconds on each page.
- Final CTA cards look active, high-contrast, and tappable on mobile.
- Get Involved routes students, chapter builders, and partners without repeated heavy card blocks.
- Chapter interest remains concise and clear that approval is not guaranteed.
- Partner path feels human and credible, not just form-like.
- Dialog forms are mobile-safe, keyboard-safe, and visually consistent.
- Footer links meet comfortable touch target expectations.
- `npm run build` passes.
- Desktop and mobile screenshots verify every changed section.

## Scope

### In Scope

1. Shared final CTA redesign.
2. Get Involved role/chapter/partner section tightening.
3. Modal form polish and close control consistency.
4. Footer/touch target accessibility polish.
5. Documentation of findings and issue mapping.

### Out of Scope

- New brand palette.
- Replacing the hero video or 3D models.
- Rebuilding the full content model.
- Adding new backend form routing.
- Re-scraping media.

## Requirements

### R1: Shared CTA Action Hub

The shared final CTA must:

- Use clear contrast and active states.
- Avoid disabled-looking opacity.
- Present the four paths as confident user choices.
- Preserve LEAD's navy, primary purple, magenta/red accent system.
- Work across all three pages without custom per-page fixes.

### R2: Get Involved Journey Tightening

The Get Involved page must:

- Keep the rocket hero as the first impression.
- Keep the role picker small and scannable.
- Make chapter interest concise and less like an internal rubric.
- Keep the "request does not guarantee approval" message.
- Improve partner section balance on mobile and desktop.

### R3: Modal Form Trust

Forms must:

- Include a clear top close action where modal height is large.
- Avoid title overlap with close controls.
- Keep submit/status visible in long forms.
- Use visible labels and required-field messaging.
- Remain keyboard reachable.

### R4: Accessibility Polish

The site must:

- Keep all icon buttons labeled.
- Increase footer link tappable height.
- Preserve visible focus rings.
- Avoid horizontal overflow except intentionally scrollable marquees/carousels.

## Issue Plan

1. Rebuild shared final CTA action hub.
2. Tighten Get Involved role, chapter, and partner journey.
3. Polish modal forms and close controls.
4. Improve footer touch targets and final accessibility details.

## Validation Plan

- `npx eslint` on changed files.
- `npm run build`.
- Playwright screenshots:
  - `/` final CTA desktop/mobile.
  - `/about-us` final CTA desktop/mobile.
  - `/get-involved` roles/chapters/partners/final CTA desktop/mobile.
  - Home chapter modal desktop.
  - Get Involved partner modal mobile.
- DOM checks for target sizes and visible modal header/close controls.
