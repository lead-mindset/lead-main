"use client";

import { Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, Line, Stars, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

import { MainContainer } from "@/components/global/main-container";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import gsap from "@/lib/gsap-setup";

const regionMarkers = [
  {
    name: "United States",
    anchor: [0.04, 0.42, 0.96] as [number, number, number],
    label: [0.44, 0.64, 1.08] as [number, number, number],
  },
  {
    name: "Colombia",
    anchor: [0.22, 0.05, 1.06] as [number, number, number],
    label: [0.62, 0.1, 1.12] as [number, number, number],
  },
  {
    name: "Peru",
    anchor: [0.27, -0.23, 1.02] as [number, number, number],
    label: [0.62, -0.04, 1.1] as [number, number, number],
  },
];

export function RegionalEarthStage() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="regional-footprint"
      className="relative isolate -mt-14 scroll-mt-24 overflow-visible pb-14 pt-28 sm:-mt-24 sm:pb-24 sm:pt-48"
    >
      <div className="lead-regional-aura" />
      <MainContainer>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-semibold uppercase text-white/68">
              Regional footprint
            </p>
            <h2 className="mt-4 text-[2.05rem] font-black leading-tight text-white sm:text-5xl">
              One student network across the Americas.
            </h2>
            <p className="body-copy mt-5 text-white/76">
              LEAD grows through chapters, partners, mentors, and student leaders
              across Colombia, Peru, the United States, and the communities still
              being built.
            </p>
          </div>

          <div className="regional-earth-shell relative h-[340px] overflow-hidden rounded-2xl border border-white/12 bg-[#050824] shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:h-[430px] lg:h-[500px]">
            <Canvas
              className="!absolute !inset-0"
              camera={{ position: [0, 0, 5.65], fov: 38 }}
              dpr={[1, 1.5]}
            >
              <color attach="background" args={["#050824"]} />
              <ambientLight intensity={1.35} />
              <directionalLight position={[4, 3, 4]} intensity={2.1} />
              <Stars radius={90} depth={40} count={900} factor={3.6} saturation={0} fade speed={0.35} />
              <Suspense fallback={<EarthFallback />}>
                <RegionalEarthModel sectionRef={sectionRef} />
              </Suspense>
            </Canvas>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050824] to-transparent" />
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

function RegionalEarthModel({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement>;
}) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF("/models/earthbase.glb") as GLTF & { scene: Group };
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const { size } = useThree();
  const isMobileCanvas = size.width < 520;
  const modelScale = isMobileCanvas ? 1.16 : 1.82;
  const basePosition = isMobileCanvas ? [0.1, -0.08, 0] : [0.14, -0.1, 0];
  const baseRotation = [0.1, -0.46, 0.02];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const group = groupRef.current;
      if (!section || !group) return;

      const mm = gsap.matchMedia();

      gsap.set(group.position, {
        x: basePosition[0],
        y: basePosition[1],
        z: basePosition[2],
      });
      gsap.set(group.rotation, {
        x: baseRotation[0],
        y: baseRotation[1],
        z: baseRotation[2],
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "bottom 38%",
            scrub: 0.8,
          },
        });

        tl.to(group.position, { y: basePosition[1] + 0.04, duration: 0.18 });
        tl.to(group.rotation, { x: 0.12, y: -0.52, z: 0.02, duration: 0.32 });
        tl.to(group.rotation, { x: 0.1, y: -0.6, z: 0.01, duration: 0.36 });
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(group.position, { y: basePosition[1] });
        gsap.set(group.rotation, {
          x: baseRotation[0],
          y: baseRotation[1],
          z: baseRotation[2],
        });
      });

      return () => mm.revert();
    },
    { dependencies: [sectionRef, isMobileCanvas], scope: sectionRef }
  );

  return (
    <group ref={groupRef} scale={modelScale} position={basePosition as [number, number, number]}>
      <primitive object={scene} />
      {regionMarkers.map((marker) => (
        <EarthHtmlMarker
          key={marker.name}
          name={marker.name}
          anchor={marker.anchor}
          label={marker.label}
          isMobileCanvas={isMobileCanvas}
        />
      ))}
    </group>
  );
}

function EarthHtmlMarker({
  name,
  anchor,
  label,
  isMobileCanvas,
}: {
  name: string;
  anchor: [number, number, number];
  label: [number, number, number];
  isMobileCanvas: boolean;
}) {
  return (
    <>
      <Line
        points={[anchor, label]}
        color="#d84c4c"
        lineWidth={isMobileCanvas ? 1.4 : 1.8}
        transparent
        opacity={0.72}
      />
      <mesh position={anchor}>
        <sphereGeometry args={[isMobileCanvas ? 0.034 : 0.026, 16, 16]} />
        <meshBasicMaterial color="#d84c4c" />
      </mesh>
      <Html
        position={label}
        center
        zIndexRange={[60, 0]}
      >
        <div
          data-region-label={name}
          className="pointer-events-none flex items-center gap-2 rounded-full border border-white/18 bg-background/86 px-2.5 py-1.5 text-[0.68rem] font-bold leading-none text-white shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur sm:px-3 sm:py-2 sm:text-xs"
        >
          <span className="size-2 rounded-full bg-secondary shadow-[0_0_18px_rgba(186,78,94,0.9)]" />
          <span className="whitespace-nowrap">{name}</span>
        </div>
      </Html>
    </>
  );
}

function EarthFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-white/12 bg-background/80 px-4 py-2 text-sm text-white/76">
        Loading regional map
      </div>
    </Html>
  );
}

useGLTF.preload("/models/earthbase.glb");
