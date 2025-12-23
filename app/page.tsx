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
import CurvedConnector2 from "@/components/scroll/animated-curve2";
import CurvedConnector from "@/components/scroll/animated-curve";
import CurvedConnector3 from "@/components/scroll/animated-curve3";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/ui/social-links";
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

      <section id="scroll-section" className="relative w-full h-screen">

        <PinnedSlogan />


      </section>

      <div className="h-screen relative" />
      <div className="h-screen relative" />

      <CurvedConnector3 />

      <div className="relative min-h-screen p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">
        <AnimatedText className="text-2xl md:text-4xl">
          We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering {' '}</span>
          the next generation of Latino leaders across Latin America and the U.S
        </AnimatedText>

        <AnimatedText className="text-2xl md:text-4xl text-right">
          Through mentorship, leadership training, and impactful community
          projects, we connect <span className="font-extrabold">ambitious students</span>  with  <span className="font-extrabold">opportunities</span> to grow both
          personally and professionally.
        </AnimatedText>
      </div>

      <div className="relative text-center gap-10 text-2xl flex flex-col items-center p-10">

        <div className="flex flex-col  items-center scale-125 md:scale-200 lg:scale-[300%] xl:scale-[400%]">
          <RollingNumber className="font-bold" number={1135} />
          <span className="text-white mt-2 font-bold">MEMBERS</span>
        </div>

        <div className="flex gap-10 md:gap-40 lg:gap-52 xl:gap-60 mt-4 md:mt-24 lg:mt-52">

          <div className="sm:scale-125  lg:scale-200">
            <RollingNumber whiteBg={false} className="font-bold" number={10} />
            <span className="text-white mt-4">Chapters</span>

          </div>

          <div className="sm:scale-125  lg:scale-200">
            <RollingNumber whiteBg={false} className="font-bold" number={20} />
            <span className="text-white mt-4">Events</span>
          </div>

        </div>


      </div>



      <div id='section3'>
        <div className="h-screen" />
        <div id="section4" className="relative max-w-5xl mx-auto flex items-center h-screen px-8">
          <div className="md:basis-2/3">
            <AnimatedText className="text-2xl md:text-4xl mb-10">
              With  <span className="font-extrabold">chapters</span> at top universities, we support students in Peru
              by connecting them to transformative opportunities in  <span className="font-extrabold">technology</span> and  <span className="font-extrabold">innovation</span>.
            </AnimatedText>
          </div>

          <div className="md:flex-1 bg-yellow-500/10">
          </div>
        </div>


        <div id="section5" className=" relative max-w-5xl mx-auto flex items-center h-screen px-8">
          <div className="md:flex-1 ">
          </div>
          <div className="md:basis-2/3">

            <AnimatedText className="text-2xl md:text-4xl text-right">
              We  <span className="font-extrabold">collaborate </span> with organizations like SHPE and ALPFA to deliver meaningful student <span className="font-extrabold">opportunities</span>
              that drive growth, leadership, and innovation.
            </AnimatedText>
          </div>


        </div>
        <div className="relative h-screen p-10 flex flex-col items-center justify-center text-white space-y-8 max-w-5xl mx-auto">

          <div className=" max-w-52 md:max-w-xl mx-auto">
            <Image
              src="/leadgrouplogo.svg"
              alt="Logo"
              width={356}
              height={356}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <AnimatedText className="text-4xl text-center  font-bold">
            EMPOWERING DREAMS
          </AnimatedText>

          <Button className="w-fit">Get Involved</Button>
          <SocialLinks iconSize={50} />


        </div>



      </div>


    </div>
  );
}
