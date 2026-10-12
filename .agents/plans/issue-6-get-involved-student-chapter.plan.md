# Plan: Issue 6 Get Involved Student and Chapter Paths

## Summary

Redesign Get Involved around frictionless student joining and an honest, selective chapter interest path.

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `app/get-involved/page.tsx` | UPDATE | Replace rocket-first page with path chooser and student/chapter content |
| `lib/public-site/content.ts` | UPDATE | Add chapter activation flow and values |

## Tasks

1. Add path chooser at top of page.
2. Build student Join LEAD section with Talent Platform routing.
3. Build chapter path with non-guarantee language.
4. Explain review, orientation invitation if selected, activation sessions, and final approval decision.
5. Frame activation around Mentalidad, Proposito, Excelencia, Impacto.

## Validation

- `npm run build`
- Confirm chapter copy does not imply guaranteed approval

## Acceptance Criteria

- [ ] Get Involved opens with Join LEAD, Submit Chapter Interest, Partner with LEAD.
- [ ] Student path routes to Talent Platform.
- [ ] Chapter path is selective and honest.
- [ ] Activation process and values are clear.
