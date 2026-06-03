"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { getDistrictById } from "@/app/lib/districts";

export default function CityStatusBar() {
  useScrollProgress();
  const activeDistrict = useNimbaraStore((s) => s.activeDistrict);
  const district = getDistrictById(activeDistrict);

  return (
    <div
      role="status"
      aria-label="Current district"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        background: "rgba(13,11,30,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <AnimatePresence mode="wait">
        {district && (
          <motion.div
            key={district.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.2rem 0.9rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "99px",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            aria-label={`Currently viewing: ${district.name}`}
          >
            <span style={{ fontSize: "0.7rem" }} aria-hidden="true">
              {district.icon}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: district.accentColor,
                textTransform: "uppercase",
              }}
            >
              {district.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}