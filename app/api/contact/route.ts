import { Resend } from "resend";
import nodemailer from "nodemailer";

import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const CONTACT_FROM = process.env.CONTACT_FROM ?? "noreply@leadmindset.org";
const CONTACT_TO = process.env.CONTACT_TO ?? "admin.tech@leadmindset.org";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { organization, email, subject, message } = body;

    if (!organization || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const text = `${message}\n\nFrom: ${organization} (${email})`;
    const html = `<p>${message}</p><p>From: ${organization} (${email})</p>`;

    // Preferred: send through Resend (org-owned). The sender address must be a
    // verified domain on the Resend account, and the submitter email goes in
    // replyTo so a reply reaches the right person without spoofing the from.
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        replyTo: email,
        subject,
        text,
        html,
      });

      if (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: legacy SMTP (kept working until Resend is wired up).
    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"${organization}" <${email}>`,
      to: CONTACT_TO,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}