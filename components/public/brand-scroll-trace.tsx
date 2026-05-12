"use client";

import { useEffect, useRef } from "react";

import gsap from "@/lib/gsap-setup";

export function BrandScrollTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    const basePath = basePathRef.current;
    const path = pathRef.current;

    if (!ribbon || !basePath || !path) return;

    const length = path.getTotalLength();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(ribbon, {
        yPercent: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(basePath, {
        opacity: 0.012,
      });

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.24,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          end: "bottom 78%",
          scrub: 0.7,
        },
      });

      timeline
        .to(ribbon, { yPercent: 1.5, ease: "none" }, 0)
        .to(path, { strokeDashoffset: 0, ease: "none" }, 0);

      requestAnimationFrame(() => timeline.scrollTrigger?.refresh());

      return () => timeline.kill();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(basePath, { opacity: 0.05 });
      gsap.set(path, { autoAlpha: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 1440 4300"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lead-scroll-trace" x1="-160" y1="0" x2="1560" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
          <filter id="lead-scroll-soft-glow" x="-25%" y="-15%" width="150%" height="130%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.48  0 1 0 0 0.18  0 0 1 0 0.82  0 0 0 0.24 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={ribbonRef}>
          <path
            ref={basePathRef}
            d="M-120 150 C178 42 306 224 204 520 C104 812 -138 908 -56 1210 C64 1654 760 1540 1080 1320 C1328 1150 1430 1262 1548 1468 C1718 1766 1150 1998 718 2240 C318 2464 -86 2740 28 3200 C142 3660 942 3580 1548 3970"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
          <path
            ref={pathRef}
            d="M-120 150 C178 42 306 224 204 520 C104 812 -138 908 -56 1210 C64 1654 760 1540 1080 1320 C1328 1150 1430 1262 1548 1468 C1718 1766 1150 1998 718 2240 C318 2464 -86 2740 28 3200 C142 3660 942 3580 1548 3970"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="34"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
        </g>
      </svg>
    </div>
  );
}
