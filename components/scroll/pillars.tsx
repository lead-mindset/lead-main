"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (ctx) => {
      const container = containerRef.current;
      const box = boxRef.current;
      const sections = ctx.selector(".horizontal-section");
      if (!container || !box) return;

      const containerWidth = container.scrollWidth - container.offsetWidth;
      const amplitude = 100; 

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${container.offsetWidth}`,
        },
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${container.offsetWidth}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 → 1
          const x = progress * containerWidth; // horizontal scroll progress
          const y = Math.sin(progress * Math.PI * 2) * amplitude; // sine wave
          box.style.transform = `translate(${x}px, ${y}px)`;
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex w-[400%] h-screen overflow-hidden relative text-white">
      <div
        ref={boxRef}
        className="absolute w-12 h-12 bg-blue-500 rounded-full z-50 top-1/2 left-0"
      />

      <section className="horizontal-section bg-red-500/40 w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center">
        <div>
          <p className="text-5xl text-center">
            Built on these core values, our pillars drive lasting growth and meaningful impact, shaping students and communities for the better.
          </p>

          <h1 className="text-5xl text-center mt-10">
            Meet Our Pillars ->
          </h1>
        </div>
      </section>

      <section className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center">
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          01
        </h1>
      </section>

      <section className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center">
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          02
        </h1>
      </section>

      <section className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center">
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          03
        </h1>
      </section>
    </div>
  );
}
