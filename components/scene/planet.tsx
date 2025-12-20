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

interface PlanetProps {
  scale?: number;
}

export default function PlanetModel({ scale = 3 }: PlanetProps) {
  const gltf = useGLTF("/models/earth.glb") as GLTFResult;
  const groupRef = useRef<Group>(null);



  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.set(groupRef.current.scale, { x: 5, y: 5, z: 5 });

    gsap.set(groupRef.current.position, { x: 0, y: -30, z: -20 });


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });


    tl.to(groupRef.current.position, { x: 4, y: 0, z: -7, ease: "power1.inOut" });

    tl.to(groupRef.current.position, { x: 0, y: 0, z: -5, ease: "power1.inOut" });

    tl.to(groupRef.current.rotation, { y: Math.PI * 2, ease: "none" }, 0);

  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />

      <mesh position={[-0.2, 0.6, 0.85]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="red" />
        <Text position={[0, 0.05, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="bottom">
          USA
        </Text>
      </mesh>

      <mesh position={[0.3, -0.1, 1]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="blue" />
        <Text position={[0, 0.05, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="bottom">
          Peru
        </Text>
      </mesh>
    </group>
  );
}

