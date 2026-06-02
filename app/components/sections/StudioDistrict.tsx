"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { DESIGN_WORKS } from "@/app/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  illustration: "var(--ember)",
  branding: "var(--brass)",
  ui: "var(--teal)",
  poster: "var(--lavender)",
  other: "var(--bloom)",
};

const CATEGORY_LABELS: Record<string, string> = {
  illustration: "Illustration",
  branding: "Branding",
  ui: "UI/UX",
  poster: "Poster",
  other: "Other",
};

// Placeholder SVG art for each card — each unique, city-themed
const PLACEHOLDER_ARTS = [
  // Aurora Fest — gradient arc
  (color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g1a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#FF8C42" />
        </linearGradient>
        <linearGradient id="g1b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#C4B0E8" />
        </linearGradient>
      </defs>
      <rect width="280" height="160" fill="#12102A" />
      <ellipse cx="140" cy="190" rx="120" ry="90" fill="none" stroke="url(#g1a)" strokeWidth="18" opacity="0.6" />
      <ellipse cx="140" cy="200" rx="80" ry="60" fill="none" stroke="url(#g1b)" strokeWidth="10" opacity="0.4" />
      <text x="140" y="60" textAnchor="middle" fill={color} fontFamily="sans-serif" fontSize="13" fontWeight="bold" letterSpacing="4" opacity="0.9">AURORA FEST</text>
      <text x="140" y="80" textAnchor="middle" fill="#7A7090" fontFamily="monospace" fontSize="8" letterSpacing="2">MMXXIV</text>
    </svg>
  ),
  // DataLens — dashboard grid
  (color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="160" fill="#0D0B1E" />
      <rect x="12" y="12" width="80" height="50" rx="4" fill="#1A1535" stroke={color} strokeWidth="0.5" opacity="0.8" />
      <rect x="100" y="12" width="80" height="50" rx="4" fill="#1A1535" stroke="#4ECDC4" strokeWidth="0.5" opacity="0.8" />
      <rect x="188" y="12" width="80" height="50" rx="4" fill="#1A1535" stroke="#C4B0E8" strokeWidth="0.5" opacity="0.8" />
      <rect x="12" y="70" width="170" height="78" rx="4" fill="#1A1535" stroke={color} strokeWidth="0.5" opacity="0.6" />
      <rect x="190" y="70" width="78" height="78" rx="4" fill="#1A1535" stroke="#4ECDC4" strokeWidth="0.5" opacity="0.6" />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={18 + i*22} y={100} width="14" height={20 + Math.sin(i) * 15} rx="2" fill={color} opacity="0.7" />
      ))}
      <text x="97" y="42" textAnchor="middle" fill={color} fontFamily="monospace" fontSize="10" fontWeight="bold">DataLens</text>
    </svg>
  ),
  // Solarpunk illustration — city with greenery
  (_color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D1B69" />
          <stop offset="100%" stopColor="#F2A97E" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="280" height="160" fill="url(#sky2)" />
      <rect x="60" y="60" width="30" height="100" rx="2" fill="#1A1535" opacity="0.9" />
      <rect x="100" y="40" width="40" height="120" rx="2" fill="#12102A" opacity="0.95" />
      <rect x="150" y="55" width="28" height="105" rx="2" fill="#1A1535" opacity="0.85" />
      {/* greenery */}
      <ellipse cx="80" cy="60" rx="18" ry="14" fill="#7BC67E" opacity="0.8" />
      <ellipse cx="120" cy="38" rx="20" ry="12" fill="#7BC67E" opacity="0.7" />
      <ellipse cx="165" cy="54" rx="15" ry="10" fill="#7BC67E" opacity="0.75" />
      <ellipse cx="200" cy="80" rx="22" ry="16" fill="#7BC67E" opacity="0.65" />
      <text x="140" y="155" textAnchor="middle" fill="#F2A97E" fontFamily="serif" fontSize="9" opacity="0.7" letterSpacing="2">SOLARPUNK CITY</text>
    </svg>
  ),
  // IEEE rebrand — geometric logo
  (color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="160" fill="#0D0B1E" />
      <polygon points="140,30 170,80 110,80" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
      <polygon points="140,50 160,80 120,80" fill={color} opacity="0.15" />
      <circle cx="140" cy="80" r="40" fill="none" stroke="#4ECDC4" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <circle cx="140" cy="80" r="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <text x="140" y="140" textAnchor="middle" fill={color} fontFamily="sans-serif" fontSize="11" fontWeight="bold" letterSpacing="6">IEEE</text>
      <text x="140" y="153" textAnchor="middle" fill="#4ECDC4" fontFamily="monospace" fontSize="7" letterSpacing="2">CHAPTER REBRAND</text>
    </svg>
  ),
  // Typographic poster
  (_color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="gt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#C4B0E8" />
        </linearGradient>
      </defs>
      <rect width="280" height="160" fill="#0D0B1E" />
      <line x1="20" y1="40" x2="260" y2="40" stroke="#2D1B69" strokeWidth="1" />
      <text x="140" y="72" textAnchor="middle" fill="url(#gt)" fontFamily="serif" fontSize="28" fontWeight="bold" letterSpacing="-1">CITIES</text>
      <text x="140" y="92" textAnchor="middle" fill="#F5F0E8" fontFamily="serif" fontSize="10" letterSpacing="3" opacity="0.6">are built from</text>
      <text x="140" y="118" textAnchor="middle" fill="url(#gt)" fontFamily="serif" fontSize="28" fontWeight="bold" letterSpacing="-1">IDEAS</text>
      <line x1="20" y1="130" x2="260" y2="130" stroke="#2D1B69" strokeWidth="1" />
      <text x="20" y="145" fill="#7A7090" fontFamily="monospace" fontSize="7" letterSpacing="1">NIMBARA</text>
      <text x="260" y="145" textAnchor="end" fill="#7A7090" fontFamily="monospace" fontSize="7" letterSpacing="1">MMXXIV</text>
    </svg>
  ),
  // Personal logo
  (color: string) => (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="280" height="160" fill="#0D0B1E" />
      {/* Circuit + organic hybrid mark */}
      <circle cx="140" cy="78" r="32" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="140" y1="46" x2="140" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="172" y1="78" x2="188" y2="78" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="108" y1="78" x2="92" y2="78" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="140" y1="110" x2="140" y2="126" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="140" cy="30" r="4" fill={color} opacity="0.9" />
      <circle cx="188" cy="78" r="4" fill={color} opacity="0.9" />
      <circle cx="92" cy="78" r="4" fill={color} opacity="0.9" />
      <circle cx="140" cy="126" r="4" fill={color} opacity="0.9" />
      <text x="140" y="83" textAnchor="middle" fill={color} fontFamily="sans-serif" fontSize="16" fontWeight="bold" letterSpacing="1">G</text>
      <text x="140" y="148" textAnchor="middle" fill="#7A7090" fontFamily="monospace" fontSize="7" letterSpacing="3">PERSONAL BRAND</text>
    </svg>
  ),
];

export default function StudioDistrict() {
  return (
    <section id="design" aria-label="Graphic Design — The Studio District">
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="The Studio District"
          title="Things I've"
          titleHighlight="Designed"
          subtitle="The colourful corner of Nimbara where engineering meets expression. Visual work across branding, illustration, and product design."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: "1.25rem",
        }}>
          {DESIGN_WORKS.map((work, i) => {
            const accentColor = CATEGORY_COLORS[work.category];
            const PlaceholderArt = PLACEHOLDER_ARTS[i % PLACEHOLDER_ARTS.length];
            return (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card"
                style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                aria-label={`${work.title} — ${CATEGORY_LABELS[work.category]}`}
              >
                {/* Art preview */}
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  {PlaceholderArt(accentColor)}
                  <div style={{
                    position: "absolute", top: "0.6rem", left: "0.6rem",
                    padding: "0.15rem 0.6rem",
                    background: "rgba(13,11,30,0.8)",
                    border: `1px solid ${accentColor}44`,
                    borderRadius: "99px",
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                    color: accentColor, letterSpacing: "0.08em",
                    backdropFilter: "blur(8px)",
                  }}>
                    {CATEGORY_LABELS[work.category]}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem",
                      color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.3,
                    }}>
                      {work.title}
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", flexShrink: 0, marginLeft: "0.5rem" }}>
                      {work.year}
                    </span>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.6, flex: 1 }}>
                    {work.description}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    <Palette size={11} style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                    {work.tools.map((tool) => (
                      <span key={tool} className="tag" style={{ fontSize: "0.6rem" }}>{tool}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Coming soon note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
          }}
        >
          ✦ &nbsp;Full gallery with hi-res work coming in Phase 2 &nbsp;✦
        </motion.p>
      </div>
    </section>
  );
}
