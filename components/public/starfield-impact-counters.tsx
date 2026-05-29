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
      const counterElements = Array.from(
        section.querySelectorAll<HTMLElement>("[data-counter-value]")
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(tileRefs.current, { autoAlpha: 0, y: 34, scale: 0.96 });
        counterElements.forEach((element) => {
          element.textContent = formatCounterValue(0, element.dataset.counterSuffix ?? "");
        });

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

        counterElements.forEach((element, index) => {
          const target = Number(element.dataset.counterTarget ?? 0);
          const suffix = element.dataset.counterSuffix ?? "";
          const state = { value: 0 };

          tl.to(
            state,
            {
              value: target,
              duration: 0.9,
              ease: "power3.out",
              snap: { value: 1 },
              onUpdate: () => {
                element.textContent = formatCounterValue(state.value, suffix);
              },
              onComplete: () => {
                element.textContent = formatCounterValue(target, suffix);
              },
            },
            0.18 + index * 0.06
          );
        });
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(tileRefs.current, { autoAlpha: 1, y: 0, scale: 1 });
        counterElements.forEach((element) => {
          element.textContent = formatCounterValue(
            Number(element.dataset.counterTarget ?? 0),
            element.dataset.counterSuffix ?? ""
          );
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
      className="relative isolate -mt-14 scroll-mt-24 overflow-visible pb-14 pt-28 sm:-mt-24 sm:pb-24 sm:pt-48"
    >
      <div className="lead-impact-aura" />
      <MainContainer>
        <div className="grid gap-5 lg:grid-cols-3" role="list" aria-label="LEAD in numbers">
          {visibleStats.map((stat, index) => (
            <div
              key={stat.label}
              role="listitem"
              ref={(node) => {
                tileRefs.current[index] = node;
              }}
              className={cn(
                "relative min-h-44 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:min-h-64 sm:p-6",
                counterGradients[index % counterGradients.length]
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_0%,rgba(255,255,255,0.28),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <p className="metric-label text-white/88">
                  {formatLabel(stat.label)}
                </p>
                <p
                  className={cn("metric-value mt-6 max-w-full text-white")}
                  aria-label={stat.value}
                >
                  <AnimatedCounterValue stat={stat} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}

function AnimatedCounterValue({ stat }: { stat: ProofStat }) {
  const numericStat = parseStat(stat);

  return (
    <span
      aria-hidden="true"
      data-counter-target={numericStat.target}
      data-counter-suffix={numericStat.suffix}
      data-counter-value
      className="inline-flex min-w-[3.1ch] items-center justify-center tabular-nums"
    >
      {formatCounterValue(numericStat.target, numericStat.suffix)}
    </span>
  );
}

function formatCounterValue(value: number, suffix: string) {
  return `${Math.round(value).toLocaleString("en-US")}${suffix}`;
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
