"use client";

import { motion } from "framer-motion";

interface DistrictHeaderProps {
  districtName: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  icon: string;
  accentColor?: string;
  align?: "left" | "center";
}

export default function DistrictHeader({
  districtName,
  title,
  titleHighlight,
  subtitle,
  icon,
  accentColor = "var(--brass)",
  align = "left",
}: DistrictHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: "3.5rem", textAlign: align }}
    >
      {/* District badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.9rem 0.3rem 0.5rem",
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}30`,
          borderRadius: "99px",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: `${accentColor}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          {districtName}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          lineHeight: 1.1,
          marginBottom: "0.9rem",
        }}
      >
        {title}{" "}
        {titleHighlight && (
          <span
            style={{
              background: `linear-gradient(135deg, ${accentColor}, var(--lavender))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {titleHighlight}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          maxWidth: align === "center" ? "54ch" : "62ch",
          margin: align === "center" ? "0 auto 1.5rem" : "0 0 1.5rem",
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </p>

      {/* Decorative divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            height: 1,
            width: 48,
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
        <div
          style={{
            height: 1,
            width: 28,
            background: `linear-gradient(90deg, ${accentColor}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}