import Image from "next/image";

import { MainContainer } from "@/components/global/main-container";

type PartnerLogo = {
  name: string;
  src: string;
};

export function PartnerLogoMarquee({ logos }: { logos: PartnerLogo[] }) {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section id="partners" className="lead-soft-inverse-surface relative scroll-mt-24 overflow-hidden border-y border-primary/15 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/42 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/28 to-transparent" />
      <MainContainer className="relative z-10">
        <div className="grid gap-6 lg:grid-cols-[0.52fr_1.48fr] lg:items-center">
          <div>
            <p className="eyebrow-label eyebrow-label--inverse">
              Partners and allies
            </p>
            <h2 className="section-title mt-3">
              Organizations that support LEAD.
            </h2>
          </div>

          <div className="lead-marquee-window overflow-hidden border-y border-[var(--brand-background)]/10 py-5">
            <div className="lead-logo-marquee flex w-max items-center gap-8">
              {marqueeLogos.map((logo, index) => {
                const isDuplicate = index >= logos.length;

                return (
                <div
                  key={`${logo.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-background)]/10 bg-white/72 px-5 shadow-[0_12px_34px_rgba(8,13,59,0.08)] backdrop-blur"
                >
                  <Image
                    src={logo.src}
                    alt={isDuplicate ? "" : logo.name}
                    width={150}
                    height={52}
                    className="h-auto max-h-10 w-auto object-contain"
                  />
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
