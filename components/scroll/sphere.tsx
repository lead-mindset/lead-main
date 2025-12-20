'use client'

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ActionLines() {
  const starsRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);
  const redCircleRef = useRef<THREE.Mesh>(null);

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 150; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          -Math.random() * 200
        ],
        scale: Math.random() * 0.1 + 0.05
      });
    }
    return arr;
  }, []);

  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          -Math.random() * 250
        ],
        length: Math.random() * 20 + 10
      });
    }
    return arr;
  }, []);

  useGSAP(() => {
    if (!starsRef.current || !linesRef.current || !redCircleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });

    tl.to(starsRef.current.position, { z: 120, duration: 3, ease: "none" }, 0);

    tl.fromTo(
      linesRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1, ease: "power1.out" },
      0.5
    );

    tl.to(linesRef.current.position, { z: 300, duration: 3, ease: "power2.in" }, 0.5);

    tl.fromTo(
      redCircleRef.current.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      { x: 10, y: 10, z: 10, duration: 1, ease: "power2.out" },
      2.5
    );
  });

  return (
    <>
      <group ref={starsRef}>
        {stars.map((s, i) => (
          <mesh key={i} position={s.position} scale={[s.scale, s.scale, s.scale]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>

      <group ref={linesRef} scale={[0, 0, 0]}>
        {lines.map((l, i) => (
          <mesh key={i} position={l.position} scale={[0.05, 0.05, l.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>

      <mesh ref={redCircleRef} position={[0, 0, 400]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
