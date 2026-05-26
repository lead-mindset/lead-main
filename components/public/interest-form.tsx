"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { partnerTypes } from "@/lib/public-site/content";

type InterestKind = "chapter_interest" | "partnership";
type SubmitState = "idle" | "submitting" | "success" | "error";

export function InterestForm({ kind }: { kind: InterestKind }) {
  const [enabled, setEnabled] = useState(false);
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
    <div className="editorial-card rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isChapter
              ? "Use this when you are ready to share serious chapter interest. Submission does not guarantee selection or approval."
              : "Use this to start a structured partnership or community collaboration conversation with LEAD."}
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setEnabled((value) => !value)}>
          {enabled ? "Hide form" : "Open form"}
        </Button>
      </div>

      {enabled ? (
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <input type="hidden" name="source" value="lead-public-site" />
          <Field id={`${kind}-name`} label="Name" name="name" required />
          <Field id={`${kind}-email`} label="Email" name="email" type="email" required />

          {isChapter ? (
            <>
              <Field id="chapter-university" label="University" name="university" required />
              <Field id="chapter-location" label="Country and city" name="location" required />
              <Field id="chapter-team" label="Are you applying solo or with a team?" name="teamStatus" required />
              <TextAreaField id="chapter-motivation" label="Why do you want to bring LEAD to your university?" name="motivation" required />
              <TextAreaField id="chapter-impact" label="What impact would your chapter create?" name="intendedImpact" required />
              <Field id="chapter-profile" label="LinkedIn or profile link (optional)" name="profile" />
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

          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Submit"}
          </Button>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {status === "success"
              ? "Thank you. LEAD received your structured interest."
              : status === "error"
                ? "Something went wrong. Please check the required fields and try again."
                : "Required fields must be completed before submission."}
          </p>
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
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={name} required={required} aria-required={required} />
    </div>
  );
}
