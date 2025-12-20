"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SloganReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className=" bg-yellow-500 mx-auto relative w-fit text-left"
    >
      <h1 className="[&_.word]:opacity-0 font-bold text-7xl tracking-wide text-white">
        <span className="word block overflow-hidden will-change-transform">
          LEARN
        </span>
        <span className="word block overflow-hidden will-change-transform">
          EXPLORE
        </span>
        <span className="word block overflow-hidden will-change-transform">
          ASPIRE
        </span>
        <span className="word block overflow-hidden will-change-transform">
          DISCOVER.
        </span>
      </h1>
    </div>
  );
}
