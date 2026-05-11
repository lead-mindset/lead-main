"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

import { prefersReducedMotion } from "@/components/global/motion-guidelines";

const nodes: [number, number, number][] = [
  [-2.6, 0.4, 0],
  [-1.3, 1.1, -0.5],
  [0, 0.1, 0.2],
  [1.25, 0.9, -0.3],
  [2.4, 0.2, 0.1],
  [-0.8, -1, -0.2],
  [1.1, -0.9, 0.3],
];

function NetworkScene() {
  const groupRef = useRef<Group>(null);
  const reducedMotion =
    typeof window === "undefined" ? true : prefersReducedMotion();

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.12;
    groupRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.14) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Line points={nodes} color="#7E56E2" lineWidth={1.8} transparent opacity={0.72} />
      {nodes.map((node, index) => (
        <Sphere key={index} args={[0.08, 16, 16]} position={node}>
          <meshBasicMaterial color={index % 2 ? "#BA4E5E" : "#E53E3E"} />
        </Sphere>
      ))}
    </group>
  );
}

export function NetworkAccent() {
  return (
    <div className="pointer-events-none absolute inset-y-10 right-0 hidden w-[42%] opacity-80 lg:block">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 48 }}>
        <ambientLight intensity={1.4} />
        <NetworkScene />
      </Canvas>
    </div>
  );
}
