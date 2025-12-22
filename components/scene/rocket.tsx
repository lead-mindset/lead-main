"use client";

import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

type GLTFResult = ReturnType<typeof useGLTF>;

interface RocketProps {
  scale?: number;
}

export default function RocketModel({ scale = 3 }: RocketProps) {
  const gltf = useGLTF("/models/rocket.glb") as GLTFResult;

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
}

