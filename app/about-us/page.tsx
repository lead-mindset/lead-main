import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import {
  AboutPillarsBridge,
  AboutPillarsWheel,
} from "@/components/public/about-pillars-wheel";
import { AboutValuesSection } from "@/components/public/about-values-section";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { SectionReveal } from "@/components/public/section-reveal";
import { Button } from "@/components/ui/button";
import {
  communityMoments,
  leadership,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

const founderNames = new Set(["Luis Coronel", "Antonny Porlles"]);
const teamRoster = [
  ...leadership.filter((person) => founderNames.has(person.name)),
  ...leadership.filter((person) => !founderNames.has(person.name)),
];

export default function AboutPage() {
  return (
    <div className="lead-public-page relative isolate overflow-x-clip text-foreground">
      <SectionReveal>
        <section className="relative z-10 editorial-photo-hero pt-28">
          <Image
            src="/media/lead/about/community-at-ibm.webp"
            alt="LEAD students gathered at IBM Explore Day"
            fill
            priority
            className="absolute inset-0 -z-10 object-cover"
          />
          <MainContainer className="relative z-10 flex min-h-[calc(88dvh-7rem)] items-end py-16">
            <div className="relative max-w-3xl before:absolute before:-inset-x-8 before:-inset-y-6 before:-z-10 before:bg-gradient-to-r before:from-background/80 before:via-background/55 before:to-transparent before:blur-2xl">
              <span className="text-overline font-sans font-bold uppercase text-primary">About LEAD</span>
              <h1 className="text-display font-display font-bold mt-6">Talent is already here. Access should be too.</h1>
              <p className="text-body-lg font-sans mt-6 text-muted-foreground">
                LEAD exists because students across the Americas already carry
                ambition, creativity, and talent. LEAD helps turn that talent
                into access, leadership practice, community, and opportunity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={publicCtas.involved} {...externalProps(publicCtas.involved)}>Get involved</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={publicCtas.chapter}>Submit chapter interest</Link>
                </Button>
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <div className="relative z-10">
        <SectionReveal className="relative z-10">
          <section className="relative py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="grid border-y border-border/80 lg:grid-cols-2">
                <div className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:pr-10">
                  <span className="text-overline font-sans font-bold uppercase text-primary">Mission</span>
                  <h2 className="text-h1 font-display font-semibold mt-4">Empower the next generation of leaders.</h2>
                  <p className="text-body font-sans mt-4 text-muted-foreground">
                    LEAD empowers students across the Americas through STEM
                    education, leadership development, mentorship, and
                    community.
                  </p>
                </div>
                <div className="py-8 lg:pl-10">
                  <span className="text-overline font-sans font-bold uppercase text-primary">Vision</span>
                  <h2 className="text-h1 font-display font-semibold mt-4">Build a visible network of student leadership.</h2>
                  <p className="text-body font-sans mt-4 text-muted-foreground">
                    LEAD works toward a future where students in the Americas are
                    recognized for technology, leadership, innovation, and the
                    impact they create in their communities.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {communityMoments.map((moment) => (
                  <figure
                    key={moment.title}
                    className="relative min-h-[17rem] overflow-hidden rounded-2xl border border-border bg-card sm:min-h-[20rem]"
                  >
                    <video
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={moment.image}
                      disablePictureInPicture
                      tabIndex={-1}
                    >
                      <source src={moment.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/28 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-h3 font-display font-semibold text-foreground">
                        {moment.title}
                      </p>
                      <p className="mt-2 text-small leading-6 text-foreground/74">
                        {moment.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>



        <AboutValuesSection />

        <AboutPillarsBridge />

        <AboutPillarsWheel />

        <SectionReveal className="relative z-10">
          <section id="team" className="editorial-warm-band relative z-10 scroll-mt-28 py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="grid gap-8 border-y border-border/80 py-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                <div>
                  <span className="text-overline font-sans font-bold uppercase text-primary">Team</span>
                  <h2 className="text-h1 font-display font-semibold mt-4">Our Team</h2>
                </div>
                <p className="max-w-2xl text-body leading-7 text-muted-foreground sm:text-body-lg sm:leading-8 lg:justify-self-end">
                  A student-first operating team across technology, programs,
                  operations, legal, marketing, chapters, and community.
                </p>
              </div>

              <div
                role="list"
                aria-label="LEAD team"
                className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5"
              >
                {teamRoster.map((person) => {
                  const isFounder = founderNames.has(person.name);

                  return (
                    <article
                      key={person.name}
                      role="listitem"
                        className={[
                          "relative flex min-h-24 items-center gap-3 rounded-xl border p-3 shadow-[inset_0_1px_0_color-mix(in_oklch,white_4.5%,transparent)] sm:min-h-[7.4rem] sm:gap-4 sm:p-4",
                          isFounder
                            ? "border-primary/28 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--brand-red)_5.5%,transparent),color-mix(in_oklch,var(--brand-rose)_4.5%,transparent)_48%,color-mix(in_oklch,var(--primary)_5.5%,transparent))]"
                            : "border-foreground/[0.08] bg-foreground/[0.025]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "relative shrink-0 rounded-full bg-gradient-to-br from-brand-red via-brand-rose to-primary p-[2px] shadow-[0_18px_42px_color-mix(in_oklch,black_18%,transparent)]",
                            isFounder ? "size-[4.25rem] sm:size-[5.05rem]" : "size-[3.9rem] sm:size-[4.65rem]",
                          ].join(" ")}
                        >
                        <div className="size-full overflow-hidden rounded-full bg-card">
                          <Image
                            src={person.image}
                            alt={person.name}
                            width={104}
                            height={104}
                            sizes="(min-width: 1024px) 81px, 74px"
                            loading="eager"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-body font-bold leading-tight text-foreground sm:text-body-lg">
                          {person.name}
                        </h3>
                        <p className="mt-1 max-w-[14rem] text-caption font-semibold leading-snug text-muted-foreground sm:text-small">
                          {person.role}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal>
          <PublicRouteChooser
            title="Take the next step with LEAD."
            description="Join the community, submit chapter interest, or start a partnership conversation."
          />
        </SectionReveal>
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
