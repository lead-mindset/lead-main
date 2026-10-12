import Image from "next/image";

import { MainContainer } from "@/components/global/main-container";

type Highlight = {
  title: string;
  what: string;
  served: string;
  why: string;
  pillar: string;
  image: string;
};

export function LeadHighlightsCarousel({ highlights }: { highlights: Highlight[] }) {
  const carouselHighlights = [...highlights, ...highlights];

  return (
    <section id="highlights" className="relative scroll-mt-24 overflow-hidden pb-14 pt-20 sm:pb-24 sm:pt-28">
      <MainContainer>
        <div className="max-w-3xl">
          <p className="text-overline font-sans font-bold uppercase text-primary">
            LEAD highlights
          </p>
          <h2 className="text-h1 font-display font-semibold mt-4">
            Real moments from a community in motion.
          </h2>
          <p className="text-body font-sans mt-4 text-muted-foreground">
            Events, chapters, workshops, and student stories show how LEAD turns
            access into belonging, practice, and proof.
          </p>
        </div>
      </MainContainer>

      <MainContainer>
        <div
          role="region"
          aria-label="LEAD highlights carousel"
          tabIndex={0}
          className="mt-10 overflow-x-auto pb-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:overflow-hidden md:pb-0"
        >
          <div className="lead-highlights-track flex w-max snap-x snap-mandatory gap-4 sm:gap-5">
            {carouselHighlights.map((highlight, index) => {
              const isDuplicate = index >= highlights.length;

              return (
                <article
                  key={`${highlight.title}-${index}`}
                  aria-hidden={isDuplicate}
                  className="relative h-[24rem] w-[82vw] max-w-[21rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_color-mix(in_oklch,black_22%,transparent)] sm:h-[28rem] sm:w-[24rem] sm:max-w-none"
                >
                  <Image
                    src={highlight.image}
                    alt={isDuplicate ? "" : highlight.title}
                    fill
                    sizes="(min-width: 640px) 24rem, 20rem"
                    loading={isDuplicate ? "lazy" : "eager"}
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/34 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-small font-sans font-bold uppercase text-primary">
                      {highlight.pillar}
                    </p>
                    <h3 className="text-h2 font-display font-semibold mt-3 text-foreground">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-small leading-6 text-foreground/76">
                      {highlight.why}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
