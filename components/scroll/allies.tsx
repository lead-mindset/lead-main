"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "/allies/microsoft.svg",
  "/allies/accenture.png",
  "/allies/ibm.png",
  "/allies/alpfa.png",
  "/allies/shpe.webp",
  "/allies/peruviansinstem.jpg",

];

export default function ChaptersPhotos() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const row = rowRef.current;

    const totalWidth = row.scrollWidth / 2;

    gsap.set(row, { x: 0 });

    gsap.to(row, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="relative">
      <h2>Backed by</h2>
      <div className="overflow-hidden bg-white/80">
        <div
          ref={rowRef}
          className="flex gap-8 will-change-transform "
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[70vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] h-28 w-auto rounded-2xl overflow-hidden will-change-transform translate-z-0"
            >
              <Image
                src={src}
                alt={`Chapter ${i + 1}`}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 22vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
