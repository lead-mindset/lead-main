"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap-setup";

export type BrandScrollTraceRoute = "home";

type JourneyRoute = {
  id: BrandScrollTraceRoute;
  path: string;
  viewBoxHeight: number;
  strokeWidth: number;
  trailOpacity: number;
  activeOpacity: number;
  reducedMotionOpacity: number;
};

type RoutePoint = readonly [number, number];

const VIEWBOX_WIDTH = 1440;
const DEFAULT_VIEWBOX_HEIGHT = 6200;
const PATH_SAMPLE_COUNT = 1200;
const VIEWPORT_ANCHOR_RATIO = 0.56;
const ACTIVE_SEGMENT_RATIO = 0.1;
const ACTIVE_SEGMENT_MIN_LENGTH = 420;
const ACTIVE_SEGMENT_MAX_LENGTH = 720;

function smoothRoutePath(points: readonly RoutePoint[], tension = 0.86) {
  if (points.length < 2) return "";

  const [startX, startY] = points[0];
  const commands = [`M${startX} ${startY}`];

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const current = points[index];
    const next = points[index + 1];
    const following = points[Math.min(points.length - 1, index + 2)];

    const controlOneX = current[0] + ((next[0] - previous[0]) / 6) * tension;
    const controlOneY = current[1] + ((next[1] - previous[1]) / 6) * tension;
    const controlTwoX = next[0] - ((following[0] - current[0]) / 6) * tension;
    const controlTwoY = next[1] - ((following[1] - current[1]) / 6) * tension;

    commands.push(
      `C${Math.round(controlOneX)} ${Math.round(controlOneY)} ${Math.round(controlTwoX)} ${Math.round(controlTwoY)} ${next[0]} ${next[1]}`
    );
  }

  return commands.join(" ");
}

const HOME_TRACE_PATH = smoothRoutePath([
  [-180, -220],
  [1540, 760],
  [980, 2020],
  [1540, 3280],
  [640, 4440],
  [-170, 5480],
  [1560, 6420],
]);

const JOURNEY_ROUTES: Record<BrandScrollTraceRoute, JourneyRoute> = {
  home: {
    id: "home",
    path: HOME_TRACE_PATH,
    viewBoxHeight: DEFAULT_VIEWBOX_HEIGHT,
    strokeWidth: 64,
    trailOpacity: 0.08,
    activeOpacity: 0.4,
    reducedMotionOpacity: 0.14,
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
    const samples = Array.from({ length: PATH_SAMPLE_COUNT + 1 }, (_, index) => {
      const distance = (length * index) / PATH_SAMPLE_COUNT;
      const point = activePath.getPointAtLength(distance);

      return {
        distance,
        y: point.y,
      };
    });
    const activeSegmentLength = gsap.utils.clamp(
      ACTIVE_SEGMENT_MIN_LENGTH,
      ACTIVE_SEGMENT_MAX_LENGTH,
      length * ACTIVE_SEGMENT_RATIO
    );

    trailPath.setAttribute("stroke-dasharray", String(length));
    trailPath.setAttribute("stroke-dashoffset", "0");
    activePath.setAttribute("stroke-dasharray", `0 ${length}`);
    activePath.setAttribute("stroke-dashoffset", "0");

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(trailPath, {
        opacity: routeConfig.trailOpacity,
      });
      gsap.set(activePath, {
        opacity: routeConfig.activeOpacity,
      });

      const distanceForViewportY = () => {
        const rect = container.getBoundingClientRect();
        const viewportAnchor = window.innerHeight * VIEWPORT_ANCHOR_RATIO;
        const targetY = gsap.utils.clamp(
          0,
          routeConfig.viewBoxHeight,
          ((viewportAnchor - rect.top) / rect.height) * routeConfig.viewBoxHeight
        );

        let closest = samples[0];
        let closestDelta = Math.abs(closest.y - targetY);

        for (let index = 1; index < samples.length; index += 1) {
          const sample = samples[index];
          const delta = Math.abs(sample.y - targetY);

          if (delta < closestDelta) {
            closest = sample;
            closestDelta = delta;
          }
        }

        return closest.distance;
      };

      const updateDrawnPath = () => {
        const drawnDistance = distanceForViewportY();
        const visibleLength = gsap.utils.clamp(
          0,
          activeSegmentLength,
          drawnDistance
        );
        const segmentStart = gsap.utils.clamp(
          0,
          Math.max(0, length - visibleLength),
          drawnDistance - visibleLength * 0.5
        );

        activePath.setAttribute("stroke-dasharray", `${visibleLength} ${length}`);
        activePath.setAttribute("stroke-dashoffset", String(-segmentStart));
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: updateDrawnPath,
        onRefresh: updateDrawnPath,
      });

      updateDrawnPath();
      const refreshFrame = requestAnimationFrame(() => scrollTrigger.refresh());
      const refreshTimeout = window.setTimeout(() => scrollTrigger.refresh(), 250);
      const refreshAfterLoad = () => scrollTrigger.refresh();
      const resizeObserver = new ResizeObserver(() => scrollTrigger.refresh());

      resizeObserver.observe(container);
      window.addEventListener("load", refreshAfterLoad);
      document.fonts?.ready.then(refreshAfterLoad).catch(() => undefined);

      return () => {
        cancelAnimationFrame(refreshFrame);
        window.clearTimeout(refreshTimeout);
        resizeObserver.disconnect();
        window.removeEventListener("load", refreshAfterLoad);
        scrollTrigger.kill();
      };
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      activePath.setAttribute("stroke-dasharray", `0 ${length}`);
      activePath.setAttribute("stroke-dashoffset", "0");

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
            <stop offset="0" stopColor="var(--brand-red)" />
            <stop offset="0.48" stopColor="var(--brand-rose)" />
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
