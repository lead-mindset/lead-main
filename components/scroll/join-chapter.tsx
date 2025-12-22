"use client";

import { ArrowRight } from "lucide-react";

const chapters = [
  { name: "LEAD UTP", instagram: "https://instagram.com/lead.utp" },
  { name: "LEAD UNI", instagram: "https://instagram.com/lead.uni" },
  { name: "LEAD PUCP", instagram: "https://instagram.com/lead.pucp" },
  { name: "LEAD UPC", instagram: "https://instagram.com/lead.upc" },
  { name: "LEAD UNMSM", instagram: "https://instagram.com/lead.unmsm" },
  { name: "LEAD ESAN", instagram: "https://instagram.com/lead.esan" },
  { name: "LEAD USIL", instagram: "https://instagram.com/lead.usil" },
  { name: "LEAD UDEP", instagram: "https://instagram.com/lead.udep" },
  { name: "LEAD UTEC", instagram: "https://instagram.com/lead.utec" },
  { name: "LEAD UP", instagram: "https://instagram.com/lead.up" },
];

export default function JoinChapter() {
  return (
    <section id='join' className="w-full relative text-white text-center flex-col max-w-7xl mx-auto px-6 h-screen flex items-center justify-center">
      
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join a LEAD Chapter
        </h2>

        <p className=" text-lg mb-6 max-w-xl">
          Here, you lead initiatives, build real projects, and grow alongside others
          who share the same mindset: impact, responsibility, and growth.
        </p>

        <a
          href="https://linktr.ee/leadchapters"
          target="_blank"
          className="inline-flex items-center gap-2 w-fit bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-black/90 transition"
        >
          Find your chapter
          <ArrowRight className="w-4 h-4" />
        </a>

    </section>
  );
}
