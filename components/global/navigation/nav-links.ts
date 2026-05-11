export type PublicNavItem = {
  label: string;
  href: string;
};

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { label: "About", href: "/about-us" },
  { label: "Programs", href: "/#programs" },
  { label: "Chapters", href: "/get-involved#chapters" },
  { label: "Partners", href: "/get-involved#partners" },
  { label: "Impact", href: "/#impact" },
];

export const JOIN_LEAD_HREF =
  process.env.NEXT_PUBLIC_TALENT_PLATFORM_SIGNUP_URL ||
  "/get-involved#students";

export const isExternalHref = (href: string) => /^https?:\/\//.test(href);
