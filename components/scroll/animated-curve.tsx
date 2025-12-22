"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvedConnector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom center",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef} id='curved-connector'
      className="relative -mb-52 w-full h-screen pointer-events-none"
    >
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="xMinYMin meet"
      >
        <path
          ref={pathRef}
          d="M 0 50 C 250 50, 750 350, 1000 350"
          stroke="pink"
          strokeWidth="50"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
