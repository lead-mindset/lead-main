# PRD: LEAD Public Site Creative Motion V3

Date: 2026-05-26
Branch: `codex/lead-public-redesign`
Repo: `abigailbrionesa/leadmain`

## Summary

Rebuild the public LEAD homepage so it feels like one cohesive LEAD ecosystem: grounded in the LEAD Talent Platform design system, aligned with current LEAD messaging, and expressive enough to recover the creativity of the original leadmain site.

The site should keep the useful UX structure we developed, but replace flat card-heavy presentation with a more cinematic, video-first, motion-controlled experience. Motion should feel intentional, not distracting. Three.js and GSAP should be used only in selected moments where they explain LEAD's scale, geography, energy, or community.

## Source Signals

- Current public site code in `app/page.tsx` and `lib/public-site/content.ts`.
- Original leadmain creative direction from `master:app/page.tsx`, including video background, starfield, rotating Earth, and animated numeric counters.
- Existing 3D/motion components:
  - `components/scroll/canvas-reveal.tsx`
  - `components/scene/planet.tsx`
  - `components/scroll/number-counter.tsx`
  - `components/public/controlled-model-stage.tsx`
  - `components/public/cinematic-video-panel.tsx`
  - `components/public/lead-pathway.tsx`
- Current navigation model: About, Pathway, Programs, Chapters, Partners, Impact.
- LEAD messaging: empowering the next generation of leaders across LATAM and the United States through STEM, leadership, innovation, exploration, aspiration, discovery, and community.
- User-approved visual inspiration:
  - Original leadmain starfield and animated counters.
  - Original leadmain rotating Earth and space atmosphere.
  - Video-first, Apple-style hero treatment.
  - Cohesion with LEAD Talent Platform tokens, shadcn/Tailwind styling, and interaction feel.

## Problem

The current homepage is structurally clearer than the original, but it has become too bland and text/card-heavy. It does not yet feel like the same creative LEAD brand as the original website, and it risks looking disconnected from both the LEAD Talent Platform and the energy of the organization.

Specific issues to fix:

- The hero has too much text and oversized typography, creating confusion before the user understands LEAD.
- Static image clusters in the hero compete with the message and do not show LEAD clearly.
- Proof metrics need stronger visual hierarchy and rhythm, inspired by the original animated counter section.
- The site still relies too much on plain cards with text.
- Programs need a richer, video-first browsing pattern.
- Motion and 3D should return, but only in controlled sections with purpose.
- The homepage must represent the full LEAD ecosystem: Pathway, Programs, Chapters, Partners, Impact.

## Goals

1. Make students the emotional center of the homepage.
2. Create a homepage that feels unified with LEAD Talent Platform while still carrying the original leadmain creativity.
3. Replace generic card sections with more varied, purposeful UX patterns.
4. Use video, stars, GSAP, and Three.js in controlled moments to make LEAD feel alive.
5. Make the homepage easier to scan: fewer words on screen, stronger visual hierarchy, and clearer calls to action.
6. Represent LEAD's geography through an Earth moment that highlights Colombia, Peru, and the United States.
7. Preserve strong conversion paths for students, chapter leaders, partners, mentors, companies, professionals, and community organizations.

## Non-Goals

- Do not redesign the whole brand from scratch.
- Do not add motion everywhere.
- Do not create a generic landing page or marketing splash page.
- Do not use the original site's numbers as canonical data unless LEAD confirms them. The screenshot is visual inspiration; the source of truth remains `lib/public-site/content.ts`.
- Do not build a page that looks separate from the LEAD Talent Platform.
- Do not depend on final media assets. Use placeholders where needed, with clear replacement slots.

## Approved Homepage Structure

1. **Video Hero**
   - Full-bleed LEAD video background.
   - Short, high-confidence copy.
   - Primary CTA for students.
   - Secondary CTA for partners or chapters.
   - No image collage in the hero.

2. **Starfield Impact Counters**
   - Inspired by the original screenshot and original leadmain counter section.
   - Dark LEAD navy star background.
   - Large animated metric blocks.
   - Use current canonical metrics from `proofStats`: `1,135+`, `14`, `100+`, and regional reach unless updated by LEAD.

3. **Regional Earth Moment**
   - Rotating Earth with starfield.
   - Highlight Colombia, Peru, and the United States.
   - GSAP scroll-controlled reveal/timeline.
   - This should feel like LEAD's regional footprint, not decorative space art.

4. **Pathway**
   - Keep Pathway as a core homepage section.
   - It should explain the student journey through learning, exploration, aspiration, discovery, leadership, and community.
   - Use LEAD colors and design-system spacing.

5. **Programs Video Carousel**
   - Replace flat program cards with a video-first carousel.
   - Each program should be clickable.
   - Each slide should show media first, then concise program context.
   - Use placeholders until final program videos are provided.

6. **Chapters Section**
   - Incorporate the approved chapter section direction.
   - Keep it spacious and clear.
   - Make the competitive nature of chapter creation explicit: submitting interest does not guarantee chapter approval.
   - CTA should route to a LEAD chapter interest form or request flow.

7. **Partner Marquee**
   - Keep a lighter-background partner marquee.
   - Purpose: credibility through organizations that support LEAD.
   - Avoid a large, heavy partner section.

8. **Moving LEAD Highlights Carousel**
   - Use a moving carousel for impact moments, event highlights, stories, and community proof.
   - Use image/video placeholders now.
   - Avoid boring static cards.

9. **Compact Final CTA**
   - Tight, tasteful ending.
   - Do not fill the screen with oversized text.
   - Give clear routes: students, chapters, partners.

## UX Decisions

### Hero

The hero should act like an emotional doorway, not an explanation document. The background video should carry the feeling of LEAD. Copy should be minimal.

Recommended hero line:

> Building the next generation of leaders across the Americas.

Support copy:

> LEAD connects students with STEM learning, leadership experiences, community, and real pathways to opportunity.

Primary CTA:

> Explore the Pathway

Secondary CTA:

> Partner with LEAD

Rationale: this avoids narrowing LEAD only to Latinos, keeps students centered, and still names the regional ambition.

### Navigation

Keep the current ecosystem-aligned navigation:

- About
- Pathway
- Programs
- Chapters
- Partners
- Impact

This matches the user mental model better than a reduced nav with only Impact, Chapters, Programs, Partners.

### Metrics

Use the current data source unless LEAD provides updated values:

- `1,135+` members
- `14` chapters
- `100+` events
- LATAM + U.S. reach

The original screenshot's `1140`, `13`, and `+100` should inform layout and animation style, not data truth.

### Motion

Motion should support comprehension:

- Hero: subtle video motion.
- Impact: animated counters on section entry.
- Earth: scroll-controlled rotation and geographic labels.
- Programs: carousel movement, not constant chaotic animation.
- Highlights: moving carousel with pause/hover/focus affordance.

Motion should pause or simplify under `prefers-reduced-motion`.

## Detailed Requirements

### 1. Video Hero

Functional requirements:

- Use a full-bleed background video.
- Add a readable overlay using LEAD navy/black translucency, not a heavy opaque card.
- Keep hero copy short.
- Remove the current five-image/oval collage from the hero.
- Keep CTA buttons aligned with the LEAD Talent Platform button system.
- Ensure first viewport hints at the next section.

Technical requirements:

- Use local placeholder video if final LEAD video is not available.
- Video must autoplay muted, loop, and playsInline.
- Include poster fallback.
- Respect reduced motion by showing the poster/static frame.

### 2. Starfield Impact Counters

Functional requirements:

- Use dark LEAD navy background with starfield.
- Show large animated number blocks inspired by the original leadmain screenshot.
- Keep labels aligned and consistent, avoiding awkward line wrapping.
- Animate numbers only when the section enters the viewport.
- Use current `proofStats` as the source of truth.

Technical requirements:

- Reuse ideas from `components/scroll/number-counter.tsx`.
- Prefer a new public-site component with cleanup-safe GSAP.
- Do not create layout shift while numbers animate.

### 3. Regional Earth Moment

Functional requirements:

- Show rotating Earth in a controlled scroll section.
- Include stars in the background.
- Highlight Colombia, Peru, and the United States.
- Use labels or markers that do not crowd the globe.
- The section should communicate LEAD's footprint across LATAM and the U.S.

Technical requirements:

- Reuse `public/models/earthbase.glb` or existing Earth model assets.
- Reuse lessons from `components/scene/planet.tsx` and `components/public/controlled-model-stage.tsx`.
- Use GSAP ScrollTrigger with cleanup.
- Component should be scoped to its own section, not global page scroll.
- Reduced-motion fallback should show a static Earth with visible labels.

### 4. Pathway

Functional requirements:

- Keep Pathway as a visible core section.
- Present the student journey as a progression, not a block of cards.
- Include learn, explore, aspire, discover, leadership, and community themes.
- Keep copy concise.

Technical requirements:

- Reuse `components/public/lead-pathway.tsx` where possible.
- Align colors, type, borders, and spacing with LEAD Talent Platform tokens.

### 5. Programs Video Carousel

Functional requirements:

- Replace static program cards with a video-first carousel.
- Make each program clickable.
- Each slide should include:
  - Video or media placeholder.
  - Program title.
  - One concise outcome line.
  - CTA/link affordance.
- Support keyboard navigation.
- Provide clear active slide state.

Technical requirements:

- Add media/link metadata to `lib/public-site/content.ts` if missing.
- Use local placeholders until final videos are available.
- Avoid autoplaying multiple videos at once.

### 6. Chapters Section

Functional requirements:

- Use the approved spacious chapter section direction.
- Explain the chapter process without making it feel guaranteed.
- Include:
  - Request interest.
  - Review and fit.
  - Orientation.
  - Launch support if selected.
- CTA should say something like `Request chapter interest`.

Technical requirements:

- Reuse existing `chapterProcess` content where possible.
- If no final form URL exists, use a placeholder link and clearly centralize it in content config.

### 7. Partner Marquee

Functional requirements:

- Use a lighter surface.
- Show partner/supporter logos in a continuous marquee.
- Keep it compact.
- Do not over-explain partner credibility.

Technical requirements:

- Use `partnerLogos` from `lib/public-site/content.ts`.
- Ensure animation pauses or slows for reduced motion.
- Avoid logo distortion.

### 8. Moving LEAD Highlights Carousel

Functional requirements:

- Show impact as real movement and real moments.
- Use a carousel pattern with images/videos.
- Include highlights such as events, chapter moments, student stories, workshops, and community milestones.
- Avoid plain text cards.

Technical requirements:

- Use placeholder images/videos until final assets are supplied.
- Add content metadata in `lib/public-site/content.ts`.
- Ensure accessible labels and keyboard controls.

### 9. Compact Final CTA

Functional requirements:

- Keep final CTA visually calm and concise.
- Do not use giant full-screen text.
- Include three routes:
  - Students
  - Chapters
  - Partners

Technical requirements:

- Reuse existing button/link components and Tailwind tokens.

## Design System Constraints

- Use actual LEAD colors and existing public-site tokens.
- Keep the public site visually connected to LEAD Talent Platform.
- Keep shadcn/Tailwind properties consistent with the platform:
  - Button radius.
  - Border treatment.
  - Muted surfaces.
  - Typography scale.
  - Focus states.
  - Spacing rhythm.
- Use navy as the dominant identity color, with LEAD accent colors used intentionally.
- Avoid generic AI-looking eyebrow labels before every heading.
- Avoid a wall of cards. Use carousels, timelines, marquees, full-width media bands, counters, and section-level motion instead.
- Cards may be used only when they represent actual repeated items and have strong media or interaction value.

## Technical Approach

| Area | File or Component | Action |
| --- | --- | --- |
| Homepage composition | `app/page.tsx` | Reorder and replace sections according to this PRD. |
| Content source | `lib/public-site/content.ts` | Add/adjust media URLs, program links, highlight items, chapter form placeholder, and regional Earth label metadata. |
| Video hero | `components/public/video-hero.tsx` | Create or replace current hero implementation. |
| Impact counters | `components/public/starfield-impact-counters.tsx` | Create using GSAP and stable metric blocks. |
| Regional Earth | `components/public/regional-earth-stage.tsx` | Create using Three.js/Drei and scoped GSAP timeline. |
| Pathway | `components/public/lead-pathway.tsx` | Reuse and tune. |
| Programs carousel | `components/public/programs-video-carousel.tsx` | Create accessible video-first carousel. |
| Chapters | Existing or new public component | Reuse content; improve spacing and CTA. |
| Partner marquee | Existing or new public component | Keep light, compact, and reduced-motion safe. |
| Highlights carousel | `components/public/lead-highlights-carousel.tsx` | Create moving media carousel. |
| Styling | `app/globals.css` | Add starfield, motion utilities, and carousel support only where needed. |

## Accessibility Requirements

- Preserve keyboard access for carousel controls.
- Provide visible focus states.
- Respect `prefers-reduced-motion`.
- Videos must not contain critical information that is unavailable in text.
- Use meaningful `aria-label` text for icon-only controls.
- Ensure text contrast passes on video and star backgrounds.
- Avoid motion that obscures reading or causes scroll hijacking.

## Performance Requirements

- Lazy-load 3D and heavy media sections where practical.
- Use poster images and compressed placeholder media.
- Do not autoplay multiple videos at once.
- Keep Three.js canvas scoped and avoid multiple full-page render loops.
- Ensure mobile does not suffer from heavy 3D where a static fallback would be better.

## Validation Plan

Validate each implementation issue with:

- `npm run lint`
- `npm run build`
- Local browser validation on the active dev server.
- Desktop screenshot at homepage top, counters, Earth, programs, chapters, partners, highlights, and CTA.
- Mobile screenshot for the same critical sections.
- Reduced-motion check.
- Manual scroll test for GSAP timeline behavior.
- Check that text does not overlap on mobile or desktop.
- Check that carousel controls work with mouse and keyboard.

## Acceptance Criteria

- Homepage feels visually connected to LEAD Talent Platform.
- Homepage also recovers the original leadmain creative identity through video, stars, counters, and controlled 3D.
- Hero uses video as the main background and removes the current image collage.
- Impact counters use starfield visual treatment and animate on scroll.
- Earth section rotates and highlights Colombia, Peru, and the United States.
- Pathway is present and visually integrated.
- Programs are shown as a clickable video-first carousel.
- Chapters section includes the competitive chapter request/selection flow.
- Partner section is a lighter-background marquee.
- LEAD Highlights are shown in a moving carousel.
- Final CTA is compact and tasteful.
- No major section relies on bland text-only cards.
- Reduced-motion users receive a calm, readable experience.

## Issue Breakdown

### Issue 1: Video Hero and Homepage Composition

Implement the new video hero, shorten copy, remove the image collage, and update homepage section order.

### Issue 2: Starfield Impact Counters

Build the animated LEAD proof section using starfield background and canonical metrics.

### Issue 3: Regional Earth Scroll Moment

Create the controlled Three.js Earth section with Colombia, Peru, and United States markers.

### Issue 4: Pathway and Chapters Integration

Tune Pathway and Chapters so they feel spacious, connected, and aligned with the LEAD ecosystem.

### Issue 5: Programs Video Carousel

Replace program cards with an accessible, clickable, video-first carousel.

### Issue 6: Partner Marquee and LEAD Highlights Carousel

Add lighter partner marquee and moving media carousel for LEAD Highlights.

### Issue 7: Full UX/UI Validation

Run lint/build, screenshot desktop/mobile, test reduced motion, and fix layout or animation issues.

## Open Content Slots

These can use placeholders for now:

- Final hero video.
- Program videos.
- Highlight carousel images/videos.
- Final chapter interest form URL.
- Final partner logo image set if current placeholders are incomplete.
- Updated official impact metrics if LEAD changes them.

## Decision Log

- Use video as the hero's primary emotional asset.
- Use original leadmain starfield/counter section as visual inspiration.
- Use current content metrics as data truth.
- Use rotating Earth to show Colombia, Peru, and United States.
- Keep Pathway in the homepage.
- Use a video-first carousel for Programs.
- Keep Chapters section and make chapter selection non-guaranteed.
- Keep partner marquee but make it lighter and compact.
- Use moving carousel for LEAD Highlights.
- Ignore extra previously proposed sections outside this approved structure.
