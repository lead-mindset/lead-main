# Plan: Issue 7 Partner Path and Structured Forms

## Summary

Add segmented partner paths and progressive structured forms for chapter interest and partnership inquiries. Harden the contact API so submissions carry intent and avoid unsafe generic HTML interpolation.

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `app/get-involved/page.tsx` | UPDATE | Add partner path and form placement |
| `components/public/interest-form.tsx` | CREATE | Progressive chapter/partner form UI |
| `app/api/contact/route.ts` | UPDATE | Validate structured payloads and send safe email text/html |
| `lib/public-site/content.ts` | UPDATE | Add partner type content |

## Tasks

1. Add Company, Professional or Mentor, and Community Organization partner cards.
2. Add progressive partnership form.
3. Add progressive chapter interest form.
4. Update API validation and structured intent payload handling.
5. Validate accessible labels, required fields, and local no-email fallback.

## Validation

- `npm run build`
- Manual form submission check

## Acceptance Criteria

- [ ] Partner path segments three partner types.
- [ ] Required form fields validate.
- [ ] Submissions distinguish chapter interest from partnership.
- [ ] API no longer interpolates unsafe generic HTML directly.
