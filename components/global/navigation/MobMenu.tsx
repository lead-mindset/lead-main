"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const joinIsExternal = isExternalHref(JOIN_LEAD_HREF);

  return (
    <div className="mobile-menu-shell">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="border border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-50 rounded-lg border border-border bg-popover p-3 shadow-xl"
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
                      "rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
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
              <Button asChild className="mt-2 w-full" size="sm">
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
