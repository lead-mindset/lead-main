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
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Gallery from "@/components/scroll/gallery";
import Pillars from "@/components/scroll/pillars";
import Values from "@/components/scroll/values";
import Founders from "@/components/scroll/founders";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AboutUs() {

    return (
        <div className="overflow-x-hidden ">

            <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden">

                <Canvas>
                    <color attach="background" args={["#000D5A"]} />
                    <ambientLight intensity={1.2} />
                    <Stars />
                </Canvas>
            </div>

            <section id="scroll-section" className="relative w-full h-[100vh]" />



            <div className="relative min-h-screen p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">
                <AnimatedText className="text-3xl md:text-6xl">Mission</AnimatedText>


                <AnimatedText className="text-2xl md:text-4xl">
                    We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering {' '}</span>
                    the next generation of Latino leaders across Latin America and the U.S
                </AnimatedText>
                <AnimatedText className="text-3xl md:text-6xl">Vision</AnimatedText>

                <AnimatedText className="text-2xl md:text-4xl text-right">
                    Through mentorship, leadership training, and impactful community
                    projects, we connect ambitious students with opportunities to grow both
                    personally and professionally.
                </AnimatedText>
            </div>

            <Values/>
           <Pillars/>
           <Founders/>



        </div>
    );
}
