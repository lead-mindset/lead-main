import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { GetInvolvedRocketHero } from "@/components/public/get-involved-rocket-hero";
import { PartnerPathsList } from "@/components/public/partner-paths-list";
import {
  ChapterInterestDialog,
  PartnerInterestDialog,
} from "@/components/public/public-interest-dialog";
import { SectionReveal } from "@/components/public/section-reveal";
import { Button } from "@/components/ui/button";
import { publicCtas } from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function GetInvolvedPage() {
  return (
    <div className="lead-public-page relative isolate overflow-hidden text-foreground">
      <div className="relative z-10">
        <SectionReveal>
          <section className="get-involved-hero relative isolate min-h-[100svh] overflow-hidden pt-28">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_34rem),radial-gradient(circle_at_62%_20%,color-mix(in_oklch,var(--brand-red)_8%,transparent),transparent_30rem)]" />
            <GetInvolvedRocketHero />
            <MainContainer className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center py-14">
              <div className="max-w-[54rem] lg:max-w-[48rem]">
                <p className="text-overline font-sans font-bold uppercase text-primary">Get involved</p>
                <h1 className="text-display font-display font-bold mt-5 max-w-3xl">
                  Choose your path into LEAD.
                </h1>
                <p className="text-body-lg font-sans mt-5 max-w-xl text-muted-foreground">
                  Start with the path that fits today. LEAD helps students,
                  campus builders, partners, and community organizations turn
                  interest into action.
                </p>
                <p
                  data-lead-motion="text"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/55 px-4 py-2 text-small font-semibold text-muted-foreground backdrop-blur"
                >
                  Students, chapters, partners, community.
                  <ArrowRight className="size-4 text-primary" />
                </p>
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

      <SectionReveal>
        <section id="students" className="scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card">
              <video
                aria-hidden="true"
                className="aspect-[16/10] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/lead/hero/lead-community-hero.webp"
              >
                <source src="/media/lead/hero/lead-community-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
                  <p className="text-h3 font-display font-semibold absolute bottom-5 left-5 right-5 max-w-xl text-foreground">
                    Join the community. Build confidence. Find the next step.
                  </p>
            </div>

            <div>
              <p className="text-overline font-sans font-bold uppercase text-primary">Student path</p>
              <h2 className="text-h1 font-display font-semibold mt-3">
                Join the community and enter the Talent Platform.
              </h2>
              <p className="text-body font-sans mt-4 max-w-2xl text-muted-foreground">
                Joining LEAD gives students a clear starting point: create a
                profile, connect with the community, explore programs, and keep
                track of opportunities as they grow.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Create profile", "Find community", "Explore programs"].map((step, index) => (
                  <div
                    key={step}
                    data-lead-motion="card"
                    className="rounded-xl border border-border/65 bg-foreground/[0.025] px-4 py-4 shadow-[inset_0_1px_0_color-mix(in_oklch,white_4%,transparent)]"
                  >
                    <p className="text-caption font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-2 text-small font-semibold text-foreground">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>
                    Join LEAD
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#programs">View programs</Link>
                </Button>
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="chapters" className="relative scroll-mt-24 py-12 sm:py-16">
          <MainContainer className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-overline font-sans font-bold uppercase text-primary">University chapters</p>
              <h2 className="text-h1 font-display font-semibold mt-3">
                Want to bring LEAD to your university?
              </h2>
              <p className="text-body font-sans mt-4 max-w-2xl text-muted-foreground">
                Tell us your university, who is helping lead, and why LEAD
                would matter there. Submitting interest starts a review
                conversation; it does not guarantee a chapter.
              </p>
              <div className="mt-7">
                <ChapterInterestDialog />
              </div>
            </div>

            <div
              data-lead-motion="card"
              className="rounded-2xl border border-border/70 bg-foreground/[0.025] p-5 shadow-[inset_0_1px_0_color-mix(in_oklch,white_4%,transparent)] sm:p-6"
            >
              <p className="text-small font-sans font-bold uppercase text-primary">What to include</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {["University", "Student team", "Why LEAD matters"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl bg-background/40 p-4 ring-1 ring-border/60"
                  >
                    <p className="text-caption font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-small font-bold leading-snug text-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Keep it simple. The form is only the first step.
              </p>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="partners" className="scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="order-1 lg:order-1">
              <div
                className="partner-media-panel relative overflow-hidden rounded-xl border border-border shadow-[inset_0_1px_0_color-mix(in_oklch,white_9%,transparent)]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, color-mix(in_oklch,var(--background)_12%,transparent), color-mix(in_oklch,var(--background)_88%,transparent)), url('/media/lead/highlights/ibm-explore-day-speakers.webp')",
                }}
              >
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-h3 font-display font-semibold max-w-xl text-foreground">
                    Bring students closer to real opportunity.
                  </p>
                  <p className="mt-3 text-small leading-6 text-foreground/78">
                    Start with one useful contribution and a clear student outcome.
                  </p>
                  <div className="mt-5">
                    <PartnerInterestDialog />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-2">
              <p className="text-overline font-sans font-bold uppercase text-primary">Partner with LEAD</p>
              <h2 className="text-h1 font-display font-semibold mt-3">
                Choose how you can help.
              </h2>
              <p className="text-body font-sans mt-4 max-w-2xl text-muted-foreground">
                Companies, mentors, and community organizations can open doors
                through one focused path.
              </p>

              <PartnerPathsList />
            </div>
          </MainContainer>
        </section>
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
