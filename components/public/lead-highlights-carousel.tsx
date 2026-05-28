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
          <p className="eyebrow-label">
            LEAD highlights
          </p>
          <h2 className="section-title mt-4">
            Real moments from a community in motion.
          </h2>
          <p className="body-copy mt-4 text-muted-foreground">
            Events, chapters, workshops, and student stories show how LEAD turns
            access into belonging, practice, and proof.
          </p>
        </div>
      </MainContainer>

      <MainContainer>
        <div className="mt-10 overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-hidden md:pb-0">
          <div className="lead-highlights-track flex w-max snap-x snap-mandatory gap-4 sm:gap-5">
            {carouselHighlights.map((highlight, index) => {
              const isDuplicate = index >= highlights.length;

              return (
                <article
                  key={`${highlight.title}-${index}`}
                  aria-hidden={isDuplicate}
                  className="group relative h-[24rem] w-[82vw] max-w-[21rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:h-[28rem] sm:w-[24rem] sm:max-w-none"
                >
                  <Image
                    src={highlight.image}
                    alt={isDuplicate ? "" : highlight.title}
                    fill
                    sizes="(min-width: 640px) 24rem, 20rem"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/48 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="card-eyebrow">
                      {highlight.pillar}
                    </p>
                    <h3 className="card-title mt-3 text-white">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/76">
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
