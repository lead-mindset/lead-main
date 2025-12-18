"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useChapterStore } from "@/store/useChapterStore";
import type { ChapterRange } from "@/config/chapters";

interface ChapterSceneProps {
  chapter: ChapterRange;
  position: [number, number, number];
}

export default function ChapterScene({ chapter, position }: ChapterSceneProps) {
  const meshRef = useRef<Mesh>(null);

  const activeChapter = useChapterStore((s) => s.activeChapter);
  const isActive = activeChapter === chapter.id;

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isActive) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const getChapterGeometry = () => {
    switch (chapter.id) {
      case "intro":
        return <sphereGeometry args={[1, 32, 32]} />;
      case "impact":
        return <icosahedronGeometry args={[1, 0]} />;
      case "programs":
        return <octahedronGeometry args={[1, 0]} />;
      case "team":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "future":
        return <torusKnotGeometry args={[0.7, 0.3, 100, 16]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const getChapterColor = () => {
    switch (chapter.id) {
      case "intro":
        return "#3b82f6";
      case "impact":
        return "#10b981";
      case "programs":
        return "#8b5cf6";
      case "team":
        return "#f59e0b";
      case "future":
        return "#06b6d4";
      default:
        return "#6b7280";
    }
  };

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={isActive ? 1.2 : 0.8}>
        {getChapterGeometry()}
        <meshStandardMaterial
          color={getChapterColor()}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={isActive ? 0.9 : 0.6}
        />
      </mesh>

      {chapter.id === "impact" && (
        <group>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(i * Math.PI * 0.25) * 2,
                Math.sin(i * Math.PI * 0.25) * 2,
                0,
              ]}
              scale={0.2}
            >
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#34d399" />
            </mesh>
          ))}
        </group>
      )}

      {chapter.id === "future" && (
        <group>
          {[...Array(5)].map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, i * 0.5 - 1]}
              rotation={[0, i * 0.5, 0]}
              scale={0.3}
            >
              <torusGeometry args={[0.5, 0.2, 8, 16]} />
              <meshStandardMaterial
                color="#06b6d4"
                transparent
                opacity={0.7 - i * 0.1}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
