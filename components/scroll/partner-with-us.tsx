"use client";

import { Button } from "../ui/button";

export default function PartnerWithUs() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold">
        Partner with LEAD
      </h2>
      <p className="text-white/80 text-xl md:text-2xl max-w-xl">
        If you believe in <span className="font-extrabold">investing</span>  early in high-potential future leaders,
        we’d love to explore how we can <span className="font-extrabold">work together</span>.
      </p>

  
<form className="space-y-4">
  <div>
    <label className="text-lg font-bold">Organization Name</label>
    <input
      type="text"
      className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
    />
  </div>

  <div>
    <label className="text-lg font-bold">Email</label>
    <input
      type="email"
      className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
    />
  </div>

  <div>
    <label className="text-lg font-bold">Subject</label>
    <input
      type="text"
      className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
    />
  </div>

  <div>
    <label className="text-lg font-bold">Message</label>
    <textarea
      rows={4}
      className="w-full bg-foreground/90 text-background mt-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
    />
  </div>

  <Button type="submit" size="lg" className="right-auto">
    Send Message
  </Button>
</form>

    </>
  );
}
