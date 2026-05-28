import { ChapterLaunchSection } from "@/components/public/chapter-launch-section";
import { LeadHighlightsCarousel } from "@/components/public/lead-highlights-carousel";
import { LeadPathway } from "@/components/public/lead-pathway";
import { PartnerLogoMarquee } from "@/components/public/partner-logo-marquee";
import { ProgramsVideoCarousel } from "@/components/public/programs-video-carousel";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { RegionalEarthStage } from "@/components/public/regional-earth-stage";
import { BrandScrollTrace } from "@/components/public/brand-scroll-trace";
import { SectionReveal } from "@/components/public/section-reveal";
import { StarfieldImpactCounters } from "@/components/public/starfield-impact-counters";
import { VideoHero } from "@/components/public/video-hero";
import {
  impactHighlights,
  partnerLogos,
  pathwayStages,
  programs,
  proofStats,
  publicCtas,
} from "@/lib/public-site/content";

export default function HomePage() {
  return (
    <div className="lead-public-page relative isolate overflow-x-clip text-foreground">
      <BrandScrollTrace suppressWithin="#pathway" />
      <div className="relative z-10">
        <VideoHero
          videoSrc="/media/lead/hero/lead-community-hero.mp4"
          posterSrc="/media/lead/hero/lead-community-hero.webp"
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

        <PublicRouteChooser />
      </div>
    </div>
  );
}
