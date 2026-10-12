# PRD: LEAD Public Site Audit Remediation V4

Date: 2026-05-27
Branch: `codex/lead-public-redesign`
Repo: `abigailbrionesa/leadmain`

## Summary

This PRD turns the critical and major UX/UI audit observations into a focused launch-hardening plan for the LEAD public site. V2 defined the public-site UX structure. V3 restored creative motion, video, 3D, counters, pathway, chapters, partner marquee, and highlights. V4 is the quality pass that makes the site feel trustworthy, cohesive, performant, and ready for review across Home, About, and Get Involved.

The goal is not to add more sections. The goal is to remove friction, eliminate visual/runtime debt, and make every page feel like the same LEAD ecosystem: student-centered, design-system aligned, creative, serious, and easy to act on.

## Source Signals

- `docs/prd/lead-public-site-ux-v2.md`
- `docs/prd/lead-public-site-creative-motion-v3.md`
- `.agents/qa/full-site-audit/visual-report.json`
- `.agents/qa/whole-site-taste-audit/*`
- `.agents/qa/recommendations-pass/qa-note.md`
- `.agents/qa/radiatinghope-inspired-vera-audit.md`
- Current implementation:
  - `app/page.tsx`
  - `app/about-us/page.tsx`
  - `app/get-involved/page.tsx`
  - `components/public/video-hero.tsx`
  - `components/public/starfield-impact-counters.tsx`
  - `components/public/regional-earth-stage.tsx`
  - `components/public/lead-pathway.tsx`
  - `components/public/get-involved-rocket-hero.tsx`
  - `lib/public-site/content.ts`

## Problem

The public site now has the right strategic direction, but the audit still shows launch-level risks:

- Some audit runs reported browser console errors or warnings that must be treated as release blockers until verified fixed.
- The site can still feel uneven between pages: Home is cinematic and motion-led, while About and Get Involved can feel more static or section-heavy.
- Mobile scroll length and repeated section patterns risk making the experience feel tiring even when individual sections look polished.
- Motion, video, 3D, and carousels need final validation so they feel intentional rather than heavy, distracting, or fragile.
- Several copy and UI details need final cohesion: no stale narrow audience language, no redundant labels, no encoding artifacts, no inconsistent CTA hierarchy.
- Media, partner logos, and placeholder assets need a clear source-of-truth plan before production.

## Severity Definitions

Critical findings block launch or undermine trust:

- Runtime errors, hydration warnings, duplicate React keys, invalid script errors, or persistent console errors on public routes.
- Broken or misleading conversion paths.
- Motion or media that prevents reading, scrolling, keyboard access, or reduced-motion access.
- Copy that misrepresents LEAD's audience or implies guarantees for chapter creation.

Major findings do not necessarily block launch alone, but noticeably reduce UX quality:

- Pages feeling disconnected from each other or from the LEAD Talent Platform design language.
- Repetitive card/text sections that make the site feel bland.
- Mobile pages with excessive vertical length or weak section scanning.
- Inconsistent button variants, eyebrow labels, labels, spacing, or final CTAs.
- Image sizing, LCP, logo distortion, or placeholder-media issues.

## Critical Observations

### 1. Browser Runtime Health Must Be Clean

Audit evidence reported:

- Duplicate React key warnings around footer/pathway links in earlier visual reports.
- `Invalid or unexpected token` errors during some tablet/mobile audit captures.
- Next.js image warnings for modified image aspect ratio.
- LCP warning for an above-the-fold chapter image on Get Involved.

Some of these may already be fixed in the current branch. The launch requirement is not "we think it is fixed"; it is a clean browser QA pass that proves it.

Required outcome:

- Home, About, and Get Involved have zero app-caused console errors in desktop, tablet, and mobile validation.
- Known non-app browser noise is documented separately and not mixed with app defects.
- Any duplicate key or invalid token issue is either fixed or proven stale with fresh screenshots/logs.

### 2. Cross-Page Design Cohesion Is Still Fragile

Home now has the strongest creative identity through video, starfield counters, Earth, pathway, carousel, chapters, marquee, and highlights. About and Get Involved must not feel like separate design families.

Required outcome:

- Home, About, and Get Involved share the same visual system: navy foundation, LEAD accent gradients, shadcn/Tailwind spacing, button treatment, border weight, typography rhythm, and restrained motion.
- About should feel like LEAD's conviction page, not a calmer leftover version of an older design pass.
- Get Involved should feel like the conversion/routing page, not another homepage.

### 3. Copy Must Match LEAD's Actual Audience And Promise

Earlier audits and drafts used narrower audience language in some places. LEAD's public message should center students across Latin America and the United States without implying the work is only for one identity group. Chapter language must also stay honest: interest does not guarantee orientation, activation, or approval.

Required outcome:

- Public copy consistently centers "students", "the next generation of leaders", STEM, leadership, innovation, community, and opportunity.
- No page implies chapter creation is guaranteed.
- No page over-explains internal chapter process to the point of creating friction.
- No stale or awkward AI-generated eyebrow labels remain.

### 4. Motion Must Be Controlled, Scoped, And Purposeful

The current direction correctly restores LEAD creativity through video, 3D, GSAP, counters, starfield, and pathway linework. The remaining risk is overuse, heavy mobile behavior, or motion that is hard to validate.

Required outcome:

- Motion is used only for identity, scale, pathway, proof, or media browsing.
- GSAP timelines are scoped to their sections and cleaned up.
- Reduced-motion users get readable static states.
- The pathway line stays behind content and does not feel like a foreground overlay.
- Earth, rocket, counters, pathway, and carousels are tested on desktop and mobile.

### 5. Conversion Paths Need Final Friction Review

The public site needs a simple "choose your path" model:

- Student: join LEAD / enter Talent Platform.
- Chapter builder: submit interest through a short modal/request flow.
- Partner: companies, professionals, mentors, sponsors.
- Community organization: collaboration path.

Required outcome:

- Every CTA lands in the expected section or external destination.
- The Get Involved hero is not crowded with all CTAs at once.
- Role cards are visually distinct and easy to scan.
- Forms inside modals are short, accessible, and clear.
- Final CTAs do not repeat the same page logic in oversized or text-heavy ways.

## Major Observations

### 1. Mobile Scroll Length Needs Compression

The full-site audit showed very tall mobile pages, especially Home and Get Involved. The site can be cinematic without requiring users to scroll through too many large blocks before finding the right action.

Required outcome:

- Mobile sections use tighter vertical rhythm than desktop.
- Large media sections have mobile-specific height limits.
- Repeated proof/CTA areas are consolidated.
- The first three mobile screens communicate: what LEAD is, proof, and where to go next.

### 2. About Page Needs More LEAD Creativity

About currently carries important mission, vision, values, leadership, and system copy. The risk is that it becomes text-and-card heavy compared to the creative Home page.

Required outcome:

- About uses one or two intentional creative moments from the LEAD system: background brand trace, video, proof rail, or a more editorial leadership/values presentation.
- It does not duplicate Home's full cinematic structure.
- It gives conviction and credibility quickly.

### 3. Card Patterns Need Stronger Variation

The user explicitly flagged that too many cards with text make the site feel bland. Cards are acceptable only when they represent repeated objects and have media, hierarchy, or interaction.

Required outcome:

- Static text cards are reduced or converted into rails, timelines, split media bands, compact lists, marquees, or carousels.
- Repeated items use stable dimensions so hover states and text do not shift layout.
- Final CTAs use concise grouped routes, not giant text-heavy blocks.

### 4. Media And Asset Governance Is Needed

The site currently uses placeholder videos/images and has untracked duplicate assets outside the intended public asset folders. Before production, media usage should be deliberate.

Required outcome:

- Final or approved placeholder media is tracked in the right folders.
- Duplicate loose assets are removed or ignored.
- Partner logos come from `public/allies`.
- Video posters are present.
- Media has a replacement map for final LEAD videos/images.

### 5. Performance Needs A Media-First Budget

The site now depends on video, Three.js, carousel media, starfields, and images. That is the right creative direction, but it needs constraints.

Required outcome:

- No autoplaying multiple heavy videos in the same viewport.
- 3D is scoped and does not run unnecessary render loops offscreen.
- Above-the-fold images use `priority` only when appropriate.
- Images preserve aspect ratio and avoid Next.js warnings.
- Mobile can fall back to lighter/static representations where needed.

### 6. Validation Needs To Become Repeatable

Visual checks have been useful, but the next pass should leave a compact, repeatable evidence trail.

Required outcome:

- Fresh screenshots for Home, About, and Get Involved at desktop, tablet, and mobile.
- Scroll screenshots for the critical motion sections.
- A short QA note distinguishing fixed, deferred, and accepted risks.
- `npm run lint` and `npm run build` pass.

## Goals

1. Produce a clean, launch-ready public-site QA baseline.
2. Make Home, About, and Get Involved feel like one coherent LEAD experience.
3. Preserve the creative identity without increasing distraction.
4. Reduce mobile friction and repeated section weight.
5. Ensure all conversion paths are clear, honest, and accessible.
6. Create a repeatable validation artifact for future PR review.

## Non-Goals

- Do not redesign the entire site again.
- Do not add new audience types.
- Do not introduce a new design system.
- Do not replace the LEAD Talent Platform.
- Do not add more sections just to make the site feel fuller.
- Do not rely on final production media being available; maintain clean placeholders with replacement slots.

## UX Requirements

### Home

- Keep the video hero, starfield counters, Earth, pathway, programs carousel, chapter section, partner marquee, highlights carousel, and compact final CTA.
- Tighten mobile spacing and reduce any section that feels like a long pause between actions.
- Ensure hero copy is concise and student-centered.
- Keep proof numbers visually strong and labels readable.
- Validate that Earth labels stay attached and readable across viewport sizes.
- Ensure the pathway line is behind content and scrolls at a calm pace.

### About

- Preserve About as the conviction page.
- Reduce any feeling of a generic nonprofit brochure.
- Keep mission, values, leadership, and why-it-works content, but improve visual rhythm.
- Use creative identity in moderation: background trace, proof rail, video, or editorial media.
- Avoid overusing cards for values or leadership if a stronger layout exists.

### Get Involved

- Keep the rocket hero with enough height to show the 3D object.
- Keep role cards below the hero.
- Make role cards visually distinct and media-forward.
- Keep chapter interest concise and modal-based.
- Keep partner/community organization segmentation clear.
- Ensure all forms are keyboard usable and do not trap users awkwardly on mobile.

## Design System Requirements

- Use the existing LEAD public-site and LEAD Talent Platform aligned tokens.
- Use navy as the core identity surface.
- Use LEAD red, magenta, purple, and accent colors intentionally.
- Keep buttons consistent with `components/ui/button.tsx`.
- Keep cards at the established radius and border language.
- Avoid excessive badges and decorative labels.
- Do not introduce a new color palette.
- Fix encoding artifacts such as malformed copyright symbols.

## Accessibility Requirements

- One H1 per route.
- No horizontal overflow at 390px, 834px, and 1440px.
- All images either have useful alt text or are intentionally decorative.
- Carousels and modals support keyboard interaction.
- Icon-only controls have labels.
- Reduced motion is respected.
- Videos do not carry critical information that is unavailable in text.
- Focus states remain visible on dark and media backgrounds.

## Performance Requirements

- Lazy-load heavy media and 3D sections where practical.
- Use `preload="metadata"` for background/section videos unless a stronger reason exists.
- Do not autoplay multiple visible videos when one would carry the section.
- Add `priority` only to true LCP images.
- Resolve image dimension warnings.
- Keep Three.js canvas DPR bounded on mobile.

## Technical Requirements

- Fix or verify stale any duplicate key warnings from footer/navigation/link maps.
- Investigate and eliminate `Invalid or unexpected token` errors from mobile/tablet QA.
- Ensure GSAP timelines use scoped cleanup.
- Ensure carousels do not create hydration mismatch or repeated keys.
- Keep generated QA artifacts out of commits unless explicitly intended.
- Keep public asset folders clean and intentional.

## Validation Plan

Run:

```bash
npm run lint
npm run build
```

Capture screenshots:

- `/` desktop, tablet, mobile
- `/about-us` desktop, tablet, mobile
- `/get-involved` desktop, tablet, mobile
- Home scroll positions: hero, counters, Earth, pathway, programs, chapters, highlights, CTA
- Get Involved scroll positions: hero, role cards, student path, chapters modal, partner path
- About scroll positions: hero, proof, values, leadership, final CTA

Manual checks:

- Open browser console on all routes.
- Verify no app-caused console errors.
- Verify reduced-motion fallback.
- Verify carousel controls with keyboard.
- Verify modals on mobile.
- Verify all CTAs route correctly.

## Acceptance Criteria

- `npm run lint` passes.
- `npm run build` passes.
- Fresh browser QA shows no app-caused console errors.
- No horizontal overflow at desktop, tablet, or mobile widths.
- Home, About, and Get Involved feel visually cohesive.
- Motion is controlled and does not obscure content.
- Mobile pages are meaningfully tighter than the previous audit baseline.
- Chapter request flow is honest and concise.
- Partner/community paths are clear.
- Placeholders are documented and do not look broken.
- Final screenshots and QA note are saved under a new `.agents/qa/` folder.

## Issue Breakdown

### Issue 1: Runtime And QA Health Gate

Fix or verify all console errors and warnings from the audit.

Acceptance:

- Duplicate key warnings are gone.
- `Invalid or unexpected token` is gone or proven unrelated to app code with fresh evidence.
- Image aspect-ratio warnings are resolved.
- LCP priority warning is resolved when the image is truly above the fold.
- Fresh visual report includes no app-caused console errors.

### Issue 2: Cross-Page Design Cohesion

Tune Home, About, and Get Involved so they share one LEAD visual language.

Acceptance:

- Typography scale, buttons, cards, borders, gradients, and section spacing feel consistent.
- About and Get Involved do not feel disconnected from the creative Home page.
- No generic AI-looking eyebrow labels or redundant labels remain.

### Issue 3: Mobile Friction And Section Compression

Reduce mobile scroll fatigue while preserving the creative structure.

Acceptance:

- Mobile hero, counters, Earth, pathway, programs, and Get Involved role sections have intentional heights.
- Repeated CTAs or redundant explanation blocks are consolidated.
- First three mobile screens communicate identity, proof, and route.

### Issue 4: Motion And Media Hardening

Validate and tune video, GSAP, Three.js, counters, pathway line, rocket, Earth, and carousels.

Acceptance:

- Motion is section-scoped and cleanup-safe.
- Reduced-motion fallback is readable.
- Earth and pathway animations match scroll timing.
- Autoplaying videos do not overwhelm mobile performance.
- No motion appears as an accidental overlay.

### Issue 5: Conversion Flow Polish

Make Get Involved and final CTAs frictionless.

Acceptance:

- Student, chapter, partner, and community paths are visible and distinct.
- Chapter request opens a concise modal and does not imply approval.
- Partner form supports company, professional/mentor, and community organization.
- CTAs route correctly and have consistent button hierarchy.

### Issue 6: Asset And Content Governance

Clean asset usage and document final media slots.

Acceptance:

- Public assets live in the intended folders.
- Duplicate loose assets are excluded or removed.
- Partner logos are consistent and undistorted.
- Placeholder media has a replacement map.
- Copy no longer contains encoding artifacts or stale audience language.

### Issue 7: Final Visual Evidence Pack

Produce a compact validation package for review.

Acceptance:

- Desktop/tablet/mobile screenshots are saved.
- Scroll-state screenshots cover the critical animated sections.
- A QA note summarizes fixed, deferred, and accepted risks.
- The branch is ready for issue creation or PR review.

## Open Decisions

- Which final hero video should replace `/video3.mp4`?
- Which final program videos should replace placeholders?
- Which LEAD highlights should be treated as canonical public proof?
- Should About leadership stay as a roster or move to a more editorial "builders behind LEAD" treatment?
- Should partner/community forms route to one shared endpoint or separate follow-up workflows?

## Decision Log

- V4 is a hardening PRD, not a full redesign PRD.
- Critical issues prioritize runtime health, conversion honesty, and motion accessibility.
- Major issues prioritize cohesion, mobile friction, media governance, and visual taste.
- Home remains the cinematic ecosystem page.
- About remains the conviction page.
- Get Involved remains the role-routing page.
- The site should preserve creative LEAD energy while feeling production-ready.
