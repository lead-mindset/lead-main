# Plan: Issue #2 LEAD Public Design System Foundation

## Summary

Build the shared public-site foundation for `leadmain` so all later redesign issues can compose pages from one cohesive LEAD system instead of one-off section styling. The work should align `leadmain` with the LEAD Talent Platform's visual language by normalizing public tokens, primitive component variants, public navigation, a restrained footer, layout containers, and motion/accessibility guardrails. This issue should not rebuild homepage, About, or Get Involved content sections; it creates the reusable system those issues will use.

## User Story

As a returning visitor  
I want the LEAD public site and Talent Platform to feel visually related  
So that I trust they are part of the same LEAD ecosystem

## Metadata

| Field | Value |
|-------|-------|
| Type | ENHANCEMENT / REFACTOR |
| Complexity | MEDIUM |
| Systems Affected | Global CSS tokens, UI primitives, public navigation, layout shell, footer, motion/accessibility conventions |
| GitHub Issue | #2 |
| Parent PRD | #1 |
| Jira Issue | N/A |

---

## Patterns to Follow

### Current `leadmain` Token Surface

```css
// SOURCE: app/globals.css:7-47
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}
```

Use this existing Tailwind 4 token bridge. Normalize the values beneath it instead of introducing a parallel CSS system.

### Token Bug To Fix

```css
// SOURCE: app/globals.css:61-62
--muted: oklch(97.015% 0.00011 271.152 / 0.557)
--muted-foreground: oklch(0.556 0 0);
```

The missing semicolon must be corrected as part of the foundation pass.

### Avoid Global Semantic Text Overrides

```css
// SOURCE: app/globals.css:92-100
p  {
  @apply text-lg
}
h3 {
  @apply text-xl
}
h1 {
  @apply text-3xl
}
```

Replace these with explicit reusable typography utilities. Global semantic overrides are risky for compact controls, cards, nav, and future dense surfaces.

### Talent Platform Button Contract

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/components/ui/button.tsx:7-48
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        outline:
          "border border-border bg-background shadow-xs hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/85",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        brand:
          "button-gradient-primary rounded-full font-semibold text-primary-foreground shadow-sm hover:shadow-md",
        hero:
          "button-gradient-primary rounded-full px-7 font-semibold text-primary-foreground shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-11 rounded-lg px-6 text-base has-[>svg]:px-5",
        icon: "size-10",
      },
    },
  }
)
```

Mirror the calm sizing, stable hover behavior, and optional brand/hero variants. Avoid `leadmain`'s current huge default button text and hover-scale as the baseline.

### Current `leadmain` Button Problem

```tsx
// SOURCE: components/ui/button.tsx:8-23
const buttonVariants = cva(
  "focus-visible:border-ring cursor-pointer focus-visible:ring-ring/50 ... rounded-4xl ... transition-all ...",
  {
    variants: {
      variant: {
        default: "from-primary to-chart-2 bg-gradient-to-r text-primary-foreground hover:scale-105",
      },
      size: {
        default: "text-2xl lg:text-4xl  gap-1.5 px-4 py-3 ...",
        lg: "h-10 gap-1.5 text-xl px-4 ...",
      },
    },
  }
)
```

Bring the default button back to product-grade dimensions. Reserve rounded/full-gradient treatment for explicit public CTA variants.

### Talent Platform Card Contract

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/components/ui/card.tsx:7-24
const cardVariants = cva(
  "relative flex flex-col gap-5 overflow-hidden rounded-lg border border-border bg-card py-5 text-card-foreground shadow-xs transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "",
        featured: "border-primary/25 bg-primary/5 shadow-sm",
        interactive: "cursor-pointer hover:border-primary/30 hover:bg-card/95 hover:shadow-sm",
        glass: "border-border bg-card/80 backdrop-blur",
      },
    },
  }
)
```

Use this calmer card model. Page sections should not become nested/floating card stacks; cards should be bounded repeated items, forms, or tools.

### Talent Platform Badge Contract

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/components/ui/badge.tsx:7-36
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary ring-1 ring-primary/20 [a&]:hover:bg-primary/20",
        success:
          "bg-success/10 text-success ring-1 ring-success/30 focus-visible:ring-success/20 dark:bg-success/10 dark:focus-visible:ring-success/40 [a&]:hover:bg-success/20",
        warning:
          "bg-warning/10 text-warning ring-1 ring-warning/30 focus-visible:ring-warning/20 dark:bg-warning/10 dark:focus-visible:ring-warning/40 [a&]:hover:bg-warning/20",
        info:
          "bg-info/10 text-info ring-1 ring-info/30 focus-visible:ring-info/20 dark:bg-info/10 dark:focus-visible:ring-info/40 [a&]:hover:bg-info/20",
      },
    },
  }
)
```

Issue #2 can add the semantic variants, even if later issues decide exact domain mappings.

### Section Label Primitive

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/components/ui/section-label.tsx:21-40
export function SectionLabel({ 
  children, 
  variant = "accent", 
  size = "md",
  className, 
  ...props 
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-bold uppercase mb-4 block",
        sectionLabelVariants[variant],
        sectionLabelSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
```

Create this in `leadmain` so all later sections can share the same public eyebrow treatment.

### Layout Container Primitive

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/components/global/main-container.tsx:4-40
interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export function MainContainer({ 
  children, 
  className,
  maxWidth = '5xl',
  ...props 
}: MainContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-[30rem]',
    md: 'max-w-[35rem]',
    lg: 'max-w-[40rem]',
    xl: 'max-w-[45rem]',
    '2xl': 'max-w-[53rem]',
    '3xl': 'max-w-[60rem]',
    '4xl': 'max-w-[70rem]',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-[72rem]',
    '7xl': 'max-w-[80rem]',
  };

  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth], className)} {...props}>
      {children}
    </div>
  );
}
```

Create an equivalent `MainContainer` for `leadmain`.

### Public Nav Pattern

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/app/[locale]/(public)/_components/navbar-client.tsx:68-111
<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-14 items-center justify-between gap-3">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        aria-label="LEAD Talent Platform home"
      >
        <Image src="/leadl2.svg" alt="LEAD" width={36} height={36} className="object-contain" priority />
        <span className="pl-1 text-base font-semibold tracking-tight text-foreground">LEAD</span>
      </Link>

      <nav className="hidden flex-1 items-center gap-1 px-2 md:flex" aria-label={authLabels.primaryNav}>
        {visibleLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              isActive(link.href)
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {getNavLabel(link.label)}
          </Link>
        ))}
      </nav>
    </div>
  </div>
</header>
```

Adapt this for a static public site with no auth role logic or i18n routing.

### Current `leadmain` Mobile Nav Problem

```tsx
// SOURCE: components/global/navigation/NavHeader.tsx:31-44
export default function NavHeader() {
  return (
    <header className="h-fit fixed w-full top-0 left-0 z-50 ">
      <nav className="flex w-full relative ">
        <NavBar menuItems={menuItems} />
        <div className="ml-auto flex items-center space-x-2 absolute">
          <div className="hidden"> 
            <div>
            </div>
            <MobMenu menuItems={menuItems} />
          </div>
        </div>
      </nav>
    </header>
  );
}
```

The mobile menu is rendered inside `hidden`. Replace the navigation shell rather than patching this structure.

### Footer Pattern

```tsx
// SOURCE: C:/Users/abiga/Downloads/leadtalentplatform/app/[locale]/(public)/_components/footer.tsx:43-90
return (
  <footer className="border-t border-border/20 bg-card pb-10 pt-20">
    <MainContainer>
      <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-6">
        <div className="col-span-2">
          <Image
            src="/leadl2.svg"
            alt="LEAD"
            width={100}
            height={32}
            className="mb-6 h-8 w-auto object-contain brightness-0 invert opacity-80"
          />
          <p className="mb-6 pr-4 text-muted-foreground">
            {copy.description}
          </p>
        </div>
        ...
      </div>
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row">
        <p className="text-sm text-muted-foreground">&copy; 2026 LEAD Americas. {copy.rights}</p>
      </div>
    </MainContainer>
  </footer>
);
```

Use the same structural idea, but with `leadmain` public links: About, Programs, Chapters, Partners, Impact, Join LEAD, social/contact.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `app/globals.css` | UPDATE | Normalize tokens, typography utilities, gradients, reduced-motion baseline, and remove risky global text overrides |
| `app/layout.tsx` | UPDATE | Use cleaned font variables, add footer after children, and remove unnecessary global GSAP import side effect if no longer needed for the shell |
| `components/ui/button.tsx` | UPDATE | Bring base button contract closer to Talent Platform and add explicit public CTA variants |
| `components/ui/card.tsx` | UPDATE | Replace decorative gradient default with calmer reusable card variants |
| `components/ui/badge.tsx` | UPDATE | Add compact semantic badge variants aligned with Talent Platform |
| `components/ui/input.tsx` | REVIEW/UPDATE | Ensure form input styling matches the new primitive contract if needed for later issues |
| `components/ui/textarea.tsx` | REVIEW/UPDATE | Ensure textarea styling matches the new primitive contract if needed for later issues |
| `components/ui/label.tsx` | REVIEW/UPDATE | Ensure labels remain accessible and visually aligned |
| `components/ui/section-label.tsx` | CREATE | Add shared public section eyebrow primitive |
| `components/global/main-container.tsx` | CREATE | Add shared max-width/padding layout primitive |
| `components/global/footer.tsx` | CREATE | Add restrained public footer with LEAD identity, paths, social/contact, and copyright |
| `components/global/navigation/NavHeader.tsx` | UPDATE | Replace current hidden-mobile shell with static public navigation wrapper |
| `components/global/navigation/NavBar.tsx` | UPDATE | Convert to public static desktop/mobile nav or simplify if NavHeader absorbs the whole shell |
| `components/global/navigation/DesktopMenu.tsx` | REVIEW/UPDATE | Keep only if dropdown support is needed; otherwise simplify/remove usage |
| `components/global/navigation/MobMenu.tsx` | UPDATE | Replace with accessible mobile drawer/dropdown pattern using the same public nav items |
| `components/global/navigation/nav-links.ts` | CREATE | Centralize public navigation labels, hrefs, and CTA destination |
| `components/global/motion-guidelines.ts` | CREATE | Document/export reduced-motion selectors or constants for later GSAP/Three.js issues if useful |
| `.env.example` | CREATE/UPDATE | Document `NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL` if using env-configurable Join LEAD destination |

---

## Tasks

Execute in order. Each task is atomic and verifiable.

### Task 1: Centralize public links and CTA destination

- **File**: `components/global/navigation/nav-links.ts`
- **Action**: CREATE
- **Implement**:
  - Export public nav items: About, Programs, Chapters, Partners, Impact.
  - Export a `JOIN_LEAD_HREF` constant.
  - Prefer `process.env.NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL` with a safe fallback placeholder/path agreed in implementation.
  - Include external-link metadata if the Talent Platform URL is absolute.
- **Mirror**: Talent Platform's static public link model from `app/[locale]/(public)/_components/nav-links.ts` and nav rendering in `app/[locale]/(public)/_components/navbar-client.tsx:93-111`.
- **Validate**: `npm run build`

### Task 2: Normalize global tokens and typography utilities

- **File**: `app/globals.css`
- **Action**: UPDATE
- **Implement**:
  - Fix the missing semicolon on `--muted`.
  - Align base tokens with the Talent Platform dark public feel while preserving current LEAD brand colors.
  - Add explicit fluid typography utility classes such as `fluid-hero`, `fluid-h1`, `fluid-h2`, `fluid-h3`, `fluid-body`, and `fluid-body-lg`.
  - Avoid negative letter spacing in new utilities if following the current higher-level design instruction, despite the reference app using slight negative tracking.
  - Remove or narrow global `p`, `h1`, `h3` overrides so primitives and compact UI are not unexpectedly resized.
  - Add reusable gradient utilities only if needed by public CTA variants, e.g. `button-gradient-primary`.
  - Preserve the current `prefers-reduced-motion` baseline and ensure it covers transitions/scroll behavior.
- **Mirror**: `leadmain` token bridge at `app/globals.css:7-47`; Talent Platform typography/tokens at `app/[locale]/globals.css:6-20`, `app/[locale]/globals.css:155-174`.
- **Validate**: `npm run build`

### Task 3: Update Button primitive to product-grade defaults

- **File**: `components/ui/button.tsx`
- **Action**: UPDATE
- **Implement**:
  - Replace huge default text sizing with Talent Platform-like dimensions.
  - Keep `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`.
  - Add `brand` and/or `hero` variants for public CTA moments.
  - Avoid hover scale on default buttons; reserve any stronger effect for explicit public CTA variant if used at all.
  - Preserve `asChild`.
  - Optionally add `icon` and `iconPosition` props only if they do not cause broad churn; otherwise leave icon composition to children.
- **Mirror**: Talent Platform `components/ui/button.tsx:7-48`, and current `asChild` contract in `components/ui/button.tsx:37-57`.
- **Validate**: `npm run build`

### Task 4: Update Card primitive to calm reusable variants

- **File**: `components/ui/card.tsx`
- **Action**: UPDATE
- **Implement**:
  - Change default card from gradient-heavy `rounded-2xl` treatment to a calmer bordered card.
  - Add variants for `featured`, `interactive`, and `glass` if useful for later public sections.
  - Keep exported subcomponents and their names stable.
  - Keep cards suitable for repeated items, forms, and contained tools, not page-section wrappers.
- **Mirror**: Talent Platform `components/ui/card.tsx:7-24`, current exports in `components/ui/card.tsx:86-94`.
- **Validate**: `npm run build`

### Task 5: Update Badge primitive to semantic compact variants

- **File**: `components/ui/badge.tsx`
- **Action**: UPDATE
- **Implement**:
  - Normalize base badge shape to compact `rounded-md`.
  - Add semantic variants: `success`, `warning`, `info`, `neutral`, and `count`.
  - Keep `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
  - Preserve `asChild`.
  - Avoid decorative badges as a default; style should communicate metadata/status.
- **Mirror**: Talent Platform `components/ui/badge.tsx:7-36`.
- **Validate**: `npm run build`

### Task 6: Add shared public layout and section primitives

- **File**: `components/global/main-container.tsx`
- **Action**: CREATE
- **Implement**:
  - Add a typed `MainContainer` with `maxWidth` options and standard responsive padding.
- **Mirror**: Talent Platform `components/global/main-container.tsx:4-40`.
- **Validate**: `npm run build`

- **File**: `components/ui/section-label.tsx`
- **Action**: CREATE
- **Implement**:
  - Add `SectionLabel` with `accent`, `primary`, and `muted` variants.
  - Keep it simple and reusable for later page sections.
- **Mirror**: Talent Platform `components/ui/section-label.tsx:21-40`.
- **Validate**: `npm run build`

### Task 7: Rebuild public navigation shell

- **File**: `components/global/navigation/NavHeader.tsx`
- **Action**: UPDATE
- **Implement**:
  - Remove the hidden mobile wrapper.
  - Render one sticky/fixed public nav shell with backdrop/border treatment.
  - Use centralized nav links.
  - Ensure nav exposes About, Programs, Chapters, Partners, Impact, and Join LEAD.
  - Ensure `Join LEAD` is visually prominent.
- **Mirror**: Talent Platform public navbar in `app/[locale]/(public)/_components/navbar-client.tsx:68-111`.
- **Validate**: `npm run build`

- **File**: `components/global/navigation/NavBar.tsx`
- **Action**: UPDATE
- **Implement**:
  - Either keep as the client component that handles active link/mobile open state, or move all behavior into `NavHeader` and simplify this file.
  - Use `usePathname` for active route/anchor best effort if retained as a client component.
  - Use `Button` for Join LEAD.
  - Keep logo alt text as `LEAD`, not `Next.js Logo`.
- **Mirror**: Talent Platform public navbar link/focus pattern at `app/[locale]/(public)/_components/navbar-client.tsx:72-110`.
- **Validate**: `npm run build`

### Task 8: Rebuild mobile navigation

- **File**: `components/global/navigation/MobMenu.tsx`
- **Action**: UPDATE
- **Implement**:
  - Replace the current full-screen framer-motion drawer with a compact accessible mobile menu or update it to match the Talent Platform's simpler pattern.
  - Include `aria-label`, `aria-expanded`, and close-on-link-click behavior.
  - Include `Join LEAD` as a full-width primary action.
  - Avoid undefined classes like `bg-gm-gray`.
  - Prefer CSS transitions or very light framer-motion; do not introduce GSAP here.
- **Mirror**: Talent Platform mobile menu pattern at `app/[locale]/(public)/_components/navbar-client.tsx:140-180`.
- **Validate**: `npm run build`

### Task 9: Add public footer and wire it into layout

- **File**: `components/global/footer.tsx`
- **Action**: CREATE
- **Implement**:
  - Add a restrained footer with LEAD logo, `Learn · Explore · Aspire · Discover`, short description, quick links, get-involved links, social/contact links, and copyright.
  - Use `MainContainer`.
  - Keep visual weight lower than page content.
- **Mirror**: Talent Platform footer structure at `app/[locale]/(public)/_components/footer.tsx:43-90`.
- **Validate**: `npm run build`

- **File**: `app/layout.tsx`
- **Action**: UPDATE
- **Implement**:
  - Import and render `Footer` after `{children}`.
  - Keep `NavHeader` before `{children}`.
  - Remove unnecessary `../lib/gsap-setup` global import if implementation confirms components import GSAP setup directly where needed; otherwise leave a comment-free import path that does not trigger lint warnings.
  - Guard `GoogleAnalytics` so a missing `NEXT_PUBLIC_GA_ID` does not rely on non-null assertion in production builds if practical.
- **Mirror**: Current layout structure at `app/layout.tsx:26-40`.
- **Validate**: `npm run build`

### Task 10: Review form primitives for foundation alignment

- **File**: `components/ui/input.tsx`
- **Action**: REVIEW/UPDATE
- **Implement**:
  - Ensure default input is compatible with the new token system and future `/get-involved` forms.
  - Keep stable focus-visible behavior and readable text on dark backgrounds.
- **Mirror**: Talent Platform `components/ui/input.tsx:6-31`.
- **Validate**: `npm run build`

- **File**: `components/ui/textarea.tsx`
- **Action**: REVIEW/UPDATE
- **Implement**:
  - Ensure textarea matches input radius/border/focus style.
- **Mirror**: Talent Platform `components/ui/textarea.tsx:1-16`.
- **Validate**: `npm run build`

- **File**: `components/ui/label.tsx`
- **Action**: REVIEW/UPDATE
- **Implement**:
  - Ensure label styling remains compact, readable, and accessible.
- **Mirror**: Talent Platform `components/ui/label.tsx:1-20`.
- **Validate**: `npm run build`

### Task 11: Add motion/accessibility guardrail module or documentation

- **File**: `components/global/motion-guidelines.ts` or `lib/motion.ts`
- **Action**: CREATE
- **Implement**:
  - Export simple constants/helpers for reduced-motion media query names, animation durations, or CSS class names if useful.
  - Include short comments only where they guide later issue #8 implementation.
  - Do not implement GSAP timelines in issue #2.
- **Mirror**: PRD #1 and issue #2 acceptance criteria; current reduced-motion CSS at `app/globals.css:103-110`.
- **Validate**: `npm run build`

### Task 12: Document environment variable for Join LEAD destination

- **File**: `.env.example`
- **Action**: CREATE/UPDATE
- **Implement**:
  - Add `NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL=`.
  - Add a one-line comment if the file exists and comment style is already used.
  - Do not commit real deployment URLs or secrets unless already public and intended.
- **Mirror**: Existing package uses `NEXT_PUBLIC_GA_ID` in `app/layout.tsx:38`; make public destination similarly explicit.
- **Validate**: `npm run build`

---

## Risks

| Risk | Mitigation |
|------|------------|
| Later page issues depend on components changed here | Keep exports stable for `Button`, `Card`, `Badge`, `Input`, `Textarea`, and `Label`; add variants rather than removing widely-used names |
| Existing pages visually shift before their redesign issues | Favor primitives that still support current usage; use explicit CTA variants for new look rather than making every card/button heroic |
| Current lint failures are unrelated to issue #2 | Run lint and document remaining pre-existing failures if they are outside touched files; fix any lint introduced by issue #2 |
| `NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL` may be unknown | Provide env fallback and use a clearly documented placeholder path until deployment URL is known |
| Mobile nav may duplicate DesktopMenu/MobMenu complexity | Prefer replacing with a simpler static public nav rather than preserving unused submenu behavior |
| Global typography utilities could violate broader design rule against viewport-scaled fonts | Use conservative fixed/responsive Tailwind sizes where possible; if fluid utilities are added, keep them for hero/section-level text only and avoid control text |
| `radix-ui` imports differ from Talent Platform `@radix-ui/react-slot` | Keep using the installed local `radix-ui` package style unless package changes are intentionally added |

---

## Validation

```bash
# Production build and type validation
npm run build

# Lint
npm run lint
```

Notes:

- This repo does not currently define a test script or test framework.
- `npm run lint` was already failing before this plan due to React hook/compiler rules in animation components. The issue #2 implementation should at minimum avoid adding new lint failures in touched files and should document any remaining pre-existing failures.
- If a later implementation adds a test runner, prefer behavior tests for nav links, CTA hrefs, footer links, and primitive rendering rather than visual implementation internals.

---

## Acceptance Criteria

- [ ] Shared public layout/container patterns are available for all public pages.
- [ ] Public navigation exposes About, Programs, Chapters, Partners, Impact, and Join LEAD on desktop and mobile.
- [ ] Join LEAD is visually prominent and routes to the configured Talent Platform signup/onboarding destination.
- [ ] Footer repeats the major paths, social/contact links, and LEAD identity in a restrained way.
- [ ] Core button, card, badge, form, section label, spacing, radius, and typography treatment aligns with the Talent Platform design language.
- [ ] Public pages can remain warmer and more visual than logged-in product pages while clearly sharing the same LEAD system.
- [ ] Reduced-motion and accessibility rules are documented in the shared implementation patterns.
- [ ] `npm run build` passes.
- [ ] `npm run lint` either passes or reports only documented pre-existing failures outside the issue #2 touched files.
