"use client";

import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";
export default function CameraAnimation() {
  const { camera } = useThree();

  useGSAP(() => {
    camera.position.set(0, 4, 4);
    camera.lookAt(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
      },
      defaults: { ease: "none" },
    });

    tl.to(camera.position, {
      z: 2,
      y: 2,
      duration: 1,
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

  }, [camera]);

  return null;
}
