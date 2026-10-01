import * as React from "react";

import { cn } from "@/lib/cn";

type MainContainerMaxWidth =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: MainContainerMaxWidth;
}

const maxWidthClasses: Record<MainContainerMaxWidth, string> = {
  sm: "max-w-[30rem]",
  md: "max-w-[35rem]",
  lg: "max-w-[40rem]",
  xl: "max-w-[45rem]",
  "2xl": "max-w-[53rem]",
  "3xl": "max-w-[60rem]",
  "4xl": "max-w-[70rem]",
  "5xl": "max-w-5xl",
  "6xl": "max-w-[68rem]",
  "7xl": "max-w-[72rem]",
};

export function MainContainer({
  children,
  className,
  maxWidth = "7xl",
  ...props
}: MainContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
