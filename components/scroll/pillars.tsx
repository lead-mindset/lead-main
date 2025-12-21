"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Pillars() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        (ctx) => {
            const sections = ctx.selector(".horizontal-section");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${containerRef.current!.offsetWidth}`,
                    markers: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="flex w-[400%] h-screen overflow-hidden text-white"
        >

            <section
                className="horizontal-section bg-red-500/40 w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
            >
                <div className="">
                   
                    <p className="text-5xl text-center">
                        Built on these core values, our pillars drive lasting growth and meaningful impact, shaping students and communities for the better.
                    </p>


                     <h1 className=" text-5xl text-center">
                        Meet Our Pillars ->
                    </h1>

                </div>

            </section>


            <section
                className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
            >
                <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
                    01
                </h1>
            </section>

            <section
                className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
            >
                <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
                    02
                </h1>
            </section>

            <section
                className="horizontal-section w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
            >
                <h1 className="text-white text-[8vw] font-light uppercase tracking-[1vw] font-oswald">
                    03
                </h1>
            </section>
        </div>
    );
}