"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "flag-icons/css/flag-icons.min.css";

gsap.registerPlugin(ScrollTrigger);

type GLTFResult = ReturnType<typeof useGLTF>;

interface PlanetProps {
  scale?: number;
}

export default function PlanetModel({ scale = 5 }: PlanetProps) {
  const gltf = useGLTF("/models/earth.glb") as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  const markers = [
    { name: "USA", position: [-0.2, 0.6, 0.85], code: "us" },
    { name: "Peru", position: [0.3, -0.1, 1], code: "pe" },
  ];

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    gsap.set(groupRef.current.position, { y: -20, z: 0 });
    gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    tl.to(groupRef.current.position, {
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    tl.to(groupRef.current.rotation, {
      y: 0.1,
      x: -0.2,
      duration: 1,
      ease: "power1.inOut",
    }, ">");

    tl.to(groupRef.current.rotation, {
      y: -0.1,
      x: 0.2,
      duration: 1,
      ease: "power1.inOut",
    }, ">"); 

    tl.to(groupRef.current.rotation, {
      y: 0,
      x: 0,
      z: 0,
      duration: 0.5,
      ease: "power1.inOut",
    }, ">");
  }, []);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
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
