"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { partnerTypes } from "@/lib/public-site/content";
import { cn } from "@/lib/cn";

type InterestKind = "chapter_interest" | "partnership";
type SubmitState = "idle" | "submitting" | "success" | "error";

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
  const [partnerType, setPartnerType] = useState("");

  const isChapter = kind === "chapter_interest";
  const title = isChapter ? "Chapter interest form" : "Partnership form";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isChapter && !partnerType.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: kind, ...payload }),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) {
      event.currentTarget.reset();
      setPartnerType("");
    }
  }

  function goToPrograms() {
    onSuccessAction?.();
    window.location.assign("/get-involved#students");
  }

  return (
    <div
      className={cn(
        showHeader ? "rounded-2xl border border-border bg-card p-6" : undefined,
        className
      )}
    >
      {showHeader ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-h2 font-display font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-body text-muted-foreground">
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
            "rounded-xl border border-border bg-muted/30 p-6",
            showHeader ? "mt-6" : undefined
          )}
          aria-live="polite"
        >
          <div>
            <p className="text-small font-sans font-bold uppercase text-primary">Received</p>
            <h3 className="mt-2 font-display text-h3 font-bold leading-tight text-foreground">
              {isChapter ? "Chapter interest received." : "Message received."}
            </h3>
            <p className="mt-3 text-body leading-6 text-muted-foreground">
              {isChapter
                ? "Thank you. Your chapter interest was received by the LEAD team. We will review your message and follow up if there is alignment with current chapter priorities."
                : "Thank you. Your message was received by the LEAD team."}
            </p>
          </div>
          {isChapter ? (
            <Button type="button" variant="outline" size="sm" className="mt-4 justify-self-start" onClick={goToPrograms}>
              Explore LEAD programs
            </Button>
          ) : null}
        </div>
      ) : enabled ? (
        <form className={cn("grid gap-4", showHeader ? "mt-6" : undefined)} onSubmit={onSubmit}>
          <input type="hidden" name="source" value="lead-public-site" />
          
          <Field>
            <FieldLabel htmlFor={`${kind}-name`}>
              Name
              <span className="text-primary" aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id={`${kind}-name`}
              name="name"
              required
              aria-required="true"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor={`${kind}-email`}>
              Email
              <span className="text-primary" aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id={`${kind}-email`}
              name="email"
              type="email"
              required
              aria-required="true"
            />
          </Field>

          {isChapter ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="chapter-university">
                    University
                    <span className="text-primary" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="chapter-university"
                    name="university"
                    required
                    aria-required="true"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="chapter-location">
                    Country and city
                    <span className="text-primary" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="chapter-location"
                    name="location"
                    required
                    aria-required="true"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="chapter-team">
                  Who is building this with you?
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Textarea
                  id="chapter-team"
                  name="teamStatus"
                  required
                  aria-required="true"
                  rows={3}
                />
                <FieldDescription>
                  Share names, roles, or a short description of the students involved.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="chapter-profile">
                  LinkedIn or profile link
                  <span className="text-muted-foreground text-small font-normal">(optional)</span>
                </FieldLabel>
                <Input
                  id="chapter-profile"
                  name="profile"
                  type="url"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="chapter-motivation">
                  Why do you want to bring LEAD to your university?
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Textarea
                  id="chapter-motivation"
                  name="motivation"
                  required
                  aria-required="true"
                  rows={4}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="chapter-impact">
                  What impact would your chapter create?
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Textarea
                  id="chapter-impact"
                  name="intendedImpact"
                  required
                  aria-required="true"
                  rows={4}
                />
              </Field>
            </>
          ) : (
            <>
              <Field>
                <FieldLabel htmlFor="partner-type">
                  Partner type
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Select value={partnerType} onValueChange={setPartnerType}>
                  <SelectTrigger
                    id="partner-type"
                    aria-required="true"
                    className="h-10 w-full"
                  >
                    <SelectValue placeholder="Select a path" />
                  </SelectTrigger>
                  <SelectContent>
                    {partnerTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="partnerType" value={partnerType} />
              </Field>

              <Field>
                <FieldLabel htmlFor="partner-organization">
                  Organization
                  <span className="text-muted-foreground text-small font-normal">(when relevant)</span>
                </FieldLabel>
                <Input
                  id="partner-organization"
                  name="organization"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="partner-region">
                  Region or country
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Input
                  id="partner-region"
                  name="region"
                  required
                  aria-required="true"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="partner-explore">
                  What would you like to explore with LEAD?
                  <span className="text-primary" aria-hidden="true">*</span>
                </FieldLabel>
                <Textarea
                  id="partner-explore"
                  name="explore"
                  required
                  aria-required="true"
                  rows={4}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="partner-profile">
                  Website or LinkedIn
                  <span className="text-muted-foreground text-small font-normal">(optional)</span>
                </FieldLabel>
                <Input
                  id="partner-profile"
                  name="profile"
                  type="url"
                />
              </Field>
            </>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Sending..." : "Submit"}
            </Button>
            {status === "error" && (
              <p className="mt-3 text-small text-destructive" role="alert">
                Something went wrong. Please check the required fields and try again.
              </p>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}
