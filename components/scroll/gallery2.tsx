"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "@/lib/gsap-setup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const images = [
    "/about-us/1.jpg",
    "/about-us/2.jpg",
    "/about-us/3.jpg",
    "/about-us/4.jpg",
    "/about-us/5.jpg",
    "/about-us/1.jpg",
    "/about-us/2.jpg",
];

export default function CurvedImageRibbon() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const SPACING = 0.08;
            const COUNT = imgRefs.current.length;

            const PATH_END = 1.35;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            imgRefs.current.forEach((el, i) => {
                gsap.set(el, {
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: "50% 50%",
                });

                const start = i * SPACING;
                const end = PATH_END - (COUNT - 1 - i) * SPACING;

                tl.to(
                    el,
                    {
                        motionPath: {
                            path: "#motion-path",
                            align: "#motion-path",
                            autoRotate: true,
                            start,
                            end,
                        },
                        ease: "none",
                    },
                    0
                );
            });
        }, sectionRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-neutral-900"
        >
            <svg
                className="absolute top-1/2 left-[-60%] w-[220%] -translate-y-1/2 pointer-events-none"
                viewBox="0 0 512 200"
                preserveAspectRatio="none"
            >
                <path
                    id="motion-path"
                    d="
            M8,102
            C15,83 58,25 131,24
            206,24 233,63 259,91
            292,125 328,155 377,155
            464,155 497,97 504,74
          "
                    fill="none"
                    stroke="transparent"
                />
            </svg>

            {images.map((src, i) => (
                <div
                    key={i}
                    ref={(el) => el && (imgRefs.current[i] = el)}
                    className="
            absolute left-0 top-1/2
            w-60 h-40
            flex items-center justify-center
          "
                >
                    <Image
                        src={src}
                        alt=""
                        fill
                        className="rounded-xl object-cover shadow-xl"
                    />
                </div>
            ))}
        </section>
    );
}
