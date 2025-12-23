"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const images = [
  "/about-us/1.jpg",
  "/about-us/2.jpg",
  "/about-us/3.jpg",
  "/about-us/4.jpg",
  "/about-us/5.jpg",
  "/about-us/6.jpg",
  "/about-us/7.jpg",
];


export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const groups = groupRefs.current;

      gsap.set(groups, { autoAlpha: 0, scale: 1 });
      gsap.set(groups[0], { autoAlpha: 1 });

      const HOLD = 0.35;
      const FADE = 0.25;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
        },
      });

      groups.forEach((group, i) => {
        const nextGroup = groups[i + 1];

        tl.to(group, { autoAlpha: 1, duration: HOLD });

        tl.to(group, {
          autoAlpha: 0,
          duration: FADE,
        });

        if (nextGroup) {
          tl.fromTo(
            nextGroup,
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: FADE },
            `-=${FADE}`
          );
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
  ref={(el) => {
    if (el) groupRefs.current[1] = el;
  }}
  className="absolute inset-0"
>
          <Image
            src={images[0]}
            alt="Image 1"
            width={300}
            height={400}
            className="absolute left-[8%] top-[18%] h-[32vh] w-auto rounded-xl object-cover"
          />
          <Image
            src={images[1]}
            alt="Image 2"
            width={300}
            height={400}
            className="absolute left-[33%] bottom-[6%] h-[38vh] w-auto rounded-xl object-cover"
          />
          <Image
            src={images[3]}
            alt="Image 4"
            width={300}
            height={400}
            className="absolute right-[15%] top-[10%] h-[34vh] w-auto rounded-xl object-cover"
          />
          <Image
            src={images[4]}
            alt="Image 5"
            width={300}
            height={400}
            className="absolute right-[3%] bottom-[10%] h-[40vh] w-auto rounded-xl object-cover"
          />
          <Image
            src={images[5]}
            alt="Image 6"
            width={300}
            height={400}
            className="absolute left-[12%] top-[55%] h-[28vh] w-auto rounded-xl object-cover"
          />
          <Image
            src={images[6]}
            alt="Image 7"
            width={300}
            height={400}
            className="absolute left-[40%] top-[3%] h-[46vh] w-auto rounded-xl object-cover"
          />
        </div>

        <div
  ref={(el) => {
    if (el) groupRefs.current[1] = el;
  }}
  className="absolute inset-0"
>

          <Image
            src={images[2]}
            alt="Image 7"
            width={1200}
            height={1600}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[58vh] w-auto z-0 rounded-xl object-cover"
          />

        </div>
      </section>
    </>
  );
}