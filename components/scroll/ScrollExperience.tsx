"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { SphereIntro } from "../scene/SphereIntro";
import { useRef } from "react";
import { ShootingStar } from "./Star";
import Gallery from "./gallery";

export default function ScrollExperience() {
  const TOTAL_PAGES = 5;

  return (
    <Canvas
      className="w-full h-screen bg-black text-white"
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.75} />

      <ScrollControls pages={TOTAL_PAGES} damping={0.5}>
        <SphereIntro />
        <ShootingStar startPage={2} /> {/* starts on 3rd section */}

        <Scroll html style={{ width: "100%", height: "100%" }}>


          <main className="w-full ">


            <section className="h-[100vh] relative bg-red-500/50 flex items-center justify-center">

              <h1 className="text-4xl font-bold">LEAD</h1>

            </section>

            <Gallery/>

            <section className="h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">LEARN EXPLORE ASPIRE DISCOVER</h1>
            </section>

           <section style={{ height: "100vh", position: "relative" }}>
  <h1 style={{
    position: "sticky",
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "center"
  }}>
    I stay centered!
  </h1>
</section>

            <section className="h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">Members</h1>
            </section>

            <section className="h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">Community</h1>
            </section>



          </main>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
