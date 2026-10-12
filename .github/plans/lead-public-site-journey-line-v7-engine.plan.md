# Plan: Journey Line V7 Shared Engine

Issue: https://github.com/abigailbrionesa/leadmain/issues/35

## Goal

Turn the public-site journey line from a single decorative path into a reusable scroll-linked engine that can support page-specific routes, a subtle completed trail, and one stronger active path.

## Scope

- Refactor `components/public/brand-scroll-trace.tsx`.
- Keep the large line hidden on mobile.
- Preserve reduced-motion behavior.
- Add route support without changing page integrations yet.
- Keep exactly one journey-line component mounted per page.

## Implementation Steps

1. Add route configuration to the component.
2. Render two layers from the same route path:
   - low-opacity completed trail
   - scroll-drawn active path
3. Move all dash, length, and ScrollTrigger behavior into shared logic.
4. Add stable DOM attributes for validation probes.
5. Validate lint, build, and dash-offset changes on scroll.

## Validation

- `npx eslint app/page.tsx app/about-us/page.tsx app/get-involved/page.tsx components/public/brand-scroll-trace.tsx components/public/lead-pathway.tsx`
- `npm run build`
- DOM probe:
  - one `[data-brand-scroll-trace]` per page
  - one trail path and one active path inside it
  - active path dash offset changes after scroll
  - mobile viewport hides the line

## Out Of Scope

- Final route geometry tuning.
- Page-specific route integration.
- Evidence-pack screenshots.
