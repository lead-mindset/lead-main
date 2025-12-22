"use client";

import React from "react";
import { useGLTF, Text } from "@react-three/drei";
import type { Group } from "three";

type GLTFResult = ReturnType<typeof useGLTF>;

interface PlanetProps {
  scale?: number;
}

export default function PlanetModel({ scale = 3 }: PlanetProps) {
  const gltf = useGLTF("/models/earth.glb") as GLTFResult;

  return (
    <group scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} />

      <mesh position={[-0.2, 0.6, 0.85]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="red" />
        <Text
          position={[0, 0.05, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          USA
        </Text>
      </mesh>

      <mesh position={[0.3, -0.1, 1]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="blue" />
        <Text
          position={[0, 0.05, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          Peru
        </Text>
      </mesh>
    </group>
  );
}
