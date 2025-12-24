"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function PinnedSlogan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = logoRef.current;
    if (!el) return;

    gsap.to(el, {
      opacity: 1,
      duration: 0.15,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        toggleActions: "play none none reverse",
      },
    });

    gsap.fromTo(
      el,
      {
        scale: 0,
        transformOrigin: "center center",
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom+=100% top",
          scrub: true,
          pin: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen">
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center scale-0 opacity-0"
      >
        <div className="mx-auto relative w-fit text-left">
          <h1 className="font-bold text-6xl lg:text-8xl">
            <span className="block text-chart-1">Learn</span>
            <span className="block text-chart-2">Explore</span>
            <span className="block text-chart-3">Aspire</span>
            <span className="block text-foreground">Discover.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
