"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap-setup";

export type BrandScrollTraceRoute = "home" | "about" | "get-involved";

type JourneyRoute = {
  id: BrandScrollTraceRoute;
  path: string;
  viewBoxHeight: number;
  strokeWidth: number;
  trailOpacity: number;
  activeOpacity: number;
  reducedMotionOpacity: number;
};

const VIEWBOX_WIDTH = 1440;
const DEFAULT_VIEWBOX_HEIGHT = 6200;
const PATH_SAMPLE_COUNT = 1000;
const DRAW_ANCHOR_RATIO = 0.58;
const TRACE_PATH =
  "M-160 -180 C-20 240 90 640 0 1080 C-120 1510 -70 1950 30 2300 C105 2620 -10 2920 70 3240 C150 3650 -30 4000 160 4300 C450 4750 1200 4650 1450 5100 C1660 5480 900 5980 1560 6360";

const JOURNEY_ROUTES: Record<BrandScrollTraceRoute, JourneyRoute> = {
  home: {
    id: "home",
    path: TRACE_PATH,
    viewBoxHeight: DEFAULT_VIEWBOX_HEIGHT,
    strokeWidth: 64,
    trailOpacity: 0.14,
    activeOpacity: 0.48,
    reducedMotionOpacity: 0.2,
  },
  about: {
    id: "about",
    path: TRACE_PATH,
    viewBoxHeight: DEFAULT_VIEWBOX_HEIGHT,
    strokeWidth: 64,
    trailOpacity: 0.14,
    activeOpacity: 0.48,
    reducedMotionOpacity: 0.2,
  },
  "get-involved": {
    id: "get-involved",
    path: TRACE_PATH,
    viewBoxHeight: DEFAULT_VIEWBOX_HEIGHT,
    strokeWidth: 64,
    trailOpacity: 0.14,
    activeOpacity: 0.48,
    reducedMotionOpacity: 0.2,
  },
};

export function BrandScrollTrace({
  route = "home",
}: {
  route?: BrandScrollTraceRoute;
}) {
  const routeConfig = JOURNEY_ROUTES[route] ?? JOURNEY_ROUTES.home;
  const containerRef = useRef<HTMLDivElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const trailPath = trailPathRef.current;
    const activePath = activePathRef.current;

    if (!container || !trailPath || !activePath) return;

    const mm = gsap.matchMedia();
    const length = activePath.getTotalLength();

    trailPath.setAttribute("stroke-dasharray", String(length));
    trailPath.setAttribute("stroke-dashoffset", "0");
    activePath.setAttribute("stroke-dasharray", String(length));
    activePath.setAttribute("stroke-dashoffset", String(length));

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(trailPath, {
        opacity: routeConfig.trailOpacity,
      });
      gsap.set(activePath, {
        opacity: routeConfig.activeOpacity,
      });

      const samples = Array.from({ length: PATH_SAMPLE_COUNT + 1 }, (_, index) => {
        const distance = (length * index) / PATH_SAMPLE_COUNT;

        return {
          distance,
          y: activePath.getPointAtLength(distance).y,
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
        const rect = container.getBoundingClientRect();
        const viewportAnchor = window.innerHeight * DRAW_ANCHOR_RATIO;
        const viewportY = gsap.utils.clamp(
          0,
          routeConfig.viewBoxHeight,
          ((viewportAnchor - rect.top) / rect.height) * routeConfig.viewBoxHeight
        );
        const drawnDistance = distanceForY(viewportY);
        const strokeDashoffset = gsap.utils.clamp(
          0,
          length,
          length - drawnDistance
        );

        activePath.setAttribute("stroke-dashoffset", String(strokeDashoffset));
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: updateDrawnPath,
        onRefresh: updateDrawnPath,
      });

      updateDrawnPath();
      const refreshFrame = requestAnimationFrame(() => scrollTrigger.refresh());
      const refreshTimeout = window.setTimeout(() => scrollTrigger.refresh(), 250);

      return () => {
        cancelAnimationFrame(refreshFrame);
        window.clearTimeout(refreshTimeout);
        scrollTrigger.kill();
      };
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      activePath.setAttribute("stroke-dashoffset", String(length));

      gsap.set(trailPath, {
        opacity: routeConfig.reducedMotionOpacity,
      });
      gsap.set(activePath, {
        opacity: 0,
      });
    });

    return () => mm.revert();
  }, [routeConfig]);

  return (
    <div
      ref={containerRef}
      data-brand-scroll-trace
      data-brand-scroll-trace-route={routeConfig.id}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      style={{ zIndex: 1 }}
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${routeConfig.viewBoxHeight}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`lead-scroll-trace-${routeConfig.id}`} x1="-160" y1="0" x2="1560" y2="6200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--brand-logo-red-orange)" />
            <stop offset="0.48" stopColor="var(--brand-logo-magenta)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
        </defs>

        <path
          ref={trailPathRef}
          data-brand-scroll-trace-trail
          d={routeConfig.path}
          stroke={`url(#lead-scroll-trace-${routeConfig.id})`}
          strokeWidth={routeConfig.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={activePathRef}
          data-brand-scroll-trace-active
          d={routeConfig.path}
          stroke={`url(#lead-scroll-trace-${routeConfig.id})`}
          strokeWidth={routeConfig.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
