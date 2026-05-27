import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { GetInvolvedRocketHero } from "@/components/public/get-involved-rocket-hero";
import { InterestForm } from "@/components/public/interest-form";
import { PublicRouteChooser } from "@/components/public/public-route-chooser";
import { SectionReveal } from "@/components/public/section-reveal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { publicCtas } from "@/lib/public-site/content";
import { isExternalHref } from "@/components/global/navigation/nav-links";

type RolePath = {
  label: string;
  eyebrow: string;
  href: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  media: string;
  mediaType: "image" | "video";
  poster?: string;
  tone: string;
};

const rolePaths: RolePath[] = [
  {
    label: "Join LEAD",
    eyebrow: "Student path",
    href: "#students",
    description: "Create your profile, find your community, and start discovering programs and opportunities.",
    cta: "Start as a student",
    icon: GraduationCap,
    media: "/about-us/2.jpg",
    mediaType: "image",
    tone: "from-[#e53e3e]/24 via-[#9f258c]/18 to-transparent",
  },
  {
    label: "Submit Chapter Interest",
    eyebrow: "Campus path",
    href: "#chapters",
    description: "Share your campus, your team, and the kind of student community you want to build.",
    cta: "Request chapter interest",
    icon: Rocket,
    media: "/chapters/chapter-1.jpg",
    mediaType: "image",
    tone: "from-[#7a57d1]/26 via-[#9f258c]/18 to-transparent",
  },
  {
    label: "Partner with LEAD",
    eyebrow: "Professional path",
    href: "#partners",
    description: "Support students through visits, mentorship, sponsorship, workshops, or industry access.",
    cta: "Explore partnership",
    icon: Handshake,
    media: "/about-us/5.jpg",
    mediaType: "image",
    tone: "from-[#7e56e2]/26 via-[#ba4e5e]/16 to-transparent",
  },
  {
    label: "Collaborate as a community organization",
    eyebrow: "Community path",
    href: "#partners",
    description: "Bring aligned STEM, leadership, or access initiatives into the LEAD ecosystem.",
    cta: "Start collaboration",
    icon: Users,
    media: "/chapters/chapter-6.jpg",
    mediaType: "image",
    tone: "from-white/18 via-[#7a57d1]/16 to-transparent",
  },
];

const chapterValues = [
  {
    title: "Mentalidad",
    translation: "Mindset",
    description: "A founding team that understands LEAD's culture and puts students first.",
  },
  {
    title: "Proposito",
    translation: "Purpose",
    description: "A clear reason for why LEAD should exist on that campus.",
  },
  {
    title: "Excelencia",
    translation: "Excellence",
    description: "Reliability, preparation, and the ability to follow through.",
  },
  {
    title: "Impacto",
    translation: "Impact",
    description: "A community that can create value beyond activity.",
  },
];

const partnerPaths = [
  {
    title: "Company",
    description: "Host visits, sponsor programs, share industry context, or support student opportunity.",
    icon: Building2,
  },
  {
    title: "Professional or mentor",
    description: "Mentor, speak, review portfolios, coach leaders, or help students understand standards.",
    icon: HeartHandshake,
  },
  {
    title: "Community organization",
    description: "Collaborate on STEM access, regional programs, community impact, or student outreach.",
    icon: Users,
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="get-involved-hero relative isolate min-h-[100svh] overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050824_0%,#080d3b_56%,#090d35_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,rgba(122,87,209,0.24),transparent_34rem),radial-gradient(circle_at_62%_20%,rgba(229,62,62,0.11),transparent_30rem)]" />
        <GetInvolvedRocketHero />
        <MainContainer className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center py-14">
          <div className="max-w-[54rem] lg:max-w-[57rem]">
            <p className="text-sm font-semibold uppercase text-primary">Get involved</p>
            <h1 className="display-title mt-5 max-w-3xl">
              Choose your path into LEAD.
            </h1>
            <p className="section-subtitle mt-5 max-w-2xl text-muted-foreground">
              Students, chapter builders, partners, and community organizations
              enter LEAD in different ways. Start with the role that matches
              where you are today.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/55 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur">
              Student, chapter, partner, and community paths below.
              <ArrowRight className="size-4 rotate-90 text-primary" />
            </p>
          </div>
        </MainContainer>
      </section>

      <SectionReveal>
        <section id="roles" className="relative scroll-mt-24 border-y border-border/80 bg-card/45 py-12 sm:py-16">
          <MainContainer>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase text-primary">Start here</p>
                <h2 className="section-title mt-3">Pick the role that fits you.</h2>
              </div>
              <p className="body-copy max-w-xl text-muted-foreground">
                Students, chapter builders, partners, and community organizations
                each have a different next step. Choose the one closest to you.
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
              {rolePaths.map((path, index) => (
                <RolePathCard key={path.label} path={path} index={index} />
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="students" className="scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card">
              <video
                aria-hidden="true"
                className="aspect-[16/10] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/about-us/2.jpg"
              >
                <source src="/video2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 max-w-xl text-xl font-bold leading-tight text-white sm:text-2xl">
                Join the community. Build confidence. Find the next step.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-primary">Student path</p>
              <h2 className="section-title mt-3">
                Join the community and enter the Talent Platform.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                Joining LEAD gives students a clear starting point: create a
                profile, connect with the community, explore programs, and keep
                track of opportunities as they grow.
              </p>
              <div className="mt-6 grid border-y border-border/80 sm:grid-cols-3">
                {["Create profile", "Find community", "Explore programs"].map((step, index) => (
                  <div
                    key={step}
                    className="border-b border-border/70 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <p className="text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="hero">
                  <Link href={publicCtas.join} {...externalProps(publicCtas.join)}>
                    Join LEAD
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass">
                  <Link href="/#programs">View programs</Link>
                </Button>
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="chapters" className="editorial-warm-band scroll-mt-24 border-y border-border/80 py-14 sm:py-20">
          <MainContainer className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-primary">Chapter interest</p>
              <h2 className="section-title mt-3">
                Bring LEAD to your campus with clarity.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                A request starts the conversation; it does not create a chapter
                automatically. LEAD looks for aligned student leadership,
                purpose, reliability, and sustainable impact.
              </p>
              <div className="mt-7">
                <ChapterInterestDialog />
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                The form is intentionally short. It is a request for review, not
                a public application checklist.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {chapterValues.map((value, index) => (
                <div
                  key={value.title}
                  className="relative overflow-hidden rounded-xl border border-border bg-background/55 p-5 shadow-sm"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-transparent" />
                  <span className="text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{value.translation}</p>
                  <p className="body-copy mt-4 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="partners" className="scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src="/about-us/5.jpg"
                alt="LEAD students and partners in a professional setting"
                width={900}
                height={640}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/8 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 max-w-xl text-xl font-bold leading-tight text-white sm:text-2xl">
                Partnerships should make opportunity feel closer, clearer, and real.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-primary">Partners and collaborators</p>
              <h2 className="section-title mt-3">
                Create access with students who are already moving.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                Companies, mentors, professionals, and community organizations
                can support LEAD through exposure, programs, mentorship,
                sponsorship, and aligned community work.
              </p>

              <div className="mt-7 grid gap-3">
                {partnerPaths.map((path) => {
                  const Icon = path.icon;

                  return (
                    <div
                      key={path.title}
                      className="grid grid-cols-[3rem_1fr] gap-4 rounded-xl border border-border bg-card/75 p-4 transition-colors hover:border-primary/45"
                    >
                      <span className="flex size-12 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{path.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{path.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7">
                <PartnerInterestDialog />
              </div>
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <PublicRouteChooser
        title="Ready to choose your next step?"
        description="Start with the role that fits today. LEAD can guide the next step from there."
      />
    </div>
  );
}

function RolePathCard({ path, index }: { path: RolePath; index: number }) {
  const Icon = path.icon;
  const shouldAutoplayVideo = path.mediaType === "video" && index === 0;

  return (
    <Link
      href={path.href}
      aria-label={`${path.label}: ${path.cta}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {path.mediaType === "video" ? (
          <video
            aria-hidden="true"
            className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
            autoPlay={shouldAutoplayVideo}
            muted
            loop
            playsInline
            preload="metadata"
            poster={path.poster}
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src={path.media} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={path.media}
            alt=""
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 768px) 48vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${path.tone}`} />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/72 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <Icon className="size-5" />
          </span>
          <p className="text-xs font-bold uppercase text-primary">{path.eyebrow}</p>
        </div>
        <h3 className="mt-5 text-2xl font-bold leading-tight text-foreground">{path.label}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{path.description}</p>
        <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary">
          {path.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function ChapterInterestDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" variant="hero">Request chapter interest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[88dvh] !max-w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl">
        <AlertDialogHeader className="items-start text-left">
          <AlertDialogTitle>Request chapter interest</AlertDialogTitle>
          <AlertDialogDescription>
            Tell us where you are, who is building with you, and why LEAD would
            matter on your campus. This is a request for review, not chapter
            approval.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InterestForm
          kind="chapter_interest"
          defaultOpen
          showToggle={false}
          showHeader={false}
          className="border-0 bg-transparent p-0 shadow-none"
        />
        <AlertDialogCancel className="w-full sm:w-fit">Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PartnerInterestDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" variant="hero">Start a partnership conversation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[88dvh] !max-w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl">
        <AlertDialogHeader className="items-start text-left">
          <AlertDialogTitle>Partner or collaborate with LEAD</AlertDialogTitle>
          <AlertDialogDescription>
            Share what you want to build with students as a company, mentor,
            professional, sponsor, or community organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InterestForm
          kind="partnership"
          defaultOpen
          showToggle={false}
          showHeader={false}
          className="border-0 bg-transparent p-0 shadow-none"
        />
        <AlertDialogCancel className="w-full sm:w-fit">Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
