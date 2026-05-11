# Plan: Issue 3 Homepage Hero, Proof, and Audience Routing

## Summary

Rebuild the homepage first impression around immediate comprehension: a clear LEAD promise, concise value copy, primary/secondary CTAs, early proof, partner credibility, and audience routing. Remove scroll locking and blank cinematic sections.

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `app/page.tsx` | UPDATE | Replace cinematic homepage with source-driven hero/routing |
| `lib/public-site/content.ts` | CREATE | Centralize proof, partner, and route content |
| `components/public/section-reveal.tsx` | CREATE | Controlled GSAP reveal wrapper |
| `components/public/network-accent.tsx` | CREATE | Subtle homepage 3D network accent |

## Tasks

1. Add shared homepage content data.
2. Rebuild hero with approved headline and CTAs.
3. Add proof strip, partner logo strip, and audience routing cards.
4. Validate responsive mobile layout and no scroll locking.

## Validation

- `npm run build`
- Visual screenshot for `/` desktop and mobile

## Acceptance Criteria

- [ ] Approved headline and support copy render.
- [ ] Join LEAD and Partner with us route correctly.
- [ ] Proof strip shows 1,135+ members, 14 chapters, 100+ events, LATAM + U.S.
- [ ] Partner logos appear early but restrained.
- [ ] Audience routes include Join LEAD, Build a Chapter, Partner with LEAD, Explore Programs.
- [ ] No scroll locking or blank spacer sections remain.
