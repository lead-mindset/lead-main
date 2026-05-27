"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "@/lib/gsap-setup";

type StarMesh = THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>;

export default function ActionLines() {
  const starsRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 160 }, (_, index) => ({
      x: (seededRandom(index * 4 + 1) - 0.5) * 50,
      y: (seededRandom(index * 4 + 2) - 0.5) * 50,
      z: -seededRandom(index * 4 + 3) * 200 - 20,
      scale: seededRandom(index * 4 + 4) * 0.2 + 0.05,
    }));
  }, []);

  useLayoutEffect(() => {
    if (!starsRef.current) return;

    const meshes = starsRef.current.children as StarMesh[];

    meshes.forEach((mesh) => {
      mesh.userData.startZ = mesh.position.z;
      mesh.material.transparent = true;
      mesh.material.opacity = 1;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(
      meshes.map((m) => m.position),
      {
        z: (i) => meshes[i].userData.startZ + 180,
        duration: 0.7,
        ease: "none",
        stagger: {
          each: 0.002,
          from: "random",
        },
      },
      0
    );

    tl.to(
      meshes.map((m) => m.scale),
      {
        x: "*=1.8",
        y: "*=1.8",
        z: "*=1.8",
        duration: 0.6,
        ease: "none",
      },
      0
    );

    tl.to(
      meshes.map((m) => m.material),
      {
        opacity: 0,
        duration: 0.3,
        ease: "none",
      },
      0.7
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const createStarShape = (radius = 2, inset = 0.5) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, radius);
    shape.lineTo(inset * radius, inset * radius);
    shape.lineTo(radius, 0);
    shape.lineTo(inset * radius, -inset * radius);
    shape.lineTo(0, -radius);
    shape.lineTo(-inset * radius, -inset * radius);
    shape.lineTo(-radius, 0);
    shape.lineTo(-inset * radius, inset * radius);
    shape.closePath();
    return shape;
  };

  return (
    <group ref={starsRef}>
      {stars.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, s.y, s.z]}
          scale={[s.scale, s.scale, s.scale]}
        >
          <shapeGeometry args={[createStarShape()]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}
