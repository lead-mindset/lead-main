"use client";

import { useId, useState } from "react";

import { partnerTypes } from "@/lib/public-site/content";
import { cn } from "@/lib/utils";

const partnerProof = {
  company: {
    outcome: "Host a visit, sponsor a program, or create student-facing access.",
    examples: ["Company visits", "Program support", "Opportunity access"],
  },
  professional_or_mentor: {
    outcome: "Mentor, speak, review work, or help students understand professional standards.",
    examples: ["Mentorship", "Portfolio review", "Career standards"],
  },
  community_organization: {
    outcome: "Collaborate on STEM access, outreach, or a local student initiative.",
    examples: ["STEM access", "Outreach", "Local initiatives"],
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
  const panelMotion =
    "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]";

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card/62">
      <div
        className="grid gap-2 border-b border-border/80 p-2 sm:flex sm:flex-wrap"
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
                "flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 sm:flex-1 sm:min-w-0",
                active
                  ? "bg-primary/16 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
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
        id={panelId}
        key={activeType.value}
        role="region"
        aria-live="polite"
        className={cn(
          "grid min-h-[13.5rem] gap-4 p-4 sm:min-h-[12.5rem] sm:grid-cols-[auto_1fr] sm:p-5",
          panelMotion
        )}
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
