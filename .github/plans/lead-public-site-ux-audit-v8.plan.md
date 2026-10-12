# Plan: LEAD Public Site UX Audit V8

## Status

Implemented and validated.

## Context

This plan follows the 2026-05-28 UX/UI, accessibility, and browser QA audit. It focuses on the five highest-impact issues affecting first-time user trust, readability, and accessibility.

## Steps

1. Create PRD and issue list from audit findings.
2. Fix Home hero CTA readability by suppressing burned-in video captions near the CTA zone.
3. Fix Get Involved desktop hero object/copy collision.
4. Fix Student Pathway contrast while preserving motion.
5. Make horizontal partner/highlight/leadership regions keyboard accessible.
6. Fix impact counter semantics surfaced by the post-fix axe pass.
7. Validate with lint, build, axe checks, and desktop/mobile screenshots.
8. Commit in clear, specific chunks.

## Implementation Notes

- Do not change approved public-site structure.
- Keep LEAD colors and cinematic media direction.
- Prefer CSS/layout refinements over new components.
- Do not add more copy unless it directly reduces confusion.
- One commit per issue.

## Validation Checklist

- [x] PRD created.
- [x] Issue list created.
- [x] Home hero desktop/mobile screenshots.
- [x] Get Involved hero desktop/mobile screenshots.
- [x] Home pathway desktop/mobile screenshots.
- [x] Home partners/highlights desktop/mobile screenshots.
- [x] Axe contrast issues resolved.
- [x] Axe scrollable-region issues resolved.
- [x] Axe definition-list issues resolved.
- [x] `npx eslint` passes for touched files.
- [x] `npm run build` passes.

## Validation Evidence

- Full-page axe/overflow pass: `.agents/audit/ux-2026-05-28-ship2/audit-data.json`
- Final hero overlay pass: `.agents/audit/ux-2026-05-28-final-hero2/audit-data.json`
- Supplemental About screenshots: `.agents/audit/ux-2026-05-28-about-supplement/screenshots`
- Supplemental Get Involved screenshots: `.agents/audit/ux-2026-05-28-section-supplement/screenshots`
