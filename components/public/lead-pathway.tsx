"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "@/lib/gsap-setup";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import { cn } from "@/lib/utils";

type PathwayStage = {
  title: string;
  promise: string;
  example: string;
  outcome: string;
};

export function LeadPathway({ stages }: { stages: PathwayStage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const path = pathRef.current;
      if (!section || !path) return;

      const length = path.getTotalLength();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 48%",
            scrub: 0.8,
          },
        });

        stageRefs.current.forEach((stage) => {
          if (!stage) return;

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
        gsap.set(path, { strokeDashoffset: 0 });
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
      className="lead-pathway relative scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg
          className="absolute left-1/2 top-16 h-[calc(100%-8rem)] w-[min(84rem,92vw)] -translate-x-1/2"
          viewBox="0 0 1200 1260"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M156 56 C462 128 694 -20 896 158 C1096 336 1014 556 706 612 C358 674 142 764 258 956 C386 1168 786 1030 1044 1210"
            stroke="url(#lead-pathway-base)"
            strokeWidth="62"
            strokeLinecap="round"
            opacity="0.08"
          />
          <path
            ref={pathRef}
            d="M156 56 C462 128 694 -20 896 158 C1096 336 1014 556 706 612 C358 674 142 764 258 956 C386 1168 786 1030 1044 1210"
            stroke="url(#lead-pathway-draw)"
            strokeWidth="30"
            strokeLinecap="round"
            opacity="0.28"
          />
          <defs>
            <linearGradient id="lead-pathway-base" x1="156" y1="56" x2="1044" y2="1210" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--brand-logo-red-orange)" />
              <stop offset="0.45" stopColor="var(--brand-logo-magenta)" />
              <stop offset="1" stopColor="var(--primary)" />
            </linearGradient>
            <linearGradient id="lead-pathway-draw" x1="156" y1="56" x2="1044" y2="1210" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--brand-logo-red-orange)" />
              <stop offset="0.42" stopColor="var(--brand-logo-magenta)" />
              <stop offset="1" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="eyebrow-label">The LEAD pathway</span>
            <h2 className="section-title mt-4">
              Learn. Explore. Aspire. Discover.
            </h2>
            <p className="body-copy mt-4 text-muted-foreground">
              The pathway is how LEAD turns access into growth. Community,
              chapters, programs, mentors, and partners help students move from
              possibility to proof.
            </p>
          </div>

          <div className="grid gap-5">
            {stages.map((stage, index) => (
              <article
                key={stage.title}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                className={cn(
                  "editorial-card rounded-2xl p-5 sm:p-6",
                  index % 2 === 1 && "lg:ml-16"
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {stage.title}
                    </h3>
                    <p className="body-copy mt-3 text-muted-foreground">
                      {stage.promise}
                    </p>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-border/80 bg-background/55 p-4">
                        <p className="text-xs font-semibold uppercase text-primary">
                          In practice
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {stage.example}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/80 bg-background/55 p-4">
                        <p className="text-xs font-semibold uppercase text-primary">
                          Student gains
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {stage.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
