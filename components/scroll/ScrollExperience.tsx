"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { TOTAL_PAGES } from "@/config/chapters";
import ChapterRouter from "./ChapterRouter";
import Scene from "../scene/Scene";
import HTMLChapters from "./HTMLChapters";
import { Overlay } from "./Overlay";
import { Office } from "../scene/Office";
export default function ScrollExperience() {
  return (
    <Canvas
      className="w-full h-screen"
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, 2]}
    >
      <ScrollControls pages={3} damping={0.2}>
        <ChapterRouter />
        <Scene />
        <Office/>
        <Scroll html>
          <Overlay/>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
