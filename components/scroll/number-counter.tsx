"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RollingNumberProps {
    number: number;
    className?: string;
    whiteBg?: boolean;

}

export default function RollingNumber({ number, className = "", whiteBg = true }: RollingNumberProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const digitsRef = useRef<HTMLDivElement[]>([]);
    const digitHeight = 48;

    const getDigits = (num: number) => String(num).split("");

    useEffect(() => {
        if (!containerRef.current) return;

        const digits = getDigits(number);

        const tl = gsap.timeline({ paused: true });
        digits.forEach((digit, i) => {
            const box = digitsRef.current[i];
            if (box) {
                tl.to(
                    box,
                    {
                        y: -parseInt(digit) * digitHeight,
                        duration: 1.2,
                        ease: "power3.out",
                    },
                    0
                );
            }
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom top",
            onEnter: () => tl.restart(),
            onEnterBack: () => tl.restart(),
            onLeaveBack: () => {
                // reset digits to 0
                digitsRef.current.forEach((el) => {
                    if (el) gsap.set(el, { y: 0 });
                });
            },
        });

        return () => {
            ScrollTrigger.killAll();
        };
    }, [number]);

    return (
        <div ref={containerRef} className={`flex ${whiteBg ? "space-x-2" : ""} justify-center ${className}`}>
            {getDigits(number).map((_, i) => (
                <div
                    key={i}
                    className={` ${whiteBg ? "w-12" : "w-6"}  h-12 overflow-hidden rounded text-4xl text-foreground ${whiteBg ? "bg-gradient-to-r from-chart-2 to-primary" : "bg-transparent"}`}
                >
                    <div
                        ref={(el) => {
                            if (el) digitsRef.current[i] = el;
                        }}
                    >
                        {[...Array(10).keys()].map((n) => (
                            <div key={n} className="h-12 flex items-center justify-center">
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
