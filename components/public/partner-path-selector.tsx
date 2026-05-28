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
    <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-card/70">
      <div
        className="grid border-b border-border/80 sm:grid-cols-3"
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
                "grid min-h-20 gap-2 border-b border-border/70 px-4 py-4 text-left transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                active
                  ? "bg-primary/16 text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
              onClick={() => setActiveValue(type.value)}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg ring-1",
                  active
                    ? "bg-primary text-primary-foreground ring-primary/30"
                    : "bg-primary/12 text-primary ring-primary/25"
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-bold leading-tight">
                {type.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:p-6"
      >
        <span className="flex size-14 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
          <ActiveIcon className="size-6" />
        </span>
        <div>
          <p className="card-eyebrow">
            {activeType.title}
          </p>
          <h3 className="card-title mt-2 text-foreground">
            {activeProof.outcome}
          </h3>
          <p className="body-copy mt-3 text-sm text-muted-foreground">
            {activeType.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
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
