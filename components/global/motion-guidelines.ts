export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const PUBLIC_MOTION = {
  subtleDuration: 0.35,
  standardDuration: 0.6,
  stagger: 0.08,
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
