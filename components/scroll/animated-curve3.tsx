"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvedConnector3() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useLayoutEffect(() => {
        const path = pathRef.current;
        const container = containerRef.current;
        if (!path || !container) return;

        const length = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "bottom 65%",
                scrub: 1,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[40vh] z-10 pointer-events-none"
        >
            <svg
                viewBox="-200 0 1400 200"
                className="w-full h-full"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--chart-1)" />
                        <stop offset="100%" stopColor="var(--chart-2)" />
                    </linearGradient>
                </defs>

                <path
                    ref={pathRef}
                    d="M -200 120 C 200 40, 800 180, 1200 80"
                    stroke="url(#gradientStroke)"
                    strokeWidth="100"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
