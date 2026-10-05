import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase-admin";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "LEAD Public Site <noreply@leadmindset.org>";

const CONTACT_TO = process.env.CONTACT_TO ?? "contact@leadmindset.org";

/**
 * Recipients per intent. Both default to CONTACT_TO (contact@leadmindset.org).
 * `CHAPTER_INTEREST_TO` is temporary until the team confirms who owns
 * chapter-interest routing (Angela feedback, oct 2026).
 */
const RECIPIENTS = {
  chapter_interest: process.env.CHAPTER_INTEREST_TO ?? CONTACT_TO,
  partnership: process.env.PARTNERSHIP_TO ?? CONTACT_TO,
} as const;

const requiredFieldsByIntent = {
  chapter_interest: [
    "name",
    "email",
    "university",
    "location",
    "teamStatus",
    "motivation",
    "intendedImpact",
  ],
  partnership: ["name", "email", "partnerType", "region", "explore"],
} as const;

type Intent = keyof typeof requiredFieldsByIntent;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const intent = body.intent as Intent | undefined;

    if (!intent || !(intent in requiredFieldsByIntent)) {
      return NextResponse.json({ error: "Missing or invalid intent" }, { status: 400 });
    }

    const missing = requiredFieldsByIntent[intent].filter((field) => !stringValue(body[field]));

    if (missing.length > 0) {
      return NextResponse.json({ error: "Missing required fields", missing }, { status: 400 });
    }

    const recipient = RECIPIENTS[intent];
    const subject =
      intent === "chapter_interest"
        ? `LEAD chapter interest: ${stringValue(body.university)}`
        : `LEAD partnership inquiry: ${stringValue(body.partnerType)}`;

    const text = buildPlainText(intent, body);
    const html = buildSafeHtml(intent, body);

    let delivered = false;
    let emailId: string | null = null;
    let deliveryError: string | null = null;

    if (resend) {
      try {
        const result = await resend.emails.send({
          from: CONTACT_FROM,
          to: recipient,
          replyTo: stringValue(body.email),
          subject,
          text,
          html,
        });

        if (result.error) {
          deliveryError = result.error.message;
        } else {
          delivered = true;
          emailId = result.data?.id ?? null;
        }
      } catch (error) {
        deliveryError = error instanceof Error ? error.message : "Email send failed";
      }
    } else {
      deliveryError = "Email delivery is not configured in this environment";
    }

    await recordSubmission({
      intent,
      body,
      recipient,
      delivered,
      emailId,
      deliveryError,
    });

    if (!resend) {
      return NextResponse.json({
        success: true,
        delivered: false,
        message: "Submission validated. Email delivery is not configured in this environment.",
      });
    }

    if (deliveryError) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}

async function recordSubmission({
  intent,
  body,
  recipient,
  delivered,
  emailId,
  deliveryError,
}: {
  intent: Intent;
  body: Record<string, unknown>;
  recipient: string;
  delivered: boolean;
  emailId: string | null;
  deliveryError: string | null;
}) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submission").insert({
      intent,
      name: stringValue(body.name) || null,
      email: stringValue(body.email) || null,
      organization: stringValue(body.organization) || null,
      university: stringValue(body.university) || null,
      location: stringValue(body.location) || null,
      region: stringValue(body.region) || null,
      profile: stringValue(body.profile) || null,
      recipient,
      delivered,
      email_id: emailId,
      error: deliveryError,
      payload: body,
    });

    if (error) throw error;
  } catch (error) {
    // Metrics must never break the user-facing submission.
    console.error("Failed to persist contact submission", error);
  }
}

function buildPlainText(intent: Intent, body: Record<string, unknown>) {
  const fields =
    intent === "chapter_interest"
      ? [
          ["Intent", "Chapter Interest"],
          ["Name", body.name],
          ["Email", body.email],
          ["University", body.university],
          ["Country and city", body.location],
          ["Who is building this with you", body.teamStatus],
          ["Motivation", body.motivation],
          ["Intended impact", body.intendedImpact],
          ["Profile", body.profile],
        ]
      : [
          ["Intent", "Partnership"],
          ["Name", body.name],
          ["Email", body.email],
          ["Partner type", body.partnerType],
          ["Organization", body.organization],
          ["Region or country", body.region],
          ["Explore", body.explore],
          ["Website or LinkedIn", body.profile],
        ];

  return fields.map(([label, value]) => `${label}: ${stringValue(value) || "N/A"}`).join("\n");
}

function buildSafeHtml(intent: Intent, body: Record<string, unknown>) {
  return `<h2>${escapeHtml(intent === "chapter_interest" ? "Chapter Interest" : "Partnership Inquiry")}</h2><pre>${escapeHtml(
    buildPlainText(intent, body)
  )}</pre>`;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
