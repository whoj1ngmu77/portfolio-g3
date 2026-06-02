"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { SKILL_CATEGORIES } from "@/app/lib/data";
import { getLevelLabel, getLevelDots } from "@/app/lib/utils";

const LEVEL_ORDER = ["seedling", "growing", "blooming", "flourishing"];

function SkillDots({ level, color }: { level: string; color: string }) {
  const filled = getLevelDots(level);
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }} aria-label={`Proficiency: ${getLevelLabel(level)}`}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className={`level-dot ${n <= filled ? "active" : "inactive"}`}
          style={{ background: n <= filled ? color : "var(--text-muted)" }}
        />
      ))}
    </div>
  );
}

function SkillPill({ name, level, icon, color, delay }: {
  name: string; level: string; icon: string; color: string; delay: number;
}) {
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
        transition: "background 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--card-bg-hover)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${color}22`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}44`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--card-bg)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ fontSize: "1rem", lineHeight: 1 }} aria-hidden="true">{icon}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.88rem", color: "var(--text-primary)" }}>
          {name}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}>
        <SkillDots level={level} color={color} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
          {getLevelLabel(level)}
        </span>
      </div>
    </motion.div>
  );
}

function CategoryCard({ category, cardIndex }: { category: typeof SKILL_CATEGORIES[0]; cardIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: cardIndex * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ padding: "1.75rem" }}
    >
      {/* Category header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "0.3rem",
        }}>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem",
            color: "var(--text-primary)", letterSpacing: "-0.02em",
          }}>
            {category.name}
          </h3>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: category.color,
            boxShadow: `0 0 12px ${category.color}`,
          }} aria-hidden="true" />
        </div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.62rem",
          color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          ✦ {category.districtLabel}
        </p>
      </div>

      {/* Skill pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {category.skills.map((skill, si) => (
          <SkillPill
            key={skill.name}
            {...skill}
            color={category.color}
            delay={cardIndex * 0.05 + si * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsGarden() {
  return (
    <section
      id="skills"
      aria-label="Skills — The Skills Garden"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, transparent 100%)" }}
    >
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="The Skills Garden"
          title="Things I've"
          titleHighlight="Grown"
          subtitle="Skills bloom at different rates. Some are flourishing, some are still reaching for sunlight — all are tended with care."
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
          {LEVEL_ORDER.map((lvl) => (
            <div key={lvl} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: lvl === "seedling" ? "var(--bloom)" :
                  lvl === "growing" ? "var(--teal)" :
                  lvl === "blooming" ? "var(--brass)" : "var(--ember)",
              }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                {getLevelLabel(lvl)}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Category grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "1.25rem",
        }}>
          {SKILL_CATEGORIES.map((category, i) => (
            <CategoryCard key={category.id} category={category} cardIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
