/**
 * Design: Deep Indigo Prestige
 * Deep indigo (#12103A) + warm cream + gold accents
 * Fonts: Cormorant Garamond (display), Nunito Sans (body), Space Mono (data)
 * Layout: Full-bleed hero, asymmetric left-weighted headline, floating form card
 * Tone: Premium event, not a form. Authority + transformation + urgency.
 */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Lawrence Akers", quote: "When it comes to AI in the hypnotherapy world, the one person I ALWAYS recommend them to is Shane Fozard. Shane is easily one of the most invested and innovative when it comes to AI and generous in his sharing of that knowledge." },
  { name: "Vicki Walsh-Bud", quote: "Help your business move forward with some AI knowledge from Shane. In just over an hour of your time you will save so much work time in the future with this info, watch it now you won't regret it. Amazing session Shane, thank you." },
  { name: "Mark Engel", quote: "Very informative intro to using NotebookLM! Lots of great stuff here, will have to watch a few times to get all the info in it." },
  { name: "Mathias Philippe", quote: "Awesome masterclass, fast and informative for our business, and sweet spot, it makes infographics trendy again!" },
  { name: "Paul Levrant", quote: "Will share for sure — this is 100% useful in countless business models of course, not just for hypnotherapists." },
  { name: "Paul Levrant", quote: "Definitely worth every minute — but watch the recording twice too!" },
  { name: "Praveena", quote: "You have shown so many great tools and ideas Shane. Will wait for your slide and replay to rewatch and cement the learning. Great session. Thanks so much." },
] as const;

// ── Assets ────────────────────────────────────────────────────────────────────
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663026810709/CtcRapqkMU7HWrgU9oi7z3/hero-bg-i9XjzgtuRo5wPwDc9GhGAV.webp";
const AVATAR_RING = "https://d2xsxph8kpxj0f.cloudfront.net/310419663026810709/CtcRapqkMU7HWrgU9oi7z3/host-avatar-bg-6cjk6WPEGHrXtgu6g2wqX6.webp";
const NOTEBOOK_GRAPHIC = "https://d2xsxph8kpxj0f.cloudfront.net/310419663026810709/CtcRapqkMU7HWrgU9oi7z3/notebooklm-graphic-HLBREPp6sWqpkNbapsH65d.webp";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── What you'll learn card ────────────────────────────────────────────────────
function LearnCard({ number, title, description, image }: { number: string; title: string; description: string; image?: string }) {
  return (
    <div className="reveal border-gold-glow rounded-xl p-6 flex flex-col gap-3 transition-all duration-300 hover:bg-white/5"
      style={{ background: "rgba(30,27,75,0.5)", backdropFilter: "blur(8px)" }}>
      {image && (
        <img src={image} alt={title} className="w-full rounded-lg"
          style={{ border: "1px solid rgba(212,168,71,0.15)" }} />
      )}
      <div className="flex items-start gap-4">
        <span className="text-4xl font-bold shrink-0" style={{ fontFamily: "var(--font-mono)", color: "rgba(212,168,71,0.3)", lineHeight: 1 }}>
          {number}
        </span>
        <h3 className="text-xl font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.7)", fontFamily: "var(--font-body)" }}>
        {description}
      </p>
    </div>
  );
}

// ── Testimonial components ────────────────────────────────────────────────────
function TestimonialQuote({ name, quote, compact = false }: { name: string; quote: string; compact?: boolean }) {
  return (
    <div
      className={compact ? "py-2" : "py-4"}
      style={{ borderLeft: "3px solid rgba(212,168,71,0.5)", paddingLeft: compact ? 12 : 16 }}
    >
      <p
        className={compact ? "text-sm italic" : "text-base italic"}
        style={{ color: "rgba(240,237,230,0.9)", fontFamily: "var(--font-body)" }}
      >
        "{quote}"
      </p>
      <p className={`mt-1 ${compact ? "text-xs" : "text-sm"}`} style={{ color: "rgba(212,168,71,0.9)", fontFamily: "var(--font-mono)" }}>
        — {name}
      </p>
    </div>
  );
}

function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: "rgba(30,27,75,0.5)",
        border: "1px solid rgba(212,168,71,0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p className="text-sm leading-relaxed" style={{ color: "rgba(240,237,230,0.85)", fontFamily: "var(--font-body)" }}>
        "{quote}"
      </p>
      <p className="text-xs font-semibold" style={{ color: "#D4A847", fontFamily: "var(--font-mono)" }}>
        {name}
      </p>
    </div>
  );
}

// ── Value stack row ───────────────────────────────────────────────────────────
function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(212,168,71,0.15)" }}>
      <span className="text-sm" style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}>{label}</span>
      <span className="price-original text-sm font-semibold" style={{ fontFamily: "var(--font-mono)", color: "rgba(212,168,71,0.6)" }}>
        {value}
      </span>
    </div>
  );
}

// ── Registration form ─────────────────────────────────────────────────────────
function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      navigate("/thank-you");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
          required
          className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(212,168,71,0.25)",
            color: "#F0EDE6",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => { e.target.style.border = "1px solid rgba(212,168,71,0.7)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,168,71,0.1)"; }}
          onBlur={(e) => { e.target.style.border = "1px solid rgba(212,168,71,0.25)"; e.target.style.boxShadow = "none"; }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(212,168,71,0.25)",
            color: "#F0EDE6",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => { e.target.style.border = "1px solid rgba(212,168,71,0.7)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,168,71,0.1)"; }}
          onBlur={(e) => { e.target.style.border = "1px solid rgba(212,168,71,0.25)"; e.target.style.boxShadow = "none"; }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-shimmer w-full py-4 rounded-lg font-bold text-base mt-2 transition-all duration-300 pulse-gold"
        style={{
          background: "linear-gradient(135deg, #C9903A 0%, #D4A847 50%, #C9903A 100%)",
          color: "#12103A",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 24px rgba(212,168,71,0.35)",
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "translateY(-1px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 32px rgba(212,168,71,0.5)"; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 4px 24px rgba(212,168,71,0.35)"; }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Securing Your Spot...
          </span>
        ) : (
          "YES — Reserve My FREE Spot Now"
        )}
      </button>
      <p className="text-center text-xs" style={{ color: "rgba(240,237,230,0.45)", fontFamily: "var(--font-body)" }}>
        No spam. Unsubscribe anytime. Your details are safe.
      </p>
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ background: "#0D0B2E", color: "#F0EDE6" }}>

      {/* ── TOP URGENCY BANNER ── */}
      <div className="w-full py-2.5 px-4 text-center text-xs font-semibold tracking-wide"
        style={{ background: "linear-gradient(90deg, #8B6914, #D4A847, #8B6914)", color: "#12103A", fontFamily: "var(--font-mono)" }}>
        ⚡ This masterclass is normally $27 — Register FREE for instant access
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,11,46,0.15) 0%, rgba(13,11,46,0.55) 50%, rgba(13,11,46,0.98) 100%)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: Headline & Info ── */}
            <div className="flex flex-col gap-6 pt-4">
              {/* Event badge */}
              <div className="animate-fade-up">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: "rgba(212,168,71,0.15)", border: "1px solid rgba(212,168,71,0.4)", color: "#D4A847", fontFamily: "var(--font-mono)" }}>
                  Free Masterclass
                </span>
              </div>

              {/* Main headline */}
              <div className="animate-fade-up-delay-1">
                <h1 className="leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700, color: "#F0EDE6" }}>
                  <span style={{
                    background: "linear-gradient(135deg, #C9903A, #D4A847)",
                    color: "#12103A",
                    padding: "0 0.35em",
                    borderRadius: "0.2em",
                    display: "inline",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }}>Hypnotherapists:</span>
                  <br />
                  <span className="text-gold-gradient">How to Get the Most</span>
                  <br />
                  Out of Google's
                  <br />
                  NotebookLM AI
                </h1>
              </div>

              {/* Subheadline */}
              <p className="animate-fade-up-delay-2 text-lg leading-relaxed max-w-lg"
                style={{ color: "rgba(240,237,230,0.8)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                The free AI tool that will polish your practice, amplify your expertise, and give your business a professional edge.
              </p>

              {/* Price signal */}
              <div className="animate-fade-up-delay-3 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="price-original text-xl font-semibold" style={{ fontFamily: "var(--font-mono)", color: "rgba(240,237,230,0.4)" }}>$97</span>
                  <span className="price-original text-lg" style={{ fontFamily: "var(--font-mono)", color: "rgba(240,237,230,0.35)" }}>$27</span>
                  <span className="px-4 py-1.5 rounded-full text-lg font-bold pulse-gold"
                    style={{ background: "rgba(212,168,71,0.2)", border: "2px solid rgba(212,168,71,0.6)", color: "#D4A847", fontFamily: "var(--font-mono)" }}>
                    FREE
                  </span>
                </div>
                <span className="text-xs" style={{ color: "rgba(240,237,230,0.5)", fontFamily: "var(--font-body)" }}>
                  Instant access
                </span>
              </div>

            </div>

            {/* ── RIGHT: Registration Form Card ── */}
            <div className="animate-fade-up-delay-2 lg:sticky lg:top-8">
              <div className="rounded-2xl p-8 border-gold-glow"
                style={{ background: "rgba(18,16,58,0.85)", backdropFilter: "blur(20px)" }}>
                {/* Form header */}
                <div className="text-center mb-6">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
                    Secure Your Free Seat
                  </p>
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
                    Join the Free Masterclass
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(240,237,230,0.55)", fontFamily: "var(--font-body)" }}>
                    Normally <span className="price-original" style={{ fontFamily: "var(--font-mono)" }}>$97</span> · Today: <strong style={{ color: "#D4A847" }}>FREE</strong>
                  </p>
                </div>

                <RegistrationForm />
                <TestimonialQuote
                  name={TESTIMONIALS[5].name}
                  quote={TESTIMONIALS[5].quote}
                  compact
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <section className="py-20" style={{ background: "rgba(18,16,58,0.6)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
              Inside This Masterclass
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
              Three Use Cases That Help You
              <br />
              <span className="text-gold-gradient">Scale Toward 6 Figures</span>
            </h2>
            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.65)", fontFamily: "var(--font-body)" }}>
              Part of the <strong style={{ color: "rgba(212,168,71,0.95)" }}>AI-Assisted 6-Figure Hypnosis Business Collective</strong> — practical AI that grows your practice without burning you out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <LearnCard
              number="01"
              title="Your Personal Knowledge Stack (PKS)"
              description="Turn your services, offers, research, articles, and videos into one AI-powered knowledge base. Stop digging through notes and start answering clients, creating content, and positioning yourself as the go-to expert — so you can charge what you're worth."
              image="https://i.ibb.co/6c7ZyFvN/notebooklm-uc1.png"
            />
            <LearnCard
              number="02"
              title="Pro Visual Content From Your PKS"
              description="Use NotebookLM to generate infographics, presentations, and video scripts that are 100% grounded in your own methodology. Look premium and consistent everywhere you show up — without a designer or hours of guesswork."
              image="https://i.ibb.co/x87zdTbh/notebooklm-uc2.png"
            />
            <LearnCard
              number="03"
              title="NotebookLM + ChatGPT, Claude & Gemini"
              description="Combine NotebookLM with ChatGPT, Claude, or Gemini to get advanced workflows and full access to your PKS inside the tools you already use. More power, less fragmentation — so you can focus on high-ticket work, not busywork."
              image="https://i.ibb.co/Q75WLdHv/notebooklm-uc3.png"
            />
          </div>

          {/* What practitioners are saying */}
          <div className="mt-16 reveal">
            <p className="text-xs uppercase tracking-widest mb-6 text-center" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
              What Practitioners Are Saying
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <TestimonialCard name={TESTIMONIALS[2].name} quote={TESTIMONIALS[2].quote} />
              <TestimonialCard name={TESTIMONIALS[3].name} quote={TESTIMONIALS[3].quote} />
              <TestimonialCard name={TESTIMONIALS[4].name} quote={TESTIMONIALS[4].quote} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTEBOOKLM GRAPHIC + DESCRIPTION ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="reveal">
              <img src="https://i.ibb.co/chnXPMT8/notebooklm-diagrm.png" alt="NotebookLM AI Knowledge Graph" className="w-full rounded-2xl"
                style={{ border: "1px solid rgba(212,168,71,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
            </div>
            <div className="reveal flex flex-col gap-5">
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
                Why NotebookLM
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
                Your Knowledge, Amplified.<br />
                <span className="text-gold-gradient">Not Someone Else's.</span>
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}>
                Unlike generic AI tools, NotebookLM only works from what you give it. That means every output is grounded in your own expertise, your own voice, and your own methodology. It doesn't make things up — it makes you look like the expert you already are.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}>
                In this masterclass, Shane will show you exactly how to build your Personal Knowledge Stack (PKS), use it to create standout visual content, and connect it to ChatGPT, Claude, and Gemini — so you can scale your practice toward 6 figures without trading more time for money.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["100% Free", "No Tech Skills Needed", "Works on Any Device", "Instant Results"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs"
                    style={{ background: "rgba(212,168,71,0.1)", border: "1px solid rgba(212,168,71,0.3)", color: "#D4A847", fontFamily: "var(--font-mono)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section className="py-20" style={{ background: "rgba(18,16,58,0.6)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 reveal">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
                What You're Getting
              </p>
              <h2 className="text-4xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
                The Value Stack
              </h2>
            </div>
            <div className="reveal rounded-2xl p-8 border-gold-glow" style={{ background: "rgba(18,16,58,0.8)" }}>
              <ValueRow label="Live 45-Minute Masterclass with Shane Fozard" value="$97" />
              <ValueRow label="Personal Knowledge Stack (PKS) Setup — services, offers, research, content" value="$27" />
              <ValueRow label="Visual Content Workflow: Infographics, Presentations & Video from your PKS" value="$27" />
              <ValueRow label="NotebookLM + ChatGPT / Claude / Gemini Integration Guide" value="$27" />
              <ValueRow label="Live Q&A Session" value="$47" />
              <div className="flex items-center justify-between pt-5 mt-2">
                <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)", color: "#F0EDE6" }}>
                  Total Value
                </span>
                <div className="flex items-center gap-3">
                  <span className="price-original text-xl" style={{ fontFamily: "var(--font-mono)", color: "rgba(240,237,230,0.4)" }}>$225</span>
                  <span className="text-3xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-mono)" }}>FREE</span>
                </div>
              </div>
            </div>
            <div className="mt-8 reveal">
              <TestimonialQuote name={TESTIMONIALS[5].name} quote={TESTIMONIALS[5].quote} compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOST BIO ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto reveal">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                <img src="https://i.ibb.co/zDgr3bv/shane-profile.png" alt="Shane Fozard"
                  className="w-48 rounded-2xl object-cover"
                  style={{ border: "1px solid rgba(212,168,71,0.3)", boxShadow: "0 0 30px rgba(212,168,71,0.15)" }} />
              </div>
              {/* Bio */}
              <div className="flex flex-col gap-3 text-center md:text-left">
                <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
                  Your Host
                </p>
                <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
                  Shane Fozard
                </h2>
                <p className="text-sm font-medium" style={{ color: "#D4A847", fontFamily: "var(--font-body)" }}>
                  Hypnotherapy Trainer · Coach · Founder · AI Solutions Architect
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(240,237,230,0.75)", fontFamily: "var(--font-body)" }}>
                  Shane has spent years helping hypnotherapists build practices that reflect the depth of their expertise. Now, he's combining that knowledge with cutting-edge AI tools to give practitioners a genuine competitive advantage in the modern market. This masterclass distils years of experience into one focused, actionable session.
                </p>
                <TestimonialQuote name={TESTIMONIALS[0].name} quote={TESTIMONIALS[0].quote} compact />
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-1">
                  {["Hypnotherapy Trainer", "AI Solutions Architect", "Business Coach", "Founder"].map((badge) => (
                    <span key={badge} className="px-3 py-1 rounded-full text-xs"
                      style={{ background: "rgba(212,168,71,0.08)", border: "1px solid rgba(212,168,71,0.25)", color: "rgba(212,168,71,0.9)", fontFamily: "var(--font-mono)" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, rgba(212,168,71,0.08) 0%, transparent 70%)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center reveal">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(212,168,71,0.8)", fontFamily: "var(--font-mono)" }}>
            Don't Miss This
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", color: "#F0EDE6" }}>
            This Masterclass Is Free.
            <br />
            <span className="text-gold-gradient">Register Now for Instant Access.</span>
          </h2>
          <p className="text-lg mb-6 max-w-xl mx-auto" style={{ color: "rgba(240,237,230,0.7)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
            Normally $27 — register free and get instant access to the full masterclass.
          </p>
          <div className="max-w-lg mx-auto mb-8 reveal">
            <TestimonialQuote name={TESTIMONIALS[1].name} quote={TESTIMONIALS[1].quote} />
          </div>
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl p-8 border-gold-glow" style={{ background: "rgba(18,16,58,0.85)", backdropFilter: "blur(20px)" }}>
              <RegistrationForm />
            </div>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(240,237,230,0.35)", fontFamily: "var(--font-body)" }}>
            Instant access · Watch anytime
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(212,168,71,0.1)" }}>
        <p className="text-xs" style={{ color: "rgba(240,237,230,0.3)", fontFamily: "var(--font-body)" }}>
          © 2026 Shane Fozard. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
