# Angela Feedback UX Clarity PRD

## Executive Summary
The LEAD public website redesign received positive feedback on brand identity, authenticity, and the clarity of the student/chapter direction. Angela also identified four trust and usability gaps: Programs and Chapters feel mixed, the chapter interest form has an ambiguous team question, some Impact/header CTAs appear inactive, and the post-submit chapter flow does not explain what happens next.

The MVP goal is to make the site clearer without inventing internal chapter operations. The public experience should distinguish Programs from University Chapters, set honest expectations for chapter interest review, make every CTA actionable, and give the team a clean internal decision loop for unresolved operational ownership.

## Mission
Make the LEAD website feel polished, honest, and team-aligned by reducing ambiguity at the moments where users decide what action to take.

Core principles:
- Student-first clarity over internal-process exposure.
- Honest expectations: chapter interest starts a review conversation, not automatic approval.
- No dead CTAs.
- Do not hardcode operational ownership until the LEAD team validates it.
- Use feedback as a collaboration loop, not as a solo execution checklist.

## Target Users
- **Prospective student:** wants to join LEAD, understand programs, and see where they fit.
- **University chapter builder:** already has interest or a student group and wants to know how to bring LEAD to their university.
- **Partner, mentor, company, or community organization:** wants to support students through one clear collaboration path.
- **LEAD internal reviewer:** Angela, Christopher, Antonny, Luis, and operations team members reviewing whether public copy matches real operations.

Pain points:
- Users may not understand the difference between Programs and Chapters.
- Chapter interest language can imply a solo application path that LEAD may not actually support.
- Inactive buttons reduce trust.
- Post-submit messaging can leave users unsure what happens next.

## MVP Scope
- [x] Clarify Programs as student experiences and University Chapters as campus communities.
- [x] Rename public navigation and footer references where the distinction matters.
- [x] Replace ambiguous "Solo or with a team?" copy with neutral factual language.
- [x] Keep post-submit owner as "LEAD team" until internal routing is decided.
- [x] Add a soft next step after successful chapter interest submission.
- [x] Fix CTA links so visible actions navigate, scroll, or open a real flow.
- [x] Draft team messages to validate operational decisions with Christopher, Angela, Antonny, and Luis.

Out of scope:
- [ ] Defining the final chapter approval workflow.
- [ ] Choosing final request owner or routing rules.
- [ ] Adding readiness-stage fields to the form.
- [ ] Building a CRM, Supabase, SharePoint, or dashboard intake system.
- [ ] Adding donation functionality.

## User Stories
1. As a prospective student, I want Programs to read like experiences I can join so I do not confuse them with university chapters.
2. As a university chapter builder, I want the Chapters section to clearly explain that chapters are university-based and reviewed by LEAD.
3. As someone submitting chapter interest, I want the form language to ask for factual context without assuming the stage of my process.
4. As someone who submits the form, I want to know that the LEAD team received it and what useful next step I can take.
5. As a first-time visitor, I want every CTA to do something predictable so I can trust the site.
6. As a LEAD team member, I want proposed operational decisions separated from website copy so we can validate the process together.

## Core Architecture
High-level approach:
- Keep backend API behavior stable.
- Update shared public content and navigation sources rather than one-off page copy.
- Preserve current design system, button system, modal patterns, and route anchors.
- Use local documentation artifacts to keep the feedback loop traceable.

Relevant directories:
- `app/`
- `components/global/`
- `components/public/`
- `lib/public-site/`
- `.github/PRDs/`
- `.github/issues/`
- `.github/plans/`

## Tools/Features
### Programs vs University Chapters clarity
- Programs copy should emphasize experiences students join: workshops, summits, visits, mentorship, bootcamps, and learning moments.
- Chapters copy should emphasize university-based communities and review.

### Chapter form clarity
- Replace "Solo or with a team?" with "Who is building this with you?"
- Helper/context should clarify that users can share names, roles, or a short description of involved students.
- Keep the submitted payload field name stable for now to avoid backend churn.

### Post-submit clarity
- Chapter success state should say the request was received by the LEAD team.
- Add one soft next step: Explore LEAD programs.
- Do not name Christopher, operations, country managers, or chapter presidents in the public success state until confirmed.

### CTA truth audit
- Explore the Pathway should navigate to `/#pathway`.
- Partner with LEAD should navigate to `/get-involved#partners`.
- Chapter interest should open the chapter interest modal or navigate to the chapter section.

### Team alignment
- Draft messages should invite Christopher's onboarding perspective and Angela's validation without implying the decisions are already final.

## Technology Stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Nodemailer API route for contact submission

## Security & Configuration
- No new auth behavior.
- No new secrets.
- Existing env vars:
  - `EMAIL_USER`
  - `EMAIL_PASS`
  - `NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL`
- Public copy should not reveal internal routing details before they are approved.

## API Specification
Existing endpoint remains:

`POST /api/contact`

Chapter payload fields remain:
- `intent`
- `name`
- `email`
- `university`
- `location`
- `teamStatus`
- `motivation`
- `intendedImpact`
- `profile`

The `teamStatus` field label changes publicly, but the API key remains stable.

## Success Criteria
- Programs and University Chapters are distinguishable from nav through section copy.
- The chapter form no longer asks "Solo or with a team?"
- Chapter success state names "LEAD team" and offers one useful next step.
- No visible primary CTA in the audited public flow is inactive.
- Lint and production build pass.
- Team messages are ready for user review before sending.

## Implementation Phases
1. **Public language clarity**
   - Update navigation, footer, Programs, and Chapters copy.
2. **Chapter form and success flow**
   - Replace ambiguous label and add post-submit next step.
3. **CTA truth audit**
   - Verify and fix hero/final route CTA destinations.
4. **Team alignment draft**
   - Produce messages for Christopher, Angela, Antonny, and Luis.

## Future Considerations
- Route chapter interest into a shared inbox, CRM, Supabase table, or SharePoint list after ownership is approved.
- Add response-time expectations only after the team commits to an SLA.
- Add readiness-stage fields only after Christopher validates what information helps onboarding.
- Add analytics events to measure CTA clicks and form completion.

## Risks & Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| The site invents an internal process | Users get wrong expectations | Use "LEAD team" publicly and validate ownership internally |
| Chapters still feel like programs | Users pick the wrong path | Use "University Chapters" in nav and campus/review language in copy |
| The form asks too much too early | Users abandon | Keep fields factual and neutral |
| CTAs appear clickable but do nothing | Trust drops | Audit each visible action |
| Team feels excluded from decisions | Collaboration suffers | Draft feedback messages and request validation before deeper process changes |
