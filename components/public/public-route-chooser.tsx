import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { finalPaths } from "@/lib/public-site/content";
import { cn } from "@/lib/utils";

const routeDetails: Record<
  string,
  { description: string; action: string }
> = {
  "Join LEAD": {
    description:
      "Create your profile and start finding programs, chapters, and opportunities.",
    action: "Join the community",
  },
  "Submit Chapter Interest": {
    description:
      "Tell us about your university and why LEAD should grow there.",
    action: "Submit interest",
  },
  "Partner with LEAD": {
    description:
      "Bring mentorship, events, resources, or opportunities to students.",
    action: "Start partnership",
  },
  "Community Collaboration": {
    description:
      "Build aligned STEM, leadership, or access initiatives with LEAD.",
    action: "Collaborate with LEAD",
  },
};

type PublicRouteChooserProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function PublicRouteChooser({
  eyebrow = "Next step",
  title = "Choose how you want to enter LEAD.",
  description = "Start as a student, submit chapter interest, or build with LEAD as a partner, mentor, or community organization.",
  className,
}: PublicRouteChooserProps) {
  return (
    <section
      className={cn(
        "lead-public-cta-surface relative isolate scroll-mt-28 overflow-hidden border-t border-border py-14 sm:py-20",
        className
      )}
    >
      <MainContainer>
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow-label">
              {eyebrow}
            </p>
            <h2 className="section-title mt-4 max-w-xl">{title}</h2>
          </div>
          <p className="body-copy max-w-2xl text-muted-foreground lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/16 bg-background/90 shadow-[0_18px_55px_rgba(3,7,30,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] lg:grid-cols-2">
          {finalPaths.map((path, index) => {
            const Icon = path.icon;
            const detail = routeDetails[path.label];

            return (
              <Link
                key={path.label}
                href={path.href}
                {...externalProps(path.href)}
                data-lead-motion="card"
                className="group grid min-h-32 grid-cols-[auto_1fr] gap-4 border-b border-white/12 p-5 text-foreground transition duration-300 last:border-b-0 hover:bg-primary/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6 lg:[&:nth-child(2n+1)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="relative">
                  <span className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/20 text-primary shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_30px_rgba(126,86,226,0.18)] transition duration-300 group-hover:border-primary/70 group-hover:bg-primary/28">
                    <Icon className="size-5" />
                  </span>
                  <span className="absolute -right-1 -top-1 rounded-full border border-white/14 bg-background px-1.5 text-[0.65rem] font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="card-title text-foreground">
                    {path.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground/95">
                    {detail.description}
                  </p>
                </div>
                <span className="col-start-2 inline-flex min-h-9 items-center gap-2 rounded-full text-sm font-bold text-primary sm:col-start-auto">
                  {detail.action}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}

function externalProps(href: string) {
  const external = isExternalHref(href);
  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}
