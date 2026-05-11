"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "@/lib/gsap-setup";

export function BrandScrollTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const head = headRef.current;

      if (!path || !head) return;

      const length = path.getTotalLength();
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length * 0.96,
        });

        gsap.set(head, {
          autoAlpha: 1,
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 0,
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
          .to(path, { strokeDashoffset: 0, ease: "none" }, 0)
          .to(
            head,
            {
              ease: "none",
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1,
              },
            },
            0
          );

        return () => timeline.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
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
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-dvh w-28 md:block lg:w-36"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 132 760"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lead-scroll-trace" x1="62" y1="0" x2="62" y2="760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.55" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
          <filter id="lead-scroll-glow" x="-80%" y="-20%" width="260%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.48  0 1 0 0 0.18  0 0 1 0 0.82  0 0 0 0.7 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d="M73 88 C28 134 26 184 72 222 C102 248 102 288 68 328 C35 368 34 416 72 456 C104 492 106 536 70 578 C38 616 34 668 58 710 C69 730 91 742 122 744"
          stroke="url(#lead-scroll-trace)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lead-scroll-glow)"
          opacity="0.92"
        />
        <circle
          ref={headRef}
          r="5.5"
          fill="var(--brand-logo-red-orange)"
          opacity="0"
          filter="url(#lead-scroll-glow)"
        />
      </svg>
    </div>
  );
}
