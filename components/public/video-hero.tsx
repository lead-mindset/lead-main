"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { Button } from "@/components/ui/button";

export function VideoHero({
  videoSrc,
  posterSrc,
  primaryHref,
  secondaryHref,
}: {
  videoSrc: string;
  posterSrc: string;
  primaryHref: string;
  secondaryHref: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const primeVideoFrame = () => {
      if (video.currentTime > 0.4) return;

      try {
        video.currentTime = 1.35;
      } catch {
        // Some browsers do not allow seeking before metadata is ready.
      }
    };

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      primeVideoFrame();
      void video.play().catch(() => {
        video.pause();
      });
    };

    video.addEventListener("loadedmetadata", primeVideoFrame);
    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);

    return () => {
      video.removeEventListener("loadedmetadata", primeVideoFrame);
      motionQuery.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <section className="lead-video-hero relative isolate min-h-[88svh] overflow-hidden pt-16 sm:min-h-[94svh]">
      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="metadata"
        tabIndex={-1}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,13,59,0.92)_0%,rgba(8,13,59,0.66)_43%,rgba(8,13,59,0.16)_100%),linear-gradient(180deg,rgba(8,13,59,0.18)_0%,rgba(8,13,59,0.22)_48%,#060a2e_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#060a2e] via-background/80 to-transparent" />

      <MainContainer className="flex min-h-[calc(88svh-4rem)] flex-col justify-end pb-9 pt-20 sm:min-h-[calc(94svh-4rem)] sm:pb-14 lg:pb-16">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase text-white/78">
            LEAD Americas
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5.6vw,4.75rem)] font-black leading-[1.02] text-white">
            Building the{" "}
            <span className="inline-block bg-gradient-to-r from-[#d84c4c] via-[#ba4e5e] to-[#7e56e2] bg-clip-text text-transparent">
              next generation
            </span>{" "}
            of{" "}
            <span className="inline-block bg-gradient-to-r from-[#e53e3e] via-[#9b2e8b] to-[#7a57d1] bg-clip-text text-transparent">
              leaders
            </span>{" "}
            across the Americas.
          </h1>
          <p className="section-subtitle mt-6 max-w-2xl text-white/82">
            LEAD connects students with STEM learning, leadership experiences,
            community, and real pathways to opportunity.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryHref} {...externalProps(primaryHref)}>
                Explore the Pathway
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href={secondaryHref} {...externalProps(secondaryHref)}>
                Partner with LEAD
              </Link>
            </Button>
          </div>
        </div>

      </MainContainer>
    </section>
  );
}

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
