"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlight } from "../ui/highlight";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: "Antonny Porlles",
    role: "Data & AI Technical Specialist",
    photo: "/antonnyphoto.jpg",
    link: "https://www.linkedin.com/in/antonny-porlles/",
    logo: "/microsoft-logo.png",
  },
  {
    name: "Luis Coronel",
    role: "Copilot CSA AI Business Solutions",
    photo: "/luisphoto.jpg",
    link: "https://www.linkedin.com/in/luis-t-coronel/",
    logo: "/microsoft-logo.png",
  },
];

const Founders = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      scale: 0,
      y: 50,
      duration: 0.55,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative -mt-12 flex items-center justify-center">
      <div className="py-10 px-8 flex flex-col items-center">
        <h2 className="mb-8">
          <Highlight>LEAD LEADERS</Highlight>
        </h2>

        <div className="w-full justify-center mt-6 flex flex-col md:flex-row items-stretch gap-10">
          {founders.map((founder, i) => (
            <div
              key={founder.name}
              ref={(el) => (cardsRef.current[i] = el!)}
              className="flex flex-col items-center"
            >
              <Link
                href={founder.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="relative mb-4 rounded-full md:w-56 lg:w-64 md:h-56 lg:h-64 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover scale-110"
                  />
                  <div className="absolute bottom-2 right-2 w-10 h-10">
                    <Image
                      src={founder.logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3>{founder.name}</h3>
                <p>{founder.role}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 233 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradientStroke">
            <stop offset="0" stopColor="#ED3E4D" stopOpacity={1} />
            <stop offset="1" stopColor="purple" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M-20,30 C15,40 45,50 80,55 100,57 140,55 160,50 180,45 210,42 250,40"
          stroke="url(#gradientStroke)"
          strokeWidth={8}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default Founders;
