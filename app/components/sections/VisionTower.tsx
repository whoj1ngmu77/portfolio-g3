"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DistrictHeader from "@/app/components/ui/DistrictHeader";
import { VISION_CARDS, MISSION_LOG } from "@/app/lib/data";

// ── Floating particles around the tower ──────────────────────
function TowerParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${5 + i * 5.2}%`,
    top: `${10 + (i % 6) * 14}%`,
    size: 2 + (i % 3),
    dur: 4 + i * 0.6,
    del: i * 0.4,
    color: i % 3 === 0 ? "var(--brass)" : i % 3 === 1 ? "var(--teal)" : "var(--lavender)",
  }));

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

// ── Tower SVG illustration ────────────────────────────────────
function TowerIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 200"
      style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(60px, 8vw, 110px)",
        opacity: 0.08,
        pointerEvents: "none",
      }}
    >
      {/* Base */}
      <rect x="48" y="160" width="24" height="40" rx="2" fill="var(--brass)" />
      {/* Mid tower */}
      <rect x="44" y="100" width="32" height="65" rx="2" fill="var(--brass)" />
      {/* Upper tower */}
      <rect x="50" y="50" width="20" height="55" rx="2" fill="var(--brass)" />
      {/* Spire */}
      <rect x="58" y="10" width="4" height="44" rx="1" fill="var(--brass)" />
      {/* Tip glow */}
      <circle cx="60" cy="8" r="5" fill="var(--brass)" opacity="0.9" />
      {/* Windows */}
      <rect x="50" y="108" width="4" height="5" rx="1" fill="var(--teal)" opacity="0.8" />
      <rect x="58" y="108" width="4" height="5" rx="1" fill="var(--teal)" opacity="0.6" />
      <rect x="66" y="108" width="4" height="5" rx="1" fill="var(--brass)" opacity="0.7" />
      <rect x="50" y="120" width="4" height="5" rx="1" fill="var(--brass)" opacity="0.5" />
      <rect x="66" y="120" width="4" height="5" rx="1" fill="var(--teal)" opacity="0.6" />
      <rect x="54" y="58" width="3" height="4" rx="1" fill="var(--teal)" opacity="0.8" />
      <rect x="63" y="58" width="3" height="4" rx="1" fill="var(--brass)" opacity="0.7" />
      <rect x="54" y="68" width="3" height="4" rx="1" fill="var(--brass)" opacity="0.5" />
    </svg>
  );
}

// ── Vision card ───────────────────────────────────────────────
function VisionCard({
  card,
  index,
}: {
  card: typeof VISION_CARDS[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.10, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}
      aria-label={card.title}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${card.accentColor}, transparent)`,
          opacity: 0.8,
        }}
      />

      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: 80, height: 80,
          background: `radial-gradient(circle at top right, ${card.accentColor}18, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 44, height: 44,
          borderRadius: "var(--radius-md)",
          background: `${card.accentColor}15`,
          border: `1px solid ${card.accentColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem",
          marginBottom: "1rem",
          boxShadow: `0 0 14px ${card.accentColor}20`,
        }}
        aria-hidden="true"
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}
      >
        {card.title}
      </h3>

      {/* Content */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.88rem",
          lineHeight: 1.75,
        }}
      >
        {card.content}
      </p>
    </motion.article>
  );
}

// ── Mission Log terminal ──────────────────────────────────────
function MissionLog() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const lines = [
    { label: "CURRENT OBJECTIVE", value: MISSION_LOG.objective, color: "var(--teal)" },
    null, // spacer
    { label: "CURRENT FOCUS", value: null, color: "var(--brass)" },
    ...MISSION_LOG.focus.map((f) => ({ label: null, value: `• ${f}`, color: "var(--text-secondary)" })),
    null,
    { label: "CORE VALUES", value: null, color: "var(--brass)" },
    ...MISSION_LOG.values.map((v) => ({ label: null, value: `• ${v}`, color: "var(--text-secondary)" })),
    null,
    { label: "CITY STATUS", value: MISSION_LOG.cityStatus, color: "var(--bloom)" },
    { label: "VERSION", value: MISSION_LOG.version, color: "var(--lavender)" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const tick = () => {
            i++;
            setVisibleLines(i);
            if (i < lines.length) setTimeout(tick, 90);
          };
          setTimeout(tick, 300);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lines.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--glow-card), 0 0 40px rgba(212,168,67,0.08)",
      }}
      aria-label="Nimbara Mission Log"
    >
      {/* Glow border top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, var(--teal), var(--brass), var(--lavender))",
        }}
      />

      {/* Terminal header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", gap: "0.35rem" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} aria-hidden="true" />
          ))}
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--brass)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          NIMBARA MISSION LOG
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--bloom)",
          }}
          aria-hidden="true"
        >
          ●  LIVE
        </motion.span>
      </div>

      {/* Terminal content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
        }}
        aria-label="Mission log entries"
      >
        {lines.slice(0, visibleLines).map((line, i) => {
          if (line === null) {
            return <div key={i} style={{ height: "0.5rem" }} />;
          }
          return (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              {line.label && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: line.color,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    minWidth: 130,
                  }}
                >
                  {line.label}
                  {line.value ? ":" : ""}
                </span>
              )}
              {line.value && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: line.label ? line.color : "var(--text-secondary)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {line.value}
                  {/* Cursor on last visible line */}
                  {i === visibleLines - 1 && visibleLines < lines.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ display: "inline-block", marginLeft: 2 }}
                      aria-hidden="true"
                    >
                      ▋
                    </motion.span>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────
export default function VisionTower() {
  return (
    <section
      id="vision"
      aria-label="Vision — The Vision Tower"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, transparent 100%)",
      }}
    >
      {/* Upward motion gradient — feels like rising */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(212,168,67,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <TowerParticles />

      {/* Tower illustration */}
      <TowerIllustration />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>
        <DistrictHeader
          districtName="The Vision Tower"
          title="Not where I've been."
          titleHighlight="Where I'm going."
          subtitle="The highest point in Nimbara — a place to understand who I am, what drives me, and where I'm heading."
          icon="🌟"
          accentColor="var(--brass)"
        />

        {/* 2×2 card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {VISION_CARDS.map((card, i) => (
            <VisionCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Mission Log terminal */}
        <MissionLog />
      </div>
    </section>
  );
}