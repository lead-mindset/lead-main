"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import AnimatedText from "@/components/scroll/animated-text";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Pillars from "@/components/scroll/pillars";
import Values from "@/components/scroll/values";
import Founders from "@/components/scroll/founders";
import Testimonies from "@/components/scroll/testimonies";
import Gallery from "../example/bento-gallery";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Galaxy from "@/components/scene/galaxy";
import CameraAnimation from "@/components/scene/camera-animation";
import CurvedConnector from "@/components/scroll/animated-curve";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


export default function AboutUs() {

    return (
        <div className="overflow-x-hidden" >

            <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden">

                <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
                    <color attach="background" args={["#000D5A"]} />
                    <ambientLight intensity={1.2} />
                    <Stars />
                    <CameraAnimation />

                    <Galaxy />
                </Canvas>
            </div>
            <Gallery />

            <div className="relative h-screen p-10 text-center text-white max-w-5xl mx-auto">
                <AnimatedText className="text-2xl font-bold  md:text-7xl uppercase">
                    Empowering Dreams
                </AnimatedText>
            </div>

            
           <CurvedConnector/>


            <div className="relative p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">
                <AnimatedText className="text-3xl md:text-6xl">Mission</AnimatedText>

                <AnimatedText className="text-2xl md:text-4xl">
                    We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering {' '}</span>
                    the next generation of Latino leaders across Latin America and the U.S
                </AnimatedText>

            </div>


            <div className="relative p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">

                <AnimatedText className="text-3xl md:text-6xl">Vision</AnimatedText>

                <AnimatedText className="text-2xl md:text-4xl text-right">
                    Through mentorship, leadership training, and impactful community
                    projects, we connect ambitious students with opportunities to grow both
                    personally and professionally.
                </AnimatedText>
            </div>


            <Values />
            <Pillars />
            <Founders />
            <Testimonies />


        </div>
    );
}
