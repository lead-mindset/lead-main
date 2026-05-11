"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "@/lib/gsap-setup";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import { cn } from "@/lib/utils";

export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(`(prefers-reduced-motion: no-preference)`, () => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(element, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("opacity-100", className)}>
      {children}
    </div>
  );
}
