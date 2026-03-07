"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedText from "./animated-text";

const founders = [
  // leadership
  { name: "Luis Coronel",      role: "Founder & CEO",                  photo: "/luisphoto.jpg",       link: "https://www.linkedin.com/in/luis-t-coronel/",          logo: "/allies/microsoftmini.png" },
  { name: "Antonny Porlles",   role: "Co-Founder & COO",               photo: "/antonnyphoto.jpg",    link: "https://www.linkedin.com/in/antonny-porlles/",          logo: "/allies/microsoftmini.png" },
  { name: "Nicole Jimenez",    role: "VP of Operations",               photo: "/nicole.png",          link: "https://www.linkedin.com/in/nicolejimenez824/",         logo: "/allies/accenturemini.png" },

  // directors
  { name: "Abigail Briones",   role: "Dir. of Transformation",        photo: "/abigailbriones.jpeg", link: "https://www.linkedin.com/in/abigailbrionesaranda/" },
  { name: "Jhoei Cisneros",    role: "Dir. of Events",                 photo: "/jhoel.png",           link: "#" },
  { name: "Christopher Lozada",role: "Country Director, Peru",         photo: "/christopher.jpg",     link: "https://www.linkedin.com/in/christopher-lozada/" },
  { name: "Angela Cortes",     role: "Dir. of International Exp.",     photo: "/angela.png",          link: "https://www.linkedin.com/in/angela-cortes-pabon/" },
  { name: "Kiara Aguirre",     role: "Dir. of Communications",        photo: "/kiara.jpg",           link: "#" },
  { name: "Cristhy T.",        role: "Dir. of Legal & Compliance",    photo: "/cristhy.jpeg",        link: "#" },
  { name: "Ariana Cassina",    role: "Dir. of Marketing",             photo: "/ariana.jpg",          link: "#" },
  { name: "Arianna Yauri",     role: "Dir. of Programs",              photo: "/arianna.jpg",         link: "#" },
  { name: "Xiomara Landa",     role: "Dir. of People (HR)",           photo: "/xiomara.jpg",         link: "#" },

  { name: "Keily Luna",        role: "Marketing",                      photo: "/keily.jpg",           link: "#" },
  { name: "Nikole A.",         role: "Program Manager",                photo: "/nikole.jpg",          link: "#" },
];

const Founders = () => {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center relative">
      <AnimatedText className="text-3xl md:text-6xl font-bold mb-12">
        Our Team
      </AnimatedText>

      <div className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl px-4">
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
              <AnimatedText className="text-2xl md:text-3xl font-bold">
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
