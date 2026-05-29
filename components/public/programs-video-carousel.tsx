"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MainContainer } from "@/components/global/main-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Program = {
  title: string;
  description: string;
  outcome: string;
  video: string;
  poster: string;
};

export function ProgramsVideoCarousel({ programs }: { programs: Program[] }) {
  const defaultActiveIndex = Math.max(
    0,
    programs.findIndex((program) => program.title === "Corporate Visits")
  );
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const activeProgram = programs[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewFrameSeconds = 5.1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const primeVideoFrame = () => {
      if (video.currentTime > previewFrameSeconds - 0.4) return;

      try {
        video.currentTime = previewFrameSeconds;
      } catch {
        // Seeking can fail before metadata is available.
      }
    };

    const syncPlayback = () => {
      primeVideoFrame();

      if (motionQuery.matches) {
        video.pause();
        return;
      }

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
  }, [activeIndex, previewFrameSeconds]);

  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + programs.length) % programs.length);
  };

  return (
    <section id="programs" className="relative isolate -mt-10 scroll-mt-24 overflow-visible pb-12 pt-20 sm:-mt-16 sm:pb-16 sm:pt-28">
      <div className="lead-programs-aura" />
      <MainContainer>
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="eyebrow-label">
              Programs and experiences
            </p>
            <h2 className="section-title mt-4 max-w-3xl">
              Programs students can see in motion.
            </h2>
          </div>
          <p className="body-copy max-w-xl text-muted-foreground lg:justify-self-end">
            Switch between the experiences that help students learn, lead,
            connect, and build momentum.
          </p>
        </div>

        <div
          className="mt-7 grid overflow-hidden rounded-2xl border border-border bg-card shadow-[inset_0_1px_0_color-mix(in_oklab,white_10%,transparent)] lg:grid-cols-[1.12fr_0.88fr]"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goTo(activeIndex + 1);
            if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          }}
        >
          <div className="relative min-h-[340px] overflow-hidden bg-background lg:min-h-[360px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-70 blur-2xl"
              style={{ backgroundImage: `url(${activeProgram.poster})` }}
            />
            <div className="absolute inset-0 bg-background/25" />
            <video
              key={activeProgram.video}
              ref={videoRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain object-center"
              src={activeProgram.video}
              poster={activeProgram.poster}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              tabIndex={-1}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/36 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="card-eyebrow text-white/70">
                {String(activeIndex + 1).padStart(2, "0")} / {String(programs.length).padStart(2, "0")}
              </p>
              <h3 className="feature-title mt-2 max-w-2xl text-white">
                {activeProgram.title}
              </h3>
              <p className="body-copy mt-3 max-w-2xl text-white/78">
                {activeProgram.outcome}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:min-h-full">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
              <p className="body-copy text-muted-foreground">
                {activeProgram.description}
              </p>
              <div className="flex shrink-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Previous program"
                  onClick={() => goTo(activeIndex - 1)}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Next program"
                  onClick={() => goTo(activeIndex + 1)}
                >
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="grid flex-1 border-border" role="tablist" aria-label="Choose a LEAD program">
              {programs.map((program, index) => (
                <button
                  key={program.title}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  onClick={() => goTo(index)}
                  className={cn(
                    "group grid gap-1 border-b border-border px-5 py-3 text-left transition-colors last:border-b-0 sm:px-6",
                    activeIndex === index ? "bg-primary/18" : "hover:bg-muted/70"
                  )}
                >
                  <span className="card-eyebrow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="card-title text-foreground">
                    {program.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
