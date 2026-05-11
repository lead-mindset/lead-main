# Radiating Hope-Inspired LEAD Design Pass

Date: 2026-05-11
Branch: `codex/lead-public-redesign`

## Inspiration Used

Radiating Hope was used as visual inspiration for:

- Human-first, photo-led hero sections.
- Warm editorial nonprofit pacing.
- Generous section whitespace.
- Soft rounded modules and calmer proof blocks.
- Clear "ways to help / get involved" conversion structure.

The structure, copy, routes, CTAs, and forms remain adapted to LEAD's PRD and goals.

## Vera UI/UX Audit Summary

Risk level after pass: Medium-low.

User testing readiness: Conditional yes.

## Critical Findings Fixed

1. The prior pages were clear but looked too much like a dark SaaS product.
   - Fix: Added full-bleed real LEAD photo heroes and warmer editorial content bands.

2. The public pages lacked enough emotional proof above the fold.
   - Fix: Moved human/community photography into first-viewport hero treatment.

3. Repeated dark cards made later sections feel mechanically similar.
   - Fix: Added editorial card styling, warm bands, and softer hierarchy.

## Major UX Decisions

- Keep one primary CTA above the fold: Join LEAD.
- Keep Partner with us as secondary, visually present but lower weight.
- Preserve LEAD Talent Platform alignment through colors, nav, buttons, forms, and dark identity.
- Borrow Radiating Hope's emotional public-site feel through photography and pacing, not layout copying.
- Maintain chapter selection honesty and partner segmentation from the PRD.

## Remaining Risks

- Mobile hero typography is intentionally large. It fits, but it is emotionally bold rather than compact.
- Some partner logos vary in visual weight because source logo assets differ.
- Standalone lint still reports inherited legacy animation issues outside active redesigned routes.

## Validation

- `npm run build`: passes.
- Fresh screenshots captured under `.agents/qa/radiatinghope-pass/`.
