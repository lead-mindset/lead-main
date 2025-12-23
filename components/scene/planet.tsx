"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import "flag-icons/css/flag-icons.min.css";

gsap.registerPlugin(ScrollTrigger);

export default function PlanetModel({ scale = 5 }) {
  const gltf = useGLTF("/models/earthbase.glb");

  const groupRef = useRef<THREE.Group>(null);
  const peruRef = useRef<HTMLDivElement>(null);
  const usaRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;

    const init = () => {
      if (!groupRef.current || !peruRef.current || !usaRef.current) return;

      const section = document.querySelector("#section3");
      if (!section) return;

      ctx = gsap.context(() => {
        gsap.set(groupRef.current.position, { y: -16, z: 0 });
        gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });
        gsap.set([peruRef.current, usaRef.current], { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.125 });
        tl.to(groupRef.current.position, { y: 0, duration: 0.25 });

        tl.to({}, { duration: 0.125 });
        tl.to(groupRef.current.rotation, { x: -0.2, y: 0.5, duration: 0.25 });
        tl.to(peruRef.current, { autoAlpha: 1, duration: 0.08 });

        tl.to({}, { duration: 0.125 });
        tl.to(groupRef.current.rotation, { x: 0.3, y: -0.5, duration: 0.25 });
        tl.to(peruRef.current, { autoAlpha: 0, duration: 0.08 }, "<");
        tl.to(usaRef.current, { autoAlpha: 1, duration: 0.08 }, "<");

        tl.to({}, { duration: 0.125 });
        tl.to(groupRef.current.rotation, { x: -0.1, y: -1.5, z: 0, duration: 0.25 });
        tl.to(usaRef.current, { autoAlpha: 0, duration: 0.08 }, "<");
      });

      ScrollTrigger.refresh();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(init);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <group ref={groupRef} scale={[isMobile ? scale * 0.6 : scale, isMobile ? scale * 0.3 : scale, isMobile ? scale * 0.6 : scale]}>
      <primitive object={gltf.scene} />

      <Html position={[0.3, -0.1, 1]} center>
        <div
          ref={peruRef}
          className="flex items-center sm:space-x-2 text-2xl  text-foreground font-bold p-2 rounded"
        >
          <span className="fi fi-pe" />
          <span className="max-md:hidden">Peru</span>
        </div>
      </Html>

      <Html position={[-0.2, 0.6, 0.85]} center>
        <div
          ref={usaRef}
          className="flex items-center space-x-2 text-2xl  text-foreground font-bold p-2 rounded"
        >
          <span className="fi fi-us" />
          <span className="max-md:hidden">USA</span>
        </div>
      </Html>
    </group>
  );
}
