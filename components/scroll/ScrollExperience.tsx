"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { TOTAL_PAGES } from "@/config/chapters";
import ChapterRouter from "./ChapterRouter";
import Scene from "../scene/Scene";
import HTMLChapters from "./HTMLChapters";
import { Overlay } from "./Overlay";
import { Office } from "../scene/Office";
import { SpaceBackground } from "./StarsBackground";
import { SphereIntro } from "../scene/SphereIntro";
import { StickyTitle } from "./Pinned";
import { Html } from "@react-three/drei";
export default function ScrollExperience() {
  return (
    <Canvas
      className="w-full h-screen bg-black text-white"
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={['#272730', 16, 30]} />

      <ambientLight intensity={0.75 * Math.PI} />

  <Html fullscreen style={{ pointerEvents: "auto" }}>
    <iframe
      title="embed"
      width={100}
      height={100}
      src="https://threejs.org/"
      frameBorder={0}
    />
  </Html>

      <ScrollControls pages={5} damping={0.5}>
        <SpaceBackground />
        <ChapterRouter />
        <SphereIntro />             
        

        <Scroll html style={{ width: '100%' }}>

  <StickyTitle />

  <h1 style={{ top: "180vh", left: "10vw", position: "absolute" }}>
    hail
  </h1>


          <h1 style={{ position: 'absolute', top: `100vh`, right: '20vw', fontSize: '25em', transform: `translate3d(0,-100%,0)` }}>all</h1>
        <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>hail</h1>
        <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>thee,</h1>
        <h1 style={{ position: 'absolute', top: '350vh', left: '10vw' }}>thoth</h1>
        <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
          her
          <br />
          mes.
        </h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
