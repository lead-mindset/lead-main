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
    for (let i = 0; i < 100; i++) {
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
    for (let i = 0; i < 40; i++) {
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

  gsap.to(starsRef.current.position, {
    z: 120,
    ease: "none",
    scrollTrigger: {
      trigger: "#scroll-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  linesRef.current.children.forEach((line, i) => {
    gsap.fromTo(
      line.scale,
      { x: 0, y: 0, z: line.scale.z },
      {
        x: 0.08,
        y: 0.08,
        z: line.scale.z,
        ease: "none",
        scrollTrigger: {
          trigger: "#scroll-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.to(line.position, {
      z: line.position.z + 200,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

linesRef.current.children.forEach((line) => {
  gsap.to(line.scale, {
    x: 0,
    y: 0,
    z: line.scale.z,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#scroll-section",
      start: "bottom bottom",
      end: "bottom bottom+=1",
      scrub: false,
    },
  });
});

starsRef.current.children.forEach((star) => {
  gsap.to(star.scale, {
    x: 0,
    y: 0,
    z: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#scroll-section",
      start: "bottom bottom",
      end: "bottom bottom+=1",
      scrub: false,
    },
  });
});

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
            <shapeGeometry args={[createStarShape(1.5, 0.5)]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>

      <group ref={linesRef} >
        {lines.map((l, i) => (
          <mesh key={i} position={l.position} scale={[1, 1, l.length]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshBasicMaterial color={l.color} />
          </mesh>
        ))}
      </group>
    </>
  );
}
