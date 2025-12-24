import nodemailer from "nodemailer";

import { NextRequest, NextResponse } from "next/server";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { organization, email, subject, message } = body;

    if (!organization || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${organization}" <${email}>`,
      to: EMAIL_USER,
      subject: subject,
      text: message,
      html: `<p>${message}</p><p>From: ${organization} (${email})</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
