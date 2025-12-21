"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Allies() {
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return;

      const rowWidth = row.getBoundingClientRect().width;
      const itemWidth = row.children[0].getBoundingClientRect().width;

      const initialOffset =
        ((2 * itemWidth) / rowWidth) * 100 * -1;

      gsap.set(row, { xPercent: initialOffset });

      gsap.to(row, {
        xPercent: 0,
        duration: 6 * (i + 1),
        ease: "none",
        repeat: -1,
      });
    });
  }, []);

  return (
    <section className="relative">
      <div className="py-[200px]">
        <div className="-my-[58px] overflow-hidden bg-white/30">

          {/* ROW 3 */}
          <div
            ref={(el) => (rowsRef.current[2] = el!)}
            className="flex whitespace-nowrap text-center "
          >
            {[
              "Development",
              "Development",
              "Development",
              "Development",
              "Development",
            ].map((text, i) => (
              <div
                key={i}
                className={`flex-[0_0_33%] py-[58px] text-[3.75vw] uppercase leading-none ${
                  i % 2 === 1
                    ? "text-transparent stroke-text"
                    : ""
                }`}
              >
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
