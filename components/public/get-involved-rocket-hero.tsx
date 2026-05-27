"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import gsap from "@/lib/gsap-setup";

const ROCKET_SRC = "/models/rocket.glb";

export function GetInvolvedRocketHero() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 z-0 h-[42svh] min-h-80 overflow-hidden opacity-55 lg:hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(122,87,209,0.36),transparent_17rem)]" />
        <RocketCanvas
          cameraPosition={[0, 0.04, 11.8]}
          modelPosition={[0.52, -0.38, 0]}
          modelScale={0.25}
          floatY={-0.24}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(122,87,209,0.28),transparent_34rem),radial-gradient(circle_at_86%_60%,rgba(229,62,62,0.12),transparent_24rem)]" />
        <RocketCanvas
          cameraPosition={[0, 0.1, 12.2]}
          modelPosition={[2.18, -0.48, 0]}
          modelScale={0.32}
          floatY={-0.34}
        />
      </div>
    </>
  );
}

function RocketCanvas({
  cameraPosition,
  modelPosition,
  modelScale,
  floatY,
}: {
  cameraPosition: [number, number, number];
  modelPosition: [number, number, number];
  modelScale: number;
  floatY: number;
}) {
  return (
    <Canvas camera={{ position: cameraPosition, fov: 42 }} dpr={[1, 1.5]} className="relative z-10">
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} />
      <pointLight position={[-3, -2, 3]} intensity={0.75} color="#9f258c" />
      <Stars radius={34} depth={18} count={320} factor={3.2} saturation={0} fade speed={0.25} />
      <Suspense fallback={<ModelFallback />}>
        <HeroRocketModel modelPosition={modelPosition} modelScale={modelScale} floatY={floatY} />
      </Suspense>
    </Canvas>
  );
}

function HeroRocketModel({
  modelPosition,
  modelScale,
  floatY,
}: {
  modelPosition: [number, number, number];
  modelScale: number;
  floatY: number;
}) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(ROCKET_SRC) as GLTF & { scene: Group };
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useGSAP(() => {
    const group = groupRef.current;
    if (!group) return;

    const mm = gsap.matchMedia();

    gsap.set(group.position, { x: modelPosition[0], y: modelPosition[1], z: modelPosition[2] });
    gsap.set(group.rotation, { x: 0.32, y: -1.82, z: 0.14 });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(group.rotation, {
        x: 0.2,
        y: -1.2,
        z: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: ".get-involved-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.15,
        },
      });

      gsap.to(group.position, {
        y: floatY,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    mm.add(REDUCED_MOTION_QUERY, () => {
      gsap.set(group.rotation, { x: 0.32, y: -1.82, z: 0.14 });
      gsap.set(group.position, { x: modelPosition[0], y: modelPosition[1], z: modelPosition[2] });
    });

    return () => mm.revert();
  }, [floatY, modelPosition]);

  return (
    <group ref={groupRef} scale={modelScale}>
      <primitive object={scene} />
    </group>
  );
}

function ModelFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-border bg-background/90 px-4 py-2 text-xs font-semibold text-muted-foreground">
        Loading LEAD launch
      </div>
    </Html>
  );
}

useGLTF.preload(ROCKET_SRC);
