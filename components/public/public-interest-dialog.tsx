"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { InterestForm } from "@/components/public/interest-form";
import {
  publicInterestDialogCloseClass,
  publicInterestDialogContentClass,
  publicInterestDialogHeaderClass,
} from "@/components/public/interest-dialog-styles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PublicInterestDialogProps = {
  triggerLabel: string;
  closeLabel: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ChapterInterestDialog() {
  return (
    <PublicInterestDialog
      triggerLabel="Submit chapter interest"
      closeLabel="Close chapter interest form"
      title="Request chapter interest"
      description="Tell us where you are, who is building with you, and why LEAD would matter on your campus. This is a request for review, not chapter approval."
    >
      <InterestForm
        kind="chapter_interest"
        defaultOpen
        showToggle={false}
        showHeader={false}
        className="border-0 bg-transparent p-0 shadow-none"
      />
    </PublicInterestDialog>
  );
}

export function PartnerInterestDialog() {
  return (
    <PublicInterestDialog
      triggerLabel="Start a partnership conversation"
      closeLabel="Close partnership form"
      title="Partner or collaborate with LEAD"
      description="Share what you want to build with students as a company, mentor, professional, sponsor, or community organization."
    >
      <InterestForm
        kind="partnership"
        defaultOpen
        showToggle={false}
        showHeader={false}
        className="border-0 bg-transparent p-0 shadow-none"
      />
    </PublicInterestDialog>
  );
}

function PublicInterestDialog({
  triggerLabel,
  closeLabel,
  title,
  description,
  children,
}: PublicInterestDialogProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeDialog = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget = window.setTimeout(() => {
      const firstField = dialogRef.current?.querySelector<HTMLElement>(
        "input:not([type='hidden']), textarea, select"
      );

      (firstField ?? dialogRef.current)?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(dialogRef.current);
      if (!focusableElements.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTarget);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDialog, open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={buttonVariants({ size: "lg", variant: "hero" })}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDialog();
              }}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                tabIndex={-1}
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-5 outline-none motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300",
                  publicInterestDialogContentClass
                )}
              >
                <button
                  type="button"
                  aria-label={closeLabel}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    publicInterestDialogCloseClass
                  )}
                  onClick={closeDialog}
                >
                  <X className="size-4" />
                </button>

                <div className={cn("grid", publicInterestDialogHeaderClass)}>
                  <h2
                    id={titleId}
                    className="font-headline text-xl font-bold leading-tight text-foreground"
                  >
                    {title}
                  </h2>
                  <p
                    id={descriptionId}
                    className="text-sm leading-6 text-muted-foreground md:text-pretty"
                  >
                    {description}
                  </p>
                </div>

                {children}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled]):not([type='hidden'])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    )
  ).filter((element) => element.offsetParent !== null);
}
