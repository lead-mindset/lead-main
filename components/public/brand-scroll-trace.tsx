"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "@/lib/gsap-setup";

export function BrandScrollTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
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
          opacity: 0.06,
        });

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length * 0.82,
          opacity: 0.12,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });

        timeline
          .to(ribbon, { yPercent: 5, ease: "none" }, 0)
          .to(path, { strokeDashoffset: length * 0.08, ease: "none" }, 0);

        return () => timeline.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(basePath, { opacity: 0.09 });
        gsap.set(path, { autoAlpha: 0 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden h-dvh w-screen overflow-hidden md:block"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lead-scroll-trace" x1="40" y1="80" x2="1500" y2="820" gradientUnits="userSpaceOnUse">
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
            d="M-160 128 C150 24 292 136 260 316 C230 486 -84 520 -72 716 C-52 980 520 950 754 742 C944 574 838 382 1018 298 C1198 210 1326 420 1548 328"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
          <path
            ref={pathRef}
            d="M-160 128 C150 24 292 136 260 316 C230 486 -84 520 -72 716 C-52 980 520 950 754 742 C944 574 838 382 1018 298 C1198 210 1326 420 1548 328"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
        </g>
      </svg>
    </div>
  );
}
