import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CameraAnimation3() {
  const { camera } = useThree();
  const base = useRef({ x: 0, y: 1.5, z: 4 });
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

    const globalST = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        drift.current.x = Math.sin(p * Math.PI * 2) * 0.1;
        drift.current.y = Math.cos(p * Math.PI * 2) * 0.1;
        updateCamera();
      },
    });

    const sectionTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
      defaults: { ease: "power2.out" },
    });

    sectionTL.to(base.current, {
      y: 3,
      z: 10,
      duration: 1.5,
      onUpdate: updateCamera,
    });

    sectionTL.to(base.current, {
      y: 0,
      z: 8,
      duration: 1.5,
      onUpdate: updateCamera,
    });

  }, { scope: undefined });

  return null;
}
