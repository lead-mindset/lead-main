# LEAD Public Site Full UX/UI Audit

Audit date: 2026-05-28
Branch: `codex/lead-public-redesign`
Local URL: `http://localhost:3056`

## Evidence

Screenshots were captured for `/`, `/about-us`, and `/get-involved` at desktop, tablet, and mobile.

- Audit data: `.agents/audit/full-site-ux-2026-05-28/audit-data.json`
- Contact sheets: `.agents/audit/full-site-ux-2026-05-28/contact-sheets/`
- Interaction screenshots: `.agents/audit/full-site-ux-2026-05-28/interactions/`

## Executive Summary

The site now has a strong LEAD visual identity: dark navy foundation, real media, the LEAD logo color system, 3D/scroll moments, and a clearer ecosystem story than the earlier placeholder-heavy version. The strongest moments are the home hero, impact counters, regional planet, pathway typography, real media in programs, and the get-involved rocket hero.

The remaining issues are mostly system-level UX polish:

- The shared final CTA appears dim and low-priority on all pages, especially mobile.
- Get Involved has the right journey, but the middle sections still feel heavier than the actual user decision path.
- Dialog forms work, but mobile headers and close controls need more care.
- Some accessibility targets and footer links are too small when evaluated as tappable UI.

## Section Audit

### Home

Hero: Strong and emotionally clear. The video background supports the mission and the headline is understandable. Mobile is readable and the two CTAs are obvious.

Impact counters: Visually memorable and aligned with the earlier LEAD star/number inspiration. The rolling numbers work. Mobile stacks cleanly.

Regional footprint: The planet is useful and the labels are readable. The section does its job quickly.

Pathway: The Learn/Explore/Aspire/Discover identity is one of the strongest parts of the site. It is scannable and brand-ownable. It should remain simple.

Programs: After the cropping fix, videos are no longer awkwardly sliced. The carousel is usable, but the right-side selector can still feel like a dense list on mobile.

Chapters: Good concise copy and the chapter video helps trust. Needs dialog consistency with the Get Involved version.

Partners marquee: Clean and short. The section does not over-explain.

Highlights: Good use of real images and movement. It is visually richer than static cards.

Final CTA: Weakest home section. The cards look visually disabled because of low contrast and the scroll trace darkens the actions. On mobile, the heading can be hidden under the fixed nav when scrolled directly.

### About

Hero: Strong image and headline. Copy is aligned with LEAD: talent already exists, access should be too.

Mission/Vision: Clear, but very conventional. It is acceptable because the media immediately below adds warmth.

Community moments: Real videos make the story human. The section works.

Ecosystem logic: Useful, but abstract. It reads more internally than user-facing. Keep it concise.

Team: Good trust-building content. Mobile becomes long, but that is expected for a full team section. The circular portraits match the provided reference.

Final CTA: Same issue as home: too dim, low hierarchy, not enough confidence.

### Get Involved

Hero: Strong. The rocket object creates identity without putting too many CTAs in the first viewport.

Role picker: The intent is right. Cards are smaller than before, but they still compete with deeper sections because they repeat role copy.

Student path: Clear, useful, and trustworthy because it pairs video with steps.

Chapters: Copy is correct, but the four value cards feel like an internal approval rubric. This should be lighter and more concise.

Partners: The selector works, but mobile gives more attention to the selector than the human trust media. The section needs stronger balance.

Final CTA: Same shared issue. It should feel like a confident action hub, not a dim footer card.

## Critical and Major Findings

### P1: Shared final CTA looks disabled and low-trust

Affected: Home, About, Get Involved.

Evidence:
- `home-mobile-next-step.png`
- `about-us-mobile-next-step.png`
- `get-involved-mobile-next-step.png`

Why it matters: This is the last decision point. A distracted user may interpret the cards as disabled or secondary instead of active paths.

Recommendation: Rebuild the CTA as a clear action hub with one primary path, high-contrast labels, strong hover/focus states, and enough top padding/scroll margin for fixed nav.

### P1: Get Involved middle journey still feels heavier than the user decision

Affected: `/get-involved` roles, chapters, partners.

Evidence:
- `get-involved-mobile-roles.png`
- `get-involved-mobile-chapters.png`
- `get-involved-mobile-partners.png`

Why it matters: The page should reduce anxiety and route users quickly. Bulky cards make the user re-process the same role structure multiple times.

Recommendation: Keep the role picker concise, make chapter values an inline trust checklist, and make partner media/CTA feel more visible and balanced.

### P1: Dialog forms need mobile polish and consistent escape routes

Affected: Home chapter modal, Get Involved chapter/partner modals.

Evidence:
- `home-chapter-dialog.png`
- `mobile-partner-dialog.png`

Why it matters: Forms are high-friction moments. Overlapped headers or inconsistent close controls reduce trust.

Recommendation: Add a top close button to the home chapter dialog, reserve title space beside close icons, use sticky submit/status consistently, and keep mobile form copy compact.

### P2: Footer and secondary links are readable but small as touch targets

Affected: Footer on all pages, mobile keyboard/touch audit.

Evidence:
- `keyboard-report.json`

Why it matters: Footer links are not primary conversion paths, but users still expect them to be easy to tap.

Recommendation: Add vertical padding to footer links and preserve consistent focus rings.

## Accessibility Findings

- Primary buttons and modal form controls are labeled and keyboard reachable.
- Icon-only buttons generally have `aria-label`.
- Footer links measure around 18px high in the accessibility/touch audit; add padding.
- Mobile menu links meet 44px height when open.
- Dialog close control is inconsistent: Get Involved has an icon close, Home chapter dialog only exposes a bottom Close action.
- Dynamic carousel controls have labels, but the carousel content itself should remain understandable without relying on motion.

## Overall Product Feel

The site feels much more like LEAD now: ambitious, creative, real, and community-centered. The best sections feel cinematic and student-first. The weakest moments are where the design returns to low-contrast card grids and internal-process language. The next round should make the action paths sharper, the forms calmer, and the final conversion moment more confident.

Baseline product score: 7.8/10
Baseline design-system consistency: 8.0/10
Baseline mobile UX: 7.0/10
Baseline accessibility confidence: 7.4/10
