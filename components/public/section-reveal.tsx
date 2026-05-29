"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap-setup";
import {
  PUBLIC_MOTION,
  PUBLIC_MOTION_SELECTORS,
  REDUCED_MOTION_QUERY,
} from "@/components/global/motion-guidelines";
import { cn } from "@/lib/utils";

export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(`(prefers-reduced-motion: no-preference)`, () => {
        const cardTargets = queryTargets(
          element,
          PUBLIC_MOTION_SELECTORS.card
        );
        const textTargets = queryTargets(
          element,
          PUBLIC_MOTION_SELECTORS.text
        ).filter((target) => !isInsideAny(target, cardTargets));

        const mediaTargets = cardTargets.filter(
          (target) =>
            target.matches("figure, .partner-media-panel") ||
            target.querySelector("img, video")
        );

        const motionTargets = [...textTargets, ...cardTargets];

        if (motionTargets.length > 0) {
          gsap.set(motionTargets, {
            autoAlpha: 0,
            willChange: "transform, opacity",
          });
        }

        if (textTargets.length > 0) {
          gsap.set(textTargets, { y: PUBLIC_MOTION.text.y });
        }

        if (cardTargets.length > 0) {
          gsap.set(cardTargets, {
            y: PUBLIC_MOTION.card.y,
            scale: PUBLIC_MOTION.card.scale,
          });
        }

        if (mediaTargets.length > 0) {
          gsap.set(mediaTargets, { transformOrigin: "50% 55%" });
        }

        const textTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: PUBLIC_MOTION.sectionStart,
            once: true,
          },
        });

        if (textTargets.length > 0) {
          textTimeline.to(textTargets, {
            autoAlpha: 1,
            y: 0,
            duration: PUBLIC_MOTION.text.duration,
            ease: PUBLIC_MOTION.ease,
            stagger: PUBLIC_MOTION.text.stagger,
            clearProps: "willChange",
          });
        }

        const revealCards = (targets: Element[] | HTMLElement[]) => {
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: PUBLIC_MOTION.card.duration,
            ease: PUBLIC_MOTION.ease,
            stagger: PUBLIC_MOTION.card.stagger,
            overwrite: true,
            clearProps: "willChange",
          });
        };

        const cardTriggers =
          cardTargets.length > 0
            ? ScrollTrigger.batch(cardTargets, {
                start: PUBLIC_MOTION.cardStart,
                once: true,
                interval: PUBLIC_MOTION.card.batchInterval,
                batchMax: () => (window.innerWidth < 768 ? 2 : 4),
                onEnter: revealCards,
              })
            : [];

        const visibleCards = cardTargets.filter(isInViewport);
        if (visibleCards.length > 0) {
          requestAnimationFrame(() => revealCards(visibleCards));
        }

        return () => {
          textTimeline.scrollTrigger?.kill();
          textTimeline.kill();
          cardTriggers.forEach((trigger) => trigger.kill());
        };
      });

      mm.add(REDUCED_MOTION_QUERY, () => {
        gsap.set(
          [
            element,
            ...queryTargets(element, PUBLIC_MOTION_SELECTORS.text),
            ...queryTargets(element, PUBLIC_MOTION_SELECTORS.card),
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clearProps: "willChange",
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      data-lead-motion-scope
      className={cn("opacity-100", className)}
    >
      {children}
    </div>
  );
}

function queryTargets(scope: HTMLElement, selector: string) {
  return Array.from(new Set(scope.querySelectorAll<HTMLElement>(selector)));
}

function isInsideAny(target: HTMLElement, containers: HTMLElement[]) {
  return containers.some(
    (container) => container !== target && container.contains(target)
  );
}

function isInViewport(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
}
