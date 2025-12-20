'use client';

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Gallery from "@/components/scroll/gallery";
import Model from "../components/scroll/sphere";
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

  return (
    <div id='initial' className="relative">
      <div className="fixed border-4 bg-blue-950 border-pink-500 inset-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#000D5A"]} />
          <ambientLight intensity={1.2} />   // stronger ambient to reduce edge darkening
          <directionalLight intensity={0.1} />  // very subtle directional
          <Model />
          <Stars />
        </Canvas>
      </div>


      <section
        id="scroll-section"
        className="relative w-full h-[200vh]"
      />

      <div className="h-[300vh]"></div>



    </div>
  );
}
