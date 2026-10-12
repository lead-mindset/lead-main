import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

import { MainContainer } from "@/components/global/main-container";
import { isExternalHref } from "@/components/global/navigation/nav-links";
import { Button } from "@/components/ui/button";

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

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "About LEAD", href: "/about-us" },
      { label: "Get Involved", href: "/get-involved" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Partner with us", href: "mailto:contact@leadmindset.org" },
      { label: "Contact", href: "mailto:culture@leadmindset.org" },
    ],
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
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <MainContainer className="relative py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-8">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 rounded-lg"
            >
              <Image
                src="/leadl2.svg"
                alt="LEAD"
                width={40}
                height={22}
                className="h-auto w-10"
              />
              <span className="text-h3 font-display font-bold text-foreground">LEAD</span>
            </Link>
            <p className="mt-4 text-body leading-7 text-muted-foreground">
              LEAD helps students learn, explore, aspire, and discover through
              chapters, programs, mentors, partners, and community.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button
                  key={href}
                  asChild
                  variant="outline"
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

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-small font-sans font-bold uppercase text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-muted-foreground">
            &copy; {new Date().getFullYear()} LEAD Americas. All rights reserved.
          </p>
          <p className="text-small text-muted-foreground">
            Built for students across the Americas.
          </p>
        </div>
      </MainContainer>
    </footer>
  );
}
