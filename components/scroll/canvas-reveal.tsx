"use client";

import { useRef, useEffect, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "@/lib/gsap-setup";

import PlanetModel from "../scene/planet";
import CameraAnimation3 from "../scene/camera-animation3";

interface CanvasRevealProps {
  videoRef: RefObject<HTMLVideoElement>;
  scrollRef: RefObject<HTMLDivElement>;
}

export default function CanvasReveal({ videoRef, scrollRef }: CanvasRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !container.current || !videoRef.current) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: () => tl.invalidate(),
      },
    });

    tl.fromTo(
      container.current,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", ease: "none" }
    ).to(videoRef.current, { autoAlpha: 0 }, "<80%");
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scrollRef, videoRef]);

  return (
    <div
      ref={container}
      className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
      style={{ clipPath: "circle(0% at 50% 50%)" }}
    >
      <Canvas>
        <color attach="background" args={["#000D5A"]} />
        <ambientLight intensity={2} />
        <fog attach="fog" args={["#000D5A", 2, 17]} />
        <Stars />
        <PlanetModel />
        <CameraAnimation3 />
      </Canvas>
    </div>
  );
}
