"use client";

import { useState } from "react";

import { partnerTypes } from "@/lib/public-site/content";
import { cn } from "@/lib/utils";

const partnerProof = {
  company: {
    outcome: "Sponsor programs, host company visits, and give students clearer industry context.",
    examples: ["Corporate exposure", "Program sponsorship", "Student opportunity"],
  },
  professional_or_mentor: {
    outcome: "Support students through mentoring, speaking, portfolio review, and leadership coaching.",
    examples: ["Mentorship", "Career standards", "Leadership practice"],
  },
  community_organization: {
    outcome: "Collaborate on STEM access, regional initiatives, outreach, and community impact.",
    examples: ["Aligned outreach", "STEM access", "Community initiatives"],
  },
};

export function PartnerPathSelector() {
  const [activeValue, setActiveValue] = useState(partnerTypes[0].value);
  const activeType =
    partnerTypes.find((type) => type.value === activeValue) ?? partnerTypes[0];
  const activeProof =
    partnerProof[activeType.value as keyof typeof partnerProof] ??
    partnerProof.company;
  const ActiveIcon = activeType.icon;

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card/62">
      <div
        className="grid gap-2 border-b border-border/80 p-2 sm:flex sm:flex-wrap"
        role="tablist"
        aria-label="Choose partner path"
      >
        {partnerTypes.map((type) => {
          const Icon = type.icon;
          const active = type.value === activeValue;

          return (
            <button
              key={type.value}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(
                "flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors sm:flex-1 sm:min-w-0",
                active
                  ? "bg-primary/16 text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
              onClick={() => setActiveValue(type.value)}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md ring-1",
                  active
                    ? "bg-primary text-primary-foreground ring-primary/30"
                    : "bg-primary/12 text-primary ring-primary/25"
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-xs font-bold leading-tight sm:text-sm">
                {type.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="grid gap-4 p-4 sm:grid-cols-[auto_1fr] sm:p-5"
      >
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
          <ActiveIcon className="size-5" />
        </span>
        <div>
          <p className="card-eyebrow">
            {activeType.title}
          </p>
          <h3 className="mt-2 font-headline text-lg font-bold leading-tight text-foreground sm:text-xl">
            {activeProof.outcome}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {activeType.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeProof.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
