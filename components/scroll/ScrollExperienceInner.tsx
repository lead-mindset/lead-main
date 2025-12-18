
// ScrollExperienceInner.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { ChapterProvider } from "@/context/ChapterContext";
import Scene from "../scene/Scene";
import HTMLChapters from "./HTMLChapters";

export default function ScrollExperienceInner() {
  return (
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }} style={{ width: "100%", height: "100%", position: "fixed" }}>
        <ScrollControls pages={3} damping={0.2}>
          <Scene />
          <Scroll >
          </Scroll>
        </ScrollControls>
      </Canvas>
  );
}
