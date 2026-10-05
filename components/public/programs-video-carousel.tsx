"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MainContainer } from "@/components/global/main-container";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";

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

  const panelMotion =
    "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]";

  return (
    <section id="programs" className="relative isolate -mt-10 scroll-mt-24 overflow-visible pb-12 pt-20 sm:-mt-16 sm:pb-16 sm:pt-28">
      <div className="lead-programs-aura" />
      <MainContainer>
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-overline font-sans font-bold uppercase text-primary">
              Programs
            </p>
            <h2 className="text-h1 font-display font-semibold mt-4 max-w-3xl">
              Experiences students can see in motion.
            </h2>
          </div>
          <p className="text-body font-sans max-w-xl text-muted-foreground lg:justify-self-end">
            Workshops, visits, summits, mentorship, and projects help students
            learn, lead, connect, and build momentum.
          </p>
        </div>

        <div
          className="mt-6 grid overflow-hidden rounded-2xl border border-border bg-card shadow-[inset_0_1px_0_color-mix(in_oklab,white_10%,transparent)] lg:mt-7 lg:grid-cols-[1.12fr_0.88fr]"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goTo(activeIndex + 1);
            if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          }}
        >
          <div className="relative min-h-[238px] overflow-hidden bg-background sm:min-h-[300px] lg:min-h-[360px]">
            <div key={activeProgram.title} className={cn("absolute inset-0", panelMotion)}>
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-110 bg-cover bg-center opacity-70 blur-2xl"
                style={{ backgroundImage: `url(${activeProgram.poster})` }}
              />
              <div className="absolute inset-0 bg-background/25" />
              <video
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
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="text-small font-sans font-bold uppercase text-foreground/70">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(programs.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 max-w-2xl font-display text-h2 font-extrabold leading-tight text-foreground sm:text-h1 lg:text-display">
                  {activeProgram.title}
                </h3>
                <p className="mt-2 max-w-2xl text-small font-medium leading-6 text-foreground/78 sm:mt-3 sm:text-body sm:leading-7">
                  {activeProgram.outcome}
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col border-t border-border lg:min-h-full lg:border-t-0">
            <div className="order-2 flex items-start justify-between gap-4 border-b border-border p-4 sm:p-5 lg:order-1 lg:p-6">
              <p
                key={activeProgram.description}
                className={cn("text-body font-sans text-muted-foreground", panelMotion)}
              >
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

            <div className="order-1 border-b border-border p-4 lg:hidden">
              <label
                htmlFor="mobile-program-selector"
                className="text-small font-sans font-bold uppercase text-primary"
              >
                Choose experience
              </label>
              <Select
                value={String(activeIndex)}
                onValueChange={(value) => goTo(Number(value))}
              >
                <SelectTrigger
                  id="mobile-program-selector"
                  aria-label="Choose experience"
                  className="mt-2 h-12 w-full"
                >
                  <SelectValue placeholder="Choose experience" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program, index) => (
                    <SelectItem key={program.title} value={String(index)}>
                      {String(index + 1).padStart(2, "0")} - {program.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div
              className="order-2 hidden flex-1 border-border lg:grid"
              role="group"
              aria-label="Choose a LEAD program"
            >
              {programs.map((program, index) => (
                <button
                  key={program.title}
                  type="button"
                  aria-pressed={activeIndex === index}
                  onClick={() => goTo(index)}
                  className={cn(
                    "group grid cursor-pointer gap-1 border-b border-border px-6 py-3 text-left transition-[background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
                    activeIndex === index
                      ? "bg-primary/18 shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)]"
                      : "hover:bg-muted/70"
                  )}
                >
                  <span className="text-small font-sans font-bold uppercase text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h2 font-display font-semibold text-foreground">
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
