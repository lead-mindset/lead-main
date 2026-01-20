"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Allies from "@/components/scroll/allies";
import PartnerWithUs from "@/components/scroll/partner-with-us";
import JoinChapter from "@/components/scroll/join-chapter";
import ChaptersPhotos from "@/components/scroll/chapters-photos";
import JoinSlackCommunity from "@/components/scroll/join-slack";
import RocketModel from "@/components/scene/rocket";
import CameraAnimation2 from "@/components/scene/camera-animation2";
import AnimatedText from "@/components/scroll/animated-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CurvedConnector from "@/components/scroll/animated-curve";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-setup";

export default function GetInvolved() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                canvasRef.current,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power2.out",
                }
            );
        },
        { scope: canvasRef }
    );
    return (
        <div className="overflow-x-hidden ">
            <div
                ref={canvasRef}
                className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden opacity-0"
            >
                <Canvas>
                    <color attach="background" args={["#000D5A"]} />
                    <ambientLight intensity={2} />
                    <Stars />
                    <CameraAnimation2 />
                    <RocketModel />
                    <fog attach="fog" args={["#000D5A", 2, 40]} />
                </Canvas>
            </div>


            <div className="relative min-h-screen p-10 mx-auto">
                <AnimatedText
                    className="text-5xl lg:text-7xl font-bold absolute top-[70%] left-1/2 -translate-x-1/2 text-center text-white"
                >
                    Launch with LEAD!
                </AnimatedText>
            </div>

            <JoinSlackCommunity />

            <JoinChapter />

            <div className="relative w-full flex items-center justify-center flex-col">

                <div className="absolute z-0">
                    <CurvedConnector />
                </div>


                <div className="w-40 z-10 md:w-48 -mb-8 mx-auto bg-foreground p-8  aspect-square rounded-full">
                    <Image
                        src="/leadcharacter2.svg"
                        alt="Logo"
                        width={356}
                        height={356}
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </div>

                <Link href='https://linktr.ee/leadmindset' className="z-20">                <Button className="mx-auto ">Find Your Chapter</Button>
                </Link>
            </div>

            <div className="h-screen flex items-center justify-center">
                <ChaptersPhotos />
            </div>

            <section
                className="max-w-5xl min-h-screen mx-auto relative flex items-center justify-center">

                <Card className="js-card max-w-5xl relative overflow-hidden rounded-2xl text-white">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-chart-2/20 z-0 rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-chart-1/20 rounded-full" />
                    <CardContent className="relative flex flex-col z-10 gap-10 p-10 md:p-14">

                        <PartnerWithUs />
                    </CardContent>
                </Card>

            </section>

            <Allies />

        </div>
    );
}
