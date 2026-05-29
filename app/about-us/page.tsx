import Image from "next/image";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { SectionReveal } from "@/components/public/section-reveal";
import { Button } from "@/components/ui/button";
import {
  communityMoments,
  leadership,
  publicCtas,
} from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

export default function AboutPage() {
  return (
    <div className="lead-public-page relative isolate overflow-hidden text-foreground">
      <SectionReveal>
        <section className="relative z-10 editorial-photo-hero pt-28">
          <Image
            src="/media/lead/about/community-at-ibm.webp"
            alt="LEAD students gathered at IBM Explore Day"
            fill
            priority
            className="absolute inset-0 -z-10 object-cover"
          />
          <MainContainer className="relative z-10 flex min-h-[calc(88dvh-7rem)] items-end py-16">
            <div className="relative max-w-3xl before:absolute before:-inset-x-8 before:-inset-y-6 before:-z-10 before:bg-gradient-to-r before:from-background/80 before:via-background/55 before:to-transparent before:blur-2xl">
              <span className="eyebrow-label">About LEAD</span>
              <h1 className="display-title mt-6">Talent is already here. Access should be too.</h1>
              <p className="section-subtitle mt-6 text-muted-foreground">
                LEAD exists because students across Latin America, the United
                States, and the Americas already carry ambition, creativity, and
                talent. LEAD helps turn that talent into access, leadership
                practice, community, and opportunity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>Join LEAD</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={publicCtas.chapter}>Submit Chapter Interest</Link>
                </Button>
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <div className="relative z-10">
        <SectionReveal className="relative z-10">
          <section className="relative py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="grid border-y border-border/80 lg:grid-cols-2">
                <div className="border-b border-border/70 py-8 lg:border-b-0 lg:border-r lg:pr-10">
                  <span className="eyebrow-label">Mission</span>
                  <h2 className="section-title mt-4">Empower the next generation of leaders.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD empowers students across Latin America, the United
                    States, and the Americas through STEM education, leadership
                    development, mentorship, and community.
                  </p>
                </div>
                <div className="py-8 lg:pl-10">
                  <span className="eyebrow-label">Vision</span>
                  <h2 className="section-title mt-4">Build a visible network of student leadership.</h2>
                  <p className="body-copy mt-4 text-muted-foreground">
                    LEAD works toward a future where students in the Americas are
                    recognized for technology, leadership, innovation, and the
                    impact they create in their communities.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {communityMoments.map((moment) => (
                  <figure
                    key={moment.title}
                    className="group relative min-h-[17rem] overflow-hidden rounded-2xl border border-border bg-card sm:min-h-[20rem]"
                  >
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/28 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <p className="media-caption-title text-white">
                        {moment.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/74">
                        {moment.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="relative py-16 sm:py-24">
            <MainContainer className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="eyebrow-label">Ecosystem logic</span>
                <h2 className="section-title mt-4">More than events: a pathway students can use.</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  Events matter when they create value. LEAD connects events to a
                  larger system: chapters, mentorship, practical projects,
                  leadership practice, partner exposure, feedback, and a Talent
                  Platform that helps students move from potential to proof.
                </p>
              </div>
              <ol className="border-y border-border/80">
                {[
                  "Chapters are leadership development environments, not administrative units.",
                  "Partnerships connect students to industry standards and opportunity.",
                  "Pulse feedback helps LEAD listen, improve, and protect culture.",
                  "The Talent Platform is the operational layer, not the whole LEAD identity.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-4 border-b border-border/70 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="body-copy text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal className="relative z-10">
          <section className="editorial-warm-band relative z-10 py-16 sm:py-24">
            <MainContainer className="relative z-10">
              <div className="max-w-2xl">
                <span className="eyebrow-label">Team</span>
                <h2 className="section-title mt-4 text-primary">Our Team</h2>
                <p className="body-copy mt-4 text-muted-foreground">
                  At LEAD, we are a team united by a single mission: to empower
                  the next generation of leaders. From tech experts to student
                  mentors, we bring passion, creativity, and real-world
                  experience to every program, workshop, and event. Together, we
                  inspire, educate, and connect students, helping them unlock
                  their potential and make an impact in their communities.
                </p>
              </div>
              <div
                role="region"
                aria-label="LEAD team"
                tabIndex={0}
                className="mt-10 grid gap-x-8 gap-y-7 outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10"
              >
                {leadership.map((person) => (
                  <article
                    key={person.name}
                    className="grid grid-cols-[auto_1fr] items-center gap-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/80 bg-card shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="5rem"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="card-title text-base leading-tight text-foreground">{person.name}</h3>
                      <p className="mt-1 text-xs font-semibold leading-tight text-muted-foreground sm:text-sm">{person.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </MainContainer>
          </section>
        </SectionReveal>

        <SectionReveal>
          <PublicRouteChooser
            title="Take the next step with LEAD."
            description="Join the community, submit chapter interest, or start a partnership conversation."
          />
        </SectionReveal>
      </div>
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
