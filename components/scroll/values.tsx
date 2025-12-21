"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Values() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      circlesRef.current,
      {
        x: (i) => (i % 2 === 0 ? -200 : 200),
        y: (i) => (i < 2 ? -200 : 200),
        scale: 0,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true, // <---- this makes it scroll-controlled
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {[0, 1, 2, 3].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) circlesRef.current[i] = el;
          }}
          className={`absolute w-40 h-40 rounded-full bg-blue-400 opacity-80`}
          style={{ zIndex: 10 - i }}
        />
      ))}
      <h1 className="absolute text-white text-3xl font-bold z-50">
        Our Values
      </h1>
    </div>
  );
}
