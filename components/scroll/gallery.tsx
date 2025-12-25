"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap-setup";

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
      if (!groups[0] || !groups[1]) return;

      gsap.set(groups, { autoAlpha: 0 });

      gsap.to(groups[0], {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      const FADE = 0.4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: true,
          pin: true,
        },
      });

      tl
        .to(groups[0], { autoAlpha: 0, duration: FADE })

        .fromTo(
          groups[1],
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: FADE },
          `-=${FADE}`
        )

        .to(groups[1], { autoAlpha: 0, duration: FADE });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div
        ref={(el) => {
          if (el) groupRefs.current[0] = el;
        }}

        className="absolute inset-0 opacity-0"
      >
        <Image src={images[0]} alt="" width={300} height={400} className="max-sm:hidden absolute left-[8%] top-[18%] h-[32vh] w-auto rounded-xl object-cover" />
        <Image src={images[1]} alt="" width={300} height={400} className="max-sm:hidden absolute left-[33%] bottom-[6%] h-[38vh] w-auto rounded-xl object-cover" />
        <Image src={images[3]} alt="" width={300} height={400} className="max-sm:hidden absolute right-[15%] top-[10%] h-[34vh] w-auto rounded-xl object-cover" />
        <Image src={images[4]} alt="" width={300} height={400} className="max-sm:hidden absolute right-[3%] bottom-[10%] h-[40vh] w-auto rounded-xl object-cover" />
        <Image src={images[5]} alt="" width={300} height={400} className="absolute left-[12%] top-[55%] h-[28vh] w-auto rounded-xl object-cover" />
        <Image src={images[6]} alt="" width={300} height={400} className="absolute left-[40%] top-[3%] h-[46vh] w-auto rounded-xl object-cover" />
      </div>

      <div
        ref={(el) => {
          if (el) groupRefs.current[1] = el;
        }}

        className="absolute inset-0 opacity-0"
      >
        <Image
          src={images[2]}
          alt=""
          width={1200}
          height={1600}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[58vh] w-auto rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
