"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import PinnedLogo from "@/components/scroll/pinned-logo";
import CanvasReveal from "@/components/scroll/canvas-reveal";
import MotionPathBox from "@/components/scroll/motion-path-box";
import SloganReveal from "@/components/scroll/slogan";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="overflow-x-hidden">
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

      <SloganReveal />

      <div className="markers-wrapper relative w-full h-[500px]">
        <div className="marker absolute top-0 left-0 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-32 left-32 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-52 left-0 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-32 left-32 w-6 h-6 bg-red-500" />
        <MotionPathBox />
      </div>

      

      <div className=" bg-red-500/50 relative h-[600vh]" />

    </div>
  );
}
