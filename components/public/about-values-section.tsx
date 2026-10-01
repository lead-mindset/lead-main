"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { MainContainer } from "@/components/global/main-container";
import gsap from "@/lib/gsap-setup";

const values = [
  {
    title: "Mindset",
    description: "Students are trusted as builders before they have every answer.",
    className: "from-[var(--brand-red)] via-[var(--brand-red-light)] to-[var(--brand-rose)]",
  },
  {
    title: "Purpose",
    description: "Every program should connect to a clearer next step for students.",
    className: "from-[var(--brand-rose)] via-[var(--brand-rose)] to-primary",
  },
  {
    title: "Excellence",
    description: "Preparation, responsibility, and follow-through protect the culture.",
    className: "from-primary via-[var(--brand-purple-light)] to-[var(--accent)]",
  },
  {
    title: "Impact",
    description: "Activity matters only when it creates access, confidence, and proof.",
    className: "from-foreground via-primary to-[var(--brand-rose)]",
  },
];

const desktopValuePositions = [
  { x: -148, y: -112, rotate: -8, scale: 0.94 },
  { x: 126, y: -86, rotate: 7, scale: 0.94 },
  { x: -118, y: 102, rotate: 6, scale: 0.94 },
  { x: 152, y: 118, rotate: -6, scale: 0.94 },
];

export function AboutValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const circles = gsap.utils.toArray<HTMLElement>("[data-value-circle]");
        const label = stage.querySelector<HTMLElement>("[data-values-label]");

        gsap.set(circles, {
          xPercent: -50,
          yPercent: -50,
          x: (index) => [-148, 126, -118, 152][index] ?? 0,
          y: (index) => [-112, -86, 102, 118][index] ?? 0,
          rotate: (index) => [-8, 7, 6, -6][index] ?? 0,
          scale: 0.94,
          transformOrigin: "50% 50%",
        });

        gsap.set(label, { autoAlpha: 0.44, scale: 0.98 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            end: "bottom 38%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(circles, {
            x: (index) => [-128, 94, -104, 112][index] ?? 0,
            y: (index) => [-96, -82, 100, 96][index] ?? 0,
            rotate: 0,
            scale: (index) => [0.98, 0.96, 0.96, 0.98][index] ?? 0.96,
            ease: "power3.out",
            stagger: 0.05,
          })
          .to(
            label,
            {
              autoAlpha: 0.82,
              scale: 1,
              ease: "power3.out",
            },
            "<"
          );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="values" ref={sectionRef} className="relative scroll-mt-28">
      <div className="flex min-h-[86svh] items-center pb-14 pt-20 sm:py-20">
        <MainContainer>
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-xl">
              <span className="text-overline font-sans font-bold uppercase text-primary">Values</span>
              <h2 className="text-h1 font-display font-semibold mt-4">
                The culture LEAD protects as it grows.
              </h2>
              <p className="text-body font-sans mt-4 text-muted-foreground">
                These are not decorative words. They are the standards behind
                how LEAD chooses programs, chapters, partnerships, and
                leadership opportunities.
              </p>
            </div>

            <div
              ref={stageRef}
              className="relative min-h-[28rem] overflow-hidden rounded-3xl border border-foreground/10 bg-background/42 p-5 shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] sm:min-h-[34rem] sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,color-mix(in_oklch,var(--brand-purple-light)_16%,transparent),transparent_20rem)]" />
              <p
                data-values-label
                className="absolute left-1/2 top-1/2 z-0 hidden max-w-[14rem] -translate-x-1/2 -translate-y-1/2 text-center font-display text-h1 font-extrabold leading-none text-foreground/72 sm:text-display md:block"
              >
                Our Values
              </p>

              <div className="relative z-10 hidden min-h-[30rem] place-items-center md:grid">
                {values.map((value, index) => (
                <article
                  key={value.title}
                  data-value-circle
                  className={`absolute left-1/2 top-1/2 grid size-56 place-items-center rounded-full bg-gradient-to-br ${value.className} p-[2px] text-center shadow-[0_24px_80px_color-mix(in_oklch,var(--background)_34%,transparent)]`}
                  style={{
                    zIndex: index + 1,
                    transform: `translate(calc(-50% + ${desktopValuePositions[index].x}px), calc(-50% + ${desktopValuePositions[index].y}px)) rotate(${desktopValuePositions[index].rotate}deg) scale(${desktopValuePositions[index].scale})`,
                  }}
                >
                    <div className="grid size-full place-items-center rounded-full bg-background/18 px-5 ring-1 ring-foreground/20">
                      <div>
                        <h3 className="font-display text-h2 font-extrabold text-foreground sm:text-h1">
                          {value.title}
                        </h3>
                        <p
                          data-value-copy
                          className="mt-2 text-caption font-semibold leading-5 text-foreground/82 sm:text-small"
                        >
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="relative z-10 grid min-h-[22rem] place-items-center md:hidden">
                {values.map((value, index) => (
                  <article
                    key={value.title}
                    className={`absolute grid size-32 place-items-center rounded-full bg-gradient-to-br ${value.className} p-[2px] text-center shadow-[0_18px_54px_color-mix(in_oklch,var(--background)_30%,transparent)]`}
                    style={{
                      zIndex: index + 1,
                      transform: [
                        "translate(-58%, -58%)",
                        "translate(48%, -34%)",
                        "translate(-52%, 24%)",
                        "translate(54%, 48%)",
                      ][index],
                    }}
                  >
                    <div className="grid size-full place-items-center rounded-full bg-background/18 px-4 ring-1 ring-foreground/20">
                      <h3 className="font-display text-h3 font-extrabold text-foreground">
                        {value.title}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:hidden">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border-b border-border/60 pb-3 last:border-b-0"
                >
                  <p className="font-display text-body-lg font-bold text-foreground">
                    {value.title}
                  </p>
                  <p className="mt-1 text-small leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </MainContainer>
      </div>
    </section>
  );
}
