"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, BookOpen, Award, Briefcase, Globe, User, GraduationCap } from "lucide-react";
import AnimatedText from "./animated-text";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const data = [
    {
        id: 1,
        title: 'Chapter Development',
        description: 'Build strong, sustainable chapters that foster engagement, collaboration, and belonging among students across Latin America.',
        IconComponent: Users,
        color: 'from-chart-1 to-chart-2',
    },
    {
        id: 2,
        title: 'Academic Excellence',
        description: 'Promote high academic achievement and a culture of curiosity, discipline, and lifelong learning to prepare students for future success.',
        IconComponent: BookOpen,
        color: 'from-chart-2 to-chart-3',
    },
    {
        id: 3,
        title: 'Leadership',
        description: 'Develop confident, ethical leaders who inspire others and create meaningful impact in their communities and industries.',
        IconComponent: Award,
        color: 'from-chart-3 to-chart-4',
    },
    {
        id: 4,
        title: 'Professional Development',
        description: 'Equip students with skills, mentorship, and experiences to excel in their careers and thrive in the evolving tech landscape.',
        IconComponent: Briefcase,
        color: 'from-chart-4 to-chart-1',
    },
    {
        id: 5,
        title: 'Community Impact',
        description: 'Inspire students to lead initiatives that transform communities, promote social responsibility, and leave a lasting legacy.',
        IconComponent: Globe,
        color: 'from-chart-1 to-chart-2',
    },
    {
        id: 6,
        title: 'Women Excellence',
        description: 'Empower female students with mentorship, support, and opportunities to thrive as leaders in technology and beyond.',
        IconComponent: User,
        color: 'from-chart-2 to-chart-3',
    },
    {
        id: 7,
        title: 'LEAD Academia',
        description: 'Engage high-school students with technology, leadership skills, and career opportunities to cultivate the next generation of Latino talent.',
        IconComponent: GraduationCap,
        color: 'from-chart-3 to-chart-4',
    },
];

export default function PillarsCarousel() {
    const wrapperRef = useRef(null);
    const wheelRef = useRef(null);
    const cardRef = useRef(null);
const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const circleRef = useRef<SVGCircleElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!circleRef.current) return;

        const items = itemsRef.current;
        const itemCount = items.length;
        const scrollDistance = itemCount * 300;

        const circlePath = MotionPathPlugin.convertToPath(circleRef.current, false)[0];
        circlePath.id = "circlePath";

        if (circleRef.current.parentNode) {
            circleRef.current.parentNode.prepend(circlePath);
        }

        const step = 1 / itemCount;

        gsap.set(items, {
            motionPath: {
                path: circlePath,
                align: circlePath,
                alignOrigin: [0.5, 0.5],
                end: (i) => i / itemCount,
            },
        });

        const wheelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const index = Math.round(self.progress / step) % itemCount;
                    setActiveIndex(index);
                },
            },
        });

        wheelTimeline.to(wheelRef.current, {
            rotation: -360,
            transformOrigin: "center",
            ease: "none",
        }).to(items, {
            rotation: "+=360",
            transformOrigin: "center",
            ease: "none",
        }, 0);

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="relative mt-40 text-white">
            <div
                ref={wrapperRef}
                className="flex flex-col md:flex-row items-center justify-center min-h-[100vh] gap-16"
            >
                <div ref={wheelRef} className="max-md:hidden relative md:w-[400px] md:h-[400px]">
                   {data.map((item, i) => {
  const Icon = item.IconComponent;
  return (
    <div
      key={item.id}
      ref={el => { itemsRef.current[i] = el; }}
      className={`absolute w-32 h-32 rounded-full flex items-center justify-center text-background transition-transform duration-100 z-10
        ${i === activeIndex ? `bg-foreground ` : `bg-gradient-to-br text-foreground ${item.color}`}
      `}
    >
      <Icon className="w-16 h-16 z-10" />
    </div>
  );
})}


                    <defs>
                        <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--chart-1)" />
                            <stop offset="100%" stopColor="var(--chart-2)" />
                        </linearGradient>
                    </defs>

                    <svg viewBox="0 0 500 500" className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                        <circle
                            ref={circleRef}
                            cx="250"
                            cy="250"
                            r="200"
                            fill="none"
                            stroke="url(#gradientStroke)"
                            strokeWidth="60"
                        />
                    </svg>
                </div>

                <div ref={cardRef} className="max-w-full p-4 w-xl text-center md:text-left">
                    <AnimatedText className="text-3xl md:text-6xl font-bold mb-12">Our Pillars</AnimatedText>
                    <AnimatedText className="text-2xl md:text-4xl font-bold">
                        {data[activeIndex].title}
                    </AnimatedText>

                    <AnimatedText className="text-2xl md:text-4xl mt-4">
                        {data[activeIndex].description}
                    </AnimatedText>

                </div>
            </div>
        </div>
    );
}
