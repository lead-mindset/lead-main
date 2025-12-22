"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, BookOpen, Award, Briefcase, Globe, User, GraduationCap } from "lucide-react";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const data = [
  {
    id: 1,
    title: "Chapter Development",
    description:
      "Building strong, sustainable chapters that foster active engagement, collaboration, and a sense of belonging among students across Latin America.",
    IconComponent: Users,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Academic Excellence",
    description:
      "Encouraging high academic achievement and a culture of curiosity, discipline, and lifelong learning that prepares students for future success.",
    IconComponent: BookOpen,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Leadership",
    description:
      "Developing confident, ethical, and visionary leaders who can inspire others and drive meaningful impact in their communities and industries.",
    IconComponent: Award,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 4,
    title: "Professional Development",
    description:
      "Equipping students with the skills, mentorship, and experiences needed to excel in their careers and thrive in the evolving tech landscape.",
    IconComponent: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Community Impact",
    description:
      "Inspiring students to create initiatives that positively transform local communities, promote social responsibility, and leave a lasting legacy.",
    IconComponent: Globe,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 6,
    title: "Women Excellence",
    description:
      "Empowering and celebrating female students, providing support, mentorship, and opportunities to thrive as leaders in technology and beyond.",
    IconComponent: User,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 7,
    title: "LEAD Academia",
    description:
      "Engaging high-school students with exposure to technology, leadership skills, and career opportunities to cultivate the next generation of Latino talent.",
    IconComponent: GraduationCap,
    color: "from-blue-500 to-purple-500",
  },
];

export default function PillarsCarousel() {
  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);
  const circleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = itemsRef.current;
    const itemCount = items.length;

    const circlePath = MotionPathPlugin.convertToPath(circleRef.current, false)[0];
    circlePath.id = "circlePath";
    circleRef.current.parentNode.prepend(circlePath);

    const step = 1 / itemCount;
    const snap = gsap.utils.snap(step);

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => i / itemCount,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=" + itemCount * 200,
        pin: true,
        scrub: 1,
        snap: snap,
        onUpdate: (self) => {
          const index = Math.round(self.progress / step) % itemCount;
          setActiveIndex(index);
        },
      },
    });

    tl.to(wrapperRef.current.querySelector(".wheel"), {
      rotation: -360,
      transformOrigin: "center",
      ease: "none",
    }).to(
      items,
      {
        rotation: "+=360",
        transformOrigin: "center",
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-[200vh] mb-[200vh]" ref={wrapperRef}>
      <div className="wheel relative w-[300px] h-[300px]">
        {data.map((item, i) => {
          const Icon = item.IconComponent;
          return (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white transition-all 
                ${i === activeIndex 
                  ? `bg-gradient-to-br ${item.color} scale-110 z-10 shadow-lg` 
                  : `bg-gray-400 scale-100 z-0 opacity-70`
                }`}
            >
              <Icon className="w-8 h-8" />
            </div>
          );
        })}
        <svg viewBox="0 0 300 300" className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <circle ref={circleRef} cx="150" cy="150" r="150" fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-10 text-center max-w-md transition-all duration-300">
        <h2 className="text-2xl font-bold mb-2">{data[activeIndex].title}</h2>
        <p className="text-gray-700">{data[activeIndex].description}</p>
      </div>

      <p className="mt-6 text-gray-500 text-sm">Scroll down to rotate, section is pinned</p>
    </div>
  );
}
