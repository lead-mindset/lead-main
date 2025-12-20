import ActionLines from "./action-lines";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import PlanetModel from "../scene/planet";

export default function CanvasReveal({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      container.current,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", ease: "none" }
    )
      .to(videoRef.current, { autoAlpha: 0 }, "<80%");
  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden"
      style={{ clipPath: "circle(0% at 50% 50%)" }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#000D5A"]} />
        <ambientLight intensity={1.2} />
        <ActionLines />
        <Stars />
        <PlanetModel/>
      </Canvas>
    </div>
  );
}