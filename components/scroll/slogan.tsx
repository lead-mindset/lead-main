"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function SloganReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      words,
      { yPercent: 100, opacity: 0 },
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
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="bg-yellow-500 mx-auto relative w-fit text-left"
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
