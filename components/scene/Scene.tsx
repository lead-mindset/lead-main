"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { Group } from "three";
import { chapterRanges } from "@/config/chapters";
import ChapterScene from "./ChapterScene";

export default function Scene() {
  const groupRef = useRef<Group>(null);
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    chapterRanges.forEach((chapter) => {
      const t = scroll.range(chapter.from, chapter.length);

      if (t > 0 && t <= 1) {
        if (chapter.type === "horizontal") {
          groupRef.current!.position.x = -t * viewport.width * chapter.pages;
          groupRef.current!.position.y = 0;
        } else {
          groupRef.current!.position.y = -t * viewport.height * chapter.pages;
          groupRef.current!.position.x = 0;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>


    </group>
  );
}
