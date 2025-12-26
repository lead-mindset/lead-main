"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "@/lib/gsap-setup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionPathDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!boxRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(boxRef.current, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      gsap.to(boxRef.current, {
        motionPath: {
          path: "#motion-path",
          align: "#motion-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-visible bg-neutral-900"
    >
      <svg
        className="
          absolute top-1/2 left-0
          w-full min-w-[96vw]
          -translate-y-1/2
          overflow-visible
          pointer-events-none
        "
        viewBox="0 0 512 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          id="motion-path"
          d="M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74"
          fill="none"
          stroke="transparent"
        />
      </svg>

      <div
        ref={boxRef}
        className="absolute left-0 top-1/2 h-24 w-24 rounded-xl bg-white"
      />
    </section>
  );
}
