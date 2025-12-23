"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "/chapters/chapter-1.jpg",
  "/chapters/chapter-2.jpg",
  "/chapters/chapter-3.jpg",
  "/chapters/chapter-4.jpg",
  "/chapters/chapter-5.jpg",
  "/chapters/chapter-6.jpg",
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
    <section className="relative bg-gradient-to-r from-primary to-chart-2 py-10">

      <div className="overflow-hidden">
        <div
          ref={rowRef}
          className="flex gap-8 will-change-transform"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[70vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] aspect-[3/4] rounded-2xl overflow-hidden will-change-transform translate-z-0"
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
