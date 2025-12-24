"use client";

import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "@/lib/gsap-setup";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CameraAnimation() {
  const { camera } = useThree();

  const base = useRef({ x: 0, y: 4, z: 6 });

  const drift = useRef({ x: 0, y: 0 });

  const updateCamera = () => {
    camera.position.x = base.current.x + drift.current.x;
    camera.position.y = base.current.y + drift.current.y;
    camera.position.z = base.current.z;
    camera.lookAt(0, 0, 0);
  };

  useGSAP(() => {
    camera.position.set(base.current.x, base.current.y, base.current.z);
    camera.lookAt(0, 0, 0);

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        drift.current.x = Math.sin(p * Math.PI * 2) * 0.12;
        drift.current.y = Math.cos(p * Math.PI * 2) * 0.08;

        updateCamera();
      },
    });

    gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
      defaults: { ease: "none" },
    })
    .to(base.current, {
      y: 2,
      z: 2,
      duration: 1,
      onUpdate: updateCamera,
    });

  }, [camera]);

  return null;
}
