import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { finalPaths } from "@/lib/public-site/content";
import { cn } from "@/lib/cn";

const routeDetails: Record<
  string,
  { description: string; action: string }
> = {
  "Join LEAD": {
    description:
      "Create your profile and start finding programs, chapters, and opportunities.",
    action: "Join the community",
  },
  "Submit chapter interest": {
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
  eyebrow = "Choose a path",
  title = "Find your next LEAD step.",
  description = "Join as a student, request chapter review, or build access with LEAD as a partner or community organization.",
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
            <p className="text-overline font-sans font-bold uppercase text-primary">
              {eyebrow}
            </p>
            <h2 className="text-h1 font-display font-semibold mt-4 max-w-xl">{title}</h2>
          </div>
          <p className="text-body font-sans max-w-2xl text-muted-foreground lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-foreground/16 bg-background/90 shadow-[0_18px_55px_color-mix(in_oklch,var(--background)_28%,transparent),inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] lg:grid-cols-2">
          {finalPaths.map((path, index) => {
            const Icon = path.icon;
            const detail = routeDetails[path.label];

            return (
              <Link
                key={path.label}
                href={path.href}
                {...externalProps(path.href)}
                className="group grid min-h-32 grid-cols-[auto_1fr] gap-4 border-b border-foreground/12 p-5 text-foreground transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-b-0 hover:-translate-y-0.5 hover:bg-primary/14 hover:shadow-[inset_0_1px_0_color-mix(in_oklch,white_8%,transparent)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 sm:min-h-28 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6 lg:[&:nth-child(2n+1)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="relative">
                  <span className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/20 text-primary shadow-[0_0_0_1px_color-mix(in_oklch,white_5%,transparent),0_12px_30px_color-mix(in_oklch,var(--brand-purple-light)_18%,transparent)] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:border-primary/70 group-hover:bg-primary/28">
                    <Icon className="size-5" />
                  </span>
                  <span className="absolute -right-1 -top-1 rounded-full border border-foreground/14 bg-background px-1.5 text-caption font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-h2 font-display font-semibold text-foreground">
                    {path.label}
                  </h3>
                  <p className="mt-2 text-small leading-6 text-muted-foreground/95">
                    {detail.description}
                  </p>
                </div>
                <span className="col-start-2 inline-flex min-h-9 items-center gap-2 rounded-full text-small font-bold text-primary sm:col-start-auto">
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
