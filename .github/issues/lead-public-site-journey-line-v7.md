# Issues: LEAD Public Site Journey Line V7

Source PRD: `.github/PRDs/lead-public-site-journey-line-v7.prd.md`

GitHub issues:

- Issue 1: https://github.com/abigailbrionesa/leadmain/issues/35
- Issue 2: https://github.com/abigailbrionesa/leadmain/issues/36
- Issue 3: https://github.com/abigailbrionesa/leadmain/issues/37

## Issue 1 - Build Shared Journey-Line Engine

Problem:

- The current line is implemented as one generic decorative trace.
- It does not provide a reusable system for page-specific routes, completed trail, and active scroll-linked drawing.
- Secondary pages can appear static because the visible route does not meaningfully change with the reader's scroll position.

Files:

- `components/public/brand-scroll-trace.tsx`

Acceptance criteria:

- Component supports route variants without duplicating rendering logic.
- Component renders a subtle completed trail and a stronger active drawn path.
- Active path updates from scroll progress on every page where the component is mounted.
- Reduced-motion users receive a stable non-distracting line state.
- Mobile keeps the large line hidden.

Complexity: Medium

Dependencies: None

Validation:

- Targeted ESLint for the component and affected pages.
- Production build.
- DOM probe confirms one journey-line system per page and changing dash offsets after scroll.

## Issue 2 - Add Page-Specific Journey Routes

Problem:

- The same route shape cannot guide Home, About, and Get Involved equally well.
- A margin-only route feels decorative instead of guiding the eye.
- A universal route can collide with copy, media, cards, or calls to action.

Files:

- `components/public/brand-scroll-trace.tsx`
- `app/page.tsx`
- `app/about-us/page.tsx`
- `app/get-involved/page.tsx`

Acceptance criteria:

- Home uses a route that supports ecosystem discovery and pathway orientation.
- About uses a route that supports mission, community proof, and leadership trust.
- Get Involved uses a route that supports role selection and action paths.
- Routes share the same LEAD visual language but use page-specific geometry.
- Routes travel through negative space and avoid primary copy/media collisions.

Complexity: Medium

Dependencies: Issue 1

Validation:

- Desktop screenshots for Home, About, and Get Involved.
- DOM probes confirm the correct route is mounted on each page.
- Visual inspection confirms the line is not acting like a pathway-only artifact.

## Issue 3 - Validate Responsive Motion And Evidence Pack

Problem:

- The journey line is a visual and motion feature; code-only validation is insufficient.
- The implementation needs evidence that desktop scroll behavior, mobile hiding, and page consistency all work.

Files:

- `.github/plans/lead-public-site-journey-line-v7-validation.plan.md`
- Optional local QA evidence under `.agents/qa/`

Acceptance criteria:

- Desktop screenshots cover Home, About, and Get Involved.
- Mobile screenshots confirm the large journey line is hidden and no horizontal overflow is introduced.
- Validation results include ESLint and production build output.
- GitHub issues receive implementation/validation notes.

Complexity: Small

Dependencies: Issues 1 and 2

Validation:

- `npx eslint app/page.tsx app/about-us/page.tsx app/get-involved/page.tsx components/public/brand-scroll-trace.tsx components/public/lead-pathway.tsx`
- `npm run build`
- Desktop and mobile screenshot probes.
