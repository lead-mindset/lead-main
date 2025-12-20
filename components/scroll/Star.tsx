import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function ShootingStar({ startPage = 2 }) {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const tl = useRef<gsap.core.Timeline>();
  const scroll = useScroll();

  useFrame(() => {
    if (!tl.current) return;

    // compute scroll progress starting from the third section
    // clamp to 0..1 so it doesn't rewind
    const p = Math.max(0, scroll.range(0, 1) - startPage / scroll.pages);
    tl.current.seek(p * tl.current.duration());
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // initial position: top center
      tl.current.set(sphereRef.current.position, { y: 5, z: 0, x: 0 });
      tl.current.set(sphereRef.current.scale, { x: 0.3, y: 0.3, z: 0.3 });

      // move down as you scroll further
      tl.current.to(sphereRef.current.position, {
        y: -5,
        duration: 1,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="purple" emissive="purple" />
    </mesh>
  );
}
