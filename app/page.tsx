"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import PinnedSlogan from "@/components/scroll/pinned-logo";
import CanvasReveal from "@/components/scroll/canvas-reveal";
import MotionPathBox from "@/components/scroll/motion-path-box";
import SloganReveal from "@/components/scroll/slogan";
import RollingNumber from "@/components/scroll/number-counter";
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

      <section id="scroll-section" className="relative w-full h-[100vh]" />

      <PinnedSlogan />


      <div className="relative min-h-screen p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">
        <AnimatedText className="text-2xl md:text-4xl">
          We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering</span>
          the next generation of Latino leaders across Latin America and the U.S
        </AnimatedText>

        <AnimatedText className="text-2xl md:text-4xl text-right">
          Through mentorship, leadership training, and impactful community
          projects, we connect ambitious students with opportunities to grow both
          personally and professionally.
        </AnimatedText>
      </div>


      <div className="relative text-center gap-10 text-2xl flex flex-col items-center p-10">
        
        <div className="flex flex-col justify-center items-center scale-200">
          <RollingNumber className="text-blue-700 " number={1135} />
          <span className="text-white mt-2">MEMBERS</span>
        </div>

        <div className="flex gap-10 mt-4">

          <div>
            <RollingNumber whiteBg={false} number={10} />
            <span className="text-white mt-4">Chapters</span>

          </div>

          <div className="">
            <RollingNumber whiteBg={false} number={20} />
            <span className="text-white mt-4">Events</span>
          </div>

        </div>


      </div>



      <div id="section3" className="bg-red-500/50 relative max-w-5xl mx-auto flex items-center h-[100vh] px-8">
        <div className="flex-1 space-y-4 max-w-sm bg-blue-500/10 text-white"> <h1 className="text-3xl font-bold mb-4">Global Impact</h1>
          <p className=""> With chapters at top universities, we support students in Peru
            by connecting them to transformative opportunities in technology and innovation. </p>
          <p> We collaborate with organizations like SHPE and ALPFA to deliver meaningful student opportunities
            that drive growth, leadership, and innovation. </p> </div>

        <div className="md:flex-1 bg-yellow-500/10">
        </div>
      </div>

      <div id="section3" className="bg-green-500/50 h-[100vh] px-8">


      </div>


    </div>
  );
}
