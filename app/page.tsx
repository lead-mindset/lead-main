'use client';

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useGSAP(() => {
    if (!meshRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    })
    .to(meshRef.current.rotation, { x: Math.PI * 2, y: Math.PI * 2 })
    .to(meshRef.current.position, { z: -5 }, 0);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function App() {
  const htmlRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!htmlRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    }).to(htmlRef.current, { y: -900, opacity: 0 });
  });

  return (
    <div className="relative h-[200vh] bg-black">
      {/* Fixed Canvas */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <AnimatedCube />
          <OrbitControls />
        </Canvas>
      </div>

      <div
        ref={htmlRef}
        className="sticky top-0 h-screen flex items-center justify-center text-5xl text-white z-10"
      >
        Sticky Header HTML
      </div>

      <section
        id="scroll-section"
        className="relative w-full h-[200vh]"
      />
    </div>
  );
}
