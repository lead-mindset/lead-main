# Plan: Angela Feedback UX Clarity

Source PRD: `.github/PRDs/angela-feedback-ux-clarity.prd.md`  
Issue spec: `.github/issues/angela-feedback-ux-clarity.md`

## Issue 1: Clarify Programs vs University Chapters

**Status:** complete

### Plan
- Update shared nav labels so Chapters reads as University Chapters.
- Update footer links to match the distinction.
- Tighten homepage Programs copy to emphasize experiences students join.
- Tighten chapter copy to emphasize university/campus and review.

### Validation
- Search confirms no public "Chapters" nav label remains where "University Chapters" is needed.
- Lint/build after all issues.

## Issue 2: Fix Chapter Interest Form Clarity

**Status:** complete

### Plan
- Replace ambiguous form label with `Who is building this with you?`.
- Add helper text support to reusable field component.
- Keep `teamStatus` payload key stable.
- Update email/plain text label so internal recipients see clearer wording.

### Validation
- Search confirms `Solo or with a team?` is removed.
- Form still posts the same required payload key.

## Issue 3: Fix Chapter Post-Submit and CTA Truth

**Status:** complete

### Plan
- Add intent-aware success copy to the form.
- For chapter success, show one link to Explore LEAD programs.
- Verify hero CTA hrefs come from shared `publicCtas`.
- Search visible CTAs and ensure each has a real link or modal action.

### Validation
- Search key CTA labels and inspect hrefs.
- Browser QA if needed after build.

## Issue 4: Team Alignment Follow-Up Messages

**Status:** complete

### Plan
- Draft Christopher message for onboarding perspective.
- Draft Angela response/validation message.
- Draft Antonny/Luis strategic routing message.
- Keep all messages humble, collaborative, and decision-oriented.

### Validation
- Messages do not imply decisions are final.
- Messages ask specific operational questions.

## Final Validation

**Status:** complete

### Commands
- `pnpm lint`
- `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`
