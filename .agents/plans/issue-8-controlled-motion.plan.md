# Plan: Issue 8 Controlled GSAP and Three.js Motion

## Summary

Replace distracting scroll architecture with selected, cleanup-safe motion. Motion should enhance comprehension without driving navigation.

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `components/public/section-reveal.tsx` | CREATE | GSAP reveal with reduced-motion guard |
| `components/public/network-accent.tsx` | CREATE | Controlled Three.js homepage accent |
| `app/page.tsx` | UPDATE | Use controlled accent/reveals |
| `app/about-us/page.tsx` | UPDATE | Use controlled reveals only |
| `app/get-involved/page.tsx` | UPDATE | Use controlled reveals only |

## Tasks

1. Add cleanup-safe `useGSAP` reveal wrapper.
2. Add one controlled homepage network accent.
3. Remove scroll locking, scroll hijacking, pinned blanks, and animation-dependent comprehension.
4. Respect reduced-motion preferences.

## Validation

- `npm run build`
- Visual reduced-motion check

## Acceptance Criteria

- [ ] GSAP is selected and cleanup-safe.
- [ ] Three.js is limited to controlled accent use.
- [ ] Reduced-motion users keep all content visible.
