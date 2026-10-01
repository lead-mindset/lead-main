"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import {
  JOIN_LEAD_HREF,
  PUBLIC_NAV_ITEMS,
  isExternalHref,
} from "./nav-links";

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const route = href.split("#")[0];
  return route === "/" ? pathname === "/" : pathname.startsWith(route);
}

export default function MobMenu({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const joinIsExternal = isExternalHref(JOIN_LEAD_HREF);
  const mobileNavId = "lead-mobile-navigation";

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLElement>("a[href], button:not(:disabled)")
        ?.focus();
    }, 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu-shell">
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon-lg"
        className="border border-border bg-muted/50 text-foreground hover:bg-muted hover:text-foreground"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-controls={mobileNavId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={menuRef}
            id={mobileNavId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            role="region"
            aria-label="Mobile navigation"
            className="fixed inset-x-4 top-20 z-50 rounded-xl border border-border bg-popover p-3 shadow-lg"
          >
            <div className="grid gap-1">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-small font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
                      active && "bg-muted text-foreground"
                    )}
                    target={isExternalHref(item.href) ? "_blank" : undefined}
                    rel={isExternalHref(item.href) ? "noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button asChild className="mt-2 w-full">
                <Link
                  href={JOIN_LEAD_HREF}
                  target={joinIsExternal ? "_blank" : undefined}
                  rel={joinIsExternal ? "noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  Join LEAD
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
