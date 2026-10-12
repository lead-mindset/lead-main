# Plan: LEAD Public Site Section QA V6

## Status

Complete.

## Context

This plan follows the 2026-05-27 section-by-section visual audit. It focuses on the four highest-impact issues that currently make the site feel less polished or less consistent with the LEAD design system.

## Steps

1. Document QA evidence and convert it into PRD/issues.
2. Fix impact counter animation readability.
3. Fix mobile highlight carousel clipping.
4. Integrate the partner marquee into the navy/purple system.
5. Improve About Growth Standards contrast and Leadership card media framing.
6. Improve the default Programs media frame.
7. Validate with lint, build, desktop screenshots, and mobile screenshots.
8. Commit in clear, specific chunks.

## Implementation Notes

- Do not add more public-site copy unless it directly reduces confusion.
- Do not introduce new colors outside the existing LEAD palette.
- Prefer reusable system classes over one-off visual overrides.
- Keep motion meaningful and constrained.

## Validation Checklist

- [x] `npm run lint`
- [x] `npm run build`
- [x] Home desktop screenshots
- [x] Home mobile screenshots
- [x] About desktop screenshots
- [x] About mobile screenshots
- [x] Get Involved desktop screenshots
- [x] Get Involved mobile screenshots
- [x] No horizontal overflow
- [x] No missing image alt text
- [x] No console errors in the earlier full QA pass; final pass kept structural checks green
