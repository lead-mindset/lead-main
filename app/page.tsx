import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { CinematicVideoPanel } from "@/components/public/cinematic-video-panel";
import { ControlledModelStage } from "@/components/public/controlled-model-stage";
import { LeadPathway } from "@/components/public/lead-pathway";
import { SectionReveal } from "@/components/public/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  audienceRoutes,
  communityMoments,
  ecosystemItems,
  finalPaths,
  impactHighlights,
  partnerLogos,
  pathwayStages,
  pillars,
  programs,
  proofStats,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="editorial-photo-hero pt-24">
        <Image
          src="/about-us/1.jpg"
          alt="LEAD students gathered together at a community event"
          fill
          priority
          className="absolute inset-0 -z-10 object-cover"
        />
        <MainContainer className="flex min-h-[calc(92dvh-6rem)] items-end pb-16 pt-20">
          <div className="relative z-10 max-w-3xl">
            <span className="eyebrow-label">LEAD Americas</span>
            <h1 className="display-title mt-6 max-w-4xl">
              Building pathways for the next generation of leaders in STEM and innovation.
            </h1>
            <p className="section-subtitle mt-6 max-w-2xl text-muted-foreground">
              LEAD empowers students across Latin America and the United States
              through STEM education, leadership development, mentorship,
              chapters, and access to opportunities that help them grow
              personally and professionally.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link {...externalProps(publicCtas.join)} href={publicCtas.join}>
                  Join LEAD
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={publicCtas.pathway}>Explore pathways</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/15 bg-background/70 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </MainContainer>
      </section>

      <SectionReveal>
        <LeadPathway stages={pathwayStages} />
      </SectionReveal>

      <SectionReveal>
        <section className="py-24">
          <MainContainer>
            <div className="max-w-2xl">
              <span className="eyebrow-label">Choose your path</span>
              <h2 className="section-title mt-4">One ecosystem, clear next steps.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                Whether you are a student, chapter builder, partner, mentor, or
                community organization, the public site routes you to the right
                action without making you decode the whole organization first.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audienceRoutes.map((route) => (
                <Link key={route.title} href={route.href} {...externalProps(route.href)} className="group editorial-card rounded-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-primary/40">
                  <route.icon className="size-5 text-primary" />
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{route.title}</h3>
                  <p className="body-copy mt-3 text-sm text-muted-foreground">{route.description}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">{route.cta}</p>
                </Link>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="motion-proof" className="scroll-mt-24 py-24">
          <MainContainer>
            <CinematicVideoPanel
              src="/video3.mp4"
              eyebrow="LEAD in motion"
              title="A community students can feel before they join."
            >
              Meet the students, chapters, and real moments behind LEAD. Then
              choose the next step that matches your role.
            </CinematicVideoPanel>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {communityMoments.map((moment) => (
                <article key={moment.title} className="editorial-card overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      loading="eager"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">{moment.title}</h3>
                    <p className="body-copy mt-2 text-sm text-muted-foreground">{moment.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="ecosystem-motion" className="editorial-warm-band scroll-mt-24 py-24">
          <MainContainer>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <span className="eyebrow-label">LEAD ecosystem</span>
                <h2 className="section-title mt-4">More than events. A system for growth.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  LEAD works as a platform because it creates repeated systems:
                  chapter activation, leadership development, practical
                  learning, partner exposure, feedback, and personalized next
                  steps. The Talent Platform is the operational layer that keeps
                  those systems connected.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {ecosystemItems.map((item) => (
                  <div key={item.title} className="editorial-card rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              <ControlledModelStage
                kind="earth"
                eyebrow="Regional ecosystem"
                title="One network across regions"
                description="LEAD connects students, chapters, partners, and mentors across Latin America and the United States through one coordinated ecosystem."
                className="lg:col-span-2"
              />
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-24">
          <MainContainer>
            <div className="max-w-2xl">
              <span className="eyebrow-label">Pillars</span>
              <h2 className="section-title mt-4">Seven ways LEAD turns potential into proof.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="editorial-card rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="body-copy mt-3 text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="programs" className="editorial-warm-band scroll-mt-24 py-24">
          <MainContainer>
            <div className="max-w-2xl">
              <span className="eyebrow-label">Programs and experiences</span>
              <h2 className="section-title mt-4">Programs that create real value, not just attendance.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <div key={program.title} className="editorial-card rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                  <p className="body-copy mt-3 text-sm text-muted-foreground">{program.description}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">{program.nextStep}</p>
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="impact" className="scroll-mt-24 py-24">
          <MainContainer>
            <div className="max-w-2xl">
              <span className="eyebrow-label">Impact</span>
              <h2 className="section-title mt-4">Proof from real LEAD moments.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD&apos;s strongest proof is concrete: students served, projects
                built, companies engaged, chapters activated, and communities
                reached.
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {proofStats.map((stat) => (
                <div key={stat.label} className="editorial-card rounded-2xl p-5">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {impactHighlights.map((highlight) => (
                <article key={highlight.title} className="editorial-card rounded-2xl p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{highlight.title}</h3>
                    <Badge variant="neutral">{highlight.pillar}</Badge>
                  </div>
                  <dl className="mt-5 grid gap-4 text-sm">
                    <ImpactLine label="What happened" value={highlight.what} />
                    <ImpactLine label="Who it served" value={highlight.served} />
                    <ImpactLine label="Why it mattered" value={highlight.why} />
                  </dl>
                </article>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="editorial-warm-band py-16">
          <MainContainer>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <span className="eyebrow-label">Partners and allies</span>
                <h2 className="section-title mt-4">Partners help turn student ambition into access.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  Companies, professionals, mentors, and community organizations
                  collaborate with LEAD through workshops, mentorship, career
                  exposure, projects, events, and opportunity pathways.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {partnerLogos.map((logo) => (
                  <div key={logo.name} className="flex h-20 items-center justify-center rounded-lg border border-border bg-background/70 px-4">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={140}
                      height={48}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <section className="border-t border-border bg-card/45 py-16">
        <MainContainer className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="section-title">Find your next LEAD path.</h2>
            <p className="body-copy mt-3 text-muted-foreground">
              Join as a student, submit chapter interest, or start a partnership
              conversation with the team.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {finalPaths.map((path) => (
              <Button key={path.label} asChild variant={path.label === "Join LEAD" ? "default" : "outline"}>
                <Link href={path.href} {...externalProps(path.href)}>
                  {path.label}
                </Link>
              </Button>
            ))}
          </div>
        </MainContainer>
      </section>
    </div>
  );
}

function ImpactLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="mt-1 leading-6 text-muted-foreground">{value}</dd>
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
