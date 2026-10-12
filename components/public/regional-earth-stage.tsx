"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
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
    anchor: [-0.04, 0.55, 1.0] as [number, number, number],
    label: [0.22, 0.68, 1.1] as [number, number, number],
    mobileLabel: [0.18, 0.68, 1.12] as [number, number, number],
  },
  {
    name: "Colombia",
    anchor: [0.38, 0.04, 1.04] as [number, number, number],
    label: [0.62, 0.12, 1.12] as [number, number, number],
    mobileLabel: [0.56, 0.14, 1.14] as [number, number, number],
  },
  {
    name: "Peru",
    anchor: [0.38, -0.2, 1.03] as [number, number, number],
    label: [0.62, -0.2, 1.11] as [number, number, number],
    mobileLabel: [0.66, -0.24, 1.1] as [number, number, number],
  },
];

export function RegionalEarthStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [earthReady, setEarthReady] = useState(false);
  const handleEarthReady = useCallback(() => setEarthReady(true), []);

  return (
    <section
      ref={sectionRef}
      id="regional-footprint"
      className="relative isolate scroll-mt-24 overflow-visible pb-20 pt-20 sm:pb-28 sm:pt-32"
    >
      <div className="lead-regional-aura" />
      <MainContainer>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative z-10 max-w-xl">
            <p className="text-overline font-sans font-bold uppercase text-foreground/78">
              Regional footprint
            </p>
            <h2 className="text-h1 font-display font-semibold mt-4 text-foreground">
              One student network across the Americas.
            </h2>
            <p className="text-body font-sans mt-5 text-foreground/76">
              LEAD grows through chapters, partners, mentors, and student leaders
              across Colombia, Peru, the United States, and the communities still
              being built.
            </p>
          </div>

          <div
            data-lead-motion="card"
            className="regional-earth-shell relative h-[330px] overflow-hidden rounded-2xl border border-foreground/12 bg-background shadow-[0_28px_90px_color-mix(in_oklch,black_38%,transparent)] sm:h-[420px] lg:h-[480px]"
            data-model-ready={earthReady ? "true" : "false"}
          >
            <RegionalMapFallback hidden={earthReady} />
            <Canvas
              className="!absolute !inset-0 z-10"
              camera={{ position: [0, 0, 5.65], fov: 38 }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={1.35} />
              <directionalLight position={[4, 3, 4]} intensity={2.1} />
              <Stars radius={90} depth={40} count={900} factor={3.6} saturation={0} fade speed={0.35} />
              <Suspense fallback={<EarthFallback />}>
                <RegionalEarthModel sectionRef={sectionRef} onReady={handleEarthReady} />
              </Suspense>
            </Canvas>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

function RegionalMapFallback({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden="true"
      data-3d-fallback="regional-earth"
      className={[
        "pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_54%_42%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_17rem),radial-gradient(circle_at_54%_42%,color-mix(in_oklch,var(--success)_12%,transparent),transparent_12rem)] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        hidden ? "invisible opacity-0" : "visible opacity-100",
      ].join(" ")}
    >
      <div className="absolute left-1/2 top-[46%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10 bg-[radial-gradient(circle_at_38%_32%,color-mix(in_oklch,var(--success)_36%,transparent),transparent_34%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_68%,transparent),color-mix(in_oklch,var(--brand-purple)_48%,transparent))] shadow-[0_28px_80px_color-mix(in_oklch,black_28%,transparent)] sm:h-[24rem] sm:w-[24rem]" />
      <div className="absolute left-[52%] top-[34%] h-16 w-20 -translate-x-1/2 rounded-[58%_42%_48%_52%] bg-emerald-300/32 blur-[1px] sm:h-20 sm:w-28" />
      <div className="absolute left-[48%] top-[43%] h-24 w-14 rounded-[42%_58%_45%_55%] bg-emerald-300/38 blur-[1px] sm:h-32 sm:w-20" />
      <FallbackRegionLabel className="left-[49%] top-[27%]" label="United States" />
      <FallbackRegionLabel className="left-[58%] top-[48%]" label="Colombia" />
      <FallbackRegionLabel className="left-[56%] top-[61%]" label="Peru" />
    </div>
  );
}

function FallbackRegionLabel({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 items-center gap-2 rounded-full border border-foreground/16 bg-background/78 px-2.5 py-1.5 text-caption font-bold leading-none text-foreground shadow-[0_10px_30px_color-mix(in_oklch,black_28%,transparent)] backdrop-blur sm:px-3 sm:py-2 sm:text-caption ${className}`}
    >
      <span className="size-2 rounded-full bg-secondary shadow-[0_0_18px_color-mix(in_oklch,var(--brand-red-light)_75%,transparent)]" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function RegionalEarthModel({
  sectionRef,
  onReady,
}: {
  sectionRef: RefObject<HTMLElement>;
  onReady: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF("/models/earthbase.glb") as GLTF & { scene: Group };
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const { size } = useThree();
  const isMobileCanvas = size.width < 520;
  const modelScale = isMobileCanvas ? 1.16 : 1.82;
  const basePosition = isMobileCanvas ? [0.1, -0.08, 0] : [0.14, -0.1, 0];
  const baseRotation = [0.1, -0.46, 0.02];

  useEffect(() => {
    const readyFrame = window.requestAnimationFrame(onReady);
    return () => window.cancelAnimationFrame(readyFrame);
  }, [onReady, scene]);

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
          label={isMobileCanvas ? marker.mobileLabel : marker.label}
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
          className="pointer-events-none flex items-center gap-1.5 rounded-full border border-foreground/18 bg-background/86 px-2 py-1 text-caption font-bold leading-none text-foreground shadow-[0_10px_30px_color-mix(in_oklch,black_32%,transparent)] backdrop-blur sm:gap-2 sm:px-3 sm:py-2 sm:text-caption"
        >
          <span className="size-1.5 rounded-full bg-secondary shadow-[0_0_18px_color-mix(in_oklch,var(--brand-red-light)_90%,transparent)] sm:size-2" />
          <span className="whitespace-nowrap">{name}</span>
        </div>
      </Html>
    </>
  );
}

function EarthFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-foreground/12 bg-background/80 px-4 py-2 text-small text-foreground/76">
        Loading regional map
      </div>
    </Html>
  );
}

useGLTF.preload("/models/earthbase.glb");
