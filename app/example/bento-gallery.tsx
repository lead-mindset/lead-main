"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
  "https://assets.codepen.io/16327/portrait-image-12.jpg",
  "https://assets.codepen.io/16327/portrait-image-8.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      groupRefs.current.forEach((group, i) => {
        // fade in
        tl.fromTo(
          group,
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 1 }
        );

        // fade out except last group
        if (i !== groupRefs.current.length - 1) {
          tl.to(group, { autoAlpha: 0, scale: 0.9, duration: 1 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="h-screen" />

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <div
          ref={(el) => el && (groupRefs.current[0] = el)}
          className="absolute inset-0 flex items-center justify-center gap-6"
        >
          {images.slice(0, 2).map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-[60vh] w-auto object-cover"
              alt=""
            />
          ))}
        </div>

        <div
          ref={(el) => el && (groupRefs.current[1] = el)}
          className="absolute inset-0 flex items-center justify-center gap-6"
        >
          {images.slice(2, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-[60vh] w-auto object-cover"
              alt=""
            />
          ))}
        </div>

        <div
          ref={(el) => el && (groupRefs.current[2] = el)}
          className="absolute inset-0 flex items-center justify-center gap-6"
        >
          {images.slice(4, 7).map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-[55vh] w-auto object-cover"
              alt=""
            />
          ))}
        </div>
      </section>

      <div className="h-screen" />
    </>
  );
}
