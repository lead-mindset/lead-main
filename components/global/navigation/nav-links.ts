export type PublicNavItem = {
  label: string;
  href: string;
};

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Get Involved", href: "/get-involved" },
];

export const JOIN_LEAD_HREF =
  process.env.NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL ||
  "/get-involved#students";

export const isExternalHref = (href: string) => /^https?:\/\//.test(href);

// Platforms menu
// Each platform URL comes from its own env var. An empty var shows the
// platform as "Coming soon" with no link. NEXT_PUBLIC_ vars are inlined at
// build time, so a change in Vercel needs a redeploy.

const envUrl = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const PLATFORM_URLS = {
  aspire: envUrl(process.env.NEXT_PUBLIC_ASPIRE_URL),
  talent: envUrl(process.env.NEXT_PUBLIC_TALENT_URL),
  shop: envUrl(process.env.NEXT_PUBLIC_SHOP_URL),
  pulse: envUrl(process.env.NEXT_PUBLIC_PULSE_URL),
  operations: envUrl(process.env.NEXT_PUBLIC_OPERATIONS_URL),
  eventsManager: envUrl(process.env.NEXT_PUBLIC_EVENTS_MANAGER_URL),
};

export type PlatformId = keyof typeof PLATFORM_URLS;

export type PlatformItem = {
  id: PlatformId;
  label: string;
  description: string;
  href?: string;
};

export type PlatformGroup = {
  id: string;
  label: string;
  restricted?: boolean;
  items: PlatformItem[];
};

export const PLATFORMS_MENU_TITLE = "LEAD platforms";

export const PLATFORM_GROUPS: PlatformGroup[] = [
  {
    id: "members",
    label: "For members",
    items: [
      { id: "aspire", label: "LEAD Aspire", description: "Student days", href: PLATFORM_URLS.aspire },
      { id: "talent", label: "LEAD Talent", description: "Your profile, seen by recruiters", href: PLATFORM_URLS.talent },
      { id: "shop", label: "LEAD Shop", description: "Official merch and chapter apparel", href: PLATFORM_URLS.shop },
    ],
  },
  {
    id: "team",
    label: "For the LEAD team",
    restricted: true,
    items: [
      { id: "pulse", label: "LEAD Pulse", description: "Culture surveys and questionnaires", href: PLATFORM_URLS.pulse },
      { id: "operations", label: "LEAD Operations", description: "Finance, budgets, and reimbursements", href: PLATFORM_URLS.operations },
      { id: "eventsManager", label: "LEAD Events Manager", description: "Plan events, registrations, and photos", href: PLATFORM_URLS.eventsManager },
    ],
  },
];

// Sign in goes to its own URL when set, otherwise to LEAD Talent.
// With neither set, the Sign in button is hidden.
export const SIGN_IN_HREF = envUrl(process.env.NEXT_PUBLIC_SIGN_IN_URL) ?? PLATFORM_URLS.talent;

export const SHOP_HREF = PLATFORM_URLS.shop;
