# PRD: LEAD Public Site Journey Line V7

## 1. Executive Summary

The LEAD public site uses a large animated brand line as a cross-page identity element. The current implementation is visually inconsistent: the line can feel static on secondary pages, overly decorative in some sections, and disconnected from the reader's eye path. This PRD defines a controlled journey-line system that guides attention through Home, About, and Get Involved without crossing important copy, cards, media, forms, or faces.

The MVP goal is to replace the universal decorative line with a shared journey-line component that supports page-specific routes, scroll-linked drawing, a subtle completed trail, and a stronger active path.

## 2. Mission

Create a motion system that makes the public site feel like one cohesive LEAD journey while preserving clarity, trust, and reading flow.

Core principles:

- Students and content remain the center.
- Motion guides attention; it does not compete with content.
- LEAD color and shape language should feel intentional across pages.
- Dense sections should stay calm.
- Mobile should prioritize readability over cinematic effects.

## 3. Target Users

- Prospective students deciding whether LEAD feels credible and worth joining.
- Student leaders evaluating chapter interest.
- Professionals, companies, mentors, and community organizations evaluating partnership.
- Internal LEAD stakeholders reviewing whether the public site feels connected to the broader LEAD ecosystem and Talent Platform.

## 4. MVP Scope

### In Scope

- [x] Shared journey-line rendering system.
- [x] Page-specific routes for Home, About, and Get Involved.
- [x] Scroll-linked drawing on every page.
- [x] Completed trail plus active drawn segment.
- [x] Negative-space route design near key content.
- [x] Reduced-motion fallback.
- [x] Mobile behavior that avoids large animated overlays.
- [x] Desktop and mobile visual validation.

### Out Of Scope

- Changing public-site content strategy.
- Rebuilding hero video, Earth, rocket, or carousel components.
- Adding new third-party animation libraries.
- Editing LEAD Talent Platform code.
- Creating new public media assets.

## 5. User Stories

1. As a prospective student, I want the page motion to guide me through LEAD's pathway without distracting me so that I understand where to go next.
2. As a chapter builder, I want the Get Involved page to feel coherent and action-oriented so that I can quickly identify the chapter interest path.
3. As a partner or mentor, I want motion to reinforce the site story without covering copy or media so that the organization feels polished and trustworthy.
4. As a mobile visitor, I want the page to stay readable and fast so that I can scan roles and calls to action without visual clutter.
5. As a LEAD stakeholder, I want the visual system to feel consistent across pages so that the public site does not feel disconnected from LEAD's product and brand direction.

## 6. Core Architecture

The journey line should be implemented as a reusable public-site component:

- `components/public/brand-scroll-trace.tsx`
  - Shared rendering and ScrollTrigger behavior.
  - Route variants for each page.
  - Active/completed path layers.
  - Reduced-motion fallback.

Page integration:

- `app/page.tsx`
  - Home route.
- `app/about-us/page.tsx`
  - About route.
- `app/get-involved/page.tsx`
  - Get Involved route.

Validation evidence:

- `.agents/qa/...`
  - Local screenshots and probe output.
- `.github/plans/...`
  - Plan and validation tracking.

## 7. Tools And Features

### F1 - Shared Journey-Line Engine

The component should render two path layers:

- Completed trail: subtle, low-opacity path that shows continuity.
- Active path: stronger path drawn according to scroll progress.

Acceptance criteria:

- Exactly one journey-line system is present per page.
- The active path updates with scroll on Home, About, and Get Involved.
- The path uses round caps and LEAD brand colors.
- Reduced-motion users see a non-distracting static state.

### F2 - Page-Specific Routes

Each page should define a route that follows the page's user flow:

- Home: ecosystem discovery and pathway orientation.
- About: trust, mission, community moments, leadership.
- Get Involved: role selection, student path, chapter interest, partnership, CTA.

Acceptance criteria:

- Routes travel through negative space near key content.
- Routes avoid crossing body copy, faces, videos, forms, and primary cards.
- Routes are visually cohesive despite different geometry.

### F3 - Visual QA And Responsive Rules

The implementation must be inspected in desktop and mobile viewports.

Acceptance criteria:

- Desktop screenshots show the line moving through safe negative space.
- Mobile hides the large line and preserves readable content.
- No horizontal overflow is introduced.
- Build and lint pass.

## 8. Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Existing LEAD CSS variables and public-site components

## 9. Security And Configuration

No new environment variables, authentication changes, data access, or server routes are required.

## 10. API Specification

No API changes are required.

## 11. Success Criteria

- Home, About, and Get Involved each show scroll-linked journey-line behavior on desktop.
- The line is no longer static on About or Get Involved.
- The line no longer behaves like a pathway-specific artifact inside Learn / Explore / Aspire / Discover.
- The line guides transitions without crossing key readable content.
- Mobile remains clean with the large journey line hidden.
- `npx eslint app/page.tsx app/about-us/page.tsx app/get-involved/page.tsx components/public/brand-scroll-trace.tsx components/public/lead-pathway.tsx` passes.
- `npm run build` passes.

## 12. Implementation Phases

### Phase 1 - Shared Engine

- Refactor `BrandScrollTrace` to support route variants.
- Add active and completed line layers.
- Ensure scroll progress updates on all pages.

### Phase 2 - Page Routes

- Create Home, About, and Get Involved route geometry.
- Integrate the route prop into each page.
- Tune line opacity, stroke width, and path geometry.

### Phase 3 - Validation

- Capture desktop and mobile screenshots.
- Confirm DOM path counts and scroll behavior.
- Confirm mobile no-overflow behavior.
- Document validation evidence.

## 13. Future Considerations

- Section-anchor based route segments for even tighter choreography.
- Lightweight active head marker if the line needs more directional affordance.
- A visual route editor for faster tuning.
- Optional page-specific route testing snapshots.

## 14. Risks And Mitigations

1. Risk: The line still competes with content.
   - Mitigation: Keep the route in negative space and reduce active opacity before reducing content clarity.
2. Risk: Page-specific paths become inconsistent.
   - Mitigation: Share stroke width, opacity, cap style, gradient, and ScrollTrigger behavior.
3. Risk: ScrollTrigger becomes stale after layout shifts.
   - Mitigation: Refresh after mount and use the full page container as the trigger.
4. Risk: Mobile becomes visually crowded.
   - Mitigation: Keep the large journey line hidden below desktop breakpoints.
5. Risk: QA screenshots miss animation behavior.
   - Mitigation: Probe DOM state for path counts, dash offsets, display state, and viewport width.
