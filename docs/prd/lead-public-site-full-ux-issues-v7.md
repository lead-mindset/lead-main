# LEAD Public Site UX Issues V7

Source PRD: `docs/prd/lead-public-site-full-ux-remediation-v7.md`
Source audit: `docs/qa/lead-public-site-full-ux-audit-2026-05-28.md`

## Issue 1: Rebuild the shared final CTA into a confident action hub

Priority: P1
GitHub: https://github.com/abigailbrionesa/leadmain/issues/38

Affected:
- `components/public/public-route-chooser.tsx`
- Home, About, Get Involved final CTA sections

Problem:
The shared CTA looks dim and partially disabled, especially on mobile. It is the final conversion moment but does not feel as confident as the hero/pathway/program sections.

Plan:
- Keep one shared component.
- Increase contrast, spacing, and active affordance.
- Add fixed-nav-safe scroll margin.
- Make each path read as an active choice.

Validation:
- Desktop and mobile screenshots for final CTA on all pages.
- Keyboard focus remains visible.
- `npm run build` passes.

## Issue 2: Tighten Get Involved journey sections

Priority: P1
GitHub: https://github.com/abigailbrionesa/leadmain/issues/39

Affected:
- `app/get-involved/page.tsx`

Problem:
The role, chapter, and partner sections are structurally correct but still feel heavier than the user decision. Chapter values read like internal criteria, and partner trust media is less visible on mobile.

Plan:
- Keep role cards compact.
- Convert chapter values from bulky cards to a concise trust checklist.
- Improve partner section balance and mobile media presence.
- Keep copy concise and user-facing.

Validation:
- Desktop/mobile screenshots of roles, chapters, and partners.
- No horizontal overflow.
- CTA buttons remain reachable.

## Issue 3: Polish modal forms and close controls

Priority: P1
GitHub: https://github.com/abigailbrionesa/leadmain/issues/40

Affected:
- `components/public/chapter-launch-section.tsx`
- `app/get-involved/page.tsx`
- `components/public/interest-form.tsx`

Problem:
Forms are high-friction moments. The home chapter dialog lacks the same top close pattern as Get Involved, and the mobile partner dialog title can collide with the close button.

Plan:
- Add consistent top close action to home chapter modal.
- Reserve header space near close buttons.
- Use sticky submit/status for long forms consistently.
- Keep status/error copy visible and compact.

Validation:
- Modal screenshots on desktop and mobile.
- Keyboard Escape and close button work.
- Required-field validation remains native and readable.

## Issue 4: Improve footer touch targets and secondary accessibility polish

Priority: P2
GitHub: https://github.com/abigailbrionesa/leadmain/issues/41

Affected:
- `components/global/footer.tsx`
- `components/global/navigation/MobMenu.tsx`

Problem:
Footer links are readable but too small as comfortable touch targets. Mobile nav is usable, but it can be improved as a clearer overlay.

Plan:
- Add vertical padding to footer links.
- Preserve focus-visible rings.
- Add Escape-to-close for mobile menu.
- Keep visual style aligned with the LEAD system.

Validation:
- Mobile keyboard/touch audit.
- Mobile menu screenshot.
- `npm run build` passes.
