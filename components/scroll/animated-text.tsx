"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AnimatedText({ children, className = "" }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = container.querySelector(".split");

        gsap.set(text, { opacity: 1 });

        document.fonts.ready.then(() => {
            SplitText.create(text, {
                type: "words,lines",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    return gsap.from(instance.lines, {
                        yPercent: 120,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: container,
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                        },
                    });
                },
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="mx-auto">
            <p
                className={`split will-change-transform opacity-0 ${className}`}
            >
                {children}
            </p>
        </div>
    );
}
