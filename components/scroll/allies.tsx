"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedText from "./animated-text";

const images = [
  "/allies/microsoft.webp",
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
    <section className="relative overflow-hidden bg-foreground">
        <div
          ref={rowRef}
          className="flex items-center gap-10 will-change-transform"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 p-6 md:h-16 lg:h-28"
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
    </section>
  );
}
