"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import PlanetModel from "../scene/planet";
import CameraAnimation3 from "../scene/camera-animation3";

interface CanvasRevealProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function CanvasReveal({ videoRef, scrollRef }: CanvasRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("scrollRef:", scrollRef.current);
    console.log("container:", container.current);
    console.log("videoRef:", videoRef.current);
  }, []);


  useEffect(() => {
    if (!scrollRef.current || !container.current || !videoRef.current) {
      console.log("Refs not ready yet");
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

    console.log("Timeline created");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scrollRef.current, videoRef.current]);

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
