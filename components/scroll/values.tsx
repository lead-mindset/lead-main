"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Values() {
  const containerRef = useRef<HTMLDivElement>(null);

  const values = ["Integrity", "Collaboration", "Innovation", "Empowerment"];
  const colors = ["#FF3B3B", "#3B82F6", "#9B30FF", "#F59E0B"]; // red, blue, purple, orange

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const circles = gsap.utils.toArray(".circle");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      tl.fromTo(
        circles,
        {
          x: (i) => (i % 2 === 0 ? -200 : 200),
          y: (i) => (i < 2 ? -200 : 200),
        },
        {
          x: 0,
          y: 0,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {values.map((value, i) => (
        <div
          key={i}
          className="circle absolute w-56 h-56 rounded-full flex items-center justify-center text-center p-2"
          style={{ zIndex: i + 10 , backgroundColor: colors[i] }}
        >
          <h1 className="text-white font-bold text-2xl">{value}</h1>
        </div>
      ))}

      <h1 className="absolute text-white text-4xl font-bold z-0">
        Our Values
      </h1>
    </div>
  );
}
