import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Rocket,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { BrandScrollTrace } from "@/components/public/brand-scroll-trace";
import { GetInvolvedRocketHero } from "@/components/public/get-involved-rocket-hero";
import { InterestForm } from "@/components/public/interest-form";
import { PartnerPathSelector } from "@/components/public/partner-path-selector";
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
    media: "/media/lead/hero/lead-community-hero.webp",
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
    media: "/media/lead/get-involved/campus-lead-games.webp",
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
    media: "/media/lead/get-involved/partner-ibm-team.webp",
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
    media: "/media/lead/get-involved/community-little-einsteins-classroom.webp",
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

export default function GetInvolvedPage() {
  return (
    <div className="lead-public-page relative isolate overflow-hidden text-foreground">
      <BrandScrollTrace />
      <div className="relative z-10">
      <section className="get-involved-hero relative isolate min-h-[100svh] overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_28%,rgba(122,87,209,0.16),transparent_34rem),radial-gradient(circle_at_62%_20%,rgba(229,62,62,0.08),transparent_30rem)]" />
        <GetInvolvedRocketHero />
        <MainContainer className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center py-14">
          <div className="max-w-[54rem] lg:max-w-[57rem]">
            <p className="eyebrow-label">Get involved</p>
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
        <section id="roles" className="relative scroll-mt-24 py-8 sm:py-10">
          <MainContainer>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow-label">Start here</p>
                <h2 className="section-title mt-3">Pick the role that fits you.</h2>
              </div>
              <p className="body-copy max-w-xl text-muted-foreground">
                Choose a starting point, then move into the deeper section that
                matches your role.
              </p>
            </div>

            <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                poster="/media/lead/hero/lead-community-hero.webp"
              >
                <source src="/media/lead/hero/lead-community-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
              <p className="media-caption-title absolute bottom-5 left-5 right-5 max-w-xl text-white">
                Join the community. Build confidence. Find the next step.
              </p>
            </div>

            <div>
              <p className="eyebrow-label">Student path</p>
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
        <section id="chapters" className="relative scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="eyebrow-label">Chapter interest</p>
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
                  <h3 className="card-title mt-4 text-foreground">{value.title}</h3>
                  <p className="card-eyebrow mt-1">{value.translation}</p>
                  <p className="body-copy mt-4 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="partners" className="scroll-mt-24 py-14 sm:py-20">
          <MainContainer className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="order-2 lg:order-1">
              <div
                className="partner-media-panel relative overflow-hidden rounded-xl border border-border shadow-[inset_0_1px_0_color-mix(in_oklab,white_9%,transparent)]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(8,13,59,0.12), rgba(8,13,59,0.88)), url('/media/lead/highlights/ibm-explore-day-speakers.webp')",
                }}
              >
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="media-caption-title max-w-xl text-white">
                    Partnerships should make opportunity feel closer, clearer, and real.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/78">
                    One clear role, one useful contribution, and a student-facing result.
                  </p>
                  <div className="mt-5">
                    <PartnerInterestDialog />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="eyebrow-label">Partners and collaborators</p>
              <h2 className="section-title mt-3">
                Create access with students who are already moving.
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-muted-foreground">
                Companies, mentors, professionals, and community organizations
                can support LEAD through exposure, programs, mentorship,
                sponsorship, and aligned community work.
              </p>

              <PartnerPathSelector />
            </div>
          </MainContainer>
        </section>
      </SectionReveal>

      <PublicRouteChooser
        title="Ready to choose your next step?"
        description="Start with the role that fits today. LEAD can guide the next step from there."
      />
      </div>
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
      className="role-path-card group flex h-full flex-row overflow-hidden rounded-xl border border-border bg-background/66 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
    >
      <div className="role-card-media relative shrink-0 overflow-hidden">
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
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-background/72 px-2.5 py-1 text-[0.68rem] font-bold text-white backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <span className="hidden size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 sm:flex">
            <Icon className="size-4" />
          </span>
          <p className="card-eyebrow">{path.eyebrow}</p>
        </div>
        <h3 className="mt-2 font-headline text-base font-bold leading-tight text-foreground sm:mt-4 sm:text-lg">{path.label}</h3>
        <p className="role-card-description mt-2 flex-1 text-sm leading-6 text-muted-foreground">{path.description}</p>
        <span className="mt-3 inline-flex min-h-8 items-center gap-2 text-sm font-bold text-primary sm:mt-4 sm:min-h-9">
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
        <Button size="lg" variant="hero">Submit chapter interest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[88dvh] !max-w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl">
        <AlertDialogCancel
          aria-label="Close chapter interest form"
          className="absolute right-4 top-4 size-8 p-0"
        >
          <X className="size-4" />
        </AlertDialogCancel>
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
          stickyFooter
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
        <AlertDialogCancel
          aria-label="Close partnership form"
          className="absolute right-4 top-4 size-8 p-0"
        >
          <X className="size-4" />
        </AlertDialogCancel>
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
          stickyFooter
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
