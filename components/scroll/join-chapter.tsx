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
    <section className="w-full relative text-white max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join a LEAD Chapter
        </h2>

        <p className=" text-lg mb-6 max-w-xl">
          LEAD chapters are built by students who want more than just participation.
          Here, you lead initiatives, build real projects, and grow alongside others
          who share the same mindset: impact, responsibility, and growth.
        </p>

        <p className=" text-lg mb-10 max-w-xl">
          Each chapter is connected to a broader network across universities, companies,
          and professionals — giving you access to opportunities that go far beyond campus.
        </p>

        <a
          href="https://linktr.ee/leadchapters"
          target="_blank"
          className="inline-flex items-center gap-2 w-fit bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-black/90 transition"
        >
          Find your chapter
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        
      </div>

    </section>
  );
}
