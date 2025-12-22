'use client'
import Gallery from "./bento-gallery";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import Galaxy from "@/components/scene/galaxy";

export default function Page() {
  return (
    <div className="w-full h-screen z-0 pointer-events-none overflow-hidden">

      <Canvas>
        <color attach="background" args={["#000D5A"]} />
        <ambientLight intensity={1.2} />
        <Stars />
        <Galaxy />

      </Canvas>

      
    </div>
  );
}
