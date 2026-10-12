# Plan: Issue 9 Responsive Accessibility and Visual QA

## Summary

Run desktop/mobile visual QA, form checks, reduced-motion checks, and build/lint verification. Document inherited lint failures separately from redesign regressions.

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `.agents/qa/lead-public-redesign-qa.md` | CREATE | QA evidence and residual risk |

## Tasks

1. Capture desktop/mobile screenshots for `/`, `/about-us`, `/get-involved`.
2. Check mobile nav, forms, keyboard focus, reduced motion, text overflow.
3. Run build and lint.
4. Document results and known follow-up scope.

## Validation

- `npm run build`
- `npm run lint`
- Visual screenshots

## Acceptance Criteria

- [ ] QA evidence covers all three routes.
- [ ] Remaining failures are fixed or documented.
