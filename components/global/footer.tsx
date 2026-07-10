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

        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} LEAD. All rights reserved.</p>
          <p>Built for students across the Americas and the communities supporting them.</p>
        </div>
      </MainContainer>
    </footer>
  );
}
