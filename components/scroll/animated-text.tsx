"use client";

import React, { useRef, ReactNode } from "react";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";


interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const text = container.querySelector(".split") as HTMLElement;
    if (!text) return;

    gsap.set(text, { opacity: 1 });

    document.fonts.ready.then(() => {
      SplitText.create(text, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
          gsap.from(instance.lines, {
            yPercent: 120,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              toggleActions: "play none none none",
              once: true,
            },
          });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mx-auto">
      <p className={`split will-change-transform opacity-0 ${className}`}>
        {children}
      </p>
    </div>
  );
}
