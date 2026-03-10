/**
 * Design: Deep Indigo Prestige — Thank You Page (Evergreen)
 * Same palette as registration page: deep indigo + warm cream + gold accents
 * Layout: Centred, celebratory, clear 3-step action flow (email + videos + workbook)
 * Tone: Warm confirmation + momentum — keep them engaged immediately
 *
 * VIDEOS: Add vimeo IDs, youtube IDs, or leave empty for placeholders.
 * Vimeo embed: use video ID from URL (e.g. vimeo.com/1172042745 → "1172042745")
 * YouTube embed: use video ID (e.g. "nuEhBT31KQw")
 */

import { useEffect } from "react";

// ── Config ───────────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: "IR08EzcqiqU", type: "youtube" as const, title: "Part 1" },
  { id: "InVBcVtHgek", type: "youtube" as const, title: "Part 2" },
  { id: "2iqgaHloj7c", type: "youtube" as const, title: "Part 3" },
];
const WORKBOOK_URL = "https://docs.google.com/document/d/13BUX1I58CGE97HqquLpbwIGeI3ZRlboJbXwUJ5FHo9s/edit?usp=sharing";

// ── Video block (Vimeo, YouTube, or placeholder) ───────────────────────────────
function VideoBlock({ video }: { video: (typeof VIDEOS)[number] }) {
  const containerStyle = {
    paddingBottom: "56.25%" as const,
    border: "1px solid rgba(212,168,71,0.2)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  };

  if (!video.id) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium" style={{ color: "rgba(212,168,71,0.9)", fontFamily: "var(--font-mono)" }}>
          {video.title}
        </p>
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={containerStyle}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{
              background: "rgba(18,16,58,0.9)",
              border: "2px dashed rgba(212,168,71,0.3)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,71,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <p className="text-sm font-medium" style={{ color: "rgba(212,168,71,0.9)", fontFamily: "var(--font-mono)" }}>
              Video placeholder
            </p>
            <p className="text-xs max-w-xs text-center" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "var(--font-body)" }}>
              Coming soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  const embedSrc =
    video.type === "vimeo"
      ? `https://player.vimeo.com/video/${video.id}`
      : `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&color=white`;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium" style={{ color: "rgba(212,168,71,0.9)", fontFamily: "var(--font-mono)" }}>
        {video.title}
      </p>
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={containerStyle}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedSrc}
          title={`NotebookLM Masterclass — ${video.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// ── Step icons ───────────────────────────────────────────────────────────────
const StepIcons = {
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  workbook: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
    </svg>
  ),
  play: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
};

// ── Step card component ───────────────────────────────────────────────────────
function StepCard({
  step, title, children, accent = false, icon,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
  icon?: keyof typeof StepIcons;
}) {
  const iconColor = "#D4A847";
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
      {/* Step number badge + icon */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              background: accent
                ? "linear-gradient(135deg, #C9903A, #D4A847)"
                : "rgba(212,168,71,0.15)",
              color: iconColor,
              fontFamily: "var(--font-mono)",
              boxShadow: accent ? "0 4px 16px rgba(212,168,71,0.3)" : "none",
            }}
          >
            {step}
          </div>
          {icon && (
            <span style={{ color: iconColor, display: "flex", opacity: 0.95 }}>
              {StepIcons[icon]}
            </span>
          )}
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
        You're in! Your access is confirmed.
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
          Your free access to the{" "}
          <strong style={{ color: "#F0EDE6" }}>NotebookLM Masterclass</strong> is confirmed.
          Complete the three steps below to get started.
        </p>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* ── STEP 1: Check Email ── */}
          <StepCard step="1" title="Check Your Email — Including Your Spam Folder" icon="email">
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
                <strong style={{ color: "#F0EDE6" }}>support@reachingimpact.com</strong> to your contacts.
              </p>
            </div>
          </StepCard>

          {/* ── STEP 2: Masterclass Workbook ── */}
          <StepCard step="2" title="Grab the Masterclass Workbook" accent icon="workbook">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}
            >
              Follow along with the masterclass using this workbook. It includes templates, prompts, and step-by-step guides so you can build your Personal Knowledge Stack and create pro visual content as you watch.
            </p>
            <a
              href={WORKBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: "rgba(212,168,71,0.15)",
                border: "1px solid rgba(212,168,71,0.4)",
                color: "#D4A847",
                fontFamily: "var(--font-mono)",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,168,71,0.25)";
                e.currentTarget.style.borderColor = "rgba(212,168,71,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212,168,71,0.15)";
                e.currentTarget.style.borderColor = "rgba(212,168,71,0.4)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Open Masterclass Workbook
            </a>
          </StepCard>

          {/* ── STEP 3: Watch the Masterclass (Videos) ── */}
          <StepCard step="3" title="Watch the Masterclass" icon="play">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}
            >
              Your masterclass is ready to watch. Press play below and learn how to build your Personal Knowledge Stack, create pro visual content, and connect NotebookLM to ChatGPT, Claude, and Gemini.
            </p>

            <div className="flex flex-col gap-8">
              {VIDEOS.map((video, i) => (
                <VideoBlock key={i} video={video} />
              ))}
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
            Shane walks you through three use cases from the{" "}
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
