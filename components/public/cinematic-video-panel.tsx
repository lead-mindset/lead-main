import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function CinematicVideoPanel({
  src,
  eyebrow,
  title,
  children,
  className,
}: {
  src: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-card", className)}>
      <video
        className="min-h-[360px] w-full object-cover sm:aspect-[16/9] sm:min-h-0"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="eyebrow-label">{eyebrow}</span>
        <h3 className="mt-3 max-w-2xl text-xl font-bold leading-tight text-foreground sm:mt-4 sm:text-3xl">
          {title}
        </h3>
        <p className="body-copy mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{children}</p>
      </div>
    </div>
  );
}
