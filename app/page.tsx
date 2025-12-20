"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import ActionLines from "../components/scroll/action-lines";
import PinnedLogo from "@/components/scroll/pinned-logo";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


function CanvasReveal({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      container.current,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", ease: "none" }
    )
      .to(videoRef.current, { autoAlpha: 0 }, "<80%");
  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
      style={{ clipPath: "circle(0% at 50% 50%)" }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#000D5A"]} />
        <ambientLight intensity={1.2} />
        <ActionLines />
        <Stars />
      </Canvas>
    </div>
  );
}


function MotionPathBox() {
  const container = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const markers = gsap.utils.toArray<HTMLElement>(".marker");

    const points = markers.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + window.scrollY + r.height / 2,
      };
    });

    gsap.to(boxRef.current, {
      motionPath: { path: points, curviness: 1.5 },
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div
        ref={boxRef}
        className="fixed w-24 h-24 bg-blue-500 rounded-lg -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}


function Markers() {
  return (
    <div className="flex flex-col items-center space-y-96">
      <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
      <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
      <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
    </div>
  );
}


export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative">
      <CanvasReveal videoRef={videoRef} />

      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      />

      <section id="scroll-section" className="relative w-full h-[150vh]" />

      <PinnedLogo />

      <div className="h-[20vh] flex justify-center items-center">scroll down</div>

      <Markers />
      <MotionPathBox />

      <div className="h-[600vh]" />
    </div>
  );
}
