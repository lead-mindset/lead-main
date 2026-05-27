"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";

import { MainContainer } from "@/components/global/main-container";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import gsap from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

type ProofStat = {
  value: string;
  label: string;
};

type NumericStat = {
  target: number;
  suffix: string;
  isNumeric: boolean;
};

const counterGradients = [
  "from-[#d84c4c] via-[#ba4e5e] to-[#7a57d1]",
  "from-[#9b2e8b] via-[#7e56e2] to-[#5d41b0]",
  "from-[#ba4e5e] via-[#9b2e8b] to-[#7e56e2]",
];

export function StarfieldImpactCounters({ stats }: { stats: ProofStat[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const visibleStats = useMemo(() => stats.filter((stat) => parseStat(stat).isNumeric), [stats]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      const digitElements = Array.from(
        section.querySelectorAll<HTMLElement>("[data-counter-digit]")
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(tileRefs.current, { autoAlpha: 0, y: 34, scale: 0.96 });
        gsap.set(digitElements, { yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            once: true,
          },
        });

        tl.to(tileRefs.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });

        tl.to(
          digitElements,
          {
            yPercent: (_, element) => -Number(element.dataset.counterDigit ?? 0) * 10,
            duration: 1.25,
            stagger: 0.025,
            ease: "power4.out",
          },
          0.18
        );
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(tileRefs.current, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(digitElements, {
          yPercent: (_, element) => -Number(element.dataset.counterDigit ?? 0) * 10,
        });
      });

      return () => mm.revert();
    },
    { dependencies: [visibleStats], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative isolate -mt-20 scroll-mt-24 overflow-visible pb-20 pt-40 sm:-mt-24 sm:pb-24 sm:pt-48"
    >
      <div className="lead-impact-aura" />
      <MainContainer>
        <dl className="grid gap-5 lg:grid-cols-3">
          {visibleStats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(node) => {
                tileRefs.current[index] = node;
              }}
              className={cn(
                "relative min-h-56 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:min-h-64",
                counterGradients[index % counterGradients.length]
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_0%,rgba(255,255,255,0.28),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <dt className="text-sm font-extrabold uppercase tracking-[0.08em] text-white/88 sm:text-base">
                  {formatLabel(stat.label)}
                </dt>
                <dd
                  aria-label={stat.value}
                  className={cn(
                    "mt-6 max-w-full font-headline text-[clamp(4rem,7vw,6.8rem)] font-black leading-none text-white"
                  )}
                >
                  <RollingValue value={stat.value} />
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </MainContainer>
    </section>
  );
}

function RollingValue({ value }: { value: string }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center tabular-nums">
      {value.split("").map((character, index) => {
        if (!/\d/.test(character)) {
          return (
            <span key={`${character}-${index}`} className="inline-flex h-[1em] items-center">
              {character}
            </span>
          );
        }

        return (
          <span
            key={`${character}-${index}`}
            className="inline-block h-[1em] w-[0.62em] overflow-hidden align-middle"
          >
            <span
              data-counter-digit={character}
              className="block leading-none will-change-transform"
            >
              {Array.from({ length: 10 }, (_, digit) => (
                <span
                  key={digit}
                  className="flex h-[1em] items-center justify-center leading-none"
                >
                  {digit}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function formatLabel(label: string) {
  return label
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseStat(stat: ProofStat): NumericStat {
  const numberMatch = stat.value.match(/[\d,]+/);
  if (!numberMatch) {
    return { target: 0, suffix: "", isNumeric: false };
  }

  const target = Number(numberMatch[0].replace(/,/g, ""));
  const suffix = stat.value.replace(numberMatch[0], "");

  return {
    target,
    suffix,
    isNumeric: Number.isFinite(target),
  };
}
