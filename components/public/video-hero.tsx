"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { Button } from "@/components/ui/button";

const heroWashStyle: CSSProperties = {
  background:
    "linear-gradient(90deg, color-mix(in oklab, var(--background) 70%, transparent) 0%, color-mix(in oklab, var(--background) 50%, transparent) 46%, color-mix(in oklab, var(--background) 20%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--background) 10%, transparent) 0%, color-mix(in oklab, var(--background) 15%, transparent) 58%, color-mix(in oklab, var(--background) 40%, transparent) 100%)",
};

const heroBottomWashStyle: CSSProperties = {
  height: "clamp(22rem, 60svh, 34rem)",
  background:
    "linear-gradient(to top, var(--background) 0%, var(--background) 38%, color-mix(in oklab, var(--background) 95%, transparent) 68%, transparent 100%)",
};

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
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[48%_center] sm:object-[54%_center] lg:object-[52%_center]"
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
      <div className="pointer-events-none absolute inset-0 -z-10" style={heroWashStyle} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        style={heroBottomWashStyle}
      />

      <MainContainer className="relative z-20 flex min-h-[calc(88svh-4rem)] flex-col justify-end pb-9 pt-20 sm:min-h-[calc(94svh-4rem)] sm:pb-14 lg:pb-16">
        <div className="max-w-4xl">
          <p className="text-small font-sans font-semibold uppercase text-primary">
            LEAD Americas
          </p>
          <h1 className="text-display font-display font-bold mt-4 max-w-4xl text-foreground drop-shadow-[0_3px_22px_color-mix(in_oklch,black_40%,transparent)]">
            Building the{" "}
            <span className="text-gradient drop-shadow-[0_2px_16px_color-mix(in_oklch,var(--background)_72%,transparent)]">
              next generation
            </span>{" "}
            of{" "}
            <span className="text-gradient drop-shadow-[0_2px_16px_color-mix(in_oklch,var(--background)_72%,transparent)]">
              leaders
            </span>{" "}
            across the Americas.
          </h1>
          <p className="text-body-lg mt-4 max-w-2xl text-foreground/90">
            A student-led non-profit connecting 1,135+ students across 14 universities in STEM learning, leadership, and opportunity.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryHref} {...externalProps(primaryHref)}>
                About us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref} {...externalProps(secondaryHref)}>
                Partner with us
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
