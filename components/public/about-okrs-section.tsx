"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Flag } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import gsap from "@/lib/gsap-setup";

const journey = [
  {
    title: "Engage",
    subtitle: "Building community and belonging",
    badgeClass: "from-[var(--brand-red)] to-[var(--brand-rose)]",
    description:
      "We create opportunities for people to connect, feel welcomed, and become part of the LEAD community.",
  },
  {
    title: "Develop",
    subtitle: "Creating opportunities for growth",
    badgeClass: "from-[var(--brand-rose)] to-[var(--brand-purple)]",
    description:
      "We provide learning experiences, mentorship, workshops, and development opportunities that help people grow personally and professionally.",
  },
  {
    title: "Empower",
    subtitle: "Creating leaders through ownership",
    badgeClass: "from-[var(--brand-purple)] to-[var(--brand-rose)]",
    description:
      "We create pathways for members to take ownership, lead initiatives, make decisions, and grow into leadership roles.",
  },
  {
    title: "Impact",
    subtitle: "Creating meaningful and measurable outcomes",
    badgeClass: "from-[var(--brand-red)] to-[var(--brand-purple)]",
    description:
      "We measure success based on the difference we make in the lives of students, communities, and future leaders.",
  },
];

export function AboutOKRsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rail = section.querySelector<HTMLElement>("[data-okr-rail]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-okr-step]");
        const text = gsap.utils.toArray<HTMLElement>("[data-okr-text]");

        if (rail) {
          gsap.fromTo(
            rail,
            { transformOrigin: "50% 0%", scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        }

        if (steps.length > 0) {
          gsap.from(steps, {
            autoAlpha: 0,
            y: 26,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          });
        }

        const badges = gsap.utils.toArray<HTMLElement>("[data-okr-badge]");
        if (badges.length > 0) {
          gsap.from(badges, {
            scale: 0.6,
            autoAlpha: 0,
            duration: 0.5,
            ease: "back.out(1.6)",
            stagger: 0.15,
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          });
        }

        if (text.length > 0) {
          gsap.from(text, {
            autoAlpha: 0,
            y: 18,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            section.querySelector("[data-okr-rail]"),
            ...gsap.utils.toArray("[data-okr-step]"),
            ...gsap.utils.toArray("[data-okr-badge]"),
            ...gsap.utils.toArray("[data-okr-text]"),
          ].filter(Boolean),
          { autoAlpha: 1, scaleY: 1, scale: 1, y: 0 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="okrs" ref={sectionRef} className="relative scroll-mt-28 py-16 sm:py-24">
      <MainContainer>
        <div className="mx-auto max-w-3xl">
          <span data-okr-text className="text-overline font-sans font-bold uppercase text-primary">
            How we measure success
          </span>
          <h2 data-okr-text className="text-h1 font-display font-semibold mt-4">
            One journey, from belonging to impact.
          </h2>
          <p data-okr-text className="text-body font-sans mt-4 text-muted-foreground">
            The leadership journey is the same for every chapter, program, and
            student, and it is how LEAD measures success across the organization.
          </p>

          <div className="relative mt-12">
            <div
              aria-hidden
              data-okr-rail
              className="absolute left-6 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-brand-red via-brand-rose to-primary"
            />
            <ol className="space-y-9">
              {journey.map((step, index) => (
                <li
                  key={step.title}
                  data-okr-step
                  className="relative flex items-start gap-5"
                >
                  <span
                    data-okr-badge
                    className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${step.badgeClass} font-display text-small font-bold text-white ring-4 ring-background`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <article className="flex-1 rounded-2xl border border-border bg-card/60 p-5 shadow-[inset_0_1px_0_color-mix(in_oklch,white_4%,transparent)] sm:p-6">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display text-h3 font-semibold text-foreground sm:text-h2">
                        {step.title}
                      </h3>
                      {index === journey.length - 1 ? (
                        <Flag className="size-5 text-primary" strokeWidth={2.1} aria-hidden />
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-small font-semibold text-primary">
                      {step.subtitle}
                    </p>
                    <p className="mt-2 text-small leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}