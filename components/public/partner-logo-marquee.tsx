import Image from "next/image";

import { MainContainer } from "@/components/global/main-container";

type PartnerLogo = {
  name: string;
  src: string;
};

export function PartnerLogoMarquee({ logos }: { logos: PartnerLogo[] }) {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section id="partners" className="scroll-mt-24 bg-[#f4f1ff] py-14 text-[#080d3b] sm:py-16">
      <MainContainer>
        <div className="grid gap-6 lg:grid-cols-[0.52fr_1.48fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#7a57d1]">
              Partners and allies
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
              Organizations that support LEAD.
            </h2>
          </div>

          <div className="overflow-hidden border-y border-[#080d3b]/12 py-5">
            <div className="lead-logo-marquee flex w-max items-center gap-8">
              {marqueeLogos.map((logo, index) => {
                const isDuplicate = index >= logos.length;

                return (
                <div
                  key={`${logo.name}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-[#080d3b]/10 bg-white/78 px-5 shadow-sm"
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
