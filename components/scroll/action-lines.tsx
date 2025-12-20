import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ActionLines() {
  const starsRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 150; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          -Math.random() * 200
        ],
        scale: Math.random() * 0.1 + 0.05
      });
    }
    return arr;
  }, []);

  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          -Math.random() * 200
        ],
        length: Math.random() * 6 + 4,
        color: i % 2 === 0 ? "#9b5de5" : "white"
      });
    }
    return arr;
  }, []);

 useGSAP(() => {
  if (!starsRef.current || !linesRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scroll-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
  });

tl.to(starsRef.current.position, { z: 120, ease: "power1.out" });
tl.fromTo(
  linesRef.current.scale,
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 1, z: 1, ease: "power1.out" }
);
tl.to(linesRef.current.position, { z: 200, ease: "power2.in" });
tl.to(linesRef.current.scale, { x: 0, y: 0, z: 0, ease: "power1.in" });

});

  const createStarShape = (radius = 1, inset = 0.5) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, radius);
    shape.lineTo(inset * radius, inset * radius);
    shape.lineTo(radius, 0);
    shape.lineTo(inset * radius, -inset * radius);
    shape.lineTo(0, -radius);
    shape.lineTo(-inset * radius, -inset * radius);
    shape.lineTo(-radius, 0);
    shape.lineTo(-inset * radius, inset * radius);
    shape.closePath();
    return shape;
  };

  return (
    <>
      <group ref={starsRef}>
        {stars.map((s, i) => (
          <mesh key={i} position={s.position} scale={[s.scale, s.scale, s.scale]}>
            <shapeGeometry args={[createStarShape(1, 0.5)]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>

      <group ref={linesRef} scale={[0, 0, 0]}>
        {lines.map((l, i) => (
          <mesh key={i} position={l.position} scale={[0.08, 0.08, l.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={l.color} />
          </mesh>
        ))}
      </group>

    </>
  );
}
