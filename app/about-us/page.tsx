import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { BrandScrollTrace } from "@/components/public/brand-scroll-trace";
import { CinematicVideoPanel } from "@/components/public/cinematic-video-panel";
import { ProofRail } from "@/components/public/proof-rail";
import { SectionReveal } from "@/components/public/section-reveal";
import { Button } from "@/components/ui/button";
import {
  finalPaths,
  leadership,
  operatingValues,
  proofStats,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function AboutPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <section className="relative z-10 editorial-photo-hero pt-28">
        <Image
          src="/about-us/2.jpg"
          alt="LEAD community members at an event"
          fill
          priority
          className="absolute inset-0 -z-10 object-cover"
        />
        <MainContainer className="relative z-10 flex min-h-[calc(88dvh-7rem)] items-end py-16">
          <div className="relative max-w-3xl before:absolute before:-inset-x-8 before:-inset-y-6 before:-z-10 before:bg-gradient-to-r before:from-background/80 before:via-background/55 before:to-transparent before:blur-2xl">
            <span className="eyebrow-label">About LEAD</span>
            <h1 className="display-title mt-6">Talent is already here. Access should be too.</h1>
            <p className="section-subtitle mt-6 text-muted-foreground">
              LEAD exists because students across Latin America and the United
              States already carry ambition, creativity, and talent. LEAD helps
              unlock access, structure, leadership practice, and opportunity
              through STEM education, mentorship, chapters, and innovation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>Join LEAD</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={publicCtas.chapter}>Submit Chapter Interest</Link>
              </Button>
            </div>
          </div>
        </MainContainer>
      </section>

      <div className="relative z-0">
        <BrandScrollTrace />
        <SectionReveal className="relative z-10">
          <section className="relative z-10 border-y border-border bg-card/45 py-14">
            <MainContainer className="relative z-10">
              <ProofRail stats={proofStats} />
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="relative z-10 py-24">
            <MainContainer className="relative z-10">
              <CinematicVideoPanel
                src="/video2.mp4"
                eyebrow="Community proof"
                title="Trust comes from the people building it."
              >
                LEAD is carried by students, chapter leaders, volunteers,
                mentors, and partners who turn access into real community
                momentum.
              </CinematicVideoPanel>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="relative py-24">
            <MainContainer className="relative z-10">
              <div className="grid border-y border-border/80 lg:grid-cols-2">
                <div className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:pr-10">
                  <span className="eyebrow-label">Mission</span>
                  <h2 className="section-title mt-4">Empower the next generation of leaders.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD empowers the next generation of leaders across Latin
                    America and the United States so they can reach their full
                    potential.
                  </p>
                </div>
                <div className="py-8 lg:pl-10">
                  <span className="eyebrow-label">Vision</span>
                  <h2 className="section-title mt-4">Transform Latin America into a global center.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD works toward a Latin America recognized for technology,
                    leadership, innovation, and students prepared to create
                    meaningful regional impact.
                  </p>
                </div>
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section id="values" className="editorial-warm-band relative z-10 scroll-mt-24 py-24">
            <MainContainer className="relative z-10">
              <div className="max-w-2xl">
                <span className="eyebrow-label">Operating center</span>
                <h2 className="section-title mt-4">The standards behind LEAD growth.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  These four values guide chapter activation, leadership
                  development, and program quality. They keep LEAD growth rooted
                  in culture, responsibility, and real student impact.
                </p>
              </div>
              <div className="mt-10 grid border-y border-border/80 md:grid-cols-2">
                {operatingValues.map((value, index) => (
                  <div
                    key={value.title}
                    className={`min-h-56 border-b border-border/70 p-6 md:p-8 ${
                      index % 2 === 0 ? "md:border-r" : ""
                    } ${index >= 2 ? "md:border-b-0" : ""} ${
                      index === operatingValues.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <p className="font-headline text-5xl font-black leading-none text-primary/35">
                      {value.title}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-primary">{value.translation}</p>
                    <p className="body-copy mt-5 max-w-md text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="relative py-24">
            <MainContainer className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="eyebrow-label">Why it works</span>
                <h2 className="section-title mt-4">LEAD is not only an event organizer.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  Events matter when they create value. LEAD connects events to a
                  larger system: chapters, mentorship, practical projects,
                  leadership practice, partner exposure, feedback, and a Talent
                  Platform that helps students move from potential to proof.
                </p>
              </div>
              <ol className="border-y border-border/80">
                {[
                  "Chapters are leadership development environments, not administrative units.",
                  "Partnerships connect students to industry standards and opportunity.",
                  "Pulse feedback helps LEAD listen, improve, and protect culture.",
                  "The Talent Platform is the operational layer, not the whole LEAD identity.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-4 border-b border-border/70 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="body-copy text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="editorial-warm-band relative z-10 py-24">
            <MainContainer className="relative z-10">
              <div className="max-w-2xl">
                <span className="eyebrow-label">Leadership</span>
                <h2 className="section-title mt-4">Built by students, professionals, volunteers, and chapter leaders.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  This is a curated leadership view, not a full roster. LEAD is
                  bigger than any one page: chapter leaders, volunteers, mentors,
                  and students across the region carry the work forward.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leadership.map((person) => (
                  <article key={person.name} className="overflow-hidden rounded-2xl border border-border bg-background/75">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={420}
                      height={320}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <section className="relative z-10 border-t border-border py-16">
          <MainContainer className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-title">Take the next step with LEAD.</h2>
              <p className="body-copy mt-3 text-muted-foreground">
                Join the community, submit serious chapter interest, or start a
                partnership conversation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {finalPaths.map((path) => (
                <Button key={path.label} asChild variant={path.label === "Join LEAD" ? "default" : "outline"}>
                  <Link href={path.href} {...externalProps(path.href)}>{path.label}</Link>
                </Button>
              ))}
            </div>
          </MainContainer>
        </section>
      </div>
    </div>
  );
}

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
