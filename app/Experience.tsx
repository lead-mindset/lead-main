"use client";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";

export default function Experience() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
        <ScrollControls pages={3} damping={0.2}>
          <Scroll html>
            <div>hola</div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
