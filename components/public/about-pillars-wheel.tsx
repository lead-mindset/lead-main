"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Globe2,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { cn } from "@/lib/cn";
import gsap from "@/lib/gsap-setup";

type Pillar = {
  title: string;
  short: string;
  description: string;
  Icon: LucideIcon;
  gradient: string;
};

const pillars: Pillar[] = [
  {
    title: "Chapter Development",
    short: "Chapters",
    description:
      "Build strong, sustainable chapters that foster engagement, collaboration, and belonging among students across Latin America.",
    Icon: UsersRound,
    gradient:
      "linear-gradient(135deg, var(--brand-red), var(--brand-rose))",
  },
  {
    title: "Academic Excellence",
    short: "Academics",
    description:
      "Promote high academic achievement and a culture of curiosity, discipline, and lifelong learning to prepare students for future success.",
    Icon: BookOpen,
    gradient:
      "linear-gradient(135deg, var(--brand-rose), var(--brand-purple))",
  },
  {
    title: "Leadership",
    short: "Leadership",
    description:
      "Develop confident, ethical leaders who inspire others and create meaningful impact in their communities and industries.",
    Icon: Award,
    gradient:
      "linear-gradient(135deg, var(--brand-purple), var(--brand-rose))",
  },
  {
    title: "Professional Development",
    short: "Careers",
    description:
      "Equip students with skills, mentorship, and experiences to excel in their careers and thrive in the evolving tech landscape.",
    Icon: Briefcase,
    gradient:
      "linear-gradient(135deg, var(--brand-red-light), var(--brand-purple))",
  },
  {
    title: "Community Impact",
    short: "Impact",
    description:
      "Inspire students to lead initiatives that transform communities, promote social responsibility, and leave a lasting legacy.",
    Icon: Globe2,
    gradient:
      "linear-gradient(135deg, var(--brand-purple-light), var(--brand-rose))",
  },
  {
    title: "Women Excellence",
    short: "Women",
    description:
      "Empower female students with mentorship, support, and opportunities to thrive as leaders in technology and beyond.",
    Icon: UserRound,
    gradient:
      "linear-gradient(135deg, var(--brand-purple-light), var(--brand-red))",
  },
  {
    title: "LEAD Academia",
    short: "Academia",
    description:
      "Engage K-12 students with technology, leadership skills, and career opportunities to cultivate the next generation of young talent.",
    Icon: GraduationCap,
    gradient:
      "linear-gradient(135deg, var(--brand-purple), var(--brand-rose))",
  },
];

const circle = 360;
const orbitRadius = 39;

function getPillarPosition(index: number, rotation = 0) {
  const angle =
    ((index / pillars.length) * circle - 90 + rotation) * (Math.PI / 180);

  return {
    left: Number((50 + Math.cos(angle) * orbitRadius).toFixed(4)),
    top: Number((50 + Math.sin(angle) * orbitRadius).toFixed(4)),
  };
}

export function AboutPillarsWheel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activePillar = pillars[activeIndex];
  const ActiveIcon = activePillar.Icon;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-pillar-node]");
        const placeNodes = (rotation = 0) => {
          nodes.forEach((node, index) => {
            const position = getPillarPosition(index, rotation);

            gsap.set(node, {
              left: `${position.left}%`,
              top: `${position.top}%`,
              xPercent: -50,
              yPercent: -50,
              rotation: 0,
              transformOrigin: "50% 50%",
            });
          });
        };

        placeNodes();

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;

              placeNodes(-circle * progress);

              const index = Math.min(
                pillars.length - 1,
                Math.round(progress * (pillars.length - 1))
              );
              setActiveIndex(index);
            },
          },
        });

        timeline.to({}, { duration: 1, ease: "none" });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-pillar-node]").forEach((node, index) => {
          const position = getPillarPosition(index);

          gsap.set(node, {
            left: `${position.left}%`,
            top: `${position.top}%`,
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="pillars" ref={sectionRef} className="relative scroll-mt-28 py-16 sm:py-24 md:min-h-[240svh] md:py-0">
      <MainContainer className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative mx-auto hidden aspect-square w-full max-w-[35rem] md:block">
            <div className="absolute inset-0 rounded-full border border-primary/18">
              <div
                className="absolute inset-[27%] rounded-full transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--brand-purple) 14%, transparent), transparent 68%)",
                }}
              />
              {pillars.map((pillar, index) => {
                const active = index === activeIndex;
                const Icon = pillar.Icon;

                return (
                  <button
                    key={pillar.title}
                    type="button"
                    data-pillar-node
                    aria-label={pillar.title}
                    aria-pressed={active}
                    onClick={() => setActiveIndex(index)}
                    className="group/pillar absolute grid size-[6.75rem] cursor-pointer place-items-center rounded-full bg-background/90 p-[2px] text-center transition-[background-image,color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55"
                    style={{
                      left: `${getPillarPosition(index).left}%`,
                      top: `${getPillarPosition(index).top}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundImage: active ? pillar.gradient : undefined,
                    }}
                  >
                    <span
                      className={cn(
                        "grid size-full place-items-center overflow-hidden rounded-full px-1.5 py-2 text-caption font-extrabold leading-[1.05] ring-1 transition duration-500",
                        active
                          ? "bg-background/35 text-foreground ring-white/25"
                          : "bg-card text-muted-foreground ring-white/10 group-hover/pillar:text-foreground group-hover/pillar:ring-white/20"
                      )}
                    >
                      <span className="grid w-full gap-1 place-items-center">
                        <Icon className="size-5" strokeWidth={1.8} />
                        <span className="w-full text-center leading-[1.05]">{pillar.short}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="absolute left-1/2 top-1/2 grid size-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-center ring-1 ring-foreground/12">
              <div
                className="grid size-24 place-items-center rounded-full text-foreground shadow-[0_20px_52px_color-mix(in_oklch,black_22%,transparent)]"
                style={{ backgroundImage: activePillar.gradient }}
              >
                <ActiveIcon className="size-10" strokeWidth={1.7} />
              </div>
            </div>
          </div>

          <div className="relative">
            <span className="text-overline font-sans font-bold uppercase text-primary">Our pillars</span>

            <div className="mt-6 border-y border-border/80 py-7 sm:py-8">
              <div className="flex items-center gap-4">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-full text-foreground ring-1 ring-foreground/18 md:hidden"
                  style={{ backgroundImage: activePillar.gradient }}
                >
                  <ActiveIcon className="size-7" strokeWidth={1.8} />
                </span>
                <p className="text-small font-extrabold text-primary">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(pillars.length).padStart(2, "0")}
                </p>
              </div>
              <div
                key={activeIndex}
                className="mt-5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <h2 className="font-display text-h1 font-extrabold leading-tight text-foreground sm:text-display">
                  {activePillar.title}
                </h2>
                <p className="text-body font-sans mt-4 text-muted-foreground">
                  {activePillar.description}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-2 md:hidden">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                    className="flex min-h-12 cursor-pointer items-center justify-between gap-3 border-b border-border/60 py-3 text-left text-small font-bold text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 aria-pressed:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="grid size-8 place-items-center rounded-full text-foreground"
                      style={{ backgroundImage: pillar.gradient }}
                    >
                      <pillar.Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <span>{pillar.title}</span>
                  </span>
                  <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
