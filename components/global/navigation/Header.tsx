"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { PUBLIC_NAV_ITEMS, isExternalHref } from "./nav-links";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lead_americas/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/leadmindsetorg/",
    icon: Linkedin,
  },
];

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const route = href.split("#")[0];
  return route === "/" ? pathname === "/" : pathname.startsWith(route);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = PUBLIC_NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.href,
    active: isActivePath(pathname, item.href),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/leadl2.svg"
            alt="LEAD"
            width={32}
            height={18}
            className="h-auto w-8"
          />
          <span className="text-body-lg font-bold tracking-tight">LEAD</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-small font-medium transition-colors",
                link.active ? "bg-muted font-semibold text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon className="size-4" />
              </Link>
            </Button>
          ))}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-6 py-3 backdrop-blur md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-body font-medium transition-colors",
                link.active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              target={isExternalHref(link.href) ? "_blank" : undefined}
              rel={isExternalHref(link.href) ? "noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
