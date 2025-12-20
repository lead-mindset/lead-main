"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import PinnedSlogan from "@/components/scroll/pinned-logo";
import CanvasReveal from "@/components/scroll/canvas-reveal";
import MotionPathBox from "@/components/scroll/motion-path-box";
import SloganReveal from "@/components/scroll/slogan";
import AnimatedText from "@/components/scroll/animated-text";
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


      <PinnedSlogan />

      <div className="markers-wrapper relative w-full h-[500px]">
        <div className="marker absolute top-0 left-0 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-32 left-32 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-52 left-0 w-6 h-6 bg-red-500" />
        <div className="marker absolute top-32 left-32 w-6 h-6 bg-red-500" />
        <MotionPathBox />
      </div>

      <div className="relative text-white space-y-10 max-w-5xl mx-auto">
        <AnimatedText className="text-4xl">
          We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering</span>
          the next generation of Latino leaders across Latin America and the U.S
        </AnimatedText>

        <AnimatedText className="text-4xl text-right">
          Through mentorship, leadership training, and impactful community
          projects, we connect ambitious students with opportunities to grow both
          personally and professionally.
        </AnimatedText>
      </div>


      <div id="section3" className="bg-red-500/50 relative max-w-5xl mx-auto flex items-center h-[100vh] px-8">
        <div className="flex-1 max-w-sm bg-blue-500/10 text-white"> <h1 className="text-3xl font-bold mb-4">Global Impact</h1>
          <p className="mb-4"> With chapters at top universities, we support students in Peru
            by connecting them to transformative opportunities in technology and innovation. </p>
          <p> We collaborate with organizations like SHPE and ALPFA to deliver meaningful student opportunities
            that drive growth, leadership, and innovation. </p> </div> <div className="flex-1 bg-yellow-500/10"> f
        </div>
      </div>

      <div id="section3" className="bg-green-500/50 h-[100vh] px-8">


      </div>


    </div>
  );
}
