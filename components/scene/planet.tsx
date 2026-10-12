"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import gsap from "@/lib/gsap-setup";

import "flag-icons/css/flag-icons.min.css";

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
  const group = groupRef.current;
  const peru = peruRef.current;
  const usa = usaRef.current;

  if (!group || !peru || !usa) return;

  const section = document.querySelector("#section3");
  if (!section) return;

  ctx = gsap.context(() => {
    gsap.set(group.position, { y: -16, z: 0 });
    gsap.set(group.rotation, { x: 0, y: 0, z: 0 });

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
    tl.to(group.position, { y: 0, duration: 0.25 });
    tl.to({}, { duration: 0.125 });
    tl.to(group.rotation, { x: -0.2, y: 0.5, duration: 0.25 });
    tl.to(peru, { autoAlpha: 1, duration: 0.08 });
    tl.to({}, { duration: 0.125 });
    tl.to(group.rotation, { x: 0.3, y: -0.5, duration: 0.25 });
    tl.to(peru, { autoAlpha: 0, duration: 0.08 }, "<");
    tl.to(usa, { autoAlpha: 1, duration: 0.08 }, "<");
    tl.to({}, { duration: 0.125 });
    tl.to(group.rotation, { x: -0.1, y: -1.5, z: 0, duration: 0.25 });
    tl.to(usa, { autoAlpha: 0, duration: 0.08 }, "<");
  });

  ScrollTrigger.refresh();
};


    requestAnimationFrame(() => {
      requestAnimationFrame(init);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <group ref={groupRef} scale={[isMobile ? scale * 0.5 : scale, isMobile ? scale * 0.5 : scale, isMobile ? scale * 0.5 : scale]}>
      <primitive object={gltf.scene} />

      <Html position={[0.3, -0.1, 1]} center>
        <div
          ref={peruRef}
          className="card-title flex items-center rounded p-2 text-foreground sm:space-x-2"
        >
          <span className="fi fi-pe" />
          <span className="max-md:hidden">Peru</span>
        </div>
      </Html>

      <Html position={[-0.2, 0.6, 0.85]} center>
        <div
          ref={usaRef}
          className="card-title flex items-center space-x-2 rounded p-2 text-foreground"
        >
          <span className="fi fi-us" />
          <span className="max-md:hidden">USA</span>
        </div>
      </Html>
    </group>
  );
}
