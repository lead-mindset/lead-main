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
        yPercent: -5,
        transformOrigin: "50% 50%",
      });

      gsap.set(basePath, {
        opacity: 0.075,
      });

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length * 0.68,
        opacity: 0.16,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.7,
        },
      });

      timeline
        .to(ribbon, { yPercent: 4, ease: "none" }, 0)
        .to(path, { strokeDashoffset: length * 0.04, ease: "none" }, 0);

      return () => timeline.kill();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(basePath, { opacity: 0.08 });
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
      <div className="sticky top-0 h-dvh w-screen overflow-hidden">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="lead-scroll-trace" x1="-140" y1="0" x2="1560" y2="880" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
              <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
              <stop offset="1" stopColor="var(--primary)" />
            </linearGradient>
            <filter id="lead-scroll-soft-glow" x="-25%" y="-45%" width="150%" height="190%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="14" result="blur" />
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
              d="M-118 36 C56 80 104 202 88 358 C64 592 -110 638 -88 786 C-54 1018 536 986 956 858 C1228 776 1396 728 1568 790"
              stroke="url(#lead-scroll-trace)"
              strokeWidth="46"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lead-scroll-soft-glow)"
            />
            <path
              ref={pathRef}
              d="M-118 36 C56 80 104 202 88 358 C64 592 -110 638 -88 786 C-54 1018 536 986 956 858 C1228 776 1396 728 1568 790"
              stroke="url(#lead-scroll-trace)"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lead-scroll-soft-glow)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
