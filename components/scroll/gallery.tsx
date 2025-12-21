'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Users, BookOpen, Award, Briefcase, Globe, User, GraduationCap } from 'lucide-react';
import { StyledCard } from '../ui/styled-card';
import { GradientIcon } from '../ui/gradient-icon';

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

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalWidth = data.length * 300 + (data.length - 1) * 32;
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalWidth + 300]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex space-x-8 px-16" style={{ x }}>
          {data.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} containerRef={containerRef} />
          ))}
        </motion.div>
      </div>
    </section>
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

const GalleryItem = ({ item, index, containerRef }: GalleryItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const y = useMotionValue(0);
  const Icon = item.IconComponent;

  useAnimationFrame(() => {
    if (!containerRef.current || !itemRef.current) return;

    const containerCenter = containerRef.current.offsetWidth / 2;
    const itemRect = itemRef.current.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;

    const distance = containerCenter - itemCenter;
    const maxDistance = containerRef.current.offsetWidth / 2 + itemRect.width;

    scale.set(Math.max(1 - (Math.abs(distance) / maxDistance) * 0.3, 0.7));
    const rotationAmplitude = 15 + (index % 3) * 10;
    rotate.set((distance / maxDistance) * rotationAmplitude);
    const parallaxAmplitude = 40 + (index % 2) * 20;
    y.set((distance / maxDistance) * parallaxAmplitude);
  });

  return (
    <motion.div
      ref={itemRef}
      style={{ rotate, scale, y}}
      className="flex-shrink-0 
      max-w-[350px] 
      
     "
    >
      <StyledCard color={item.color}>
        <GradientIcon icon={<Icon />} color={item.color} />
        <h3 className='mt-4'>{item.title}</h3>
        <p className="mt-2">{item.description}</p>
      </StyledCard>
    </motion.div>
  );
};
