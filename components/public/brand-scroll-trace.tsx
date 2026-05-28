"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap-setup";

const VIEWBOX_HEIGHT = 6200;
const PATH_SAMPLE_COUNT = 900;
const DRAW_ANCHOR_RATIO = 0.58;
const TRACE_PATH =
  "M-140 -173 C142 127 270 407 162 750 C34 1159 -112 1499 124 1817 C410 2203 920 1900 670 2232 C600 2437 590 2622 560 2852 C630 3127 780 3372 1050 3620 C1320 3873 1518 4217 1240 4540 C900 4943 462 5162 650 5638 C790 5993 1160 6056 1560 6344";

export function BrandScrollTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const length = path.getTotalLength();
      gsap.set(path, {
        opacity: 0.58,
      });
      path.setAttribute("stroke-dasharray", String(length));
      path.setAttribute("stroke-dashoffset", String(length));

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

      const updateDrawnPath = () => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportAnchor = window.innerHeight * DRAW_ANCHOR_RATIO;
        const viewportY = gsap.utils.clamp(
          0,
          VIEWBOX_HEIGHT,
          ((viewportAnchor - rect.top) / rect.height) * VIEWBOX_HEIGHT
        );
        const drawnDistance = distanceForY(viewportY);
        const strokeDashoffset = gsap.utils.clamp(
          0,
          length,
          length - drawnDistance
        );

        path.setAttribute("stroke-dashoffset", String(strokeDashoffset));
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: updateDrawnPath,
        onRefresh: updateDrawnPath,
      });

      updateDrawnPath();
      requestAnimationFrame(() => scrollTrigger.refresh());

      return () => {
        scrollTrigger.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(path, {
        opacity: 0.32,
      });
      path.setAttribute("stroke-dasharray", String(path.getTotalLength()));
      path.setAttribute("stroke-dashoffset", "0");
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      data-brand-scroll-trace
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      style={{ zIndex: 1 }}
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 1440 ${VIEWBOX_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lead-scroll-trace" x1="-160" y1="0" x2="1560" y2="6200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={TRACE_PATH}
          stroke="url(#lead-scroll-trace)"
          strokeWidth="76"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
