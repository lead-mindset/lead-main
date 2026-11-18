"use client";

import Link from "next/link";
import {
  Activity,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Lock,
  Rocket,
  ShoppingBag,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";

import {
  PLATFORM_GROUPS,
  PLATFORMS_MENU_TITLE,
  type PlatformId,
  type PlatformItem,
} from "./nav-links";

const PLATFORM_ICONS: Record<PlatformId, LucideIcon> = {
  aspire: Rocket,
  talent: Briefcase,
  shop: ShoppingBag,
  pulse: Activity,
  operations: Wallet,
  eventsManager: CalendarDays,
};

function ComingSoonBadge() {
  return (
    <span className="ml-2 inline-flex items-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-white/70">
      Coming soon
    </span>
  );
}

function PlatformRow({ item }: { item: PlatformItem }) {
  const Icon = PLATFORM_ICONS[item.id];
  return (
    <>
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2c3771] text-white/85 ring-1 ring-white/10">
        <Icon className="size-4" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex flex-wrap items-center text-body font-semibold text-white">
          {item.label}
          {!item.href && <ComingSoonBadge />}
        </span>
        <span className="text-small text-white/60">{item.description}</span>
      </span>
    </>
  );
}

export default function PlatformsMenu({ className }: { className?: string }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "group inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-small font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-[state=open]:bg-muted data-[state=open]:font-semibold data-[state=open]:text-foreground",
          className
        )}
      >
        Platforms
        <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="w-[min(47rem,calc(100vw-2rem))] max-h-none overflow-hidden rounded-2xl border border-[#2b356c] bg-[#212b63] p-0 text-white shadow-2xl ring-0"
      >
        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:[&>*+*]:border-l sm:[&>*+*]:border-[#2b356c] sm:[&>*+*]:pl-6">
          {PLATFORM_GROUPS.map((group) => (
            <div key={group.id} className="flex flex-col gap-1">
              <p className="mb-2 flex items-center gap-1.5 px-2 text-caption font-semibold uppercase tracking-[0.08em] text-white/55">
                {group.label}
                {group.restricted && <Lock className="size-3" aria-label="Restricted" />}
              </p>
              {group.items.map((item) =>
                item.href ? (
                  <DropdownMenuItem
                    key={item.id}
                    asChild
                    className="items-start gap-3 rounded-xl px-2 py-2.5 focus:bg-[#2c3771] focus:text-white"
                  >
                    <Link href={item.href}>
                      <PlatformRow item={item} />
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    key={item.id}
                    disabled
                    className="items-start gap-3 rounded-xl px-2 py-2.5 data-disabled:opacity-80"
                  >
                    <PlatformRow item={item} />
                  </DropdownMenuItem>
                )
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#2b356c] px-7 py-3 text-small text-white/65">
          {PLATFORMS_MENU_TITLE}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PlatformsMobileList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="mt-2 border-t border-border/60 pt-3">
      <p className="px-3 pb-1 text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {PLATFORMS_MENU_TITLE}
      </p>
      {PLATFORM_GROUPS.map((group) => (
        <div key={group.id} className="py-1">
          <p className="flex items-center gap-1.5 px-3 py-1 text-caption text-muted-foreground">
            {group.label}
            {group.restricted && <Lock className="size-3" aria-label="Restricted" />}
          </p>
          {group.items.map((item) => {
            const Icon = PLATFORM_ICONS[item.id];
            const content = (
              <>
                <Icon className="size-4 shrink-0" />
                <span>{item.label}</span>
                {!item.href && (
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-caption text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </>
            );
            return item.href ? (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-body font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {content}
              </Link>
            ) : (
              <div
                key={item.id}
                aria-disabled
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-body font-medium text-muted-foreground/70"
              >
                {content}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
