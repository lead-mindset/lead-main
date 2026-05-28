"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { partnerTypes } from "@/lib/public-site/content";
import { cn } from "@/lib/utils";

type InterestKind = "chapter_interest" | "partnership";
type SubmitState = "idle" | "submitting" | "success" | "error";

export function InterestForm({
  kind,
  defaultOpen = false,
  showToggle = true,
  showHeader = true,
  stickyFooter = false,
  className,
}: {
  kind: InterestKind;
  defaultOpen?: boolean;
  showToggle?: boolean;
  showHeader?: boolean;
  stickyFooter?: boolean;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(defaultOpen);
  const [status, setStatus] = useState<SubmitState>("idle");

  const isChapter = kind === "chapter_interest";
  const title = isChapter ? "Chapter interest form" : "Partnership form";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: kind, ...payload }),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <div className={cn("editorial-card rounded-2xl p-5 shadow-xs", className)}>
      {showHeader ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="card-title text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isChapter
                ? "Use this when you are ready to share serious chapter interest. Submission does not guarantee selection or approval."
                : "Use this to start a structured partnership or community collaboration conversation with LEAD."}
            </p>
          </div>
          {showToggle ? (
            <Button type="button" variant="outline" size="sm" onClick={() => setEnabled((value) => !value)}>
              {enabled ? "Hide form" : "Open form"}
            </Button>
          ) : null}
        </div>
      ) : null}

      {enabled ? (
        <form className={cn("grid", showHeader ? "mt-6 gap-4" : "gap-3")} onSubmit={onSubmit}>
          <input type="hidden" name="source" value="lead-public-site" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id={`${kind}-name`} label="Name" name="name" required />
            <Field id={`${kind}-email`} label="Email" name="email" type="email" required />
          </div>

          {isChapter ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field id="chapter-university" label="University" name="university" required />
                <Field id="chapter-location" label="Country and city" name="location" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field id="chapter-team" label="Solo or with a team?" name="teamStatus" required />
                <Field id="chapter-profile" label="LinkedIn or profile link (optional)" name="profile" />
              </div>
              <TextAreaField id="chapter-motivation" label="Why do you want to bring LEAD to your university?" name="motivation" required compact={!showHeader} />
              <TextAreaField id="chapter-impact" label="What impact would your chapter create?" name="intendedImpact" required compact={!showHeader} />
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label htmlFor="partner-type">Partner type</Label>
                <select
                  id="partner-type"
                  name="partnerType"
                  required
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <option value="">Select a path</option>
                  {partnerTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>
              <Field id="partner-organization" label="Organization (when relevant)" name="organization" />
              <Field id="partner-region" label="Region or country" name="region" required />
              <TextAreaField id="partner-explore" label="What would you like to explore with LEAD?" name="explore" required />
              <Field id="partner-profile" label="Website or LinkedIn (optional)" name="profile" />
            </>
          )}

          <div
            className={cn(
              "grid gap-2",
              stickyFooter &&
                "sticky bottom-0 z-20 -mx-1 border-t border-border bg-background/95 p-3 backdrop-blur"
            )}
          >
            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Sending..." : "Submit"}
            </Button>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {status === "success"
                ? "Thank you. LEAD received your structured interest."
                : status === "error"
                  ? "Something went wrong. Please check the required fields and try again."
                  : "Required fields must be completed before submission."}
            </p>
          </div>
        </form>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} required={required} aria-required={required} />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  name,
  required,
  compact,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={name}
        required={required}
        aria-required={required}
        className={compact ? "min-h-20" : undefined}
      />
    </div>
  );
}
