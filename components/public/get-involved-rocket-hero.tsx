"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import gsap from "@/lib/gsap-setup";

const ROCKET_SRC = "/models/rocket.glb";

export function GetInvolvedRocketHero() {
  // warm the rocket GLB only when the get-involved hero mounts, so a prefetch
  // of this route from other pages doesn't pull the 1.7MB model
  useEffect(() => {
    useGLTF.preload(ROCKET_SRC);
  }, []);

  return (
    <>
      <RocketVisualLayer
        compact
        className="inset-x-0 top-20 h-[42svh] min-h-80 opacity-55 lg:hidden"
        auraClassName="bg-[radial-gradient(circle_at_72%_48%,color-mix(in_oklch,var(--primary)_36%,transparent),transparent_17rem)]"
        cameraPosition={[0, 0.04, 11.8]}
        modelPosition={[0.52, -0.38, 0]}
        modelScale={0.25}
        floatY={-0.24}
      />

      <RocketVisualLayer
        className="inset-0 hidden lg:block"
        auraClassName="bg-[radial-gradient(circle_at_74%_42%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_34rem),radial-gradient(circle_at_86%_60%,color-mix(in_oklch,var(--brand-red)_12%,transparent),transparent_24rem)]"
        cameraPosition={[0, 0.1, 12.2]}
        modelPosition={[2.82, -0.52, 0]}
        modelScale={0.3}
        floatY={-0.34}
      />
    </>
  );
}

function RocketVisualLayer({
  compact = false,
  className,
  auraClassName,
  cameraPosition,
  modelPosition,
  modelScale,
  floatY,
}: {
  compact?: boolean;
  className: string;
  auraClassName: string;
  cameraPosition: [number, number, number];
  modelPosition: [number, number, number];
  modelScale: number;
  floatY: number;
}) {
  const [modelReady, setModelReady] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 overflow-hidden ${className}`}
      data-model-ready={modelReady ? "true" : "false"}
    >
      <div className={`absolute inset-0 ${auraClassName}`} />
      <RocketFallbackArt compact={compact} hidden={modelReady} />
      <RocketCanvas
        cameraPosition={cameraPosition}
        modelPosition={modelPosition}
        modelScale={modelScale}
        floatY={floatY}
        onReady={handleModelReady}
      />
    </div>
  );
}

function RocketCanvas({
  cameraPosition,
  modelPosition,
  modelScale,
  floatY,
  onReady,
}: {
  cameraPosition: [number, number, number];
  modelPosition: [number, number, number];
  modelScale: number;
  floatY: number;
  onReady: () => void;
}) {
  return (
    <Canvas camera={{ position: cameraPosition, fov: 42 }} dpr={[1, 1.5]} className="!absolute !inset-0 z-10">
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} />
      <pointLight position={[-3, -2, 3]} intensity={0.75} color="#9f258c" />
      <Stars radius={34} depth={18} count={320} factor={3.2} saturation={0} fade speed={0.25} />
      <Suspense fallback={<ModelFallback />}>
        <HeroRocketModel
          modelPosition={modelPosition}
          modelScale={modelScale}
          floatY={floatY}
          onReady={onReady}
        />
      </Suspense>
    </Canvas>
  );
}

function RocketFallbackArt({ compact = false, hidden = false }: { compact?: boolean; hidden?: boolean }) {
  return (
    <div
      aria-hidden="true"
      data-3d-fallback="rocket"
      className={[
        "pointer-events-none absolute z-0 rotate-[-14deg] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        compact
          ? "right-6 top-8 h-56 w-40"
          : "right-[9%] top-[17%] h-[32rem] w-[22rem]",
        hidden ? "invisible opacity-0" : compact ? "visible opacity-70" : "visible opacity-78",
      ].join(" ")}
    >
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-[999px_999px_40%_40%] border border-foreground/16 bg-[linear-gradient(160deg,color-mix(in_oklch,white_96%,transparent),color-mix(in_oklch,var(--brand-purple-light)_78%,transparent)_46%,color-mix(in_oklch,var(--primary)_50%,transparent))] shadow-[0_28px_90px_color-mix(in_oklch,var(--primary)_26%,transparent)]" />
      <div className="absolute left-1/2 top-[26%] size-[22%] -translate-x-1/2 rounded-full border border-foreground/28 bg-[radial-gradient(circle,color-mix(in_oklch,var(--background)_98%,transparent),color-mix(in_oklch,var(--primary)_72%,transparent))]" />
      <div className="absolute bottom-[13%] left-[20%] h-[20%] w-[20%] rounded-[80%_20%_80%_20%] bg-[linear-gradient(135deg,var(--brand-red),var(--brand-rose))]" />
      <div className="absolute bottom-[13%] right-[20%] h-[20%] w-[20%] rounded-[20%_80%_20%_80%] bg-[linear-gradient(135deg,var(--brand-rose),var(--primary))]" />
      <div className="absolute bottom-[-13%] left-1/2 h-[34%] w-[18%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,color-mix(in_oklch,var(--brand-red)_92%,transparent),color-mix(in_oklch,var(--brand-purple-light)_8%,transparent))] blur-xl" />
      <div className="absolute bottom-[-8%] left-[12%] h-[3px] w-[58%] rounded-full bg-primary/38 blur-[1px]" />
    </div>
  );
}

function HeroRocketModel({
  modelPosition,
  modelScale,
  floatY,
  onReady,
}: {
  modelPosition: [number, number, number];
  modelScale: number;
  floatY: number;
  onReady: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(ROCKET_SRC) as GLTF & { scene: Group };
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    const readyFrame = window.requestAnimationFrame(onReady);
    return () => window.cancelAnimationFrame(readyFrame);
  }, [onReady, scene]);

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
      <div className="rounded-full border border-border bg-background/90 px-4 py-2 text-caption font-semibold text-muted-foreground">
        Loading LEAD launch
      </div>
    </Html>
  );
}
