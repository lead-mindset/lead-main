import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "accent" | "primary" | "muted";
  size?: "sm" | "md";
}

const sectionLabelVariants = {
  accent: "text-accent",
  primary: "text-primary",
  muted: "text-muted-foreground",
};

const sectionLabelSizes = {
  sm: "text-xs",
  md: "text-sm",
};

export function SectionLabel({
  children,
  variant = "accent",
  size = "md",
  className,
  ...props
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "mb-4 block font-bold uppercase tracking-normal",
        sectionLabelVariants[variant],
        sectionLabelSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
