# Issues: Angela Feedback UX Clarity

Source PRD: `.github/PRDs/angela-feedback-ux-clarity.prd.md`

## Issue 1: Clarify Programs vs University Chapters

**Labels:** enhancement, ux, content  
**Complexity:** Small  
**Dependencies:** None

### Description
Programs and Chapters currently risk feeling like two similar buckets. Update public language so Programs read as experiences students join, while University Chapters read as university-based communities that start through a review conversation.

### Acceptance Criteria
- [x] Navigation and footer distinguish `University Chapters` where space allows.
- [x] Programs section copy emphasizes experiences students can participate in.
- [x] Chapter sections mention university/campus and review without overexplaining internal process.
- [x] Related route-card language avoids mixing Programs and Chapters.

---

## Issue 2: Fix Chapter Interest Form Clarity

**Labels:** enhancement, form, ux  
**Complexity:** Small  
**Dependencies:** Issue 1 recommended

### Description
Replace the ambiguous "Solo or with a team?" field with neutral language that asks for factual context without implying solo applications or a formal readiness stage.

### Acceptance Criteria
- [x] Public form no longer uses "Solo or with a team?"
- [x] Replacement label is `Who is building this with you?`
- [x] Helper text explains what to provide.
- [x] API payload remains stable unless a backend change is necessary.

---

## Issue 3: Fix Chapter Post-Submit and CTA Truth

**Labels:** bug, ux, accessibility  
**Complexity:** Medium  
**Dependencies:** Issue 2

### Description
Ensure post-submit messaging is clear and every visible CTA performs a real action. The chapter success state should say the LEAD team received the request and provide one useful next step.

### Acceptance Criteria
- [x] Chapter success state names `LEAD team`.
- [x] Chapter success state includes one soft next step to explore programs.
- [x] Explore the Pathway navigates to `/#pathway`.
- [x] Partner with LEAD navigates to `/get-involved#partners`.
- [x] No audited visible CTA is dead.

---

## Issue 4: Team Alignment Follow-Up Messages

**Labels:** product, operations, collaboration  
**Complexity:** Small  
**Dependencies:** Issues 1-3

### Description
Draft team messages that turn unresolved operational decisions into collaboration requests, especially with Christopher for chapter onboarding and Angela for validation.

### Acceptance Criteria
- [x] Christopher message asks what information is needed at first contact.
- [x] Angela message asks her to validate the revised flow and reinforces that feedback is welcome.
- [x] Antonny/Luis message frames strategic/process ownership questions.
- [x] Drafts are ready for the user to review before sending.
