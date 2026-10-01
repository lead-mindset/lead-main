"use client";

import { useId, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { partnerTypes } from "@/lib/public-site/content";
import { cn } from "@/lib/cn";

const partnerProof = {
  company: {
    outcome: "Host a visit, sponsor a program, or create student-facing access.",
  },
  professional_or_mentor: {
    outcome: "Mentor, speak, review work, or help students understand professional standards.",
  },
  community_organization: {
    outcome: "Collaborate on STEM access, outreach, or a local student initiative.",
  },
};

export function PartnerPathSelector() {
  const [activeValue, setActiveValue] = useState(partnerTypes[0].value);
  const panelId = useId();
  const activeType =
    partnerTypes.find((type) => type.value === activeValue) ?? partnerTypes[0];
  const activeProof =
    partnerProof[activeType.value as keyof typeof partnerProof] ??
    partnerProof.company;
  const ActiveIcon = activeType.icon;

  return (
    <Card className="mt-6">
      <div
        className="grid gap-2 border-b border-border p-3 sm:flex sm:flex-wrap"
        role="group"
        aria-label="Choose partner path"
      >
        {partnerTypes.map((type) => {
          const Icon = type.icon;
          const active = type.value === activeValue;

          return (
            <button
              key={type.value}
              type="button"
              aria-pressed={active}
              aria-controls={panelId}
              className={cn(
                "flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:flex-1 sm:min-w-0",
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setActiveValue(type.value)}
            >
              <IconTile
                className={cn(
                  "size-8",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
              </IconTile>
              <span className="text-small font-semibold">
                {type.title}
              </span>
            </button>
          );
        })}
      </div>

      <CardContent
        id={panelId}
        key={activeType.value}
        role="region"
        aria-live="polite"
        className="grid min-h-[13.5rem] gap-4 sm:min-h-[12.5rem] sm:grid-cols-[auto_1fr]"
      >
        <IconTile className="size-12 bg-primary/15 text-primary">
          <ActiveIcon className="size-6" />
        </IconTile>
        <div>
          <p className="text-small font-sans font-bold uppercase text-primary">
            {activeType.title}
          </p>
          <h3 className="mt-2 font-display text-h2 font-bold leading-tight text-foreground">
            {activeProof.outcome}
          </h3>
          <p className="mt-3 text-body leading-6 text-muted-foreground">
            {activeType.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
