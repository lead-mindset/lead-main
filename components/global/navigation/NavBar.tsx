"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MainContainer } from "@/components/global/main-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import MobMenu from "./MobMenu";
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

function navLinkProps(href: string) {
  const external = isExternalHref(href);

  return {
    target: external ? "_blank" : undefined,
    rel: external ? "noreferrer" : undefined,
  };
}

export default function NavBar() {
  const pathname = usePathname();
  const joinIsExternal = isExternalHref(JOIN_LEAD_HREF);

  return (
    <MainContainer className="flex h-16 items-center gap-4">
      <Link href="/" className="flex min-h-11 shrink-0 items-center gap-3">
        <Image
          src="/leadl2.svg"
          alt="LEAD"
          width={38}
          height={21}
          priority
          className="h-auto w-[38px]"
        />
        <span className="font-display text-body-lg font-bold text-foreground">LEAD</span>
      </Link>

      <div className="ml-auto hidden items-center gap-1 lg:flex">
        {PUBLIC_NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center whitespace-nowrap rounded-xl px-3 py-2 text-small font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                active && "bg-muted text-foreground"
              )}
              {...navLinkProps(item.href)}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2 lg:ml-0">
        <Button asChild className="hidden sm:inline-flex">
          <Link
            href={JOIN_LEAD_HREF}
            target={joinIsExternal ? "_blank" : undefined}
            rel={joinIsExternal ? "noreferrer" : undefined}
          >
            Join LEAD
          </Link>
        </Button>
        <MobMenu pathname={pathname} />
      </div>
    </MainContainer>
  );
}
