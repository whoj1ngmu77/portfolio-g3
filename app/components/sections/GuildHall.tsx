"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { EXPERIENCES } from "@/app/lib/data";

const TYPE_COLORS: Record<string, string> = {
  internship: "var(--teal)",
  job: "var(--brass)",
  research: "var(--lavender)",
  volunteering: "var(--ember)",
};
const TYPE_LABELS: Record<string, string> = {
  internship: "Internship",
  job: "Full-time",
  research: "Research",
  volunteering: "Volunteering",
};

export default function GuildHall() {
  return (
    <section id="experience" aria-label="Experience — The Guild Hall">
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="The Guild Hall"
          title="Where I've"
          titleHighlight="Worked"
          subtitle="Roles, responsibilities, and the real-world chapters that shaped how I think and build."
        />

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "0",
              top: 8,
              bottom: 8,
              width: 1,
              background: "linear-gradient(to bottom, transparent, var(--dusk-mid) 10%, var(--dusk-mid) 90%, transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {EXPERIENCES.map((exp, i) => {
              const accentColor = TYPE_COLORS[exp.type];
              return (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ paddingLeft: "2rem", position: "relative" }}
                  aria-label={`${exp.role} at ${exp.organization}`}
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: -5,
                      top: 8,
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: accentColor,
                      boxShadow: `0 0 14px ${accentColor}`,
                      border: "2px solid var(--bg-primary)",
                    }}
                  />

                  <div className="glass-card" style={{ padding: "1.75rem" }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                          <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                            color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase",
                            padding: "0.1rem 0.6rem",
                            border: `1px solid ${accentColor}33`,
                            borderRadius: "99px",
                            background: `${accentColor}11`,
                          }}>
                            {TYPE_LABELS[exp.type]}
                          </span>
                        </div>
                        <h3 style={{
                          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem",
                          color: "var(--text-primary)", letterSpacing: "-0.02em",
                        }}>
                          {exp.role}
                        </h3>
                        <p style={{
                          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem",
                          color: "var(--text-secondary)", marginTop: "0.1rem",
                        }}>
                          {exp.organization}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Calendar size={12} aria-hidden="true" style={{ color: "var(--text-muted)" }} />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            {exp.startDate} — {exp.endDate}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <MapPin size={12} aria-hidden="true" style={{ color: "var(--text-muted)" }} />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem", listStyle: "none" }}>
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                          <CheckCircle2 size={14} style={{ color: accentColor, flexShrink: 0, marginTop: "0.25rem" }} aria-hidden="true" />
                          <span style={{ color: "var(--text-secondary)", fontSize: "0.87rem", lineHeight: 1.55 }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
