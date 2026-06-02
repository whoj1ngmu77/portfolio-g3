"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  districtLabel: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  districtLabel,
  title,
  titleHighlight,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: "3.5rem",
        textAlign: align,
      }}
    >
      <p
        className="section-label"
        style={{ marginBottom: "0.75rem" }}
      >
        ✦ {districtLabel}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          lineHeight: 1.1,
          marginBottom: subtitle ? "1rem" : 0,
        }}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: align === "center" ? "56ch" : "60ch",
            margin: align === "center" ? "0 auto" : undefined,
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
