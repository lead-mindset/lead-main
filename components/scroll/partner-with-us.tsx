"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function PartnerWithUs() {
  const [form, setForm] = useState({
    organization: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent! ✅");
        setForm({ organization: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message ❌");
    }
  };

  return (
    <>
      <h2 className="section-title">Partner with LEAD</h2>
      <p className="section-subtitle max-w-xl text-foreground/80">
        If you believe in <span className="font-extrabold">investing</span> early in high-potential future leaders, we’d love to explore how we can <span className="font-extrabold">work together</span>.
      </p>

      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-body-lg font-bold">Organization Name</label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
            required
          />
        </div>

        <div>
          <label className="text-body-lg font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
            required
          />
        </div>

        <div>
          <label className="text-body-lg font-bold">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
            required
          />
        </div>

        <div>
          <label className="text-body-lg font-bold">Message</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
            required
          />
        </div>

        <Button type="submit" size="lg" className="right-auto">
          Send Message
        </Button>
      </form>

      {status && <p className="mt-2 text-foreground">{status}</p>}
    </>
  );
}
