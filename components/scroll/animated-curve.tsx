"use client";

import { useRef, useId } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function CurvedConnector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const uniqueId = useId();

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="curved-connector"
      className="relative -mb-52 w-full h-screen pointer-events-none"
    >
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <linearGradient
            id={`gradientStroke-${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--chart-1)" />
            <stop offset="100%" stopColor="var(--chart-2)" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d="M 0 50 C 250 50, 750 350, 1000 350"
          stroke={`url(#gradientStroke-${uniqueId})`}
          strokeWidth="60"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
