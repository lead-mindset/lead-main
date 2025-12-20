"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function MotionPathBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const box = boxRef.current;
    if (!box) return;

    const getPath = () => {
      const markers = gsap.utils.toArray<HTMLElement>(".marker");
      return markers.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          y: r.top + window.scrollY + r.height / 2,
        };
      });
    };

    const mypath = getPath()
    console.log(mypath)

    gsap.set(box, {
      x: mypath[0].x,
      y: mypath[0].y,
    });


    gsap.to(box, {
      motionPath: {
        path: getPath(),
        curviness: 1.2,
        autoRotate: false,
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".markers-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true
      }

    });
  }, []);

  return (
    <div ref={containerRef} className=" pointer-events-none">
      <div
        ref={boxRef}
        className="
          relative
          w-24 h-24
          bg-blue-500 border-4 border-black
          rounded-lg
          -translate-x-1/2
          -translate-y-1/2
        "
      />
    </div>
  );
}
