"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "./animated-text";
import gsap from "@/lib/gsap-setup";

const founders = [
  { name: "Luis Coronel", role: "Founder & CEO", photo: "/luisphoto.jpg", link: "https://www.linkedin.com/in/luis-t-coronel/", logo: "/allies/microsoftmini.png" },
    { name: "Antonny Porlles", role: "Co-Founder & COO", photo: "/antonnyphoto.jpg", link: "https://www.linkedin.com/in/antonny-porlles/", logo: "/allies/microsoftmini.png" },
  { name: "Nicole Jimenez", role: "VP of Operations", photo: "/nicolephoto.jpg", link: "https://www.linkedin.com/in/nicolejimenez824/", logo: "/allies/accenturemini.png" },
  { name: "Ellie Jimenez", role: "VP of Programs", photo: "/elliephoto.jpg", link: "#" },
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
                  className="object-cover "
                />
               
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
