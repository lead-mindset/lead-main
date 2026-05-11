"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "@/lib/gsap-setup";

export function BrandScrollTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const ribbon = ribbonRef.current;
      const basePath = basePathRef.current;
      const path = pathRef.current;
      const head = headRef.current;

      if (!ribbon || !basePath || !path || !head) return;

      const length = path.getTotalLength();
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(ribbon, {
          yPercent: -5,
          transformOrigin: "50% 50%",
        });

        gsap.set(basePath, {
          opacity: 0.1,
        });

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length * 0.72,
          opacity: 0.18,
        });

        gsap.set(head, {
          autoAlpha: 0.34,
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: 0.1,
            end: 0.1,
          },
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
          .to(path, { strokeDashoffset: length * 0.08, ease: "none" }, 0)
          .to(
            head,
            {
              ease: "none",
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                start: 0.1,
                end: 0.9,
              },
            },
            0
          );

        return () => timeline.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(basePath, { opacity: 0.09 });
        gsap.set([path, head], { autoAlpha: 0 });
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
          <linearGradient id="lead-scroll-trace" x1="95" y1="90" x2="1390" y2="810" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
          <filter id="lead-scroll-soft-glow" x="-25%" y="-45%" width="150%" height="190%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.48  0 1 0 0 0.18  0 0 1 0 0.82  0 0 0 0.38 0"
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
            d="M-82 164 C205 12 381 123 402 292 C428 504 110 484 154 660 C206 869 646 820 786 640 C904 488 770 336 936 248 C1120 152 1250 412 1518 274"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
          <path
            ref={pathRef}
            d="M-82 164 C205 12 381 123 402 292 C428 504 110 484 154 660 C206 869 646 820 786 640 C904 488 770 336 936 248 C1120 152 1250 412 1518 274"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lead-scroll-soft-glow)"
          />
          <circle
            ref={headRef}
            r="12"
            fill="var(--brand-logo-red-orange)"
            filter="url(#lead-scroll-soft-glow)"
          />
        </g>
      </svg>
    </div>
  );
}
