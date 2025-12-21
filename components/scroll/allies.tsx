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

    const ctx = gsap.context(() => {
      const totalWidth = row.scrollWidth / 2;

      gsap.set(row, { x: 0 });

      gsap.to(row, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-12">
      <h2 className="mb-6 text-xl font-semibold text-white text-center">Supported by</h2>

      <div className="overflow-hidden bg-white/80 py-4">
        <div
          ref={rowRef}
          className="flex items-center gap-10 will-change-transform"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-24 md:h-28 lg:h-32"
            >
              <Image
                src={src}
                alt={`Partner ${i + 1}`}
                width={400}
                height={200}
                className="h-full w-auto object-contain"
                priority={i < images.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
