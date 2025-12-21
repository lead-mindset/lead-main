"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (ctx) => {
      const sections = ctx.selector(".horizontal-section");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${containerRef.current!.offsetWidth}`,
          markers: true,
        },
      });
    },
    { scope: containerRef } 
  );

  return (
    <div
      ref={containerRef}
      className="flex w-[400%] h-screen overflow-hidden"
    >
      {/* ---------- Section 1 ---------- */}
      <section
        className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/2249527/pexels-photo-2249527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          Horizontal Scroll
        </h1>
      </section>

      {/* ---------- Section 2 ---------- */}
      <section
        className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          01
        </h1>
      </section>

      {/* ---------- Section 3 ---------- */}
      <section
        className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1517076/pexels-photo-1517076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          02
        </h1>
      </section>

      {/* ---------- Section 4 ---------- */}
      <section
        className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1037996/pexels-photo-1037996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
          03
        </h1>
      </section>
    </div>
  );
}