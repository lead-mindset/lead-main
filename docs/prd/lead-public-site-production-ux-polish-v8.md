# LEAD Public Site Production UX Polish V8

Date: 2026-05-29
Audit evidence: `.agents/audit/production-ux-final-2026-05-29`

## Goal

Bring the public LEAD website to a production-ready level of trust, polish, and usability across Home, About, and Get Involved. The site should feel unified with the LEAD design system: navy base, LEAD accent gradients used only for meaningful emphasis, real LEAD media, deliberate motion, and clear paths for students, chapter builders, partners, and community organizations.

## Product Standard

- The first-time user should know what LEAD is, why it matters, and what to do next without reading repeated explanations.
- Interactive sections should transition smoothly when users click buttons, tabs, carousels, or modal triggers.
- Important conversion moments should never look dim, disabled, cropped, or visually unresolved.
- Motion should feel intentional and controlled: fade, lift, and settle; no jarring content swaps.
- Copy should be grounded in LEAD's real mission: students, STEM, leadership, access, chapters, programs, mentorship, partners, and community.
- Gradient text should emphasize only the strongest words, not decorative filler.

## Audit Findings

1. About team avatars can render as empty circles. The current `next/image` fill setup requests very large optimized assets for tiny avatars, so the team section can look broken even after waiting.
2. Program carousel and partner selector state changes are functional, but the content switches too abruptly for a premium experience.
3. The shared final CTA can look dim or disabled during reveal on desktop because each link is animated as a hidden card inside a reveal wrapper.
4. Modal open and close motion is too fast and can feel like a snap instead of a seamless continuation of the page.
5. Header/mobile touch targets are usable but not generous enough for production mobile UX.
6. Get Involved copy still repeats "role/path" language after the redundant role-picker was removed.

## Success Criteria

- Team avatars visibly load on desktop and mobile within the first screenshot pass.
- Program carousel and partner tabs animate content changes without height jumps or harsh flashes.
- Shared CTA cards are visible immediately when the section enters the viewport and feel clickable.
- Modal transitions use the LEAD motion rhythm and keep close controls clear.
- Mobile menu and header actions meet comfortable touch target sizing.
- `npm run build` and targeted eslint pass.
- Playwright screenshots show no horizontal overflow, no critical console errors, and no broken visual states.
