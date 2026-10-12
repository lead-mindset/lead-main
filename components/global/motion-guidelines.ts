export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const PUBLIC_MOTION = {
  ease: "power3.out",
  sectionStart: "top 88%",
  cardStart: "top 96%",
  text: {
    y: 14,
    duration: 0.62,
    stagger: 0.055,
  },
  card: {
    y: 22,
    scale: 0.985,
    duration: 0.68,
    stagger: 0.07,
    batchInterval: 0.08,
  },
} as const;

export const PUBLIC_MOTION_SELECTORS = {
  text: [
    "[data-lead-motion='text']",
    ".eyebrow-label",
    ".display-title",
    ".public-hero-title",
    ".section-title",
    ".feature-title",
    ".section-subtitle",
    ".body-copy",
  ].join(", "),
  card: [
    "[data-lead-motion='card']",
    "article",
    "figure",
    ".role-path-card",
    ".partner-media-panel",
    ".lead-marquee-window",
    ".lead-highlights-track > article",
    "[role='listitem']",
    "[role='tab']",
  ].join(", "),
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
