"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function Galaxy() {
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const points = groupRef.current.children[0] as THREE.Points;
    if (!points) return;

    gsap.to(groupRef.current.scale, {
      x: 3,
      y: 3,
      z: 3,
      scrollTrigger: {
        trigger: "#empowering",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(points.material, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#empowering",
        start: "top bottom", 
        end: "bottom center",    
        scrub: true,
      },
    });
  }, []);

  const { positions, colors } = (() => {
    const count = 8000;
    const radius = 20;
    const branches = 5;
    const spin = 1.2;
    const randomness = 0.3;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const insideColor = new THREE.Color("#ffb347");
    const outsideColor = new THREE.Color("#6b93ff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.6) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * randomness;
      const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * randomness;
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * randomness;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY * 0.2;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  })();

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
          transparent
          opacity={1}
        />
      </points>
    </group>
  );
}
