"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { DISTRICTS } from "@/app/lib/districts";

export default function CityMap() {
  const [open, setOpen] = useState(false);
  const activeDistrict = useNimbaraStore((s) => s.activeDistrict);
  const visitedDistricts = useNimbaraStore((s) => s.visitedDistricts);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  const handleDistrictClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close city map" : "Open city map"}
        aria-expanded={open}
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 150,
          width: 40,
          height: 40,
          borderRadius: "var(--radius-md)",
          background: open ? "var(--brass)" : "var(--card-bg)",
          border: `1px solid ${open ? "var(--brass)" : "var(--border-subtle)"}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          color: open ? "#0D0B1E" : "var(--text-secondary)",
          transition: "all 0.25s ease",
          boxShadow: open ? "var(--glow-brass)" : "none",
        }}
      >
        {open ? "✕" : "🗺"}
      </motion.button>

      {/* Map panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.95 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }
            }
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.95 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="navigation"
            aria-label="City map — navigate between districts"
            style={{
              position: "fixed",
              right: "4.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 149,
              width: 220,
              background: "rgba(13,11,30,0.94)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "0.9rem 1rem 0.7rem",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--brass)",
                  boxShadow: "var(--glow-brass)",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--brass)",
                }}
              >
                Nimbara City Map
              </span>
            </div>

            {/* SVG mini-map */}
            <div
              style={{
                padding: "0.75rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{ width: "100%", height: "auto" }}
                aria-hidden="true"
              >
                {/* City island shape */}
                <ellipse
                  cx="50"
                  cy="52"
                  rx="44"
                  ry="36"
                  fill="rgba(45,27,105,0.3)"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                />
                {/* Path lines between districts */}
                <path
                  d="M50 10 L72 32 L75 58 L62 82 M50 10 L28 38 L25 62 L38 78 M28 38 L50 48 L72 32 M25 62 L50 48 M38 78 L62 82"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
                {/* District dots */}
                {DISTRICTS.map((district) => {
                  const isActive = district.id === activeDistrict;
                  const isVisited = visitedDistricts.includes(district.id);
                  return (
                    <g key={district.id}>
                      {isActive && (
                        <circle
                          cx={district.mapPosition.x}
                          cy={district.mapPosition.y}
                          r="6"
                          fill={district.accentColor}
                          opacity="0.15"
                        />
                      )}
                      <circle
                        cx={district.mapPosition.x}
                        cy={district.mapPosition.y}
                        r={isActive ? 3 : 2}
                        fill={
                          isActive
                            ? district.accentColor
                            : isVisited
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(255,255,255,0.08)"
                        }
                        stroke={isActive ? district.accentColor : "none"}
                        strokeWidth="0.5"
                        style={{
                          filter: isActive
                            ? `drop-shadow(0 0 4px ${district.accentColor})`
                            : "none",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* District list */}
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: "0.4rem 0",
                maxHeight: 320,
                overflowY: "auto",
              }}
            >
              {DISTRICTS.map((district) => {
                const isActive = district.id === activeDistrict;
                const isVisited = visitedDistricts.includes(district.id);

                return (
                  <li key={district.id}>
                    <button
                      onClick={() => handleDistrictClick(district.sectionId)}
                      aria-label={`Navigate to ${district.name}`}
                      aria-current={isActive ? "location" : undefined}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.5rem 1rem",
                        background: isActive
                          ? `${district.accentColor}12`
                          : "none",
                        border: "none",
                        borderLeft: `2px solid ${
                          isActive ? district.accentColor : "transparent"
                        }`,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "none";
                      }}
                    >
                      {/* Icon */}
                      <span
                        style={{ fontSize: "0.8rem", flexShrink: 0 }}
                        aria-hidden="true"
                      >
                        {district.icon}
                      </span>

                      {/* Name */}
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.78rem",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive
                            ? district.accentColor
                            : "var(--text-secondary)",
                          flex: 1,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {district.name}
                      </span>

                      {/* Visited indicator */}
                      {isVisited && !isActive && (
                        <div
                          aria-label="Visited"
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "var(--teal)",
                            opacity: 0.6,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {isActive && (
                        <div
                          aria-label="Current location"
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: district.accentColor,
                            boxShadow: `0 0 8px ${district.accentColor}`,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            <div
              style={{
                padding: "0.6rem 1rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                }}
              >
                {visitedDistricts.length}/{DISTRICTS.length} explored
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                }}
              >
                Nimbara v1.0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}