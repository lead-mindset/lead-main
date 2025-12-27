"use client";

import { useRef } from "react";
import PinnedSlogan from "@/components/scroll/pinned-logo";
import CanvasReveal from "@/components/scroll/canvas-reveal";
import RollingNumber from "@/components/scroll/number-counter";
import AnimatedText from "@/components/scroll/animated-text";
import CurvedConnector3 from "@/components/scroll/animated-curve3";
import EmpowerSection from "@/components/scroll/get-involved-section";
import { useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollUnlocked(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (scrollUnlocked) return;

    const preventScroll = (e: Event) => e.preventDefault();

    window.scrollTo(0, 0);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [scrollUnlocked]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => { });
  }, []);

  useEffect(() => {
    if (!scrollUnlocked) return;

    ScrollTrigger.refresh();
  }, [scrollUnlocked]);


  return (
    <div className="overflow-x-hidden">

      <CanvasReveal videoRef={videoRef} scrollRef={scrollSectionRef} />

      <video
        ref={videoRef}
        src="/video3.mp4"
        autoPlay
        muted
        loop
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      />

      <section ref={scrollSectionRef} id="scroll-section" className="relative w-full h-screen">

        <PinnedSlogan />

      </section>

      <div className="h-screen relative" />
      <div className="h-screen relative" />

      <CurvedConnector3 />

      <section
        id="slack"
        className="w-full min-h-screen relative flex items-center justify-center py-24 px-4"
      >
        <div className="max-w-5xl w-full">
          <Card className="js-card relative overflow-hidden rounded-2xl text-white">
            <div className="absolute -top-24 -right-24 w-96 h-96 from-chart-3 to-chart-4 bg-linear-to-bl opacity-30 z-0 rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 from-chart-1 to-chart-2 bg-linear-to-br opacity-30 rounded-full" />

            <CardContent className="z-10 flex flex-col justify-start items-start space-y-10 p-10 md:p-14">
              <AnimatedText className="text-2xl md:text-4xl">
                We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering {' '}</span>
                the next generation of Latino leaders across Latin America and the U.S
              </AnimatedText>

              <AnimatedText className="text-2xl md:text-4xl">
                Through mentorship, leadership training, and impactful community
                projects, we connect <span className="font-extrabold">ambitious students</span>  with  <span className="font-extrabold">opportunities</span> to grow both
                personally and professionally.
              </AnimatedText>
            </CardContent>

          </Card>
        </div> </section>

      <div className="relative text-center gap-10 text-2xl flex flex-col items-center p-10">

        <div className="flex flex-col origin-top  items-center scale-125 md:scale-200 lg:scale-[300%] xl:scale-[400%]">
          <RollingNumber className="font-bold" number={1140} />
          <span className="text-white mt-2 font-bold">MEMBERS</span>
        </div>

        <div className="flex gap-10 md:gap-40 lg:gap-52 xl:gap-60 mt-4 md:mt-24 lg:mt-52">

          <div className="sm:scale-125  lg:scale-200">
            <RollingNumber whiteBg={false} className="font-bold" number={10} />
            <span className="text-white mt-4">Chapters</span>

          </div>

          <div className="sm:scale-125  lg:scale-200">
            <div className="flex">
              <span className="text-5xl inline-block">+</span>
              <RollingNumber whiteBg={false} className="font-bold" number={20} />
            </div>
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
              We  <span className="font-extrabold">collaborate </span> with organizations like SHPE and ALPFA to deliver meaningful student <span className="font-extrabold">opportunities</span>{' '}
              that drive growth, leadership, and innovation.
            </AnimatedText>
          </div>

        </div>

        <EmpowerSection />

      </div>


    </div>
  );
}
