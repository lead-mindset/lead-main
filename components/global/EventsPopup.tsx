"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LEAD_EVENTS, type LeadEvent } from "@/data/events";
import styles from "./EventsPopup.module.css";

const DELAY_MS = 1500;
const HIDE_FOR_DAYS = 3;
const AUTOPLAY_MS = 6000;
const STORAGE_KEY = "lead_events_popup_closed";

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatEventDate(event: LeadEvent) {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const start = parseDate(event.date).toLocaleDateString("en-US", options);
  return event.endDate
    ? `${start} to ${parseDate(event.endDate).toLocaleDateString("en-US", options)}`
    : start;
}

function getActiveEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return LEAD_EVENTS.filter(
    (event) => parseDate(event.endDate || event.date) >= today,
  ).sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
}

export default function EventsPopup() {
  const [events] = useState<LeadEvent[]>(getActiveEvents);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setShowFab(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // Storage may be unavailable in privacy-focused browsers.
    }
  }, []);

  useEffect(() => {
    if (!events.length) return;

    let closedAt = 0;
    try {
      closedAt = Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      closedAt = 0;
    }

    const recentlyClosed =
      closedAt > 0 && Date.now() - closedAt < HIDE_FOR_DAYS * 86400000;

    if (recentlyClosed) {
      queueMicrotask(() => setShowFab(true));
    } else {
      const timeout = window.setTimeout(() => setIsOpen(true), DELAY_MS);
      return () => window.clearTimeout(timeout);
    }
  }, [events.length]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || events.length < 2) return;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % events.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [isOpen, events.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % events.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + events.length) % events.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, events.length, closePopup]);

  function openPopup() {
    setShowFab(false);
    setIsOpen(true);
  }

  function goTo(nextIndex: number) {
    setIndex((nextIndex + events.length) % events.length);
  }

  if (!events.length) return null;

  const activeEvent = events[index];

  return (
    <div className={styles.root}>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lep-title"
        aria-hidden={!isOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePopup();
        }}
      >
        <div className={styles.modal}>
          <button
            ref={closeRef}
            className={styles.close}
            type="button"
            aria-label="Close"
            onClick={closePopup}
          >
            &times;
          </button>

          <div className={styles.header}>
            <span className={styles.eyebrow}>Upcoming events</span>
            <h2 className={styles.title} id="lep-title">
              {events.length > 1
                ? "Join us at our next events"
                : "Join us at our next event"}
            </h2>
          </div>

          <div
            className={styles.viewport}
            onTouchStart={(event) => {
              touchStartRef.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartRef.current === null) return;
              const distance =
                event.changedTouches[0].clientX - touchStartRef.current;
              if (Math.abs(distance) > 40) {
                goTo(index + (distance < 0 ? 1 : -1));
              }
              touchStartRef.current = null;
            }}
          >
            <div
              className={styles.track}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {events.map((event, eventIndex) => (
                <div className={styles.slide} key={`${event.title}-${event.date}`}>
                  <article className={styles.card}>
                    {event.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={styles.image}
                        src={event.image}
                        alt=""
                        loading={eventIndex === 0 ? "eager" : "lazy"}
                      />
                    ) : (
                      <div className={styles.image} aria-hidden="true" />
                    )}
                    <div className={styles.body}>
                      <div className={styles.meta}>
                        {event.tag ? (
                          <span className={`${styles.chip} ${styles.chipTag}`}>
                            {event.tag}
                          </span>
                        ) : null}
                        <span className={styles.chip}>
                          {formatEventDate(event)}
                          {event.time ? ` · ${event.time}` : ""}
                        </span>
                        {event.location ? (
                          <span className={styles.chip}>{event.location}</span>
                        ) : null}
                      </div>
                      <h3 className={styles.eventName}>{event.title}</h3>
                      {event.description ? (
                        <p className={styles.description}>{event.description}</p>
                      ) : null}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div
              className={`${styles.nav} ${events.length < 2 ? styles.navHidden : ""}`}
            >
              <button
                className={styles.arrow}
                type="button"
                aria-label="Previous event"
                onClick={() => goTo(index - 1)}
              >
                &#8592;
              </button>
              <div className={styles.dots}>
                {events.map((event, dotIndex) => (
                  <button
                    className={`${styles.dot} ${dotIndex === index ? styles.dotActive : ""}`}
                    type="button"
                    aria-label={`Event ${dotIndex + 1}`}
                    aria-current={dotIndex === index ? "true" : undefined}
                    onClick={() => goTo(dotIndex)}
                    key={`${event.title}-${event.date}-dot`}
                  />
                ))}
              </div>
              <button
                className={styles.arrow}
                type="button"
                aria-label="Next event"
                onClick={() => goTo(index + 1)}
              >
                &#8594;
              </button>
            </div>
            <a
              className={`${styles.button} ${styles.primary}`}
              href={activeEvent.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeEvent.cta || "Register"}
            </a>
          </div>
        </div>
      </div>

      <button
        className={`${styles.fab} ${showFab ? styles.fabVisible : ""}`}
        type="button"
        aria-label="Show upcoming events"
        onClick={openPopup}
      >
        Upcoming events <span className={styles.count}>{events.length}</span>
      </button>
    </div>
  );
}
