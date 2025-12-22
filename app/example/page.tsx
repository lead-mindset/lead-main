"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function CircularCarouselScroll() {
  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);
  const circleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pillars = [
    "Strategy & Vision",
    "Innovation",
    "Operations",
    "People & Culture",
    "Marketing",
    "Finance",
    "Sustainability",
    "Technology",
  ];

  useEffect(() => {
    const items = itemsRef.current;
    const itemCount = items.length;

    const circlePath = MotionPathPlugin.convertToPath(circleRef.current, false)[0];
    circlePath.id = "circlePath";
    circleRef.current.parentNode.prepend(circlePath);

    const step = 1 / itemCount;
    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(step);

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => i / itemCount,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=" + itemCount * 200,
        pin: true, // pin the whole wrapper (wheel + text)
        scrub: 1,
        snap: (value) => snap(value),
        onUpdate: (self) => {
          const index = Math.round(self.progress / step) % itemCount;
          setActiveIndex(index);
        },
      },
    });

    tl.to(wrapperRef.current.querySelector(".wheel"), {
      rotation: -360,
      transformOrigin: "center",
      ease: "none",
    }).to(
      items,
      {
        rotation: "+=360",
        transformOrigin: "center",
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-[200vh] mb-[200vh]" ref={wrapperRef}>
      {/* Wheel Container */}
      <div className="wheel relative w-[300px] h-[300px]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className={`absolute w-16 h-16 rounded-full text-white flex items-center justify-center text-xl transition-all ${
              i === activeIndex ? "bg-green-500 scale-110 z-10" : "bg-red-500 scale-100 z-0"
            }`}
          >
            {i + 1}
          </div>
        ))}
        <svg viewBox="0 0 300 300" className="absolute top-0 left-0 w-full h-full">
          <circle ref={circleRef} cx="150" cy="150" r="150" fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-10 text-center max-w-sm">
        <h2 className="text-xl font-bold mb-2">Active Pillar:</h2>
        <p className="text-gray-700">{pillars[activeIndex]}</p>
      </div>

      <p className="mt-6 text-gray-600">Scroll down to rotate, section is pinned</p>
    </div>
  );
}
