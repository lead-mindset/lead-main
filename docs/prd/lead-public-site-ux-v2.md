# PRD: LEAD Public Site UX/UI V2

Date: 2026-05-26
Branch: codex/lead-public-redesign
Repo: abigailbrionesa/leadmain

## Summary

Redesign the LEAD public site so it feels like one cohesive public gateway for a serious student movement and talent development ecosystem. The site must match the LEAD Talent Platform design language, preserve the creative energy of the original leadmindset.org site, and ground every page in LEAD's actual mission, programs, pathways, and operating model.

The public site should not feel like a generic nonprofit brochure or a disconnected marketing page. It should explain what LEAD is, route each visitor to the right action, and make the LEAD pathway feel alive through controlled video, photography, GSAP motion, and a restrained use of 3D.

## Source Of Truth

- LEAD LinkedIn positioning: "Empowering dreams: Bridging gaps, igniting STEM careers, and shaping brighter futures for all."
- LEAD official description: organization focused on empowering the next generation of leaders in LATAM and the United States through STEM education, leadership, and innovation.
- Career/lead docs: LEAD should move from events to pathways, from activity to impact, and from generic participation to proof of growth.
- SharePoint LEAD docs: Americas Board, Digital Transformation, Pulse, Partnerships, LEAD Peru, LEAD HER, STARS, chapter and website folders.
- LEAD Talent Platform strategy: students should feel "I am seen. I am guided. I am growing. I am closer to opportunity."
- Original leadmindset.org reference: keep the creative brand motion and visual energy, but reduce distraction and improve structure.

## Audience Priority

Primary audience: students.

Secondary audiences:

- Serious chapter founding teams
- Companies, professionals, mentors, and sponsors
- Community organizations
- Internal LEAD leadership and partners evaluating credibility

The homepage should center students first. Other audiences should be routed clearly after the hero rather than competing with the primary student message in the first screen.

## Core Positioning

Hero eyebrow:

Empowering dreams

Hero H1:

Building pathways for the next generation of leaders in STEM and innovation.

Hero subheadline:

LEAD empowers students across Latin America and the United States through STEM education, leadership development, mentorship, chapters, and access to opportunities that help them grow personally and professionally.

Primary CTA:

Join LEAD

Secondary CTA:

Explore pathways

Do not use "Latino students" as the primary hero subject because LEAD's own official description is broader. The site can still reflect LATAM and U.S. identity, but should not make the audience feel narrower than the mission.

## Design Direction

LEAD should feel like:

A serious, high-standard student movement with real institutional ambition.

Visual principles:

- Dark navy foundation for trust and continuity with LEAD Talent Platform.
- LEAD magenta, red, and purple as energetic accents.
- Real student photos and videos as the emotional center.
- Controlled GSAP linework that represents pathway and identity.
- One or two 3D moments total, used as atmosphere, not as competing content.
- Shadcn/Tailwind components should share the same token feel as LEAD Talent Platform.
- Dense but readable sections. Avoid huge empty dark stretches.
- No generic nonprofit template feel.

## UX Structure

### Homepage

1. Hero: define LEAD and center students.
2. LEAD Pathway: Learn, Explore, Aspire, Discover as the core product narrative.
3. Audience routing: Join as a student, Submit Chapter Interest, Partner with LEAD, Collaborate as a community organization.
4. Community proof: students, chapters, mentors, and real moments.
5. Impact proof: members, chapters, events, regional presence, major highlights.
6. Partners: show after value and impact, not before the site explains LEAD.
7. Final CTA: choose the right next step.

### About

About should be the conviction page, not a repeated homepage. It should answer:

- Why does LEAD exist?
- What does LEAD believe?
- How does LEAD operate?
- Who is building it?
- What proof supports the mission?

The scroll-following LEAD line should stay as a background identity element, not an overlay.

### Get Involved

Get Involved should act as a routing tool:

- Join as a student
- Submit Chapter Interest
- Partner with LEAD
- Collaborate as a community organization

Chapter interest must feel serious but not intimidating. The copy should make clear that submitting interest does not guarantee orientation, activation, or approval.

### Programs / Pathway

Learn, Explore, Aspire, Discover should become the organizing system:

- Learn: build foundations through STEM education, workshops, mentorship, and exposure to new skills.
- Explore: discover careers, industries, universities, companies, technologies, and possible futures.
- Aspire: grow leadership, confidence, ambition, and professional direction.
- Discover: find concrete next steps, opportunities, mentors, chapters, projects, internships, and community initiatives.

## Motion And Media Requirements

- Use GSAP only where motion clarifies hierarchy or reinforces LEAD identity.
- Use a scroll-driven pathway line for Learn, Explore, Aspire, Discover.
- Use real student/community video or photography in the hero and proof sections.
- Use Three.js in one or two controlled sections only.
- Respect `prefers-reduced-motion`.
- No motion should block reading, obscure cards, or feel like a foreground overlay.

## Conversion Requirements

Hero CTA:

- Primary: Join LEAD
- Secondary: Explore pathways

Audience routing:

- Student path goes to Talent Platform/join flow.
- Chapter path goes to selective interest flow.
- Partner path covers companies, professionals, mentors, and sponsors.
- Community organization path is visible and respected.

Forms:

- Keep forms contextual.
- Do not force all audiences into one generic form.
- Make follow-up expectations clear.

## Accessibility And Responsiveness

Acceptance requirements:

- No horizontal overflow at 390px, 834px, and 1440px.
- One H1 per page.
- Images have meaningful alt text or are correctly decorative.
- CTAs are keyboard reachable.
- Motion respects reduced motion settings.
- Text never overlaps cards, media, buttons, or scroll linework.
- Mobile pages should not contain giant empty sections caused by desktop motion layout.

## Non-Goals

- Do not rebuild the LEAD Talent Platform app.
- Do not add authentication or dashboards to the public site.
- Do not turn the homepage into a partner-first fundraising page.
- Do not copy the old leadmindset.org structure.
- Do not remove the creative motion identity entirely.

## GitHub Issue Breakdown

### Issue 1: Homepage Hero And LEAD Pathway

Implement the new hero and make Learn, Explore, Aspire, Discover the main homepage product narrative with a controlled scroll-driven pathway treatment.

Acceptance:

- Hero uses the approved positioning.
- Primary CTA is Join LEAD.
- Secondary CTA is Explore pathways.
- Learn/Explore/Aspire/Discover are clear, useful, and connected.
- Motion is controlled, behind content, and reduced-motion safe.

### Issue 2: Homepage Community, Proof, And Partner Flow

Reorder and strengthen homepage proof so community and impact explain LEAD before partner logos appear.

Acceptance:

- Partner logos do not appear before the pathway has been explained.
- Community proof uses real student media.
- Impact proof ties to major LEAD moments and official stats.
- Section order feels intentional on desktop and mobile.

### Issue 3: About And Get Involved UX Refinement

Align About and Get Involved with the same design system and conversion logic.

Acceptance:

- About acts as the conviction page.
- Get Involved acts as the routing/conversion page.
- Chapter interest copy clearly states selection is not guaranteed.
- Community organization path is explicit.
- Cross-page visual style feels unified.

### Issue 4: Responsive QA, Accessibility, And Final Polish

Validate the complete public site against responsive, accessibility, and motion criteria.

Acceptance:

- Desktop, tablet, and mobile screenshots are captured.
- No horizontal overflow.
- No duplicate React key warnings.
- No obvious text overlap.
- Motion works without creating empty dead zones.
- Final screenshots are saved for review.
