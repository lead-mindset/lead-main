"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MainContainer } from "@/components/global/main-container";
import gsap from "@/lib/gsap-setup";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import { cn } from "@/lib/utils";

type PathwayStage = {
  title: string;
  promise: string;
  outcome: string;
};

const pathwayStageTones = [
  {
    color: "var(--brand-logo-red-orange)",
    contrast: "var(--foreground)",
  },
  {
    color: "var(--brand-logo-magenta)",
    contrast: "var(--foreground)",
  },
  {
    color: "var(--primary)",
    contrast: "var(--foreground)",
  },
  {
    color: "var(--foreground)",
    contrast: "var(--background)",
  },
];

type PathwayStageStyle = CSSProperties & {
  "--pathway-stage-color": string;
  "--pathway-stage-contrast": string;
};

export function LeadPathway({ stages }: { stages: PathwayStage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const activateStage = (activeStage: HTMLElement) => {
          stageRefs.current.forEach((stage) => {
            stage?.classList.toggle("is-pathway-active", stage === activeStage);
          });
        };

        stageRefs.current.forEach((stage) => {
          if (!stage) return;

          ScrollTrigger.create({
            trigger: stage,
            start: "top 52%",
            end: "bottom 52%",
            onEnter: () => activateStage(stage),
            onEnterBack: () => activateStage(stage),
          });

          gsap.fromTo(
            stage,
            { y: 18 },
            {
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 78%",
                once: true,
              },
            }
          );
        });
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(stageRefs.current, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pathway"
      className="lead-pathway relative scroll-mt-24 overflow-visible pb-16 pt-24 sm:pb-28 sm:pt-32"
    >
      <MainContainer className="relative z-10">
        <div className="grid gap-9 lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div
            data-pathway-intro
            className="relative z-10 w-fit max-w-full lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:self-start"
          >
            <h2 className="pathway-display-title flex flex-col">
              {pathwayStageTones.map((tone, index) => (
                <span
                  key={stages[index]?.title ?? index}
                  className="block"
                  style={{ color: tone.color }}
                >
                  {index === 3 ? "Discover." : stages[index]?.title}
                </span>
              ))}
            </h2>
          </div>

          <div className="pathway-stage-list relative z-20 min-w-0 border-y border-border/80">
            {stages.map((stage, index) => {
              const tone = pathwayStageTones[index] ?? pathwayStageTones[0];

              return (
                <article
                  key={stage.title}
                  ref={(node) => {
                    stageRefs.current[index] = node;
                  }}
                  style={
                    {
                      "--pathway-stage-color": tone.color,
                      "--pathway-stage-contrast": tone.contrast,
                    } as PathwayStageStyle
                  }
                  className={cn(
                    "pathway-stage grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-5 gap-y-4 border-b border-border/70 py-7 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8 lg:grid-cols-[3.75rem_minmax(0,1fr)] lg:gap-x-7 lg:py-9",
                    index % 2 === 1
                      ? "pathway-stage--drift-right"
                      : "pathway-stage--drift-left"
                  )}
                >
                  <div className="pathway-step-number flex size-12 shrink-0 items-center justify-center rounded-full border text-sm font-bold sm:size-[3.25rem]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="card-title" style={{ color: tone.color }}>
                      {stage.title}
                    </h3>
                    <p className="pathway-stage-copy body-copy mt-3 text-muted-foreground">
                      {stage.promise}
                    </p>
                  </div>
                  <div className="pathway-outcome col-start-2 border-l-2 py-2 pl-4 sm:max-w-[38rem] lg:rounded-xl lg:border lg:px-5 lg:py-4">
                    <p className="text-sm font-semibold leading-6 text-foreground sm:text-[0.95rem]">
                      {stage.outcome}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
