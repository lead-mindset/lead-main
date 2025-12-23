"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import "flag-icons/css/flag-icons.min.css";

gsap.registerPlugin(ScrollTrigger);

export default function PlanetModel({ scale = 5 }) {
  const gltf = useGLTF("/models/earth.glb");

  const groupRef = useRef<THREE.Group>(null);
  const peruRef = useRef<HTMLDivElement>(null);
  const usaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    requestAnimationFrame(() => {
      if (!peruRef.current || !usaRef.current) return;

      gsap.set(groupRef.current.position, { y: -16, z: 0 });
      gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

      gsap.set([peruRef.current, usaRef.current], { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "#section3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
        },
      });

      tl.to({}, { duration: 0.125 });

      tl.to(groupRef.current.position, {
        y: 0,
        duration: 0.25,
      });

      tl.to({}, { duration: 0.125 });

      tl.to(groupRef.current.rotation, {
        x: -0.4,
        y: 0.3,
        duration: 0.25,
      });

      tl.to(peruRef.current, {
        autoAlpha: 1,
        duration: 0.08,
        ease: "power1.out",
      });

      tl.to({}, { duration: 0.125 });

      tl.to(groupRef.current.rotation, {
        x: 0.3,
        y: -0.5,
        duration: 0.25,
      });

      tl.to(peruRef.current, {
        autoAlpha: 0,
        duration: 0.08,
        ease: "power1.in",
      });

      tl.to(
        usaRef.current,
        {
          autoAlpha: 1,
          duration: 0.08,
          ease: "power1.out",
        },
        "<"
      );

      tl.to({}, { duration: 0.125 });

      tl.to(groupRef.current.rotation, {
        x: 0.6,
        y: -1.5,
        z: 0,
        duration: 0.25,
      });

      tl.to(usaRef.current, {
        autoAlpha: 0,
        duration: 0.08,
        ease: "power1.in",
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
  }, []);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} />

      <Html position={[0.3, -0.1, 1]} center>
        <div
          ref={peruRef}
          className="flex items-center space-x-2 text-2xl bg-foreground text-background font-bold p-2 rounded"
        >
          <span className="fi fi-pe" />
          <span>Peru</span>
        </div>
      </Html>

      <Html position={[-0.2, 0.6, 0.85]} center>
        <div
          ref={usaRef}
          className="flex items-center space-x-2 text-2xl bg-foreground text-background font-bold p-2 rounded"
        >
          <span className="fi fi-us" />
          <span>USA</span>
        </div>
      </Html>
    </group>
  );
}
