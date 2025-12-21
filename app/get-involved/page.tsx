"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Allies from "@/components/scroll/allies";
import PartnerWithUs from "@/components/scroll/partner-with-us";
import JoinChapter from "@/components/scroll/join-chapter";
import ChaptersPhotos from "@/components/scroll/chapters-photos";
import JoinSlackCommunity from "@/components/scroll/join-slack";
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
            
            <JoinSlackCommunity />
            
            <ChaptersPhotos/>
            <JoinChapter />
            <PartnerWithUs />
            <Allies />



        </div>
    );
}
