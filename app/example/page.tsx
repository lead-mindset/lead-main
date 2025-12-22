"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillarsCarousel from "@/components/scroll/pillarscarousel";
import Founders from "@/components/scroll/founders";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function CircularCarouselScroll() {
  return (
    <> <div className="h-screen bg-red-500" />
      <Founders /> <div className="h-screen bg-red-500" /></>

  )

}