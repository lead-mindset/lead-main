# PRD: LEAD Public Site UX Audit V8

Date: 2026-05-28

## 1. Executive Summary

The LEAD public site is visually stronger than the previous wide/card-heavy versions. The site now has a clear cinematic direction, real LEAD media, a more disciplined content rail, and a coherent navy/purple/red brand system.

The remaining blockers are trust and usability issues visible to first-time users:

- The Home hero video contains burned-in captions that appear under the CTA area, especially on mobile. This makes the first impression feel accidental.
- The Get Involved desktop hero lets the 3D rocket/asteroid overlap the headline and body copy, which hurts readability and hierarchy.
- The Student Pathway motion dims content with opacity, creating WCAG contrast failures in the colored stage numbers and labels.
- Horizontal scroll areas for partners, highlights, and mobile leadership are not keyboard-focusable, so keyboard users can miss or get blocked by visual content.
- The LEAD numbers section uses definition-list elements in a way that axe flags as invalid semantics.

The goal of this PRD is to fix the highest-impact issues without changing the approved site structure, content strategy, or LEAD visual direction.

## 2. Product Goal

Make the public site feel trustworthy, readable, accessible, and polished for:

- prospective students deciding whether to join LEAD,
- chapter builders deciding whether to submit interest,
- partners and mentors evaluating credibility,
- mobile users scanning quickly,
- distracted first-time users who need obvious next steps.

## 3. Audit Evidence

Local QA evidence:

- `.agents/audit/ux-2026-05-28/audit-data.json`
- `.agents/audit/ux-2026-05-28/screenshots/home-mobile-hero.png`
- `.agents/audit/ux-2026-05-28/screenshots/home-desktop-numbers.png`
- `.agents/audit/ux-2026-05-28/screenshots/get-involved-desktop-hero.png`
- `.agents/audit/ux-2026-05-28/screenshots/home-mobile-pathway.png`
- `.agents/audit/ux-2026-05-28/screenshots/get-involved-mobile-roles.png`

Automated QA summary:

- No horizontal overflow detected at 390px or 1440px.
- No console errors detected in the audited pages.
- Axe found serious color-contrast issues in the Home pathway stages.
- Axe found serious keyboard-access issues for scrollable carousel/marquee regions.

## 4. Critical Issues

### P1 - Home Hero Caption Leakage

The burned-in video caption appears below and around the Home hero CTAs. For a first-time mobile user, this looks like broken text, competes with the buttons, and weakens trust before the user understands LEAD.

Acceptance criteria:

- Burned-in video captions are visually suppressed near the CTA zone.
- Hero CTAs remain clearly visible on mobile and desktop.
- The video still feels cinematic and authentic.
- No new content or CTA is added.

### P1 - Get Involved Hero Copy Collision

On desktop, the rocket and asteroid visually collide with the headline and supporting copy. The section is memorable, but the object competes with the primary user question: "Which path do I choose?"

Acceptance criteria:

- The headline and paragraph read cleanly without object overlap.
- The rocket remains visible as the visual anchor.
- Mobile keeps the strong centered rocket composition.
- The hero still points users toward the role section.

### P1 - Pathway Contrast Regression

The pathway animation fades entire stage rows, reducing text contrast for colored numbers and labels below WCAG AA thresholds. This is both an accessibility issue and a trust issue: important pathway content looks faint.

Acceptance criteria:

- Pathway stage labels and numbers meet contrast expectations.
- Motion still exists, but does not reduce text opacity.
- Reduced-motion behavior remains stable.
- The Learn / Explore / Aspire / Discover color system remains recognizable.

### P1 - Keyboard Access For Horizontal Content

Partner logo, highlight carousel, and mobile leadership regions scroll horizontally but are not focusable. Keyboard users need a way to reach and scroll those regions.

Acceptance criteria:

- Horizontal scroll regions are keyboard-focusable.
- Regions have clear accessible names.
- Focus rings are visible and aligned with the LEAD design system.
- Mobile and desktop layouts remain unchanged visually.

### P1 - Impact Counter Semantic Structure

The LEAD numbers section visually works, but the `dt/dd` elements are nested inside extra layout wrappers. Axe reports `definition-list` and `dlitem` failures, which can make the proof stats less robust for assistive technology.

Acceptance criteria:

- Impact stats expose clear readable label/value pairs.
- Axe no longer reports `definition-list` or `dlitem` violations.
- The visual counter layout remains unchanged.

## 5. UX Improvements

- Keep one dominant job per section.
- Protect CTA zones from background media details.
- Keep cinematic assets in negative space instead of behind text.
- Use motion to introduce content, not dim it.
- Make carousels/marquees navigable without a mouse.

## 6. Visual/UI Improvements

- Increase the Home hero bottom wash where captions appear.
- Narrow the Get Involved desktop hero copy column and move the rocket farther right.
- Use accessible LEAD-derived pathway tones for small text and number states.
- Add focus treatment to carousel windows without changing the visual layout.

## 7. Accessibility Requirements

- WCAG AA contrast for normal text.
- No opacity animations on text containers that carry essential copy.
- Keyboard-focusable scrollable regions.
- Visible focus states.
- No horizontal overflow at mobile or desktop breakpoints.

## 8. QA Requirements

- Run `npx eslint` on touched files.
- Run `npm run build`.
- Re-run browser QA for Home and Get Involved desktop/mobile.
- Re-run axe checks for pathway and scrollable regions.
- Capture after screenshots for changed sections.

## 9. Out Of Scope

- Replacing the hero video asset.
- Rebuilding page structure.
- Adding new pages or content strategy.
- Reintroducing the journey line on About/Get Involved.
- Changing the LEAD Talent Platform design system.

## 10. Success Criteria

- Home hero no longer shows distracting burned-in captions near CTA controls.
- Get Involved hero reads cleanly on desktop.
- Axe no longer reports pathway contrast caused by opacity animation.
- Axe no longer reports keyboard-inaccessible scroll regions for partners/highlights.
- Axe no longer reports invalid definition-list semantics in the impact counters.
- The site still feels like LEAD: cinematic, student-centered, navy-first, and grounded in the current design system.
