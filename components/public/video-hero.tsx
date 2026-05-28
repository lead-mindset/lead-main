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
  const heroFrameSeconds = 5.1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const primeVideoFrame = () => {
      if (video.currentTime > heroFrameSeconds - 0.4) return;

      try {
        video.currentTime = heroFrameSeconds;
      } catch {
        // Some browsers do not allow seeking before metadata is ready.
      }
    };

    const syncPlayback = () => {
      if (motionQuery.matches) {
        primeVideoFrame();
        video.pause();
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
  }, [heroFrameSeconds]);

  return (
    <section className="lead-video-hero relative isolate min-h-[88svh] overflow-hidden pt-16 sm:min-h-[94svh]">
      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[48%_center] sm:object-[54%_center] lg:object-[52%_center]"
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,13,59,0.96)_0%,rgba(8,13,59,0.76)_46%,rgba(8,13,59,0.26)_100%),linear-gradient(180deg,rgba(8,13,59,0.18)_0%,rgba(8,13,59,0.26)_58%,rgba(8,13,59,0.62)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[64%] bg-gradient-to-t from-background/78 via-background/34 to-transparent sm:h-[52%] sm:via-background/28" />

      <MainContainer className="flex min-h-[calc(88svh-4rem)] flex-col justify-end pb-9 pt-20 sm:min-h-[calc(94svh-4rem)] sm:pb-14 lg:pb-16">
        <div className="max-w-4xl">
          <p className="eyebrow-label eyebrow-label--light">
            LEAD Americas
          </p>
          <h1 className="public-hero-title mt-5 max-w-4xl text-white drop-shadow-[0_3px_22px_rgba(0,0,0,0.4)]">
            Building the{" "}
            <span className="lead-gradient-text inline-block drop-shadow-[0_2px_16px_rgba(8,13,59,0.72)]">
              next generation
            </span>{" "}
            of{" "}
            <span className="lead-gradient-text inline-block drop-shadow-[0_2px_16px_rgba(8,13,59,0.72)]">
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
