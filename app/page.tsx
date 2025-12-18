"use client";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Experience from "./Experience";
import { ChapterProvider } from "@/context/ChapterContext";
import ScrollExperience from "@/components/scroll/ScrollExperience";
export default function Page() {
  return (
      <main className="relative w-full">
        <ScrollExperience />
      </main>
  );
}
