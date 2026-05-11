import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { SectionReveal } from "@/components/public/section-reveal";
import { Badge } from "@/components/ui/badge";
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
    <div className="overflow-hidden bg-background text-foreground">
      <section className="pt-28">
        <MainContainer className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="info" size="lg">About LEAD</Badge>
            <h1 className="display-title mt-6">Talent is already here. Access should be too.</h1>
            <p className="section-subtitle mt-6 text-muted-foreground">
              LEAD exists because Latino students across Latin America and the
              United States already carry the ambition, creativity, and talent.
              LEAD helps unlock access, structure, leadership practice, and
              opportunity.
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
          <div className="grid gap-3 sm:grid-cols-2">
            <ImageTile src="/about-us/2.jpg" alt="LEAD community members at an event" className="sm:mt-10" />
            <ImageTile src="/about-us/3.jpg" alt="LEAD students collaborating" />
          </div>
        </MainContainer>
      </section>

      <SectionReveal>
        <section className="border-y border-border bg-card/45 py-14">
          <MainContainer className="grid gap-4 md:grid-cols-4">
            {proofStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-background/70 p-5">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-20">
          <MainContainer className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <Badge variant="success">Mission</Badge>
              <h2 className="section-title mt-4">Empower the next generation of leaders.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD empowers the next generation of leaders across Latin
                America and the United States so they can reach their full
                potential.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Badge variant="warning">Vision</Badge>
              <h2 className="section-title mt-4">Transform Latin America into a global center.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD works toward a Latin America recognized for technology,
                leadership, innovation, and students prepared to create
                meaningful regional impact.
              </p>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="bg-card/35 py-20">
          <MainContainer>
            <div className="max-w-2xl">
              <Badge variant="neutral">Operating center</Badge>
              <h2 className="section-title mt-4">The standards behind LEAD growth.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD is English-first for public clarity and Spanish-authentic
                where culture matters. These four values guide chapter
                activation, leadership development, and program quality.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {operatingValues.map((value) => (
                <div key={value.title} className="rounded-lg border border-border bg-background/75 p-5">
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{value.translation}</p>
                  <p className="body-copy mt-4 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-20">
          <MainContainer className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="info">Why it works</Badge>
              <h2 className="section-title mt-4">LEAD is not only an event organizer.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                Events matter when they create value. LEAD connects events to a
                larger system: chapters, mentorship, practical projects,
                leadership practice, partner exposure, feedback, and a Talent
                Platform that helps students move from potential to proof.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Chapters are leadership development environments, not administrative units.",
                "Partnerships connect students to industry standards and opportunity.",
                "Pulse feedback helps LEAD listen, improve, and protect culture.",
                "The Talent Platform is the operational layer, not the whole LEAD identity.",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-card p-5 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="bg-card/35 py-20">
          <MainContainer>
            <div className="max-w-2xl">
              <Badge variant="success">Leadership</Badge>
              <h2 className="section-title mt-4">Built by students, professionals, volunteers, and chapter leaders.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                This is a curated leadership view, not a full roster. LEAD is
                bigger than any one page: chapter leaders, volunteers, mentors,
                and students across the region carry the work forward.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((person) => (
                <article key={person.name} className="overflow-hidden rounded-lg border border-border bg-background/75">
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

      <section className="border-t border-border py-16">
        <MainContainer className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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
  );
}

function ImageTile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={560}
        height={700}
        className="aspect-[4/5] w-full rounded-lg border border-border object-cover shadow-xl"
      />
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
