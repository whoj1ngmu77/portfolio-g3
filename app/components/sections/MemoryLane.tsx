"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { JOURNEY_MILESTONES } from "@/app/lib/data";
import { getCategoryColor } from "@/app/lib/utils";

export default function MemoryLane() {
  return (
    <section
      id="journey"
      aria-label="Journey — Memory Lane"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 50%, transparent 100%)" }}
    >
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="Memory Lane"
          title="How I Got"
          titleHighlight="Here"
          subtitle="The winding road through Nimbara — moments, milestones, and the honest story of someone still figuring things out."
        />

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
          {/* Centre line (hidden on mobile) */}
          <div
            aria-hidden="true"
            className="timeline-center-line"
            style={{
              position: "absolute",
              left: "50%",
              top: 0, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, var(--dusk-mid) 8%, var(--dusk-mid) 92%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {JOURNEY_MILESTONES.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              const accentColor = getCategoryColor(milestone.type);

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex",
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    paddingBottom: "2rem",
                    position: "relative",
                  }}
                >
                  {/* Centre dot */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 16,
                      transform: "translateX(-50%)",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: accentColor,
                      boxShadow: `0 0 14px ${accentColor}`,
                      border: "2px solid var(--bg-primary)",
                      zIndex: 1,
                    }}
                  />

                  {/* Card — 45% wide, left or right aligned */}
                  <div
                    className="glass-card"
                    style={{
                      width: "calc(50% - 2rem)",
                      padding: "1.4rem",
                    }}
                  >
                    {/* Date + type */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: accentColor, letterSpacing: "0.1em" }}>
                        {milestone.month ? `${milestone.month} ` : ""}{milestone.year}
                      </span>
                      <span style={{ fontSize: "1.2rem" }} aria-hidden="true">{milestone.emoji}</span>
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem",
                      color: "var(--text-primary)", letterSpacing: "-0.01em",
                      marginBottom: "0.4rem",
                    }}>
                      {milestone.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* "And the journey continues..." */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", paddingTop: "1rem" }}
          >
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
              padding: "1rem 2rem",
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ fontSize: "1.4rem" }}>🌤️</span>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                The city keeps growing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-center-line { display: none; }
        }
      `}</style>
    </section>
  );
}
