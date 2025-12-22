"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

type GLTFResult = ReturnType<typeof useGLTF>;

interface RocketProps {
  scale?: number;
}

export default function RocketModel({ scale = 1 }: RocketProps) {
  const rocketRef = useRef<Group>(null);
  const gltf = useGLTF("/models/rocket.glb") as GLTFResult;

  useEffect(() => {
    if (!rocketRef.current) return;

    gsap.to(rocketRef.current.position, {
      x: 0,
      scrollTrigger: {
        trigger: "#slack",
        start: "top top",
        end: "bottom top", 
        scrub: true,
      },
    });
  }, []);

  return (
    <group ref={rocketRef} scale={[1, 1, 1]}>
      <primitive object={gltf.scene} />
    </group>
  );
}
