# PRD: LEAD Public Site Section QA Remediation V6

## Purpose

This PRD converts the 2026-05-27 desktop/mobile section audit into a focused remediation pass. The goal is not to redesign the whole site again. The goal is to remove the remaining visual trust-breakers and make Home, About, and Get Involved feel like one polished LEAD design system.

## Source Evidence

- QA report: `docs/qa/lead-public-site-section-design-audit-2026-05-27.md`
- Desktop contact sheet: `.agents/qa/section-design-audit-20260527/desktop-all-sections-contact-sheet.png`
- Mobile contact sheet: `.agents/qa/section-design-audit-20260527/mobile-all-sections-contact-sheet.png`
- Raw QA data: `.agents/qa/section-design-audit-20260527/qa-results.json`

## Users

- Students deciding whether LEAD feels credible and worth joining.
- Student leaders considering chapter interest.
- Companies, professionals, mentors, and community organizations deciding whether to partner.
- Internal LEAD team members who need the public site to feel connected to the LEAD Talent Platform.

## Product Principles

1. Students remain at the center.
2. Real LEAD media should carry trust.
3. Motion should be controlled, intentional, and never obscure comprehension.
4. Navy is the base system; red, magenta, and purple are meaningful accents.
5. Sections should flow as one story instead of switching visual languages.
6. Mobile cannot be a cropped desktop site.

## Scope

### In Scope

- Impact counter animation readability.
- Mobile highlight carousel behavior.
- Partner marquee surface and transition polish.
- About page value contrast and leadership media cards.
- Programs default media quality.
- Screenshot validation after implementation.

### Out Of Scope

- Changing LEAD metrics.
- Replacing the hero video.
- Changing the chapter selection policy.
- Rebuilding the Earth, rocket, or pathway interactions.
- Editing the Talent Platform repository.

## Requirements

### R1 - Impact Counters Must Be Trustworthy

The impact counters should animate when they enter the viewport without becoming unreadable. At rest, the three metrics must be legible and aligned:

- Members
- University Chapters
- Events Organized

Acceptance criteria:

- Desktop and mobile screenshots do not capture broken, partial, or scrambled digits after normal scroll settling.
- Reduced motion users see final values immediately.
- No layout shift occurs during animation.

### R2 - Mobile Highlights Must Not Clip Content

The LEAD Highlights section should use moving carousel behavior on larger screens but avoid cutting active cards on mobile.

Acceptance criteria:

- Mobile screenshot shows a complete first highlight card with readable title and text.
- Desktop preserves the moving carousel behavior.
- Hover/focus pause still works for animated viewports.

### R3 - Partner Band Must Feel Connected To LEAD

The partner marquee can remain lighter than the surrounding page, but it must not feel like a disconnected white stripe.

Acceptance criteria:

- Partner section uses a navy-tinted lavender surface with LEAD accent treatment.
- Transition from chapter CTA into partners is softened.
- Text contrast remains accessible.
- Logo containers remain readable and premium.

### R4 - About Page Must Match The System

Growth Standards and Leadership should feel as polished as the Home page.

Acceptance criteria:

- Growth value titles have enough contrast to look intentional.
- Leadership cards use consistent portrait framing and smaller desktop density.
- Mobile leadership remains horizontally scrollable and readable.
- Typography continues using the shared public-site classes.

### R5 - Programs Default Media Must Look Intentional

The first visible program frame should not land on burned-in subtitles or an awkward transient frame.

Acceptance criteria:

- The default active program shows a clean, credible LEAD video frame.
- LEAD HER remains available in the program switcher.
- No additional CTA buttons are added to the program section.

## Issue Breakdown

1. Impact counter motion legibility.
2. Highlight carousel responsive behavior.
3. Partner band and section transition consistency.
4. About page contrast and leadership card polish.
5. Programs default media quality.

## Validation Plan

- Run `npm run lint`.
- Run `npm run build`.
- Start local server.
- Capture desktop and mobile screenshots for Home, About, and Get Involved.
- Inspect the affected sections manually:
  - Home impact counters
  - Home highlights
  - Home chapters/partners
  - About values
  - About leadership
- Confirm no console errors, no missing alt text, and no horizontal overflow.
