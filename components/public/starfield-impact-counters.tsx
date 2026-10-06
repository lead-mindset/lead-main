"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  CalendarCheck2,
  GraduationCap,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MainContainer } from "@/components/global/main-container";
import { REDUCED_MOTION_QUERY } from "@/components/global/motion-guidelines";
import gsap from "@/lib/gsap-setup";
import { cn } from "@/lib/cn";

type ProofStat = {
  value: string;
  label: string;
};

type NumericStat = {
  target: number;
  suffix: string;
  isNumeric: boolean;
};

const counterIcons: LucideIcon[] = [
  UsersRound,
  GraduationCap,
  CalendarCheck2,
];

// Fixed digit heights based on size (matches Tailwind h-12/h-16 and h-10/h-12)
const LARGE_DIGIT_HEIGHT = 64; // sm:h-16
const SMALL_DIGIT_HEIGHT = 48; // sm:h-12

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

        const allDigitContainers = section.querySelectorAll<HTMLElement>("[data-counter-digit]");
        allDigitContainers.forEach((container) => {
          gsap.set(container, { y: 0 });
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
          const formatted = formatCounterValue(target, suffix);
          const isLarge = element.dataset.size === "large";
          const digitHeight = isLarge ? LARGE_DIGIT_HEIGHT : SMALL_DIGIT_HEIGHT;
          const digitContainers = Array.from(
            element.querySelectorAll<HTMLElement>("[data-counter-digit]")
          );

          digitContainers.forEach((container, i) => {
            const digit = parseInt(container.dataset.digit ?? "0");
            tl.to(
              container,
              {
                y: -digit * digitHeight,
                duration: 1.2,
                ease: "power3.out",
              },
              0.18 + index * 0.06
            );
          });
        });
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(tileRefs.current, { autoAlpha: 1, y: 0, scale: 1 });
        counterElements.forEach((element) => {
          const target = Number(element.dataset.counterTarget ?? 0);
          const suffix = element.dataset.counterSuffix ?? "";
          const formatted = formatCounterValue(target, suffix);
          const isLarge = element.dataset.size === "large";
          const digitHeight = isLarge ? LARGE_DIGIT_HEIGHT : SMALL_DIGIT_HEIGHT;
          const digitContainers = Array.from(
            element.querySelectorAll<HTMLElement>("[data-counter-digit]")
          );
          digitContainers.forEach((container) => {
            const digit = parseInt(container.dataset.digit ?? "0");
            container.style.transform = `translateY(-${digit * digitHeight}px)`;
          });
        });
      });

      return () => mm.revert();
    },
    { dependencies: [visibleStats], scope: sectionRef }
  );

  const primaryStat = visibleStats[0];
  const secondaryStats = visibleStats.slice(1);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="pointer-events-none relative isolate -mt-14 scroll-mt-24 overflow-visible pb-14 pt-28 sm:-mt-24 sm:pb-24 sm:pt-48"
    >
      <div className="lead-impact-aura" />
      <MainContainer className="pointer-events-auto">
        {primaryStat && (
          <div
            role="listitem"
            ref={(node) => {
              tileRefs.current[0] = node;
            }}
            className="mb-8"
          >
            <CounterDisplay
              stat={primaryStat}
              icon={counterIcons[0]}
              size="large"
            />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {secondaryStats.map((stat, index) => {
            const Icon = counterIcons[(index + 1) % counterIcons.length];
            return (
              <div
                key={stat.label}
                role="listitem"
                ref={(node) => {
                  tileRefs.current[index + 1] = node;
                }}
              >
                <CounterDisplay
                  stat={stat}
                  icon={Icon}
                  size="small"
                />
              </div>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}

function CounterDisplay({
  stat,
  icon: Icon,
  size,
}: {
  stat: ProofStat;
  icon: LucideIcon;
  size: "large" | "small";
}) {
  const numericStat = parseStat(stat);
  const formatted = formatCounterValue(numericStat.target, numericStat.suffix);
  const isLarge = size === "large";

  return (
    <Card className={cn("relative overflow-hidden", isLarge ? "p-6 sm:p-10" : "p-6")}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <CardContent className="relative flex flex-col items-center gap-4 p-0">
        <IconTile
          className={cn(
            "rounded-full bg-primary/10 text-primary",
            isLarge ? "size-12" : "size-10"
          )}
        >
          <Icon className={cn(isLarge ? "size-6" : "size-5")} strokeWidth={1.6} />
        </IconTile>

        <div
          data-counter-value
          data-counter-target={numericStat.target}
          data-counter-suffix={numericStat.suffix}
          data-size={size}
          className={cn(
            "relative inline-flex items-center justify-center rounded-2xl p-3 sm:p-5",
            isLarge && "bg-gradient-to-br from-brand-red via-brand-rose to-brand-purple"
          )}
        >
          <div className="flex items-center justify-center gap-0.5 sm:gap-1">
            {formatted.split("").map((char, i) => {
              if (char === "," || char === "+") {
                return (
                  <span
                    key={i}
                    className={cn(
                      "font-display font-bold leading-none",
                      isLarge ? "text-4xl sm:text-6xl text-white" : "text-2xl sm:text-4xl text-foreground"
                    )}
                  >
                    {char}
                  </span>
                );
              }
              const digit = parseInt(char);
              return (
                <div
                  key={i}
                  className={cn(
                    "overflow-hidden rounded-lg",
                    isLarge ? "w-8 sm:w-12 h-12 sm:h-16 bg-white/10 backdrop-blur-sm" : "w-6 sm:w-10 h-10 sm:h-12 bg-card"
                  )}
                >
                  <div
                    data-counter-digit
                    data-digit={digit}
                    className="flex flex-col"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <div
                        key={n}
                        className={cn(
                          "flex items-center justify-center font-display font-bold leading-none",
                          isLarge ? "h-12 sm:h-16 text-4xl sm:text-6xl text-white" : "h-10 sm:h-12 text-2xl sm:text-4xl text-foreground"
                        )}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p
          className={cn(
            "font-sans font-semibold text-muted-foreground text-center",
            isLarge ? "text-body" : "text-small"
          )}
        >
          {formatLabel(stat.label)}
        </p>
      </CardContent>
    </Card>
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
