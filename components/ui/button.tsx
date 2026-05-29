import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--lead-radius-button)] text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "button-gradient-primary text-primary-foreground shadow-sm hover:shadow-[0_14px_34px_rgba(126,86,226,0.24)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        success:
          "bg-success/10 text-success ring-1 ring-success/30 hover:bg-success/20",
        warning:
          "bg-warning/10 text-warning ring-1 ring-warning/30 hover:bg-warning/20",
        info:
          "bg-info/10 text-info ring-1 ring-info/30 hover:bg-info/20",
        outline:
          "border border-border bg-background shadow-xs hover:bg-muted hover:text-foreground",
        secondary:
          "bg-muted text-foreground ring-1 ring-border shadow-xs hover:bg-muted/80",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        glass:
          "bg-card/80 text-foreground ring-1 ring-border backdrop-blur hover:bg-card",
        brand: "button-gradient-primary text-primary-foreground shadow-sm hover:shadow-[0_14px_34px_rgba(126,86,226,0.24)]",
        hero: "button-gradient-primary px-7 text-primary-foreground shadow-sm hover:shadow-[0_14px_34px_rgba(126,86,226,0.24)]",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
        filled: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        tonal: "bg-muted text-foreground ring-1 ring-border shadow-xs hover:bg-muted/80",
        outlined: "border border-border bg-background shadow-xs hover:bg-muted hover:text-foreground",
        text: "h-auto px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-11 px-6 text-base has-[>svg]:px-5",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
