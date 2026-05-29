import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { GetInvolvedRocketHero } from "@/components/public/get-involved-rocket-hero";
import { InterestForm } from "@/components/public/interest-form";
import {
  publicInterestDialogCloseClass,
  publicInterestDialogContentClass,
  publicInterestDialogHeaderClass,
} from "@/components/public/interest-dialog-styles";
import { PartnerPathSelector } from "@/components/public/partner-path-selector";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { SectionReveal } from "@/components/public/section-reveal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { publicCtas } from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function GetInvolvedPage() {
  return (
    <div className="lead-public-page relative isolate overflow-hidden text-foreground">
      <div className="relative z-10">
        <SectionReveal>
          <section className="get-involved-hero relative isolate min-h-[100svh] overflow-hidden pt-28">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,rgba(122,87,209,0.16),transparent_34rem),radial-gradient(circle_at_62%_20%,rgba(229,62,62,0.08),transparent_30rem)]" />
            <GetInvolvedRocketHero />
            <MainContainer className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center py-14">
              <div className="max-w-[54rem] lg:max-w-[48rem]">
                <p className="eyebrow-label">Get involved</p>
                <h1 className="display-title mt-5 max-w-3xl">
                  Choose your path into LEAD.
                </h1>
                <p className="section-subtitle mt-5 max-w-xl text-muted-foreground">
                  Start with the path that fits today. LEAD helps students,
                  campus builders, partners, and community organizations turn
                  interest into action.
                </p>
                <p
                  data-lead-motion="text"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/55 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur"
                >
                  Scroll to the path that matches you.
                  <ArrowRight className="size-4 rotate-90 text-primary" />
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
              <p className="media-caption-title absolute bottom-5 left-5 right-5 max-w-xl text-white">
                Join the community. Build confidence. Find the next step.
              </p>
            </div>

            <div>
              <p className="eyebrow-label">Student path</p>
              <h2 className="section-title mt-3">
                Join the community and enter the Talent Platform.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                Joining LEAD gives students a clear starting point: create a
                profile, connect with the community, explore programs, and keep
                track of opportunities as they grow.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Create profile", "Find community", "Explore programs"].map((step, index) => (
                  <div
                    key={step}
                    data-lead-motion="card"
                    className="rounded-xl border border-border/65 bg-white/[0.025] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <p className="text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="hero">
                  <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>
                    Join LEAD
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass">
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
              <p className="eyebrow-label">Chapter interest</p>
              <h2 className="section-title mt-3">
                Want to bring LEAD to your campus?
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
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
              className="rounded-2xl border border-border/70 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6"
            >
              <p className="card-eyebrow">What to include</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {["University", "Student team", "Why LEAD matters"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl bg-background/40 p-4 ring-1 ring-border/60"
                  >
                    <p className="text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-snug text-foreground">
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
                className="partner-media-panel relative overflow-hidden rounded-xl border border-border shadow-[inset_0_1px_0_color-mix(in_oklab,white_9%,transparent)]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(8,13,59,0.12), rgba(8,13,59,0.88)), url('/media/lead/highlights/ibm-explore-day-speakers.webp')",
                }}
              >
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="media-caption-title max-w-xl text-white">
                    Partnerships should make opportunity feel closer, clearer, and real.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/78">
                    One clear role, one useful contribution, and a student-facing result.
                  </p>
                  <div className="mt-5">
                    <PartnerInterestDialog />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-2">
              <p className="eyebrow-label">Partners and collaborators</p>
              <h2 className="section-title mt-3">
                Create access with students who are already moving.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                Companies, mentors, professionals, and community organizations
                can support LEAD through exposure, programs, mentorship,
                sponsorship, and aligned community work.
              </p>

              <PartnerPathSelector />
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <PublicRouteChooser
          title="Still deciding? Choose one clear next step."
          description="Join as a student, request chapter review, or start a partner conversation. LEAD can guide the next move from there."
        />
      </SectionReveal>
      </div>
    </div>
  );
}

function ChapterInterestDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" variant="hero">Submit chapter interest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={publicInterestDialogContentClass}>
        <AlertDialogCancel
          variant="ghost"
          aria-label="Close chapter interest form"
          className={publicInterestDialogCloseClass}
        >
          <X className="size-4" />
        </AlertDialogCancel>
        <AlertDialogHeader className={publicInterestDialogHeaderClass}>
          <AlertDialogTitle>Request chapter interest</AlertDialogTitle>
          <AlertDialogDescription>
            Tell us where you are, who is building with you, and why LEAD would
            matter on your campus. This is a request for review, not chapter
            approval.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InterestForm
          kind="chapter_interest"
          defaultOpen
          showToggle={false}
          showHeader={false}
          className="border-0 bg-transparent p-0 shadow-none"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PartnerInterestDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" variant="hero">Start a partnership conversation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={publicInterestDialogContentClass}>
        <AlertDialogCancel
          variant="ghost"
          aria-label="Close partnership form"
          className={publicInterestDialogCloseClass}
        >
          <X className="size-4" />
        </AlertDialogCancel>
        <AlertDialogHeader className={publicInterestDialogHeaderClass}>
          <AlertDialogTitle className="max-w-[28rem]">Partner or collaborate with LEAD</AlertDialogTitle>
          <AlertDialogDescription>
            Share what you want to build with students as a company, mentor,
            professional, sponsor, or community organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InterestForm
          kind="partnership"
          defaultOpen
          showToggle={false}
          showHeader={false}
          className="border-0 bg-transparent p-0 shadow-none"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
