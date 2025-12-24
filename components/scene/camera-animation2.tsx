"use client";

import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function CameraAnimation2() {
  const { camera } = useThree();
  const container = useRef(null);

  useGSAP(() => {
    camera.position.set(0, -3, 14);
    camera.lookAt(0, 0, 0);

    gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
      },
      defaults: { ease: "none" },
    }).to(camera.position, {
      z: 0,
      x: -3,
      y: 14,
      duration: 1,
      onUpdate: () => camera.lookAt(0, 0, 0),
    });
  }, { scope: container });

  return <group ref={container} />;
}
