export type LeadEvent = {
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  tag?: string;
  description?: string;
  image?: string;
  url: string;
  cta: string;
};

export const LEAD_EVENTS: LeadEvent[] = [
  {
    title: "Hospitality Suite | LEAD x Microsoft",
    date: "2026-11-24",
    time: "6:00 PM to 9:00 PM COT",
    location: "Microsoft Offices, Bogotá, Colombia",
    tag: "In person",
    description:
        "A free networking night with Microsoft employees, professionals, and university students. Expand your network, share experiences, and talk technology, innovation, and career growth.",
    image: "/media/lead/events/Hospitality-suite-colombia.png",
    url: "https://luma.com/ieyj1mj9",
    cta: "Register now",
  },
  {
    title: "LEAD Aspire Day | Colombia 2026",
    date: "2026-11-27",
    time: "10:00 AM to 5:00 PM COT",
    location: "Microsoft Offices, Bogotá, Colombia",
    tag: "Students only",
    description:
        "Work at Microsoft for a day. Team up with Microsoft mentors to solve a real business challenge with AI. Open to university students from every major and year. No technical background needed. Free.",
    image: "/media/lead/events/lead-aspire-colombia.png",
    url: "https://luma.com/ai0gnczm",
    cta: "Save my spot",
  },
];