'use client';

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ActionLines from "../components/scroll/sphere";
import { Stars } from "@react-three/drei";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const htmlRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!htmlRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }).to(htmlRef.current, { y: -900, opacity: 0 });
  });


  const canvasRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top top",
        end: "bottom+=100% top",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    tl.fromTo(svgRef.current,
      { scale: 0, transformOrigin: "center center" },
      { scale: 1, ease: "power1.out" }
    );

    return () => tl.scrollTrigger?.kill();
  }, []);



  useGSAP(() => {
    if (!canvasRef.current || !videoRef.current) return;

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
          onUpdate: (self) => {
            if (self.progress < 1) {
              videoRef.current!.style.display = 'block';
            } else {
              videoRef.current!.style.display = 'none';
            }
          },
          onLeaveBack: () => {
            videoRef.current!.style.display = 'block';
          }
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
          <ambientLight intensity={1.2} />
          <directionalLight intensity={0.1} />
          <ActionLines />
          <Stars />
        </Canvas>
      </div>

      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover object-top z-[-1]"
      ></video>

      <section
        id="scroll-section"
        className="relative w-full h-[150vh]"
      />

      <div
        ref={svgRef}
        className="absolute inset-0 w-full h-screen flex items-center justify-center z-20"
        style={{ scale: 0 }}
      >
        <img src="/leadgrouplogo.svg" className="w-96 h-96" />
      </div>

      <div className="h-[600vh]" />
    </div>



  );
}
