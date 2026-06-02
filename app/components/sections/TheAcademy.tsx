"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { CERTIFICATIONS } from "@/app/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  technical: "var(--teal)",
  design: "var(--ember)",
  leadership: "var(--brass)",
  other: "var(--lavender)",
};
const CATEGORY_ICONS: Record<string, string> = {
  technical: "⚡",
  design: "🎨",
  leadership: "🏛️",
  other: "✦",
};

export default function TheAcademy() {
  return (
    <section
      id="certifications"
      aria-label="Certifications — The Academy"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, transparent 100%)" }}
    >
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="The Academy"
          title="Credentials &"
          titleHighlight="Certifications"
          subtitle="Every certificate is a door opened — a skill unlocked, a concept understood, a curiosity followed through."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1rem",
        }}>
          {CERTIFICATIONS.map((cert, i) => {
            const accentColor = CATEGORY_COLORS[cert.category];
            const icon = CATEGORY_ICONS[cert.category];
            return (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card"
                style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}
                aria-label={`${cert.title} from ${cert.issuer}`}
              >
                {/* Corner accent */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, right: 0,
                  width: 60, height: 60,
                  background: `radial-gradient(circle at top right, ${accentColor}20, transparent 70%)`,
                }} />

                {/* Icon badge */}
                <div style={{
                  width: 40, height: 40, borderRadius: "var(--radius-md)",
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }} aria-hidden="true">
                  {icon}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem",
                  color: "var(--text-primary)", letterSpacing: "-0.01em",
                  marginBottom: "0.4rem", lineHeight: 1.3,
                }}>
                  {cert.title}
                </h3>

                <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  {cert.issuer}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Award size={12} style={{ color: accentColor }} aria-hidden="true" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                      {cert.date}
                    </span>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} credential`}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.3rem",
                      fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                      color: accentColor, textDecoration: "none",
                      letterSpacing: "0.06em",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
