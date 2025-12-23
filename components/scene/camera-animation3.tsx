import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraAnimation3() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const base = { x: 0, y: 1.5, z: 4 };
    const drift = { x: 0, y: 0 };

    camera.position.set(base.x, base.y, base.z);
    camera.lookAt(0, 0, 0);

    const globalST = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        drift.x = Math.sin(p * Math.PI * 2) * 0.1;
        drift.y = Math.cos(p * Math.PI * 2) * 0.1;

        camera.position.x = base.x + drift.x;
        camera.position.y = base.y + drift.y;
        camera.position.z = base.z;

        camera.lookAt(0, 0, 0);
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

    sectionTL.to(base, {
      y: 3,
      z: 10,
      duration: 1.5,
      onUpdate: () => {
        camera.position.x = base.x + drift.x;
        camera.position.y = base.y + drift.y;
        camera.position.z = base.z;
        camera.lookAt(0, 0, 0);
      },
    });

    sectionTL.to(base, {
      y: 0,
      z: 8,
      duration: 1.5,
      onUpdate: () => {
        camera.position.x = base.x + drift.x;
        camera.position.y = base.y + drift.y;
        camera.position.z = base.z;
        camera.lookAt(0, 0, 0);
      },
    });

    return () => {
      globalST.kill();
      sectionTL.scrollTrigger?.kill();
      sectionTL.kill();
    };
  }, [camera]);

  return null;
}
