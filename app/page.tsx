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
import SloganReveal from "@/components/scroll/slogan";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="">
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


      <SloganReveal/>


      <MotionPathBox />

     <div className="markers-wrapper relative flex flex-col items-center space-y-96">
  <div className="marker w-24 h-24 bg-gray-700 rounded-lg" />
  <div className="marker w-24 h-24 bg-gray-700 rounded-lg" />
  <div className="marker w-24 h-24 bg-gray-700 rounded-lg" />
</div>


      <div className=" bg-red-500/50 relative h-[600vh]" />
    </div>
  );
}
