import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { Card, CardContent } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { finalPaths } from "@/lib/public-site/content";
import { cn } from "@/lib/cn";

const routeDetails: Record<string, { description: string; action: string }> = {
  "About us": {
    description:
      "Learn who LEAD is, the mission behind it, and the team building access across the Americas.",
    action: "Read our story",
  },
  "Submit chapter interest": {
    description:
      "Tell us about your university and why LEAD should grow there, and help us bring it to life.",
    action: "Submit interest",
  },
  "Partner with LEAD": {
    description:
      "Bring mentorship, events, resources, or hands-on opportunities to the students we serve.",
    action: "Start partnership",
  },
  "Community Collaboration": {
    description:
      "Build aligned STEM, leadership, or access initiatives with LEAD to widen access together.",
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
        "lead-public-cta-surface relative isolate scroll-mt-28 overflow-hidden border-t border-border py-16 sm:py-24",
        className
      )}
    >
      <MainContainer>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-overline font-sans font-bold uppercase text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl font-display text-h1 font-semibold">{title}</h2>
          </div>
          <p className="max-w-2xl font-sans text-body text-muted-foreground lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {finalPaths.map((path) => {
            const Icon = path.icon;
            const detail = routeDetails[path.label];
            const external = isExternalHref(path.href);

            return (
              <Link
                key={path.label}
                href={path.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <Card className="h-full transition-colors group-hover:bg-muted/40">
                  <CardContent className="flex flex-1 gap-4">
                    <IconTile className="self-start">
                      <Icon className="size-5" />
                    </IconTile>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="font-display text-h3 font-semibold text-foreground">
                        {path.label}
                      </h3>
                      <p className="mt-1.5 text-small leading-6 text-muted-foreground">
                        {detail.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-small font-semibold text-primary">
                        {detail.action}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}
