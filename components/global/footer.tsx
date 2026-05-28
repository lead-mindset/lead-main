import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import {
  JOIN_LEAD_HREF,
  PUBLIC_NAV_ITEMS,
  isExternalHref,
} from "@/components/global/navigation/nav-links";
import { Button } from "@/components/ui/button";

const actionLinks = [
  { label: "Students", href: "/get-involved#students" },
  { label: "Start a chapter", href: "/get-involved#chapters" },
  { label: "Partner with LEAD", href: "/get-involved#partners" },
  { label: "Mentor", href: "/get-involved#partners" },
];

const socialLinks = [
  {
    label: "Email LEAD",
    href: "mailto:culture@leadmindset.org",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/leadmindset/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/leadmindset/",
    icon: Instagram,
  },
];

export default function Footer() {
  const joinIsExternal = isExternalHref(JOIN_LEAD_HREF);

  return (
    <footer className="border-t border-border/60 bg-background/95">
      <MainContainer className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/leadl2.svg"
                alt="LEAD"
                width={40}
                height={22}
                className="h-auto w-10"
              />
              <span className="text-xl font-bold text-foreground">LEAD</span>
            </Link>
            <p className="body-copy mt-4 text-muted-foreground">
              Learn. Explore. Aspire. Discover. A public pathway into career
              exposure, leadership, chapters, mentors, and the LEAD Talent
              Platform.
            </p>
            <Button asChild className="mt-6" size="sm">
              <Link
                href={JOIN_LEAD_HREF}
                target={joinIsExternal ? "_blank" : undefined}
                rel={joinIsExternal ? "noreferrer" : undefined}
              >
                Join LEAD
              </Link>
            </Button>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="footer-heading">
              Explore
            </h2>
            <ul className="mt-4 grid gap-3 text-sm">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">
              Pathways
            </h2>
            <ul className="mt-4 grid gap-3 text-sm">
              {actionLinks.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button key={href} asChild variant="ghost" size="icon-sm">
                  <Link
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} LEAD. All rights reserved.</p>
          <p>Built for students, chapters, mentors, partners, and community.</p>
        </div>
      </MainContainer>
    </footer>
  );
}
