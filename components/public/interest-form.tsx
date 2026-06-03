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

const fieldSurfaceClass =
  "group/form-field rounded-xl bg-white/[0.035] px-4 py-3 ring-1 ring-white/[0.065] transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:bg-white/[0.05] focus-within:ring-primary/35";
const fieldLabelClass =
  "text-[0.68rem] font-bold uppercase leading-[1.15] tracking-[0.08em] text-muted-foreground/76 transition-colors duration-300 group-focus-within/form-field:text-primary";
const fieldControlClass =
  "mt-2 h-8 rounded-none border-0 bg-transparent px-0 py-0 text-base shadow-none hover:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0";
const textareaControlClass =
  "mt-2 min-h-20 rounded-none border-0 bg-transparent px-0 py-0 text-base shadow-none hover:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0";

export function InterestForm({
  kind,
  defaultOpen = false,
  showToggle = true,
  showHeader = true,
  className,
  onSuccessAction,
}: {
  kind: InterestKind;
  defaultOpen?: boolean;
  showToggle?: boolean;
  showHeader?: boolean;
  className?: string;
  onSuccessAction?: () => void;
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

  function goToPrograms() {
    onSuccessAction?.();
    window.location.assign("/#programs");
  }

  return (
    <div
      className={cn(
        showHeader ? "editorial-card rounded-2xl p-5 shadow-xs" : undefined,
        className
      )}
    >
      {showHeader ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="card-title text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isChapter
                ? "Use this to share chapter interest for a university. Submission starts review; it does not guarantee selection or approval."
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

      {enabled && status === "success" ? (
        <div
          className={cn(
            "grid gap-4 rounded-xl bg-white/[0.035] p-5 ring-1 ring-white/[0.08]",
            showHeader ? "mt-6" : undefined
          )}
          aria-live="polite"
        >
          <div>
            <p className="card-eyebrow text-primary">Received</p>
            <h3 className="mt-2 font-headline text-xl font-bold leading-tight text-foreground">
              {isChapter ? "Chapter interest received." : "Message received."}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {isChapter
                ? "Thank you. Your chapter interest was received by the LEAD team. We will review your message and follow up if there is alignment with current chapter priorities."
                : "Thank you. Your message was received by the LEAD team."}
            </p>
          </div>
          {isChapter ? (
            <Button type="button" variant="glass" size="sm" className="justify-self-start" onClick={goToPrograms}>
              Explore LEAD programs
            </Button>
          ) : null}
        </div>
      ) : enabled ? (
        <form className={cn("grid", showHeader ? "mt-6 gap-3.5" : "gap-3.5")} onSubmit={onSubmit}>
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
              <div className="grid gap-3">
                <TextAreaField
                  id="chapter-team"
                  label="Who is building this with you?"
                  name="teamStatus"
                  helper="Share names, roles, or a short description of the students involved."
                  required
                  compact={!showHeader}
                />
                <Field id="chapter-profile" label="LinkedIn or profile link (optional)" name="profile" />
              </div>
              <TextAreaField id="chapter-motivation" label="Why do you want to bring LEAD to your university?" name="motivation" required compact={!showHeader} />
              <TextAreaField id="chapter-impact" label="What impact would your chapter create?" name="intendedImpact" required compact={!showHeader} />
            </>
          ) : (
            <>
              <div className={fieldSurfaceClass}>
                <Label htmlFor="partner-type" className={fieldLabelClass}>
                  Partner type
                  <span className="text-primary/80" aria-hidden="true">*</span>
                </Label>
                <select
                  id="partner-type"
                  name="partnerType"
                  required
                  className="mt-2 h-7 w-full cursor-pointer rounded-none border-0 bg-transparent px-0 py-0 text-base text-foreground outline-none"
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

          <div className="grid gap-2 pt-1">
            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Sending..." : "Submit"}
            </Button>
            {status !== "idle" ? (
              <div className="grid gap-3" aria-live="polite">
                <p className="text-sm leading-6 text-muted-foreground">
                  {status === "error"
                    ? "Something went wrong. Please check the required fields and try again."
                    : "Sending your interest..."}
                </p>
              </div>
            ) : null}
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
  helper,
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  helper?: string;
  required?: boolean;
}) {
  const helperId = helper ? `${id}-helper` : undefined;

  return (
    <div className={fieldSurfaceClass}>
      <Label htmlFor={id} className={fieldLabelClass}>
        {label}
        {required ? (
          <span className="text-primary/80" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        aria-describedby={helperId}
        className={fieldControlClass}
      />
      {helper ? (
        <p id={helperId} className="mt-2 text-xs leading-5 text-muted-foreground/78">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  name,
  required,
  compact,
  helper,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  compact?: boolean;
  helper?: string;
}) {
  const helperId = helper ? `${id}-helper` : undefined;

  return (
    <div className={fieldSurfaceClass}>
      <Label htmlFor={id} className={fieldLabelClass}>
        {label}
        {required ? (
          <span className="text-primary/80" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      <Textarea
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-describedby={helperId}
        className={cn(textareaControlClass, compact ? "min-h-24" : undefined)}
      />
      {helper ? (
        <p id={helperId} className="mt-2 text-xs leading-5 text-muted-foreground/78">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
