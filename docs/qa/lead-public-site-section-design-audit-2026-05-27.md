# LEAD Public Site Section Design Audit - 2026-05-27

## Evidence

- Desktop contact sheet: `.agents/qa/section-design-audit-20260527/desktop-all-sections-contact-sheet.png`
- Mobile contact sheet: `.agents/qa/section-design-audit-20260527/mobile-all-sections-contact-sheet.png`
- Raw QA data: `.agents/qa/section-design-audit-20260527/qa-results.json`
- Final validation desktop contact sheet: `.agents/qa/section-design-audit-20260527-v6-final2/desktop-all-sections-contact-sheet.png`
- Final validation mobile contact sheet: `.agents/qa/section-design-audit-20260527-v6-final2/mobile-all-sections-contact-sheet.png`
- Final validation QA data: `.agents/qa/section-design-audit-20260527-v6-final2/qa-results.json`
- Routes audited: `/`, `/about-us`, `/get-involved`
- Viewports audited: `1440x960`, `390x844`

## Automated QA Baseline

- H1 count: one H1 on each audited route.
- Horizontal overflow: none detected on desktop or mobile.
- Missing image alt text: none detected.
- Console errors: none detected.
- Failed requests: one failed request on the Home route. It should be investigated during final polish, but it is not currently breaking visual rendering.

## Post-Remediation Validation

- `npm run lint`: pass.
- `npm run build`: pass.
- Final screenshots captured from `http://localhost:3012`.
- Final desktop and mobile QA showed one H1 per page, no horizontal overflow, and zero images missing alt text.
- The final pass fixed the main visible trust-breakers: counter readability, mobile highlight clipping, partner marquee cropping on mobile, About leadership density, value-title contrast, and the subtitle-heavy default Programs frame.

## Design System Standard

The site should feel like one LEAD ecosystem:

- Navy is the base surface, not a decorative option.
- Red, magenta, and purple are accents for meaning, motion, and emphasis.
- Raleway carries display and section hierarchy; Montserrat carries body, labels, and UI.
- Creative moments should be concentrated: video hero, Earth, pathway line, rocket, counters, and moving media. Text-only card walls should be avoided.
- White or light surfaces must be integrated with transitions and borders so they do not look pasted into the navy site.

## Home

### Hero

What works:
- The video-first direction is the correct trust signal. It feels more real than abstract graphics.
- The headline is clear and student-centered.
- The first viewport is much closer to the desired Apple-style cinematic direction.

What is wrong:
- The media is still heavily darkened. On desktop, the hero can read as a dark poster more than a real LEAD moment.
- The hero is strong enough that the next section should transition smoothly into proof. Any abrupt color band below it weakens the opening.

Improve:
- Keep the video background.
- Avoid adding more hero text.
- Use contrast through controlled scrim, not by drowning the media.

### Impact Counters

What works:
- Three metric blocks are the right amount.
- Slightly different gradients match the LEAD color family.

What is wrong:
- The rolling digits are visually broken mid-scroll in screenshots. The user can catch numbers in unreadable states, which damages trust.
- The section has no text clutter now, which is good, so the numbers must be perfect.

Improve:
- Keep the animated entry.
- Make the numeric animation readable at every frame, or shorten it so quickly that users see the final number almost immediately.
- Preserve final values and labels: members, university chapters, events organized.

### Regional Footprint

What works:
- The Earth is one of the strongest controlled 3D moments.
- Labels are attached and the scale is now more intentional.
- Stars belong here and should remain isolated to the canvas moment.

What is wrong:
- The surrounding dark card can feel isolated from the rest of the page, but this is a minor issue.

Improve:
- Keep this section mostly as is.
- Continue validating mobile framing after any layout changes.

### Student Pathway

What works:
- The Learn, Explore, Aspire, Discover display is a strong LEAD identity moment.
- The colored stage system matches the original LEAD graphic language.
- Pinning the pathway intro reduces cognitive load.

What is wrong:
- The mobile section is long. It works only if the scroll animation feels intentional.
- The line and stage highlights should stay behind the content and never feel like an overlay.

Improve:
- Keep the current direction.
- Avoid adding more explanation.

### Programs And Experiences

What works:
- Video-first program cards are much stronger than text cards.
- Switching programs instead of showing every program at once is correct.

What is wrong:
- One visible video frame contains burned subtitle text in the center, which looks accidental and unpolished.
- On mobile, the carousel is tall and can feel like a long pause before the next section.

Improve:
- Pick cleaner video poster moments or use stills when a video frame has distracting text.
- Keep program switching intuitive and button-free.

### Chapters And Partners

What works:
- The chapter ask is concise and avoids exposing internal process.
- A request-first path is correct because chapter approval is selective.

What is wrong:
- The partner marquee begins as a hard light band directly after dark content. It feels disconnected from the rest of the LEAD site.
- Logo pills feel clipped by the marquee and the surface does not share enough of the navy/purple system.

Improve:
- Keep a lighter partner background, but blend it through navy-tinted lavender, border, and softer section rhythm.
- Make the partner band feel like part of the same design system.

### LEAD Highlights

What works:
- A moving carousel is the right format for impact.
- Real images create trust and make the site feel alive.

What is wrong:
- Mobile auto-marquee captures cards halfway offscreen. This cuts text and makes the section feel broken.

Improve:
- Use motion on desktop.
- Use manual scroll-snap on mobile so each highlight starts cleanly inside the viewport.

### Final CTA

What works:
- The current CTA is much more cohesive after removing the red glow.
- The navy/purple surface now feels closer to LEAD Talent Platform.

What is wrong:
- It remains tall on mobile, but not critical.

Improve:
- Keep this as a stable pattern.

## About Us

### Hero

What works:
- Real media, clear mission framing, and a direct access message.
- The page starts with credibility.

What is wrong:
- The text block is safe, but could still be more emotionally sharp later.

Improve:
- No urgent visual fix.

### Proof Rail

What works:
- The card system provides quick evidence without overwhelming the page.
- The section uses the same typography as Home.

What is wrong:
- It is visually dense near the hero. This is acceptable, but should not become the template for every section.

Improve:
- Keep.

### Community Proof

What works:
- Strong media/editorial direction.
- Good balance of big proof image and supporting moments.

What is wrong:
- Minor density issue only.

Improve:
- Keep.

### Mission And Vision

What works:
- The editorial two-column layout is simple and readable.
- Photo strip below prevents a text wall.

What is wrong:
- None critical.

Improve:
- Keep.

### Growth Standards

What works:
- The values are correct for organizational seriousness.
- Numbered list is more mature than generic cards.

What is wrong:
- Value titles are too low-contrast. They look faded, not intentionally quiet.

Improve:
- Increase title contrast while staying inside the LEAD purple system.
- Keep the section calm and structured.

### Ecosystem Logic

What works:
- This section explains why LEAD is more than events.
- The numbered logic format is useful.

What is wrong:
- It is text-heavy on mobile.

Improve:
- No urgent visual fix, but avoid adding more copy.

### Leadership

What works:
- It is good that LEAD shows real people.

What is wrong:
- Desktop leadership cards are oversized and the portraits crop awkwardly.
- The section feels closer to a generic directory than the polished media language used elsewhere.

Improve:
- Reduce card weight.
- Make image crops consistent.
- Tighten grid density on desktop.

## Get Involved

### Hero

What works:
- The rocket gives the page a distinctive first impression.
- The hero asks users to choose a role, which is the right user-flow strategy.

What is wrong:
- On mobile the rocket can feel partially cut if the viewport lands too high.

Improve:
- Keep the rocket, but continue validating first viewport framing.

### Role Chooser

What works:
- Four user paths are the right IA: student, chapter, partner, collaborator.
- Cards below the hero reduce first-screen friction.

What is wrong:
- Mobile requires a lot of vertical scanning before the user sees all paths.

Improve:
- Keep the format but avoid making role cards taller.

### Student Path

What works:
- Clear and useful.
- Visual hierarchy is aligned with public site typography.

What is wrong:
- None critical.

Improve:
- Keep.

### Chapter Interest

What works:
- The request-first language is right.
- The page avoids over-explaining internal selection mechanics.

What is wrong:
- The section can still feel like another dark card group if too much supporting text is added.

Improve:
- Keep concise.

### Partner Paths

What works:
- The tabbed model is better than a wall of partnership cards.
- The image gives credibility.

What is wrong:
- On mobile, the visual and intro can push the actual partner choices low.

Improve:
- Compress cautiously only if this becomes a conversion problem.

### Final CTA

What works:
- Cohesive with current CTA system.

What is wrong:
- None critical.

Improve:
- Keep.

## Priority Fixes

1. Fix impact counter readability.
2. Fix mobile highlight carousel clipping.
3. Smooth the chapter-to-partner transition and lighten the partner band without disconnecting it.
4. Improve About Growth Standards contrast and Leadership card crops/density.
5. Make the Programs default media frame cleaner and less subtitle-heavy.
