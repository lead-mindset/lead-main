import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { SectionReveal } from "@/components/public/section-reveal";
import { InterestForm } from "@/components/public/interest-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  chapterProcess,
  operatingValues,
  partnerTypes,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

const paths = [
  {
    label: "Join LEAD",
    href: "#students",
    description: "For students ready to create a profile, find chapters, and access opportunities.",
  },
  {
    label: "Submit Chapter Interest",
    href: "#chapters",
    description: "For serious university teams exploring a selective chapter activation process.",
  },
  {
    label: "Partner with LEAD",
    href: "#partners",
    description: "For companies, mentors, and community organizations ready to collaborate.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="pt-28">
        <MainContainer className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="info" size="lg">Get involved</Badge>
            <h1 className="display-title mt-6">Choose the LEAD path that fits your role.</h1>
            <p className="section-subtitle mt-6 text-muted-foreground">
              Join as a student, submit serious chapter interest, or start a
              partnership conversation. Each path is structured so LEAD can
              understand context and follow up with the right next step.
            </p>
          </div>
          <div className="grid gap-4">
            {paths.map((path) => (
              <Link key={path.href} href={path.href} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40">
                <h2 className="text-xl font-semibold text-foreground">{path.label}</h2>
                <p className="body-copy mt-2 text-sm text-muted-foreground">{path.description}</p>
              </Link>
            ))}
          </div>
        </MainContainer>
      </section>

      <SectionReveal>
        <section id="students" className="scroll-mt-24 border-y border-border bg-card/35 py-20">
          <MainContainer className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Badge variant="success">Student path</Badge>
              <h2 className="section-title mt-4">Join the community and enter the Talent Platform.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                Joining LEAD starts the official onboarding path. The Talent
                Platform is where students create a profile, connect with a
                chapter, discover events and programs, and optionally activate
                visibility for opportunities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>Join LEAD</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#programs">Explore programs</Link>
                </Button>
              </div>
            </div>
            <Image
              src="/chapters/chapter-1.jpg"
              alt="LEAD chapter members together"
              width={720}
              height={540}
              className="aspect-[4/3] w-full rounded-lg border border-border object-cover shadow-xl"
            />
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="chapters" className="scroll-mt-24 py-20">
          <MainContainer>
            <div className="max-w-3xl">
              <Badge variant="warning">Chapter interest</Badge>
              <h2 className="section-title mt-4">Building a chapter is selective.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                Submit Chapter Interest does not create a chapter and does not
                guarantee selection, orientation, activation, or approval. LEAD
                approves chapters when founding teams show aligned mindset,
                clear purpose, responsible structure, execution capacity, and
                intentional impact.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-5">
              {chapterProcess.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-border bg-card p-5">
                  <Badge variant="count">{index + 1}</Badge>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {operatingValues.map((value) => (
                <div key={value.title} className="rounded-lg border border-border bg-card/80 p-5">
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{value.translation}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-3xl">
              <InterestForm kind="chapter_interest" />
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="partners" className="scroll-mt-24 bg-card/35 py-20">
          <MainContainer>
            <div className="max-w-3xl">
              <Badge variant="info">Partner path</Badge>
              <h2 className="section-title mt-4">Partner with students who are already building proof.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD works with partners who expand access to STEM, leadership,
                professional development, mentorship, corporate exposure,
                community impact, and consent-first talent visibility.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {partnerTypes.map((type) => (
                <div key={type.value} className="rounded-lg border border-border bg-background/75 p-5">
                  <type.icon className="size-5 text-primary" />
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{type.title}</h3>
                  <p className="body-copy mt-3 text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="rounded-lg border border-border bg-background/75 p-5">
                <h3 className="text-xl font-semibold text-foreground">What partnership can look like</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
                  <li>Corporate visits, workshops, sponsorships, and event collaboration.</li>
                  <li>Speaking, mentoring, portfolio feedback, and leadership development.</li>
                  <li>Community collaborations such as STEM access initiatives and regional programs.</li>
                  <li>Opt-in talent visibility that respects student consent and readiness.</li>
                </ul>
              </div>
              <InterestForm kind="partnership" />
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <section className="border-t border-border py-16">
        <MainContainer className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <h2 className="section-title">Serious interest deserves a clear process.</h2>
            <p className="body-copy mt-3 text-muted-foreground">
              LEAD will follow up based on context, readiness, and alignment.
              The goal is not more activity. The goal is sustainable impact.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>Join LEAD</Link>
          </Button>
        </MainContainer>
      </section>
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
