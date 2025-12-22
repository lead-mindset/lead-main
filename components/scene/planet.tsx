"use client";

import React from "react";
import { useGLTF, Html } from "@react-three/drei";

import "flag-icons/css/flag-icons.min.css";

type GLTFResult = ReturnType<typeof useGLTF>;

interface PlanetProps {
  scale?: number;
}

export default function PlanetModel({ scale = 3 }: PlanetProps) {
  const gltf = useGLTF("/models/earth.glb") as GLTFResult;

  const markers = [
    { name: "USA", position: [-0.2, 0.6, 0.85], code: "us" },
    { name: "Peru", position: [0.3, -0.1, 1], code: "pe" },
  ];

  return (
    <group scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} />

      {markers.map(({ name, position, code }, i) => (
        <Html key={i} position={position} center>
          <div className="flex items-center space-x-2 text-2xl bg-foreground text-background font-bold p-2 rounded">
            <span className={`fi fi-${code}`} />
            <span>{name}</span>
          </div>
        </Html>
      ))}
    </group>
  );
}
