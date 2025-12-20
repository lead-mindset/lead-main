'use client';

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ActionLines from "../components/scroll/action-lines";
import { Stars } from "@react-three/drei";
import { useEffect } from "react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


export default function App() {
  const htmlRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const boxRef = useRef<HTMLDivElement>(null);



useEffect(() => {
  if (!boxRef.current) return;

  requestAnimationFrame(() => {
const markers = Array.from(document.querySelectorAll(".marker")) as HTMLElement[];
const points = markers.map(el => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + window.scrollY + rect.height / 2
  };
});

    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true
      },
      motionPath: {
        path: points,
        curviness: 1.5
      },
      ease: "none"
    });
  });
}, []);


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


      <div className="h-[20vh] flex justify-center items-center">scroll down</div>



<div className="flex flex-col items-center space-y-96">
  <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
  <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
  <div className="w-24 h-24 marker bg-gray-700 rounded-lg" />
</div>


<div
  ref={boxRef}
  className="fixed w-24 h-24 bg-blue-500 rounded-lg -translate-x-1/2 -translate-y-1/2"
/>



      <div className="h-[600vh]" />
    </div>
  );
}
