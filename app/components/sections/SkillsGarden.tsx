"use client";

import { motion } from "framer-motion";
import DistrictHeader from "@/app/components/ui/DistrictHeader";
import { SKILL_CATEGORIES } from "@/app/lib/data";
import { getLevelLabel, getLevelDots } from "@/app/lib/utils";

function OrganicBlob({ style }: { style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" style={{ position: "absolute", pointerEvents: "none", opacity: 0.04, ...style }}>
      <path d="M44.7,-62.2C56.7,-52.9,63.1,-37.2,67.4,-21.1C71.7,-5,73.9,11.5,68.8,25.3C63.7,39.1,51.3,50.2,37.5,57.8C23.7,65.4,8.5,69.5,-7.4,69C-23.3,68.5,-39.9,63.4,-51.3,53C-62.7,42.6,-68.9,26.9,-70.1,10.7C-71.3,-5.5,-67.5,-22.2,-58.4,-34.8C-49.3,-47.4,-34.9,-55.9,-20.3,-62.6C-5.7,-69.3,9.1,-74.2,23.1,-71.8C37.1,-69.4,32.7,-71.5,44.7,-62.2Z" transform="translate(100 100)" fill="var(--bloom)" />
    </svg>
  );
}

function SkillDots({ level, color }: { level: string; color: string }) {
  const filled = getLevelDots(level);
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }} aria-label={`Proficiency: ${getLevelLabel(level)}`}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className={`level-dot ${n <= filled ? "active" : "inactive"}`} style={{ background: n <= filled ? color : "var(--text-muted)" }} />
      ))}
    </div>
  );
}

function SkillPill({ name, level, icon, color, delay }: { name: string; level: string; icon: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "0.85rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        backdropFilter: "blur(8px)",
        transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "var(--card-bg-hover)";
        el.style.boxShadow = `0 0 16px ${color}22`;
        el.style.borderColor = `${color}44`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "var(--card-bg)";
        el.style.boxShadow = "none";
        el.style.borderColor = "var(--border-subtle)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ fontSize: "1rem", lineHeight: 1 }} aria-hidden="true">{icon}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.88rem", color: "var(--text-primary)" }}>{name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}>
        <SkillDots level={level} color={color} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{getLevelLabel(level)}</span>
      </div>
    </motion.div>
  );
}

export default function SkillsGarden() {
  return (
    <section
      id="skills"
      aria-label="Skills — The Skills Garden"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, transparent 100%)",
      }}
    >
      {/* Organic background blobs */}
      <OrganicBlob style={{ width: 400, height: 400, top: -100, left: -100 }} />
      <OrganicBlob style={{ width: 300, height: 300, bottom: -80, right: -60, transform: "scaleX(-1)" }} />

      <div className="section-wrapper">
        <DistrictHeader
          districtName="Skills Garden"
          title="Things I've"
          titleHighlight="Grown"
          subtitle="Skills bloom at different rates. Some are flourishing, some are still reaching for sunlight — all are tended with care."
          icon="🌱"
          accentColor="var(--bloom)"
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", gap: "1.5rem", flexWrap: "wrap",
            marginBottom: "2.5rem",
            padding: "0.75rem 1.25rem",
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            width: "fit-content",
          }}
          aria-label="Proficiency level legend"
        >
          {[
            { lvl: "seedling",    label: "Learning",    color: "var(--bloom)"   },
            { lvl: "growing",     label: "Developing",  color: "var(--teal)"    },
            { lvl: "blooming",    label: "Proficient",  color: "var(--brass)"   },
            { lvl: "flourishing", label: "Advanced",    color: "var(--ember)"   },
          ].map(({ lvl, label, color }) => (
            <div key={lvl} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{label}</span>
            </div>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.25rem" }}>
          {SKILL_CATEGORIES.map((category, ci) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: ci * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card"
              style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}
            >
              {/* Category colour splash */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, right: 0,
                width: 80, height: 80,
                background: `radial-gradient(circle at top right, ${category.color}18, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                    {category.name}
                  </h3>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: category.color, boxShadow: `0 0 12px ${category.color}` }} aria-hidden="true" />
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ✦ {category.districtLabel}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {category.skills.map((skill, si) => (
                  <SkillPill key={skill.name} {...skill} color={category.color} delay={ci * 0.05 + si * 0.04} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}