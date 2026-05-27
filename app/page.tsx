import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { ChapterLaunchSection } from "@/components/public/chapter-launch-section";
import { LeadHighlightsCarousel } from "@/components/public/lead-highlights-carousel";
import { LeadPathway } from "@/components/public/lead-pathway";
import { PartnerLogoMarquee } from "@/components/public/partner-logo-marquee";
import { ProgramsVideoCarousel } from "@/components/public/programs-video-carousel";
import { RegionalEarthStage } from "@/components/public/regional-earth-stage";
import { SectionReveal } from "@/components/public/section-reveal";
import { StarfieldImpactCounters } from "@/components/public/starfield-impact-counters";
import { VideoHero } from "@/components/public/video-hero";
import {
  finalPaths,
  impactHighlights,
  partnerLogos,
  pathwayStages,
  programs,
  proofStats,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function HomePage() {
  return (
    <div className="lead-public-page relative isolate overflow-x-clip text-foreground">
      <VideoHero
        videoSrc="/video2.mp4"
        posterSrc="/about-us/2.jpg"
        primaryHref={publicCtas.pathway}
        secondaryHref={publicCtas.partner}
      />

      <StarfieldImpactCounters stats={proofStats} />

      <RegionalEarthStage />

      <LeadPathway stages={pathwayStages} />

      <SectionReveal>
        <ProgramsVideoCarousel programs={programs} />
      </SectionReveal>

      <SectionReveal>
        <ChapterLaunchSection />
      </SectionReveal>

      <SectionReveal>
        <PartnerLogoMarquee logos={partnerLogos} />
      </SectionReveal>

      <SectionReveal>
        <LeadHighlightsCarousel highlights={impactHighlights} />
      </SectionReveal>

      <section className="relative isolate overflow-hidden border-t border-border bg-[#050824] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(229,62,62,0.18),transparent_28rem),radial-gradient(circle_at_82%_34%,rgba(126,86,226,0.22),transparent_32rem)]" />
        <MainContainer>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-primary">
                Next step
              </p>
              <h2 className="section-title mt-4 max-w-xl">
                Choose how you want to enter LEAD.
              </h2>
            </div>
            <p className="body-copy max-w-2xl text-muted-foreground lg:justify-self-end">
              Start as a student, request a chapter conversation, or build with
              LEAD as a partner.
            </p>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/12 bg-card/45 lg:grid-cols-2">
            {finalPaths.map((path, index) => {
              const Icon = path.icon;
              const detail = finalPathDetails[path.label] ?? {
                description: "Continue with LEAD.",
                action: "Choose this path",
              };

              return (
                <Link
                  key={path.label}
                  href={path.href}
                  {...externalProps(path.href)}
                  className="group grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 p-5 text-foreground transition duration-300 last:border-b-0 hover:bg-primary/12 sm:grid-cols-[auto_1fr_auto] sm:items-center lg:[&:nth-child(2n+1)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="relative">
                    <span className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary transition duration-300 group-hover:border-primary/60 group-hover:bg-primary/24">
                      <Icon className="size-5" />
                    </span>
                    <span className="absolute -right-1 -top-1 rounded-full bg-background px-1.5 text-[0.65rem] font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground sm:text-xl">
                      {path.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {detail.description}
                    </p>
                  </div>
                  <span className="col-start-2 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:col-start-auto">
                    {detail.action}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
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

const finalPathDetails: Record<string, { description: string; action: string }> = {
  "Join LEAD": {
    description: "Create your profile and start finding programs, chapters, and opportunities.",
    action: "Join the community",
  },
  "Submit Chapter Interest": {
    description: "Tell us about your university and why LEAD should grow there.",
    action: "Request a chapter",
  },
  "Partner with LEAD": {
    description: "Bring mentorship, events, resources, or opportunities to students.",
    action: "Start a partnership",
  },
  "Community Collaboration": {
    description: "Build aligned STEM, leadership, or access initiatives with LEAD.",
    action: "Start collaboration",
  },
};
