"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { TOTAL_PAGES } from "@/config/chapters";
import ChapterRouter from "./ChapterRouter";
import Scene from "../scene/Scene";
import HTMLChapters from "./HTMLChapters";

export default function ScrollExperience() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, 2]}
    >
      <ScrollControls pages={TOTAL_PAGES} damping={0.2}>
        <ChapterRouter />
        <Scene />

        <Scroll html>
          <HTMLChapters />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
