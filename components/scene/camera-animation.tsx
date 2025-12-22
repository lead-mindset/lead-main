import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraAnimation() {
  const { camera } = useThree();

  useLayoutEffect(() => {
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

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [camera]);

  return null;
}
