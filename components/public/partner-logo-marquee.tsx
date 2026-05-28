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
        <p className="eyebrow-label">
          Orgs that support us
        </p>

        <div className="lead-marquee-window mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-card/35 py-5 shadow-[inset_0_1px_0_color-mix(in_oklab,white_8%,transparent)] [scrollbar-width:none] md:overflow-hidden">
          <div className="lead-logo-marquee flex w-max items-center gap-6 px-5">
            {marqueeLogos.map((logo, index) => {
              const isDuplicate = index >= logos.length;

              return (
                <div
                  key={`${logo.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex h-14 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/90 px-5 shadow-[0_12px_34px_rgba(0,0,0,0.16)]"
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
      </MainContainer>
    </section>
  );
}
