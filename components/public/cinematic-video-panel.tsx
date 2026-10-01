"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export function CinematicVideoPanel({
  src,
  eyebrow,
  title,
  children,
  className,
}: {
  src: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => {
        video.pause();
      });
    };

    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);

    return () => motionQuery.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card shadow-[inset_0_1px_0_color-mix(in_oklab,white_12%,transparent)]",
        className
      )}
    >
      <video
        ref={videoRef}
        aria-hidden="true"
        className="min-h-[360px] w-full object-cover sm:aspect-[16/9] sm:min-h-0"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="metadata"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent sm:via-background/45" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="text-overline font-sans font-bold uppercase text-primary">{eyebrow}</span>
        <h3 className="text-h2 font-display font-semibold mt-3 max-w-2xl text-foreground sm:mt-4">
          {title}
        </h3>
        <p className="text-body font-sans mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{children}</p>
      </div>
    </div>
  );
}
