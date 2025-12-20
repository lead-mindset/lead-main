"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function MotionPathBox() {
  const boxRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const box = boxRef.current;
  if (!box) return;

gsap.set(box, {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
    });

  const getPath = () => {
    const markerEls = gsap.utils.toArray<HTMLElement>(".marker");
    if (!markerEls.length) return [];

    const boxRect = box.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;

    const rawPath = markerEls.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - boxCenterX,
        y: r.top + r.height / 2 - boxCenterY,
      };
    });

    const start = rawPath[0];

    return rawPath.map((p) => ({
      x: p.x - start.x,
      y: p.y - start.y,
    }));
  };

  gsap.to(box, {
    motionPath: {
      path: getPath(),
      curviness: 1.2,
    },
    ease: "none",
    scrollTrigger: {
      trigger: ".markers-wrapper",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: () => {
        gsap.set(box, {
          motionPath: { path: getPath() },
        });
      },
    },
  });
}, []);


  return (
    <div className="pointer-events-none">
      <div
        ref={boxRef}
        className="
          fixed
          left-0
          top-0
          z-50
          w-24 h-24
          bg-blue-500
          rounded-lg
        "
      />
    </div>
  );
}
