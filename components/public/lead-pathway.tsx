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
    textClassName: "text-[var(--brand-logo-red-orange)]",
  },
  {
    color: "var(--brand-logo-magenta)",
    contrast: "var(--foreground)",
    textClassName: "text-[var(--brand-logo-magenta)]",
  },
  {
    color: "var(--accent)",
    contrast: "var(--foreground)",
    textClassName: "text-accent",
  },
  {
    color: "var(--foreground)",
    contrast: "var(--background)",
    textClassName: "text-foreground",
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
            { autoAlpha: 0.72, y: 18 },
            {
              autoAlpha: 1,
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
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div
            data-pathway-intro
            className="relative z-20 lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:self-start"
          >
            <h2 className="pathway-display-title flex flex-col">
              <span className="block text-[var(--brand-logo-red-orange)]">
                Learn
              </span>
              <span className="block text-[var(--brand-logo-magenta)]">
                Explore
              </span>
              <span className="block text-accent">
                Aspire
              </span>
              <span className="block text-foreground">
                Discover.
              </span>
            </h2>
          </div>

          <div className="border-y border-border/80">
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
                    "pathway-stage grid gap-5 border-b border-border/70 py-6 last:border-b-0 sm:py-8 lg:grid-cols-[4rem_minmax(0,1fr)_18rem] lg:items-start",
                    index % 2 === 1 && "lg:ml-16"
                  )}
                >
                  <div className="pathway-step-number flex size-12 shrink-0 items-center justify-center rounded-full border text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className={cn("card-title", tone.textClassName)}>
                      {stage.title}
                    </h3>
                    <p className="body-copy mt-3 text-muted-foreground">
                      {stage.promise}
                    </p>
                  </div>
                  <div className="pathway-outcome border-l-2 py-1 pl-4 lg:rounded-xl lg:border lg:p-4">
                    <p className="card-eyebrow">
                      Why it matters
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-foreground">
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
