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
        tl.fromTo(
          group,
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 1 }
        );

        tl.fromTo(
          group.querySelectorAll("img"),
          { y: 50 },
          { y: -50, stagger: 0.08, duration: 1 },
          "<"
        );

        if (i !== groupRefs.current.length - 1) {
          tl.to(group, { autoAlpha: 0, scale: 0.9, duration: 1 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div
          ref={(el) => el && (groupRefs.current[0] = el)}
          className="absolute inset-0"
        >
          <img src={images[0]} className="absolute left-[8%] top-[18%] h-[32vh]" />
          <img src={images[1]} className="absolute left-[22%] bottom-[16%] h-[38vh]" />
          <img src={images[2]} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[55vh] z-10" />
          <img src={images[3]} className="absolute right-[22%] top-[14%] h-[34vh]" />
          <img src={images[4]} className="absolute right-[10%] bottom-[18%] h-[40vh]" />
          <img src={images[5]} className="absolute left-[12%] top-[55%] h-[28vh]" />
          <img src={images[6]} className="absolute right-[35%] bottom-[8%] h-[26vh]" />
        </div>

        <div
          ref={(el) => el && (groupRefs.current[1] = el)}
          className="absolute inset-0"
        >
          <img
            src={images[2]}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[58vh] z-10"
          />
          <img
            src={images[4]}
            className="absolute left-[15%] bottom-[20%] h-[36vh] opacity-80"
          />
          <img
            src={images[1]}
            className="absolute right-[15%] top-[22%] h-[36vh] opacity-80"
          />
        </div>
      </section>

      <div className="h-screen bg-neutral-950" />
    </>
  );
}
