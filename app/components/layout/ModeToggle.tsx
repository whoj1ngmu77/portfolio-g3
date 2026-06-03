"use client";

import { motion } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

export default function ModeToggle() {
  const mode = useNimbaraStore((s) => s.mode);
  const setMode = useNimbaraStore((s) => s.setMode);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  const isExplore = mode === "explore";

  return (
    <div
      role="group"
      aria-label="Navigation mode"
      style={{
        display: "flex",
        alignItems: "center",
        background: "var(--glass-02)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "99px",
        padding: "3px",
        gap: 0,
        position: "relative",
      }}
    >
      {/* Sliding indicator */}
      <motion.div
        aria-hidden="true"
        animate={{ x: isExplore ? "100%" : "0%" }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: "calc(50% - 3px)",
          bottom: 3,
          borderRadius: "99px",
          background: isExplore
            ? "linear-gradient(135deg, var(--teal), var(--lavender))"
            : "linear-gradient(135deg, var(--brass), var(--ember))",
          boxShadow: isExplore ? "var(--glow-teal)" : "var(--glow-brass)",
          zIndex: 0,
        }}
      />

      <button
        onClick={() => setMode("scroll")}
        aria-pressed={!isExplore}
        aria-label="Recruiter mode — quick access to key information"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.3rem 0.8rem",
          border: "none",
          background: "none",
          borderRadius: "99px",
          cursor: "pointer",
          color: !isExplore ? "#0D0B1E" : "var(--text-muted)",
          position: "relative",
          zIndex: 1,
          transition: "color 0.3s ease",
          whiteSpace: "nowrap",
        }}
      >
        Recruiter
      </button>

      <button
        onClick={() => setMode("explore")}
        aria-pressed={isExplore}
        aria-label="Explore Nimbara — immersive city experience"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.3rem 0.8rem",
          border: "none",
          background: "none",
          borderRadius: "99px",
          cursor: "pointer",
          color: isExplore ? "#0D0B1E" : "var(--text-muted)",
          position: "relative",
          zIndex: 1,
          transition: "color 0.3s ease",
          whiteSpace: "nowrap",
        }}
      >
        Explore
      </button>
    </div>
  );
}