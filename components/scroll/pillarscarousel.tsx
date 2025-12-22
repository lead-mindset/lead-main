"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, BookOpen, Award, Briefcase, Globe, User, GraduationCap } from "lucide-react";
import { StyledCard } from "../ui/styled-card";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const data = [{ id: 1, title: 'Chapter Development', description: 'Building strong, sustainable chapters that foster active engagement, collaboration, and a sense of belonging among students across Latin America.', IconComponent: Users, color: 'from-blue-500 to-purple-500', }, { id: 2, title: 'Academic Excellence', description: 'Encouraging high academic achievement and a culture of curiosity, discipline, and lifelong learning that prepares students for future success.', IconComponent: BookOpen, color: 'from-purple-500 to-pink-500', }, { id: 3, title: 'Leadership', description: 'Developing confident, ethical, and visionary leaders who can inspire others and drive meaningful impact in their communities and industries.', IconComponent: Award, color: 'from-blue-500 to-purple-500', }, { id: 4, title: 'Professional Development', description: 'Equipping students with the skills, mentorship, and experiences needed to excel in their careers and thrive in the evolving tech landscape.', IconComponent: Briefcase, color: 'from-purple-500 to-pink-500', }, { id: 5, title: 'Community Impact', description: 'Inspiring students to create initiatives that positively transform local communities, promote social responsibility, and leave a lasting legacy.', IconComponent: Globe, color: 'from-blue-500 to-purple-500', }, { id: 6, title: 'Women Excellence', description: 'Empowering and celebrating female students, providing support, mentorship, and opportunities to thrive as leaders in technology and beyond.', IconComponent: User, color: 'from-purple-500 to-pink-500', }, { id: 7, title: 'LEAD Academia', description: 'Engaging high-school students with exposure to technology, leadership skills, and career opportunities to cultivate the next generation of Latino talent.', IconComponent: GraduationCap, color: 'from-blue-500 to-purple-500', },];

export default function PillarsCarousel() {
    const wrapperRef = useRef(null);
    const wheelRef = useRef(null);
    const cardRef = useRef(null);
    const itemsRef = useRef([]);
    const circleRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const items = itemsRef.current;
        const itemCount = items.length;
        const scrollDistance = itemCount * 300;

        const circlePath = MotionPathPlugin.convertToPath(circleRef.current, false)[0];
        circlePath.id = "circlePath";
        circleRef.current.parentNode.prepend(circlePath);

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
                                ref={el => (itemsRef.current[i] = el)}
                                className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-white transition-transform duration-100 z-10
                  ${i === activeIndex ? `bg-gradient-to-br ${item.color}` : `bg-gray-400`}
                `}
                            >
                                <Icon className="w-12 h-12 z-10" />
                            </div>
                        );
                    })}
                    <svg viewBox="0 0 500 500" className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                        <circle
                            ref={circleRef}
                            cx="250"
                            cy="250"
                            r="200"
                            fill="none"
                            stroke="pink"
                            strokeWidth="50"
                        />
                    </svg>
                </div>

                <div ref={cardRef} className="w-xl text-center md:text-left">
                    <h1 className="text-5xl mb-8">Our Pillars</h1>
                    <StyledCard color={data[activeIndex].color}>
                        <h3 className="mt-4">{data[activeIndex].title}</h3>
                        <p className="mt-2">{data[activeIndex].description}</p>
                    </StyledCard>
                </div>
            </div>
        </div>
    );
}
