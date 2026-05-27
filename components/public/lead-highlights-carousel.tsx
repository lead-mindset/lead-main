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
    <section id="highlights" className="relative -mt-20 scroll-mt-24 overflow-hidden pb-20 pt-40 sm:-mt-24 sm:pb-24 sm:pt-48">
      <MainContainer>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">
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

      <div className="mt-10 overflow-hidden">
        <div className="lead-highlights-track flex w-max gap-5 px-4 sm:px-6 lg:px-8">
          {carouselHighlights.map((highlight, index) => (
            <article
              key={`${highlight.title}-${index}`}
              className="group relative h-[28rem] w-[20rem] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:w-[24rem]"
            >
              <Image
                src={highlight.image}
                alt={highlight.title}
                fill
                sizes="(min-width: 640px) 24rem, 20rem"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/48 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-bold uppercase text-primary">
                  {highlight.pillar}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight text-white">
                  {highlight.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/76">
                  {highlight.why}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
