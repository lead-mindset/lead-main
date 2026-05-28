"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "@/lib/gsap-setup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

const images = [
    "/media/lead/about/community-at-ibm.webp",
    "/media/lead/highlights/discover-day-students.webp",
    "/media/lead/highlights/lead-her.webp",
    "/media/lead/highlights/microsoft-usil-integration.webp",
    "/media/lead/about/rutgers-americas.webp",
];

export default function CurvedImageRibbon() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

        const ctx = gsap.context(() => {
            const SPACING = 0.12;
            const COUNT = imgRefs.current.length - 1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${100 + (COUNT - 1) * SPACING * 100}%`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            for (let i = 0; i < COUNT; i++) {
                const el = imgRefs.current[i];
                gsap.set(el, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });

                const start = i * SPACING;
                const end = 1;

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
            }

            const leadEl = imgRefs.current[COUNT];
            gsap.set(leadEl, { xPercent: 0, yPercent: -50, transformOrigin: "50% 50%" });

            const leadStart = (COUNT - 1) * SPACING;
            const leadEnd = 1;

            tl.to(
                leadEl,
                {
                    motionPath: {
                        path: "#motion-path",
                        align: "#motion-path",
                        autoRotate: true,
                        start: leadStart,
                        end: leadEnd,
                    },
                    ease: "none",
                },
                0
            );
        }, sectionRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative max-lg:hidden h-screen w-full overflow-hidden">
            <svg
                className="absolute top-1/2 left-[-60%] w-[220%] -translate-y-1/2 pointer-events-none"
                viewBox="0 0 512 200"
                preserveAspectRatio="none"
            >
                <path
                    id="motion-path"
                    d="M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74"
                    fill="none"
                    stroke="transparent"
                />
            </svg>

            {images.map((src, i) => (
    <div
        key={i}
        ref={(el) => {
            if (el) imgRefs.current[i] = el;
        }}
        className="absolute left-0 top-1/2 z-20 w-96 h-auto flex items-center justify-center border-8 rounded-xl border-foreground"
    >
        <Image
            src={src}
            alt=""
            width={900}
            height={500}
            className="rounded-xl object-cover"
            priority={i === 4}
        />
    </div>
))}


            <div
                ref={(el) => {
                    if (el) imgRefs.current[images.length] = el;
                }}
                className="absolute left-0 top-1/2  flex items-center"
            >
                <div className="relative w-60 h-60 ml-3 z-0 px-5 rotate-90">
                    <div className="absolute w-3 rounded-xl -mt-0.5 h-full bg-white top-0 left-1/2 origin-top-left rotate-[20deg]"></div>
                    <div className="absolute w-3 rounded-xl mt-0.5 h-full bg-white top-0 left-1/2 origin-top-left -rotate-[20deg]"></div>
                </div>

                <Image
                    src="/leadcharacter2.svg"
                    alt="Lead"
                    width={256}
                    height={256}
                    className="object-contain z-10 -ml-8"
                    priority
                />
            </div>
        </section>
    );
}
