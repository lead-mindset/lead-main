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
      const path =
        "M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74";

      gsap.set(boxRef.current, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      gsap.to(boxRef.current, {
        motionPath: {
          path,
          start: 0,
          end: 1,
          autoRotate: true,
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,

          onRefreshInit: () => {
            gsap.set(boxRef.current!, {
              motionPath: {
                path,
                start: 0,
              },
            });
          },
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-900"
    >
      <div
        ref={boxRef}
        className="absolute left-0 top-1/2 h-24 w-24 rounded-xl bg-white"
      />
    </section>
  );
}
