"use client";

import { useRef, useId } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function CurvedConnector2() {
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
        start: "top bottom",
        end: "+=200%",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="max-sm:hidden relative w-full -mb-72 h-screen pointer-events-none"
    >
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="xMaxYMin meet"
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
          d="M 1050 20 C 750 80, 250 320, -50 380"
          stroke={`url(#gradientStroke-${uniqueId})`}
          strokeWidth="60"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
