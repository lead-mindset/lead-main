"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SlackIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

export default function JoinSlackCommunity() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          markers: true,
        },
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl.from(".js-card", { opacity: 0, y: 40 })
        .from(".js-left > *:not(.js-button)", { opacity: 0, y: 24, stagger: 0.12 }, "-=0.4")
        .from(".js-button", { opacity: 0, y: 24, scale: 0.95 }, "-=0.4")
        .from(".js-feature", { opacity: 0, x: 24, stagger: 0.1 }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <section
      id="slack"
      className="w-full h-screen relative flex items-center justify-center py-24 px-4"
    >
      <div className="max-w-5xl w-full">
        <Card className="js-card relative overflow-hidden rounded-2xl text-white">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-chart-4/50 z-0 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-chart-3/10 rounded-full" />

          <CardContent className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 md:p-14">
            <div className="js-left flex flex-col justify-center">


              <div className="w-20 md:w-28 mb-8">
                <Image
                  src="/slack.png"
                  alt="Logo"
                  width={356}
                  height={356}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>


              <Link target="_blank" href='https://join.slack.com/t/leadmindsetworkspace/shared_invite/zt-3k9782iqo-lm1xNxkptWdSbkkXOR5mvg'>                               <Button className="w-fit mb-4">Join our Slack</Button>
              </Link>

              <p className="text-white/80 text-xl md:text-2xl mb-8 max-w-xl">
                Our main space to connect, collaborate, and stay aligned. Share
                updates, ask questions, celebrate wins, and grow together.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 max-w-sm">
              {[
                "Stay updated on the latest initiatives and events",
                "Connect with students who think, lead, and act",
                "Build real projects, not just ideas",
                "Turn leadership into professional value",
              ].map((item) => (
                <div
                  key={item}
                  className="js-feature flex items-start gap-3 bg-popover rounded-xl px-5 py-4"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-white shrink-0" />
                  <span className="md:text-xl text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
