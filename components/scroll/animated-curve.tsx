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
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.to(path, { opacity: 1, duration: 0.1 })
      .to(path, { strokeDashoffset: 0, duration: 0.7, ease: "none" })
      .to(path, { opacity: 0, duration: 0.2 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-96 pointer-events-none"
    >
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="
            M 0 40
            C 300 40, 400 360, 700 360
            S 1000 360, 1000 360
          "
          stroke="pink"
          strokeWidth="50"
        />
      </svg>
    </div>
  );
}
