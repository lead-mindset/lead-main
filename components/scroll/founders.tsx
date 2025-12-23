"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./animated-text";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  { name: "Antonny Porlles", role: "Data & AI Technical Specialist", photo: "/antonnyphoto.jpg", link: "https://www.linkedin.com/in/antonny-porlles/", logo: "/next.svg" },
  { name: "Luis Coronel", role: "Copilot CSA AI Business Solutions", photo: "/luisphoto.jpg", link: "https://www.linkedin.com/in/luis-t-coronel/", logo: "/next.svg" },
  { name: "Jane Doe", role: "AI Strategist", photo: "/luisphoto.jpg", link: "#", logo: "/next.svg" },
  { name: "John Smith", role: "Cloud Solutions Architect", photo: "/luisphoto.jpg", link: "#", logo: "/next.svg" },
];

const Founders = () => {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center relative">
      <AnimatedText className="text-3xl md:text-6xl font-bold mb-12">
        Our Team
      </AnimatedText>

      <div className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl px-4">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className="founder-card flex flex-col items-center text-center relative"
          >
            <Link
              href={founder.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="relative mb-4 rounded-full w-56 h-56 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  className="object-cover"
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
              <AnimatedText className="text-2xl md:text-4xl font-bold">
                {founder.name}
              </AnimatedText>
              <AnimatedText className="text-xl md:text-2xl font-bold">
                {founder.role}
              </AnimatedText>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founders;
