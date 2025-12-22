"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowRight01Icon,
  UserMultipleIcon,
  SlackIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

gsap.registerPlugin(useGSAP);

export default function JoinSlackCommunity() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl.from(".js-card", { opacity: 0, y: 40 })
        .from(
          ".js-left > *",
          { opacity: 0, y: 24, stagger: 0.12 },
          "-=0.4"
        )
        .from(
          ".js-feature",
          { opacity: 0, x: 24, stagger: 0.1 },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef} id='slack'
      className="w-full h-screen relative flex items-center justify-center py-24 px-4"
    >
      <div className="max-w-5xl w-full">
        <Card className="js-card relative overflow-hidden rounded-2xl   text-white">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/50 rounded-full blur-3xl" />

          <CardContent className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 md:p-14">
            <div className="js-left flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <HugeiconsIcon icon={SlackIcon} className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Join our Slack
              </h2>

              <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl">
                Our main space to connect, collaborate, and stay aligned. Share
                updates, ask questions, celebrate wins, and grow together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button
                  size="lg"
                  className="bg-white text-[#4A154B] hover:bg-white/90 font-semibold rounded-xl"
                >
                  Join Slack
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="ml-2 w-4 h-4"
                  />
                </Button>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <HugeiconsIcon
                    icon={UserMultipleIcon}
                    className="w-4 h-4"
                  />
                  Free to join
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-center gap-4 max-w-sm">
              {[
                "Stay updated on the latest initiatives and events",
                "Connect with students who think, lead, and act",
                "Build real projects, not just ideas",
                "Turn leadership into professional value",
              ].map((item) => (
                <div
                  key={item}
                  className="js-feature flex items-start gap-3 bg-white/10 rounded-xl px-5 py-4"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-white shrink-0" />
                  <span className="text-sm md:text-base text-white/90">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
