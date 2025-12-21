"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StyledCard } from "../ui/styled-card";
import { GradientIcon } from "../ui/gradient-icon";
import { Users, BookOpen, Award, Briefcase, Globe, User, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: 1,
    title: 'Chapter Development',
    description:
      'Building strong, sustainable chapters that foster active engagement, collaboration, and a sense of belonging among students across Latin America.',
    IconComponent: Users,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 2,
    title: 'Academic Excellence',
    description:
      'Encouraging high academic achievement and a culture of curiosity, discipline, and lifelong learning that prepares students for future success.',
    IconComponent: BookOpen,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Leadership',
    description:
      'Developing confident, ethical, and visionary leaders who can inspire others and drive meaningful impact in their communities and industries.',
    IconComponent: Award,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 4,
    title: 'Professional Development',
    description:
      'Equipping students with the skills, mentorship, and experiences needed to excel in their careers and thrive in the evolving tech landscape.',
    IconComponent: Briefcase,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    title: 'Community Impact',
    description:
      'Inspiring students to create initiatives that positively transform local communities, promote social responsibility, and leave a lasting legacy.',
    IconComponent: Globe,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 6,
    title: 'Women Excellence',
    description:
      'Empowering and celebrating female students, providing support, mentorship, and opportunities to thrive as leaders in technology and beyond.',
    IconComponent: User,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 7,
    title: 'LEAD Academia',
    description:
      'Engaging high-school students with exposure to technology, leadership skills, and career opportunities to cultivate the next generation of Latino talent.',
    IconComponent: GraduationCap,
    color: 'from-blue-500 to-purple-500',
  },
];
export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (ctx) => {
      const container = containerRef.current;
      const box = boxRef.current;
      const sections = ctx.selector(".horizontal-section");
      if (!container || !box) return;

      const containerWidth = container.scrollWidth - container.offsetWidth;
      const amplitude = 300; // peak height

      // Horizontal scroll
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${container.offsetWidth}`,
        },
      });

      // Motion box: peaks in center of each section
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${container.offsetWidth}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const x = progress * containerWidth;

          const totalSections = sections.length;
          const sectionProgress = progress * totalSections;
          const localProgress = sectionProgress - Math.floor(sectionProgress);

          const y = Math.sin(localProgress * Math.PI) * amplitude;
          box.style.transform = `translate(${x}px, ${y}px)`;
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex w-[400%] h-screen overflow-hidden relative text-white">
      <div
        ref={boxRef}
        className="absolute hidden w-12 h-12 bg-blue-500 rounded-full z-50 top-1/2 left-0"
      />

      <section className="horizontal-section bg-red-500/40 w-screen h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center">
        <div className="text-center px-8">
          <p className="text-5xl">
            Built on these core values, our pillars drive lasting growth and meaningful impact, shaping students and communities for the better.
          </p>
          <h1 className="text-5xl mt-10">Meet Our Pillars -></h1>
        </div>
      </section>

      {data.map((item, index) => (
        <section
          key={item.id}
          className="horizontal-section px-4  h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
        >
          <GalleryItem item={item} index={index} containerRef={containerRef} />
        </section>
      ))}

      <section
        className="horizontal-section h-screen flex-shrink-0 flex justify-center items-center bg-cover bg-center"
      >
      </section>
    </div>
  );
}

interface GalleryItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    IconComponent: React.ComponentType<{ className?: string }>;
    color: string;
  };
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const GalleryItem = ({ item }: GalleryItemProps) => {
  const Icon = item.IconComponent;

  return (
    <div className="flex-shrink-0 max-w-[350px]">
      <StyledCard color={item.color}>
        <GradientIcon icon={<Icon />} color={item.color} />
        <h3 className="mt-4">{item.title}</h3>
        <p className="mt-2">{item.description}</p>
      </StyledCard>
    </div>
  );
};
