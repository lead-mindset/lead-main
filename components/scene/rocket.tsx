"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

gsap.registerPlugin(ScrollTrigger);

interface RocketProps {
  scale?: number;
}

export default function RocketModel({ scale = 1 }: RocketProps) {
  const rocketRef = useRef<Group>(null);
  const gltf = useGLTF("/models/rocket.glb") as GLTF & { scene: Group };

  useEffect(() => {
    if (!rocketRef.current) return;

    gsap.set(rocketRef.current.position, { x: 0, y: -1, z: 0 });
    gsap.set(rocketRef.current.rotation, { x: 0.3, y: -2, z: 0 });

    gsap.to(rocketRef.current.position, {
      x: 10,
      y: -10,
      z: 5,
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
    });

    gsap.to(rocketRef.current.rotation, {
      y: -1.5,
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
    });
  }, []);

  return (
    <group ref={rocketRef} scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} />
    </group>
  );
}
