"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function GetInvolved() {

    return (
        <div className="overflow-x-hidden ">
            <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
                <Canvas>
                    <color attach="background" args={["#000D5A"]} />
                    <ambientLight intensity={1.2} />
                    <Stars />
                </Canvas>
            </div>




        </div>
    );
}
