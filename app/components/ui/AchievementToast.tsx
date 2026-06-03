"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { RARITY_COLORS, RARITY_LABELS } from "@/app/lib/achievements";

export default function AchievementToast() {
  const pendingAchievement = useNimbaraStore((s) => s.pendingAchievement);
  const clearPendingAchievement = useNimbaraStore(
    (s) => s.clearPendingAchievement
  );
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (!pendingAchievement) return;
    const t = setTimeout(() => clearPendingAchievement(), 4000);
    return () => clearTimeout(t);
  }, [pendingAchievement, clearPendingAchievement]);

  const accentColor = pendingAchievement
    ? RARITY_COLORS[pendingAchievement.rarity]
    : "var(--teal)";

  const rarityLabel = pendingAchievement
    ? RARITY_LABELS[pendingAchievement.rarity]
    : "";

  return (
    <AnimatePresence>
      {pendingAchievement && (
        <motion.div
          key={pendingAchievement.id}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60, y: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="alert"
          aria-live="assertive"
          aria-label={`Achievement unlocked: ${pendingAchievement.title}`}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "1.5rem",
            zIndex: 500,
            minWidth: 260,
            maxWidth: 320,
          }}
        >
          <div
            style={{
              background: "var(--bg-secondary)",
              border: `1px solid ${accentColor}44`,
              borderRadius: "var(--radius-lg)",
              padding: "1rem 1.25rem",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: `0 0 0 1px ${accentColor}22, 0 12px 40px rgba(0,0,0,0.4)`,
              display: "flex",
              gap: "0.9rem",
              alignItems: "flex-start",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow accent top border */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              }}
            />

            {/* Dismiss timer bar */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: accentColor,
                transformOrigin: "left",
                opacity: 0.5,
              }}
            />

            {/* Icon */}
            <div
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
                boxShadow: `0 0 12px ${accentColor}30`,
              }}
            >
              {pendingAchievement.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: accentColor,
                  }}
                >
                  {rarityLabel}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.2rem",
                }}
              >
                {pendingAchievement.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {pendingAchievement.description}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={clearPendingAchievement}
              aria-label="Dismiss achievement"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.1rem",
                fontSize: "0.8rem",
                lineHeight: 1,
                flexShrink: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "var(--text-muted)")
              }
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}