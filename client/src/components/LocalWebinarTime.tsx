/**
 * Renders the webinar start time in the visitor's local timezone.
 * Uses Intl so US/UK etc. see e.g. "3:00 PM EST" instead of only "7:00 AM AEDT".
 * Renders after mount to avoid hydration mismatch.
 */

import { useEffect, useState } from "react";

const WEBINAR_DATE = new Date("2026-03-10T07:00:00+11:00");

type Format = "long" | "short" | "pill";

function formatInLocal(format: Format): string {
  if (format === "long") {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(WEBINAR_DATE);
  }
  if (format === "short") {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(WEBINAR_DATE);
  }
  // pill: "Tue 9 Mar · 3:00 PM EST"
  const parts = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).formatToParts(WEBINAR_DATE);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  return `${weekday} ${day} ${month} · ${hour}:${minute} ${tz}`;
}

const goldMono = {
  color: "rgba(212,168,71,0.9)",
  fontFamily: "var(--font-mono)",
} as const;

type Props = {
  format?: Format;
  showLabel?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function LocalWebinarTime({
  format = "long",
  showLabel = true,
  label = "Your time:",
  className = "",
  style = {},
}: Props) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setText(formatInLocal(format));
  }, [format]);

  if (text === null) return null;

  const content = (
    <span className={className} style={{ ...goldMono, ...style }}>
      {text}
    </span>
  );

  if (!showLabel) return content;

  return (
    <span>
      <span style={{ color: "rgba(212,168,71,0.7)", fontFamily: "var(--font-mono)", fontSize: "inherit" }}>
        {label}{" "}
      </span>
      {content}
    </span>
  );
}

/** For use in a pill/badge: returns just the formatted string so parent can style. */
export function useLocalWebinarTime(format: Format = "pill"): string | null {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    setText(formatInLocal(format));
  }, [format]);
  return text;
}
