import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { BrandScrollTrace } from "@/components/public/brand-scroll-trace";
import { ProofRail } from "@/components/public/proof-rail";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { SectionReveal } from "@/components/public/section-reveal";
import { Button } from "@/components/ui/button";
import {
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
              LEAD exists because students across Latin America, the United
              States, and the Americas already carry ambition, creativity, and
              talent. LEAD helps turn that talent into access, leadership
              practice, community, and opportunity.
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
          <section className="relative z-10 py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
                <div className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-border bg-card shadow-[inset_0_1px_0_color-mix(in_oklab,white_12%,transparent)]">
                  <Image
                    src="/about-us/5.jpg"
                    alt="LEAD students and partners gathered at a professional experience"
                    fill
                    sizes="(min-width: 1024px) 54vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/48 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                    <span className="eyebrow-label">Community proof</span>
                    <h2 className="mt-4 max-w-2xl text-2xl font-black leading-tight text-white sm:text-4xl">
                      Trust comes from the people building it.
                    </h2>
                    <p className="body-copy mt-4 max-w-2xl text-white/78">
                      LEAD is carried by students, chapter leaders, volunteers,
                      mentors, and partners who turn access into real community
                      momentum.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {aboutProofMoments.map((moment) => (
                    <article
                      key={moment.title}
                      className="grid min-h-44 overflow-hidden rounded-2xl border border-border bg-card/80 sm:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_1fr]"
                    >
                      <div className="relative min-h-44">
                        <Image
                          src={moment.image}
                          alt={moment.title}
                          fill
                          sizes="11rem"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-sm font-semibold uppercase text-primary">
                          {moment.eyebrow}
                        </p>
                        <h3 className="mt-3 text-xl font-bold leading-tight text-foreground">
                          {moment.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {moment.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
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
                    LEAD empowers students across Latin America, the United
                    States, and the Americas through STEM education, leadership
                    development, mentorship, and community.
                  </p>
                </div>
                <div className="py-8 lg:pl-10">
                  <span className="eyebrow-label">Vision</span>
                  <h2 className="section-title mt-4">Build a visible network of student leadership.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD works toward a future where students in the Americas are
                    recognized for technology, leadership, innovation, and the
                    impact they create in their communities.
                  </p>
                </div>
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section id="values" className="editorial-warm-band relative z-10 scroll-mt-24 py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div className="lg:sticky lg:top-24">
                  <span className="eyebrow-label">Growth standards</span>
                  <h2 className="section-title mt-4">What LEAD protects as it grows.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD can scale only if chapters, programs, and partnerships
                    protect the same culture: purpose, preparation,
                    responsibility, and student-first impact.
                  </p>
                </div>

                <div className="border-y border-border/80">
                  {operatingValues.map((value, index) => (
                    <article
                      key={value.title}
                      className="grid gap-5 border-b border-border/70 py-6 last:border-b-0 sm:grid-cols-[5rem_1fr] sm:py-8"
                    >
                      <div>
                        <span className="flex size-12 items-center justify-center rounded-full border border-primary/35 bg-primary/12 text-sm font-bold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <p className="font-headline text-4xl font-black leading-none text-primary/42 sm:text-5xl">
                          {value.title}
                        </p>
                        <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-primary">
                          {value.translation}
                        </p>
                        <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="relative py-16 sm:py-24">
            <MainContainer className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="eyebrow-label">Ecosystem logic</span>
                <h2 className="section-title mt-4">More than events: a pathway students can use.</h2>
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
          <section className="editorial-warm-band relative z-10 py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="max-w-2xl">
                <span className="eyebrow-label">Leadership</span>
                <h2 className="section-title mt-4">Built by students, professionals, volunteers, and chapter leaders.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  These are some of the people carrying the work forward. LEAD
                  is bigger than one page: chapter leaders, volunteers, mentors,
                  and students across the region build the momentum.
                </p>
              </div>
              <div className="mt-10 grid auto-cols-[minmax(17rem,78vw)] grid-flow-col gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:auto-cols-[minmax(19rem,45vw)] lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:pb-0">
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

        <PublicRouteChooser
          title="Take the next step with LEAD."
          description="Join the community, submit chapter interest, or start a partnership conversation."
        />
      </div>
    </div>
  );
}

const aboutProofMoments = [
  {
    eyebrow: "Chapters",
    title: "Students make LEAD local.",
    description:
      "Chapter leaders turn leadership into repeated practice, belonging, and visible campus momentum.",
    image: "/chapters/chapter-1.jpg",
  },
  {
    eyebrow: "Programs",
    title: "Experiences make opportunity concrete.",
    description:
      "Workshops, visits, and summits help students see the rooms, tools, and standards around them.",
    image: "/about-us/3.jpg",
  },
];

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
