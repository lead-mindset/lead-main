"use client";

import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { CardContent } from "../ui/card";
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
    <section id='join'
      className="w-full h-screen relative flex items-center justify-center py-24 px-4">

      <Card className="js-card max-w-5xl relative overflow-hidden rounded-2xl text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-chart-2/20 z-0 rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-chart-1/20 rounded-full" />
          <CardContent className="relative flex flex-col z-10 gap-8 p-10 md:p-14">

        <h2 className="text-3xl md:text-4xl font-bold">
          Join a LEAD Chapter
        </h2>

        <p className="text-white/80 text-xl md:text-2xl max-w-xl">
          Here, you lead initiatives, build real projects, and grow alongside others
          who share the same mindset: impact, responsibility, and growth.
        </p>

        </CardContent>
      </Card>
    </section>
  );
}
