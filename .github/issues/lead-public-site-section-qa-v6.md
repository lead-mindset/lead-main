# Issues: LEAD Public Site Section QA V6

## Issue 1 - Fix Impact Counter Motion Legibility

Problem:
- The counter animation can show scrambled or half-rolled digits as users scroll.
- This makes LEAD's proof numbers feel less trustworthy.

Files:
- `components/public/starfield-impact-counters.tsx`

Acceptance criteria:
- Counters animate on viewport entry.
- Values remain readable during and after animation.
- Reduced motion shows final values immediately.
- No layout shift.

Validation:
- Desktop/mobile screenshots of Home impact section.
- `npm run lint`
- `npm run build`

## Issue 2 - Fix Mobile Highlight Carousel Clipping

Problem:
- The LEAD Highlights carousel auto-marquees on mobile, causing active cards to be clipped at the viewport edge.

Files:
- `components/public/lead-highlights-carousel.tsx`
- `app/globals.css`

Acceptance criteria:
- Mobile shows a full highlight card aligned to the page gutter.
- Desktop keeps moving-carousel behavior.
- Cards remain readable and media-forward.

Validation:
- Desktop/mobile screenshots of Home highlights section.
- `npm run lint`
- `npm run build`

## Issue 3 - Integrate Partner Marquee Surface

Problem:
- The partner marquee light band is too abrupt after dark navy content.
- It feels disconnected from the rest of the LEAD visual system.

Files:
- `components/public/partner-logo-marquee.tsx`
- `app/globals.css`

Acceptance criteria:
- Partner band remains lighter but uses a navy-tinted lavender surface.
- Section transition is softened.
- Logo pills remain high contrast and premium.

Validation:
- Desktop/mobile screenshots of Home chapters and partners sections.
- `npm run lint`
- `npm run build`

## Issue 4 - Polish About Values And Leadership

Problem:
- Growth Standards value titles are too low-contrast.
- Leadership cards are oversized on desktop and portraits crop awkwardly.

Files:
- `app/about-us/page.tsx`

Acceptance criteria:
- Value titles read as intentional, not faded.
- Leadership grid is denser on desktop.
- Portrait crops are more consistent.
- Mobile leadership remains usable.

Validation:
- Desktop/mobile screenshots of About values and leadership sections.
- `npm run lint`
- `npm run build`

## Issue 5 - Improve Programs Default Media Frame

Problem:
- The first visible program video can land on a subtitle-heavy frame, which looks accidental in a polished public-site section.

Files:
- `components/public/programs-video-carousel.tsx`

Acceptance criteria:
- The default active program starts on a cleaner video frame.
- LEAD HER remains available as a selectable program.
- The section stays video-first and does not add CTA buttons.

Validation:
- Desktop/mobile screenshots of Home programs section.
- `npm run lint`
- `npm run build`
