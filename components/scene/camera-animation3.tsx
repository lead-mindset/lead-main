import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraAnimation3() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
      defaults: { ease: "power2.out" },
    });

    tl.to(camera.position, {
      x: 0,
      y: 3,
      z: 8,
      duration: 1.5,
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [camera]);

  return null;
}
