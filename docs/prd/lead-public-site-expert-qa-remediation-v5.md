# PRD: LEAD Public Site Expert QA Remediation V5

Date: 2026-05-27  
Branch: `codex/lead-public-redesign`  
Repo: `abigailbrionesa/leadmain`

## Summary

This PRD converts the expert UX/UI QA audit into an implementation plan for the LEAD public website. The current site has the right strategic direction, but it is not yet fully cohesive with the LEAD Talent Platform design system and the polish level is uneven across routes.

The goal is to make Home, About, and Get Involved feel like one LEAD ecosystem: creative, student-centered, visually grounded in LEAD's actual work, and low-friction for students, chapter builders, partners, mentors, and community organizations.

This is not another full redesign. It is a remediation pass that fixes the highest-impact audit findings:

- Align public-site tokens, buttons, surfaces, and shared components with LEAD Talent Platform.
- Preserve Home's creative direction while tightening transitions, mobile density, and partner/highlight polish.
- Make About feel credible and alive rather than static, logo-heavy, or institutional.
- Make Get Involved easier to scan and act on, especially on mobile.
- Leave a repeatable validation trail with screenshots, lint/build status, and interaction QA.

## Source Signals

- Expert audit: `.agents/qa/expert-ux-ui-audit/expert-ux-ui-audit.md`
- Visual evidence:
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/home-desktop-audit.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/home-mobile-audit.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/about-desktop-recapture.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/about-mobile-recapture.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/get-involved-desktop-audit.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/get-involved-mobile-audit.png`
  - `.agents/qa/expert-ux-ui-audit/contact-sheets/interaction-recapture.png`
- Existing planning:
  - `docs/prd/lead-public-site-audit-remediation-v4.md`
  - `docs/prd/lead-public-site-creative-motion-v3.md`
  - `docs/prd/lead-public-site-ux-v2.md`
- LEAD Talent Platform design-system reference:
  - `C:\Users\abiga\Downloads\leadtalentplatform\app\[locale]\globals.css`
  - `C:\Users\abiga\Downloads\leadtalentplatform\design-system.json`
  - `C:\Users\abiga\Downloads\leadtalentplatform\components\ui\button.tsx`

## Problem

The public site now has stronger LEAD identity, but the audit found five launch-quality gaps:

1. Design-system drift: `leadmain` uses similar brand colors, but primary/ring/button semantics and some hard-coded surfaces do not fully match the LEAD Talent Platform.
2. Page quality imbalance: Home feels creative and alive; About and Get Involved still contain static, repeated card/text patterns.
3. Mobile density: the site is functional on mobile but several flows are too tall, especially About leadership, Home pathway/highlights, and Get Involved roles/forms.
4. Conversion friction: chapter, partner, and community paths exist, but CTAs and role comparison need tighter consistency and clearer mobile behavior.
5. Validation debt: screenshots and QA exist, but this remediation pass needs a fresh repeatable evidence package after implementation.

## Goals

1. Make the public site and LEAD Talent Platform feel like one connected product ecosystem.
2. Keep Home's creative identity while reducing abrupt transitions and mobile fatigue.
3. Make About prove LEAD with people, values, and ecosystem logic instead of static logo/text blocks.
4. Make Get Involved a zero-friction role-routing page.
5. Standardize CTA language:
   - `Join LEAD`
   - `Submit chapter interest`
   - `Start a partnership conversation`
   - `Collaborate with LEAD`
6. Reduce repeated bland card patterns.
7. Validate desktop, tablet, mobile, navigation, modals, and build health.

## Non-Goals

- Do not add new top-level routes.
- Do not rebuild the LEAD Talent Platform.
- Do not introduce a new color palette.
- Do not remove the creative motion system entirely.
- Do not add more content just to make pages feel fuller.
- Do not implement production backend form submission beyond the existing static/request modal behavior.
- Do not guarantee chapter approval or orientation through the site.

## User Stories

1. As a student, I want the public site and Talent Platform to feel connected, so that I trust I am entering the same LEAD ecosystem.
2. As a student, I want to understand LEAD quickly on mobile, so that I can join without scrolling through too many dense sections.
3. As a chapter builder, I want honest chapter-interest language, so that I understand submission is a request, not approval.
4. As a company, professional, mentor, or community organization, I want to see my path clearly, so that I know whether to partner, mentor, sponsor, host, or collaborate.
5. As a visitor reading About, I want to see real people and proof, so that LEAD feels credible and active.
6. As a returning visitor, I want buttons, forms, cards, surfaces, labels, and final CTAs to look consistent across all pages.
7. As a mobile visitor, I want role choices, carousels, and modals to fit comfortably, so that the site feels polished rather than exhausting.

## Requirements

### Design System

- Align `leadmain` primary/ring/button semantics with the LEAD Talent Platform reference.
- Prefer semantic CSS variables over raw hard-coded hex values for shared public surfaces.
- Add shared public primitives where repeated patterns exist:
  - route chooser/final CTA,
  - section label,
  - soft inverse surface,
  - public route card/action row.
- Keep LEAD navy as the foundation and red/magenta/purple as brand expression.
- Preserve public-site warmth and creativity; do not make the public site feel like an internal dashboard.

### Home

- Keep the video hero, impact counters, regional Earth, pathway, program carousel, chapter section, partner marquee, highlights, and final CTA.
- Improve hero media crop/poster behavior where possible without requiring final production media.
- Smooth the regional-to-pathway transition.
- Make the partner logo band softer and less pasted-on.
- Improve the mobile highlights carousel so it reads as intentional, not awkwardly clipped.
- Use `Submit chapter interest` language where chapter outcome is not guaranteed.

### About

- Replace the static logo-heavy proof moment with a real-media/community proof treatment.
- Keep mission, vision, values, why-it-works, leadership, and final CTA, but improve the rhythm.
- Reframe copy to avoid narrowing LEAD only to Latin America when the broader ecosystem includes students across the Americas and the United States.
- Convert values from a static text grid into a more editorial system.
- Compress leadership on mobile with a horizontal roster pattern.

### Get Involved

- Keep the rocket hero but prevent it from crowding the action path.
- Make role selection faster to compare, especially on mobile.
- Replace logo-only student media with a real student/community/platform visual.
- Convert partner type cards into a clearer segmented/tabs pattern.
- Keep chapter interest concise and honest.
- Add mobile-friendly modal behavior: visible close action and sticky footer where practical.
- Ensure forms remain labeled and keyboard accessible.

### QA and Accessibility

- One H1 per route.
- No horizontal overflow at `390px`, `834px`, or `1440px`.
- Mobile menu opens above content with explicit overlay layering.
- Modals open on desktop and mobile.
- Reduced-motion CSS remains intact.
- `npm run lint` and `npm run build` pass.
- Fresh screenshots are saved for all public routes and critical interactions.

## Issue Breakdown

### Issue 1: V5 Design-System Alignment and Shared Public Primitives

Scope:

- Align public tokens and button semantics with the LEAD Talent Platform.
- Add or update shared public primitives for section labels, route chooser, and soft inverse surfaces.
- Add explicit z-index for mobile navigation overlay.

Acceptance:

- Primary/ring/button tokens match platform intent.
- Repeated final CTAs use one shared route chooser.
- Hard-coded colors are reduced in shared surfaces.
- Mobile menu has explicit overlay layering.
- Lint/build pass after the slice.

### Issue 2: V5 Home Polish and Mobile Rhythm

Scope:

- Tune Home hero media, regional-to-pathway transition, chapter CTA language, partner marquee surface, and highlights carousel mobile behavior.

Acceptance:

- Hero remains video-first and readable on desktop/mobile.
- Regional and pathway sections no longer feel visually cramped.
- Partner marquee uses a softer LEAD surface.
- Highlights mobile carousel has intentional card sizing/peek.
- Chapter CTA language does not imply guaranteed approval.

### Issue 3: V5 About Credibility and Values Redesign

Scope:

- Replace logo-heavy proof with real community media.
- Refine mission/vision copy for the full LEAD ecosystem.
- Redesign values as an editorial standards rail.
- Compress leadership on mobile.

Acceptance:

- About no longer feels like the weakest page.
- Proof section shows people/community, not only a large logo.
- Values are not just static text cards.
- Leadership is easier to scan on mobile.
- Final CTA uses shared route chooser.

### Issue 4: V5 Get Involved Conversion and Mobile Forms

Scope:

- Improve role selection comparison.
- Replace student logo panel with real student/community media.
- Convert partner type cards into segmented/tabs content.
- Improve chapter/partner modal mobile usability.

Acceptance:

- Role paths are visible, distinct, and faster to compare.
- Student, chapter, partner, and community paths remain clear.
- Chapter request does not imply approval.
- Partner path supports company, professional/mentor, and community organization.
- Mobile modal controls are reachable and visible.

### Issue 5: V5 Final QA Evidence Pack

Scope:

- Run lint/build.
- Capture desktop/tablet/mobile screenshots.
- Capture mobile menu and modal screenshots.
- Save a short QA note with fixed, deferred, and accepted risks.

Acceptance:

- `npm run lint` passes.
- `npm run build` passes.
- No app-caused console errors in smoke capture.
- Screenshots exist for all public routes and interactions.
- QA note summarizes validation status and remaining risks.

## Validation Plan

For each implementation issue:

1. Plan the slice before editing.
2. Implement only the scoped files.
3. Run at least `npm run lint`.
4. Run `npm run build` when the slice changes shared app behavior or final QA.
5. Use browser screenshots for visual slices.
6. Commit only relevant files for that issue.

Final validation:

```bash
npm run lint
npm run build
```

Browser validation:

- `/` desktop/tablet/mobile
- `/about-us` desktop/tablet/mobile
- `/get-involved` desktop/tablet/mobile
- mobile menu open
- chapter modal desktop/mobile
- partner modal desktop/mobile

## Decision Log

- V5 supersedes V4 as the audit-remediation implementation plan.
- Keep the issue set small and implementation-oriented.
- Home should stay creative; About and Get Involved should rise to the same system quality.
- Design-system alignment should happen before page-specific polish.
- QA evidence is an implementation issue, not an afterthought.
