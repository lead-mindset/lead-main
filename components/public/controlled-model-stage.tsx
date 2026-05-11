"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

import gsap from "@/lib/gsap-setup";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import { cn } from "@/lib/utils";

type ModelKind = "earth" | "rocket";

const modelConfig = {
  earth: {
    src: "/models/earthbase.glb",
    scale: 1.45,
    position: [0, -0.05, 0] as [number, number, number],
    rotation: [0.1, -0.7, 0] as [number, number, number],
  },
  rocket: {
    src: "/models/rocket.glb",
    scale: 0.36,
    position: [0, -0.25, 0] as [number, number, number],
    rotation: [0.35, -1.9, 0.05] as [number, number, number],
  },
};

export function ControlledModelStage({
  kind,
  eyebrow,
  title,
  description,
  className,
}: {
  kind: ModelKind;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("editorial-card relative overflow-hidden rounded-2xl p-0", className)}>
      <div className="aspect-[16/10] min-h-[360px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[4, 4, 4]} intensity={2.2} />
          <Suspense fallback={<ModelFallback />}>
            <AnimatedModel kind={kind} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.25} />
        </Canvas>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-5 sm:p-7">
        <span className="eyebrow-label">{eyebrow}</span>
        <h3 className="mt-4 max-w-[18rem] text-xl font-bold leading-tight text-foreground sm:max-w-2xl sm:text-2xl">
          {title}
        </h3>
        <p className="body-copy mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function AnimatedModel({ kind }: { kind: ModelKind }) {
  const config = modelConfig[kind];
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(config.src) as GLTF & { scene: Group };
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useGSAP(
    () => {
      const group = groupRef.current;
      if (!group) return;

      const mm = gsap.matchMedia();

      gsap.set(group.position, {
        x: config.position[0],
        y: config.position[1],
        z: config.position[2],
      });
      gsap.set(group.rotation, {
        x: config.rotation[0],
        y: config.rotation[1],
        z: config.rotation[2],
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(group.rotation, {
          y: kind === "earth" ? config.rotation[1] + 1.2 : config.rotation[1] + 0.55,
          x: kind === "earth" ? config.rotation[0] + 0.12 : config.rotation[0] - 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(group.position, {
          y: config.position[1] + (kind === "earth" ? 0.15 : 0.28),
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(group.rotation, {
          x: config.rotation[0],
          y: config.rotation[1],
          z: config.rotation[2],
        });
      });

      return () => mm.revert();
    },
    { dependencies: [kind] }
  );

  return (
    <group ref={groupRef} scale={config.scale}>
      <primitive object={scene} />
    </group>
  );
}

function ModelFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
        Loading LEAD visual
      </div>
    </Html>
  );
}
