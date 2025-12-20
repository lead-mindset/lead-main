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
  const videoRef = useRef<HTMLVideoElement>(null);

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
  if (!canvasRef.current || !videoRef.current) return;

  gsap.fromTo(
    canvasRef.current,
    { clipPath: 'circle(0% at 50% 50%)' }, // start tiny circle
    {
      clipPath: 'circle(150% at 50% 50%)', // expand to cover screen
      scrollTrigger: {
        trigger: '#scroll-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          // Show video if circle not fully expanded, hide if fully expanded
          if (self.progress < 1) {
            videoRef.current!.style.display = 'block';
          } else {
            videoRef.current!.style.display = 'none';
          }
        },
        onLeaveBack: () => {
          // If user scrolls back up past start, ensure video is visible
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


      <section
        id="scroll-section"
        className="relative w-full h-[200vh]"
      />





      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      ></video>


      <div className="h-[300vh]"></div>



    </div>
  );
}
