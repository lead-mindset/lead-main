import Image from "next/image";

import { MainContainer } from "@/components/global/main-container";

type PartnerLogo = {
  name: string;
  src: string;
};

export function PartnerLogoMarquee({ logos }: { logos: PartnerLogo[] }) {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section id="partners" className="relative scroll-mt-24 overflow-hidden py-10 sm:py-12">
      <MainContainer className="relative z-10">
        <p className="text-overline font-sans font-bold uppercase text-primary">
          Orgs that support us
        </p>

        <div
          role="region"
          aria-label="Organizations that support LEAD"
          tabIndex={0}
          className="lead-marquee-window mt-6 overflow-x-auto rounded-2xl border border-foreground/10 bg-card/35 py-5 shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:overflow-hidden"
        >
          <div className="lead-logo-marquee flex w-max items-center gap-6 px-5">
            {marqueeLogos.map((logo, index) => {
              const isDuplicate = index >= logos.length;

              return (
                <div
                  key={`${logo.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex h-14 w-40 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/90 px-5 shadow-[0_12px_34px_color-mix(in_oklch,black_16%,transparent)]"
                >
                  <Image
                    src={logo.src}
                    alt={isDuplicate ? "" : logo.name}
                    width={150}
                    height={52}
                    loading="eager"
                    unoptimized
                    className="h-auto max-h-10 w-auto object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
