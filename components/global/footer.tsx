import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { Button } from "@/components/ui/button";

const exploreLinks = [
  { label: "About", href: "/about-us" },
  { label: "Pathway", href: "/#pathway" },
  { label: "Programs", href: "/#programs" },
  { label: "University Chapters", href: "/get-involved#chapters" },
  { label: "Partners", href: "/get-involved#partners" },
  { label: "Impact", href: "/#impact" },
];

const actionLinks = [
  { label: "Join as a student", href: "/get-involved#students" },
  { label: "Submit chapter interest", href: "/get-involved#chapters" },
  { label: "Partner or collaborate", href: "/get-involved#partners" },
];

const socialLinks = [
  {
    label: "Email LEAD",
    href: "mailto:culture@leadmindset.org",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/leadmindsetorg/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lead_americas/",
    icon: Instagram,
  },
];

function externalProps(href: string) {
  const external = isExternalHref(href);

  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-[linear-gradient(180deg,rgba(10,14,53,0.98),var(--lead-surface-deep))]">
      <MainContainer className="relative py-9 sm:py-11">
        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.95fr)_minmax(0,1.45fr)] lg:items-start lg:gap-10">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-3 rounded-[var(--lead-radius-button)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
            >
              <Image
                src="/leadl2.svg"
                alt="LEAD"
                width={40}
                height={22}
                className="h-auto w-10"
              />
              <span className="text-xl font-bold text-foreground">LEAD</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              LEAD helps students learn, explore, aspire, and discover through
              chapters, programs, mentors, partners, and community.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button
                  key={href}
                  asChild
                  variant="glass"
                  size="icon-sm"
                >
                  <Link
                    href={href}
                    aria-label={label}
                    {...externalProps(href)}
                  >
                    <Icon className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-7 rounded-2xl border border-white/10 bg-white/[0.018] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)] sm:p-6 lg:gap-9">
            <nav aria-label="Footer navigation">
              <h2 className="footer-heading">Explore</h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {exploreLinks.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-8 items-center rounded-[var(--lead-radius-button)] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer action links">
              <h2 className="footer-heading">Get involved</h2>
              <ul className="mt-3 grid gap-1.5 text-sm">
                {actionLinks.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-8 items-center rounded-[var(--lead-radius-button)] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} LEAD. All rights reserved.</p>
          <p>Built for students across the Americas and the communities supporting them.</p>
        </div>
      </MainContainer>
    </footer>
  );
}
