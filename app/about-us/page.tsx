"use client";

import AnimatedText from "@/components/scroll/animated-text";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Values from "@/components/scroll/values";
import Founders from "@/components/scroll/founders";
import Testimonies from "@/components/scroll/testimonies";
import Galaxy from "@/components/scene/galaxy";
import CameraAnimation from "@/components/scene/camera-animation";
import PillarsCarousel from "@/components/scroll/pillarscarousel";
import CurvedConnector from "@/components/scroll/animated-curve";
import CurvedConnector2 from "@/components/scroll/animated-curve2";
import EmpowerSection from "@/components/scroll/get-involved-section";
import Gallery from "@/components/scroll/gallery2";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {

    return (
        <div className="overflow-x-hidden" >

            <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden">

                <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
                    <color attach="background" args={["#000D5A"]} />
                    <ambientLight intensity={2} />
                    <Stars />
                    <CameraAnimation />
                    <fog attach="fog" args={["#000D5A", 2, 17]} />

                    <Galaxy />
                </Canvas>
            </div>

            <Gallery />

            <div id='empowering' className="relative py-60  p-10 text-center text-white max-w-5xl mx-auto">
                <AnimatedText className="text-2xl font-bold  md:text-7xl uppercase">
                    shaping brighter futures for all
                </AnimatedText>
            </div>


            <CurvedConnector />

            <Card className="js-card relative max-w-5xl mx-auto mb-12 overflow-hidden rounded-2xl text-white">
                <div className="absolute -top-24 -right-24 w-96 h-96 from-chart-1 to-chart-3 bg-linear-to-br opacity-20 z-0 rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 from-chart-4 to-chart-3 bg-linear-to-br opacity-20 rounded-full" />

                <CardContent className="z-10 flex flex-col justify-center space-y-10 mx-auto p-10 md:p-14">

                    <div className="relative p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">
                        <AnimatedText className="text-3xl md:text-6xl font-bold">Mission</AnimatedText>

                        <AnimatedText className="text-2xl md:text-4xl">
                            We are a <span className="font-extrabold">network</span> of professionals and students dedicated to <span className="font-extrabold">empowering {' '}</span>
                            the next generation of Latino leaders across Latin America and the U.S
                        </AnimatedText>

                    </div>
                </CardContent> 
            </Card>

                        <Card className="js-card relative max-w-5xl mx-auto overflow-hidden rounded-2xl text-white">
                <div className="absolute -top-24 -right-24 w-96 h-96 from-chart-3 to-chart-4 bg-linear-to-bl opacity-20 z-0 rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 from-chart-1 to-chart-2 bg-linear-to-br opacity-20 rounded-full" />

                <CardContent className="z-10 flex flex-col justify-center space-y-10 mx-auto p-10 md:p-14">


            <div className="relative p-10 flex flex-col justify-center text-white space-y-10 max-w-5xl mx-auto">

                <AnimatedText className="text-3xl md:text-6xl font-bold">Vision</AnimatedText>

                <AnimatedText className="text-2xl md:text-4xl">
                    Through mentorship, leadership training, and impactful community
                    projects, we connect  <span className="font-extrabold">ambitious students</span> with opportunities to <span className="font-extrabold"> grow</span> both
                    personally and professionally.
                </AnimatedText>
            </div>

            </CardContent> </Card>



            <CurvedConnector2 />
            <Values />

            <div className="relative px-10 flex flex-col justify-center text-white max-w-5xl mx-auto">
                <AnimatedText className="text-2xl md:text-4xl">
                    Built on these core values, our pillars drive lasting growth and meaningful impact, shaping students and communities for the better.
                </AnimatedText>
            </div>

            <PillarsCarousel />

            <Founders />


            <Testimonies />

            <EmpowerSection />

        </div>
    );
}
