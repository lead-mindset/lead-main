"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap-setup";

const VIEWBOX_HEIGHT = 4300;
const PATH_SAMPLE_COUNT = 900;
const DRAW_ANCHOR_RATIO = 0.62;

type BrandScrollTraceProps = {
  suppressWithin?: string;
};

export function BrandScrollTrace({ suppressWithin }: BrandScrollTraceProps) {
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
      const shouldSuppressTrace = () => {
        const suppressedElement = suppressWithin
          ? document.querySelector<HTMLElement>(suppressWithin)
          : null;
        const suppressedRect = suppressedElement?.getBoundingClientRect();

        return !!suppressedRect && suppressedRect.top < window.innerHeight && suppressedRect.bottom > 0;
      };

      const setTraceVisibility = () => {
        gsap.set(ribbon, { autoAlpha: shouldSuppressTrace() ? 0 : 1 });
      };

      gsap.set(ribbon, {
        autoAlpha: shouldSuppressTrace() ? 0 : 1,
        yPercent: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(basePath, {
        opacity: 0.1,
      });

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.58,
      });

      const samples = Array.from({ length: PATH_SAMPLE_COUNT + 1 }, (_, index) => {
        const distance = (length * index) / PATH_SAMPLE_COUNT;
        return {
          distance,
          y: path.getPointAtLength(distance).y,
        };
      });

      const distanceForY = (targetY: number) => {
        if (targetY <= samples[0].y) return 0;

        for (let index = 1; index < samples.length; index += 1) {
          const previous = samples[index - 1];
          const current = samples[index];
          const minY = Math.min(previous.y, current.y);
          const maxY = Math.max(previous.y, current.y);

          if (targetY >= minY && targetY <= maxY) {
            const span = current.y - previous.y;
            const progress = span === 0 ? 0 : (targetY - previous.y) / span;
            return previous.distance + (current.distance - previous.distance) * progress;
          }
        }

        return length;
      };

      const updateTrace = () => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportAnchor = window.innerHeight * DRAW_ANCHOR_RATIO;
        const sectionProgress = gsap.utils.clamp(0, 1, (viewportAnchor - rect.top) / rect.height);
        const targetY = sectionProgress * VIEWBOX_HEIGHT;
        const drawnDistance = distanceForY(targetY);
        const offset = gsap.utils.clamp(0, length, length - drawnDistance);

        gsap.set(path, { strokeDashoffset: offset });
        gsap.set(ribbon, {
          autoAlpha: shouldSuppressTrace() ? 0 : 1,
          yPercent: sectionProgress * 1.5,
        });
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: updateTrace,
        onRefresh: updateTrace,
      });

      const suppressionTrigger = suppressWithin
        ? ScrollTrigger.create({
            trigger: suppressWithin,
            start: "top bottom",
            end: "bottom top",
            onEnter: setTraceVisibility,
            onEnterBack: setTraceVisibility,
            onLeave: setTraceVisibility,
            onLeaveBack: setTraceVisibility,
            onRefresh: setTraceVisibility,
            onUpdate: setTraceVisibility,
          })
        : null;

      updateTrace();
      requestAnimationFrame(() => {
        scrollTrigger.refresh();
        suppressionTrigger?.refresh();
      });

      return () => {
        scrollTrigger.kill();
        suppressionTrigger?.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(basePath, { opacity: 0.12 });
      gsap.set(path, { autoAlpha: 0 });
    });

    return () => mm.revert();
  }, [suppressWithin]);

  return (
    <div
      ref={containerRef}
      data-brand-scroll-trace
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 1440 ${VIEWBOX_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lead-scroll-trace" x1="-160" y1="0" x2="1560" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
        </defs>

        <g ref={ribbonRef}>
          <path
            ref={basePathRef}
            d="M-120 150 C178 42 306 224 204 520 C104 812 -138 908 -56 1210 C64 1654 760 1540 1080 1320 C1328 1150 1430 1262 1548 1468 C1718 1766 1150 1998 718 2240 C318 2464 -86 2740 28 3200 C142 3660 942 3580 1548 3970"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="76"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={pathRef}
            d="M-120 150 C178 42 306 224 204 520 C104 812 -138 908 -56 1210 C64 1654 760 1540 1080 1320 C1328 1150 1430 1262 1548 1468 C1718 1766 1150 1998 718 2240 C318 2464 -86 2740 28 3200 C142 3660 942 3580 1548 3970"
            stroke="url(#lead-scroll-trace)"
            strokeWidth="76"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
}
