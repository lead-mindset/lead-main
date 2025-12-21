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
    const rowWidth = row.getBoundingClientRect().width;
    const itemWidth =
      row.children[0].getBoundingClientRect().width;

    const initialOffset =
      ((2 * itemWidth) / rowWidth) * 100 * -1;

    gsap.set(row, { xPercent: initialOffset });

    gsap.to(row, {
      xPercent: 0,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="relative py-32">
      <h2 className="mb-12 text-center text-3xl font-semibold">
        Featured Chapters
      </h2>

      <div className="overflow-hidden">
        <div
          ref={rowRef}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[70vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Chapter ${i + 1}`}
                fill
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
