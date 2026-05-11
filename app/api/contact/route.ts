import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

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

    const subject =
      intent === "chapter_interest"
        ? `LEAD chapter interest: ${stringValue(body.university)}`
        : `LEAD partnership inquiry: ${stringValue(body.partnerType)}`;

    const text = buildPlainText(intent, body);
    const html = buildSafeHtml(intent, body);

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({
        success: true,
        delivered: false,
        message: "Submission validated. Email delivery is not configured in this environment.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"LEAD Public Site" <${EMAIL_USER}>`,
      replyTo: stringValue(body.email),
      to: EMAIL_USER,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
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
          ["Solo/team status", body.teamStatus],
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
