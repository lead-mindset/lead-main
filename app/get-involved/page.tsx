import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { CinematicVideoPanel } from "@/components/public/cinematic-video-panel";
import { ControlledModelStage } from "@/components/public/controlled-model-stage";
import { SectionReveal } from "@/components/public/section-reveal";
import { InterestForm } from "@/components/public/interest-form";
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
    description: "For companies, professionals, mentors, sponsors, and industry collaborators.",
  },
  {
    label: "Collaborate as a community organization",
    href: "#partners",
    description: "For organizations bringing STEM access, leadership, or opportunity into communities.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="editorial-photo-hero pt-28">
        <Image
          src="/chapters/chapter-2.jpg"
          alt="LEAD chapter members gathering on campus"
          fill
          priority
          className="absolute inset-0 -z-10 object-cover"
        />
        <MainContainer className="grid min-h-[calc(88dvh-7rem)] items-end gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow-label">Get involved</span>
            <h1 className="display-title mt-6">Choose the LEAD path that fits your role.</h1>
            <p className="section-subtitle mt-6 text-muted-foreground">
              Join as a student, submit serious chapter interest, or start a
              partnership or community collaboration. Each path is structured so
              LEAD can understand context and follow up with the right next
              step.
            </p>
          </div>
          <div className="border-y border-white/20 bg-background/55">
            {paths.map((path, index) => (
              <Link
                key={`${path.href}-${path.label}`}
                href={path.href}
                className="group grid gap-3 border-b border-white/15 px-4 py-5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-b-0 hover:bg-primary/10 sm:grid-cols-[3rem_1fr]"
              >
                <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-xl font-semibold text-foreground">{path.label}</span>
                  <span className="body-copy mt-2 block text-sm text-muted-foreground">{path.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </MainContainer>
      </section>

      <SectionReveal>
        <section id="path-motion" className="scroll-mt-24 py-24">
          <MainContainer className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CinematicVideoPanel
              src="/video.mp4"
              eyebrow="Momentum"
              title="The path into LEAD starts with people."
              className="lg:min-h-full"
            >
              Students join a living network of chapters, programs, mentors,
              and opportunities. The right path depends on what you are ready
              to build.
            </CinematicVideoPanel>
            <ControlledModelStage
              kind="rocket"
              eyebrow="Chapter launch"
              title="Submit chapter interest with context"
              description="Chapter formation is selective. The interest form helps LEAD understand readiness, alignment, and the founding team's capacity before any next step."
            />
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="students" className="editorial-warm-band scroll-mt-24 border-y border-border py-24">
          <MainContainer className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <span className="eyebrow-label">Student path</span>
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
              className="editorial-image aspect-[4/3] w-full border border-border object-cover"
            />
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="chapters" className="scroll-mt-24 py-24">
          <MainContainer>
            <div className="max-w-3xl">
              <span className="eyebrow-label">Chapter interest</span>
              <h2 className="section-title mt-4">Building a chapter is selective.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                Submit Chapter Interest does not create a chapter and does not
                guarantee selection, orientation, activation, or approval. LEAD
                approves chapters when founding teams show aligned mindset,
                clear purpose, responsible structure, execution capacity, and
                intentional impact.
              </p>
            </div>

            <div className="mt-10 grid border-y border-border/80 lg:grid-cols-5">
              {chapterProcess.map((step, index) => (
                <div
                  key={step.title}
                  className="relative border-b border-border/70 p-5 last:border-b-0 lg:min-h-64 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid border-y border-border/80 md:grid-cols-2 lg:grid-cols-4">
              {operatingValues.map((value, index) => (
                <div
                  key={value.title}
                  className="border-b border-border/70 p-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-primary">{value.translation}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{value.description}</p>
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
        <section id="partners" className="editorial-warm-band scroll-mt-24 py-24">
          <MainContainer>
            <div className="max-w-3xl">
              <span className="eyebrow-label">Partner and community path</span>
              <h2 className="section-title mt-4">Partner or collaborate with students who are already building proof.</h2>
              <p className="body-copy mt-4 text-muted-foreground">
                LEAD works with partners who expand access to STEM, leadership,
                professional development, mentorship, corporate exposure,
                community impact, and consent-first talent visibility. This
                includes companies, professionals, mentors, sponsors, and
                community organizations.
              </p>
            </div>

            <div className="mt-10 grid border-y border-border/80 lg:grid-cols-3">
              {partnerTypes.map((type) => (
                <div
                  key={type.value}
                  className="grid gap-4 border-b border-border/70 py-6 last:border-b-0 sm:grid-cols-[3rem_1fr] lg:block lg:border-b-0 lg:border-r lg:px-6 lg:last:border-r-0"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-primary">
                    <type.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground lg:mt-5">{type.title}</h3>
                    <p className="body-copy mt-3 text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="border-y border-border/80 py-6">
                <h3 className="text-xl font-semibold text-foreground">What partnership can look like</h3>
                <ul className="mt-5 grid text-sm leading-6 text-muted-foreground">
                  <li className="border-t border-border/70 py-3">Corporate visits, workshops, sponsorships, and event collaboration.</li>
                  <li className="border-t border-border/70 py-3">Speaking, mentoring, portfolio feedback, and leadership development.</li>
                  <li className="border-t border-border/70 py-3">Community collaborations such as STEM access initiatives and regional programs.</li>
                  <li className="border-t border-border/70 py-3">Opt-in talent visibility that respects student consent and readiness.</li>
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
