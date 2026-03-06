/**
 * Design: Deep Indigo Prestige — Thank You Page
 * Same palette as registration page: deep indigo + warm cream + gold accents
 * Fonts: Outfit (display/headings), Nunito Sans (body), Space Mono (data/labels)
 * Layout: Centred, celebratory, clear 3-step action flow
 * Tone: Warm confirmation + momentum — keep them engaged immediately
 *
 * Webinar: Tuesday 10 March 2026 at 7:00 AM AEDT (UTC+11)
 * Zoom link: placeholder — replace ZOOM_LINK constant before going live
 * Bonus video: "Every Essential AI Skill in 25 Minutes (2025)" by Tina Huang
 *   YouTube ID: nuEhBT31KQw
 */

import { LocalWebinarTime, useLocalWebinarTime } from "@/components/LocalWebinarTime";
import { useEffect, useState } from "react";

// ── Config — update ZOOM_LINK before going live ───────────────────────────────
const ZOOM_LINK = "https://zoom.us/j/REPLACE_WITH_YOUR_ZOOM_LINK";
const WEBINAR_TITLE = "Hypnotherapists: How to Get the Most Out of Google's NotebookLM AI";
const WEBINAR_DATE_DISPLAY = "Tuesday 10 March 2026 at 7:00 AM AEDT";
// ISO 8601 for calendar links (UTC equivalent of 7:00 AM AEDT = 8:00 PM UTC on 9 March)
const START_UTC = "20260309T200000Z";
const END_UTC   = "20260309T213000Z"; // 45 minutes
const YOUTUBE_VIDEO_ID = "nuEhBT31KQw";

// ── Calendar link generators ──────────────────────────────────────────────────
function buildGoogleCalLink() {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent(WEBINAR_TITLE);
  const details = encodeURIComponent(
    `Join the free masterclass here: ${ZOOM_LINK}\n\nHosted by Shane Fozard — Hypnotherapy Trainer, Coach & AI Solutions Architect.`
  );
  const location = encodeURIComponent(ZOOM_LINK);
  return `${base}&text=${text}&dates=${START_UTC}/${END_UTC}&details=${details}&location=${location}`;
}

function buildICalContent() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shane Fozard//Hypnotherapy Masterclass//EN",
    "BEGIN:VEVENT",
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${WEBINAR_TITLE}`,
    `DESCRIPTION:Join the free masterclass here: ${ZOOM_LINK}\\n\\nHosted by Shane Fozard — Hypnotherapy Trainer\\, Coach & AI Solutions Architect.`,
    `LOCATION:${ZOOM_LINK}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICal() {
  const content = buildICalContent();
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hypnotherapy-notebooklm-masterclass.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function buildOutlookLink() {
  // Outlook web calendar
  const base = "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent";
  const subject = encodeURIComponent(WEBINAR_TITLE);
  const body = encodeURIComponent(`Join the free masterclass here: ${ZOOM_LINK}`);
  const location = encodeURIComponent(ZOOM_LINK);
  // Outlook uses local ISO format
  const start = encodeURIComponent("2026-03-10T07:00:00+11:00");
  const end   = encodeURIComponent("2026-03-10T07:45:00+11:00");
  return `${base}&subject=${subject}&body=${body}&location=${location}&startdt=${start}&enddt=${end}`;
}

// ── Your time pill (local timezone) ──────────────────────────────────────────
function ThankYouYourTimePill() {
  const localTime = useLocalWebinarTime("pill");
  if (!localTime) return null;
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
      style={{
        background: "rgba(212,168,71,0.12)",
        border: "1px solid rgba(212,168,71,0.3)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <span style={{ color: "rgba(212,168,71,0.9)" }}>Your time</span>
      <span className="font-bold" style={{ color: "#D4A847" }}>{localTime}</span>
    </div>
  );
}

// ── Calendar button component ─────────────────────────────────────────────────
function CalButton({
  icon, label, onClick, href,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const base =
    "flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border";
  const style = {
    background: "rgba(212,168,71,0.08)",
    borderColor: "rgba(212,168,71,0.3)",
    color: "#F0EDE6",
    fontFamily: "var(--font-body)",
  };
  const hoverStyle = {
    background: "rgba(212,168,71,0.18)",
    borderColor: "rgba(212,168,71,0.6)",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        style={style}
        onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, hoverStyle)}
        onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, style)}
      >
        {icon}
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className={base}
      style={style}
      onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, hoverStyle)}
      onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, style)}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Step card component ───────────────────────────────────────────────────────
function StepCard({
  step, title, children, accent = false,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="relative rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300"
      style={{
        background: accent ? "rgba(212,168,71,0.07)" : "rgba(30,27,75,0.55)",
        border: accent
          ? "1px solid rgba(212,168,71,0.45)"
          : "1px solid rgba(212,168,71,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: accent
          ? "0 0 40px rgba(212,168,71,0.08), 0 8px 32px rgba(0,0,0,0.3)"
          : "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {/* Step number badge */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold"
          style={{
            background: accent
              ? "linear-gradient(135deg, #C9903A, #D4A847)"
              : "rgba(212,168,71,0.15)",
            color: accent ? "#12103A" : "#D4A847",
            fontFamily: "var(--font-mono)",
            boxShadow: accent ? "0 4px 16px rgba(212,168,71,0.3)" : "none",
          }}
        >
          {step}
        </div>
        <h3
          className="text-xl font-semibold leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ── Confetti burst (CSS only) ─────────────────────────────────────────────────
function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            background: i % 3 === 0 ? "#D4A847" : i % 3 === 1 ? "#EDE9FE" : "#C9903A",
            animation: `confettiFall ${1.2 + Math.random() * 1.5}s ${Math.random() * 0.8}s ease-in forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ThankYou() {
  const [calOpen, setCalOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#0D0B2E", color: "#F0EDE6" }}>

      {/* ── CONFETTI ── */}
      <ConfettiBurst />

      {/* ── HEADER CONFIRMATION STRIP ── */}
      <div
        className="w-full py-3 px-4 text-center text-sm font-semibold"
        style={{
          background: "linear-gradient(90deg, #8B6914, #D4A847, #8B6914)",
          color: "#12103A",
          fontFamily: "var(--font-mono)",
        }}
      >
        You're in! Your seat is confirmed for Tuesday 10 March 2026 at 7:00 AM AEDT
        {" — "}
        <LocalWebinarTime format="short" label="Your time: " />
      </div>

      {/* ── HERO CONFIRMATION ── */}
      <section className="pt-16 pb-10 text-center px-4">
        {/* Checkmark circle */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: "rgba(212,168,71,0.12)",
            border: "2px solid rgba(212,168,71,0.5)",
            boxShadow: "0 0 40px rgba(212,168,71,0.2)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4A847" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}
        >
          Registration Confirmed
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}
        >
          You're All Set,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4A847 0%, #F0D080 50%, #C9903A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome Aboard!
          </span>
        </h1>
        <p
          className="text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          Your free seat for the{" "}
          <strong style={{ color: "#F0EDE6" }}>NotebookLM Masterclass</strong> is confirmed.
          Complete the three steps below to make sure you don't miss a thing.
        </p>

        {/* Date pill */}
        <div className="inline-flex flex-col items-center gap-2 mt-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: "rgba(212,168,71,0.1)", border: "1px solid rgba(212,168,71,0.3)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "#D4A847", fontFamily: "var(--font-mono)" }}>
              {WEBINAR_DATE_DISPLAY}
            </span>
          </div>
          <span className="text-xs" style={{ color: "rgba(212,168,71,0.75)", fontFamily: "var(--font-mono)" }}>
            <LocalWebinarTime format="long" label="In your timezone: " />
          </span>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* ── STEP 1: Check Email ── */}
          <StepCard step="1" title="Check Your Email — Including Your Spam Folder">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}
            >
              A confirmation email with your joining details has just been sent to you. If you don't see it in your inbox within the next few minutes, please check your{" "}
              <strong style={{ color: "#D4A847" }}>spam or junk folder</strong> — it sometimes ends up there.
            </p>
            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: "rgba(212,168,71,0.06)", border: "1px solid rgba(212,168,71,0.2)" }}
            >
              <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "var(--font-body)" }}>
                To make sure you receive all future updates, mark the email as{" "}
                <strong style={{ color: "#F0EDE6" }}>Not Spam</strong> and add{" "}
                <strong style={{ color: "#F0EDE6" }}>shane@shanefozard.com</strong> to your contacts.
              </p>
            </div>
          </StepCard>

          {/* ── STEP 2: Add to Calendar ── */}
          <StepCard step="2" title="Add the Masterclass to Your Calendar" accent>
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}
            >
              Don't rely on memory. Add the masterclass to your calendar now so you get a reminder before we go live. The Zoom link is included in the calendar event.
            </p>

            {/* Calendar buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Google Calendar */}
              <CalButton
                href={buildGoogleCalLink()}
                label="Google Calendar"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
              {/* iCal / Apple Calendar */}
              <CalButton
                onClick={downloadICal}
                label="Apple / iCal"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
              />
              {/* Outlook */}
              <CalButton
                href={buildOutlookLink()}
                label="Outlook"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
            </div>

            {/* Timezone reminder */}
            <div className="flex flex-wrap gap-2 pt-1">
              <ThankYouYourTimePill />
              {[
                { label: "Sydney (AEDT)", time: "Tue 10 Mar · 7:00 AM" },
                { label: "London (GMT)", time: "Mon 9 Mar · 8:00 PM" },
                { label: "New York (EST)", time: "Mon 9 Mar · 3:00 PM" },
                { label: "Los Angeles (PST)", time: "Mon 9 Mar · 12:00 PM" },
              ].map((z) => (
                <div
                  key={z.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "rgba(212,168,71,0.08)",
                    border: "1px solid rgba(212,168,71,0.2)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span style={{ color: "rgba(212,168,71,0.7)" }}>{z.label}</span>
                  <span className="font-bold" style={{ color: "#D4A847" }}>{z.time}</span>
                </div>
              ))}
            </div>
          </StepCard>

          {/* ── STEP 3: Bonus Video ── */}
          <StepCard step="3" title="Watch This Bonus Training While You Wait">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}
            >
              Get a head start before the masterclass. This 25-minute video gives you a clear, jargon-free overview of what AI can actually do for your business right now. It's the perfect primer before we dive into NotebookLM together.
            </p>

            {/* Video label */}
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(212,168,71,0.12)",
                  border: "1px solid rgba(212,168,71,0.3)",
                  color: "#D4A847",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Bonus Training
              </span>
              <span className="text-xs" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "var(--font-body)" }}>
                25 min · Every Essential AI Skill (2025)
              </span>
            </div>

            {/* YouTube embed */}
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                paddingBottom: "56.25%",
                border: "1px solid rgba(212,168,71,0.2)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
                title="Every Essential AI Skill in 25 Minutes (2025)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </StepCard>

        </div>
      </section>

      {/* ── TEASER: WHAT'S COMING ── */}
      <section
        className="py-16 px-4"
        style={{ background: "rgba(18,16,58,0.6)", borderTop: "1px solid rgba(212,168,71,0.1)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}
          >
            Coming Up in the Masterclass
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}
          >
            Here's What We'll Cover Together
          </h2>
          <p
            className="leading-relaxed mb-8"
            style={{ color: "rgba(240,237,230,0.65)", fontFamily: "var(--font-body)" }}
          >
            On Tuesday, Shane will walk you through three use cases from the{" "}
            <strong style={{ color: "rgba(212,168,71,0.95)" }}>AI-Assisted 6-Figure Hypnosis Business Collective</strong> — so you can scale your practice without burning out.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              {
                num: "01",
                title: "Your Personal Knowledge Stack (PKS)",
                desc: "Services, offers, research & content in one AI-powered knowledge base",
              },
              {
                num: "02",
                title: "Pro Visual Content From Your PKS",
                desc: "Infographics, presentations & video scripts grounded in your methodology",
              },
              {
                num: "03",
                title: "NotebookLM + ChatGPT, Claude & Gemini",
                desc: "Advanced workflows and PKS access inside the tools you already use",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(30,27,75,0.5)",
                  border: "1px solid rgba(212,168,71,0.12)",
                }}
              >
                <span
                  className="text-3xl font-bold block mb-2"
                  style={{ color: "rgba(212,168,71,0.25)", fontFamily: "var(--font-mono)" }}
                >
                  {item.num}
                </span>
                <h4
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}
                >
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "var(--font-body)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-4 text-center"
        style={{ borderTop: "1px solid rgba(212,168,71,0.08)" }}
      >
        <p className="text-xs" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "var(--font-body)" }}>
          © 2026 Shane Fozard. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
