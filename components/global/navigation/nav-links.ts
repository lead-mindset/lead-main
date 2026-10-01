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
