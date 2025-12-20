"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import PinnedLogo from "@/components/scroll/pinned-logo";
import CanvasReveal from "@/components/scroll/canvas-reveal";
import MotionPathBox from "@/components/scroll/motion-path-box";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


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

      <CanvasReveal videoRef={videoRef} />

      <section id="scroll-section" className="relative w-full h-[150vh]" />

      <PinnedLogo />

      <div className="h-[20vh] flex justify-center items-center">scroll down</div>

      <MotionPathBox />

      <div className="flex flex-col items-center space-y-96">
        <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
        <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
        <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
      </div>

      <div className="h-[600vh]" />
    </div>
  );
}
