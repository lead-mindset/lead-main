'use client';

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ActionLines from "../components/scroll/sphere";
import { Stars } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const htmlRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!htmlRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    }).to(htmlRef.current, { y: -900, opacity: 0 });
  });


  const canvasRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
    if (!canvasRef.current) return;

    gsap.fromTo(
      canvasRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      {
        clipPath: 'circle(150% at 50% 50%)',
        scrollTrigger: {
          trigger: '#scroll-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: true,
        },
        ease: 'power1.inOut',
      }
    );
  });

  return (
    <div id='initial' className="relative">
      <div ref={canvasRef}
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <Canvas
          camera={{ position: [0, 0, 5] }} gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#000D5A"]} />
          <ambientLight intensity={1.2} />   // stronger ambient to reduce edge darkening
          <directionalLight intensity={0.1} />  // very subtle directional
          <ActionLines />
          <Stars />
        </Canvas>
      </div>


      <section
        id="scroll-section"
        className="relative w-full h-[200vh]"
      />





      <div
        ref={htmlRef}
        className="fixed hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] z-10 pointer-events-auto"
      >

        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          className="w-full h-auto rounded-lg shadow-xl"
        ></video>

      </div>

      <div className="h-[300vh]"></div>



    </div>
  );
}
