"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { getDistrictById } from "@/app/lib/districts";

const DISTRICT_MESSAGES: Record<string, string> = {
  arrival: "Welcome to Nimbara! I'm Bit — your city guide. 👋",
  innovation: "The Innovation District! Where projects become buildings.",
  skills: "The Skills Garden. Every plant here took time to grow.",
  guild: "The Guild Hall — where experience is honoured.",
  academy: "The Academy. Knowledge earned, never borrowed.",
  memory: "Memory Lane. Every city has a history.",
  studio: "The Studio District — where art meets engineering.",
  beacon: "The Beacon. You've reached the edge of Nimbara.",
};

const IDLE_MESSAGES = [
  "Psst — try the city map on the right →",
  "Every district has its own story.",
  "Nimbara grows with every project.",
  "Switch to Explore mode for a different view.",
];

export default function PixelCompanion() {
  const companionDismissed = useNimbaraStore((s) => s.companionDismissed);
  const dismissCompanion = useNimbaraStore((s) => s.dismissCompanion);
  const activeDistrict = useNimbaraStore((s) => s.activeDistrict);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  const [showBubble, setShowBubble] = useState(true);
  const [message, setMessage] = useState(
    DISTRICT_MESSAGES["arrival"] ?? IDLE_MESSAGES[0]
  );
  const [idleIndex, setIdleIndex] = useState(0);

  useEffect(() => {
    const msg = DISTRICT_MESSAGES[activeDistrict];
    if (msg) {
      setMessage(msg);
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (showBubble) return;
    const t = setInterval(() => {
      setIdleIndex((i) => (i + 1) % IDLE_MESSAGES.length);
    }, 12000);
    return () => clearInterval(t);
  }, [showBubble]);

  const district = getDistrictById(activeDistrict);
  const accentColor = district?.accentColor ?? "var(--teal)";

  if (companionDismissed) return null;

  const bubbleTailStyle: React.CSSProperties = {
    position: "absolute",
    bottom: -5,
    left: 12,
    width: 8,
    height: 8,
    background: "rgba(13,11,30,0.92)",
    borderLeft: `1px solid ${accentColor}33`,
    borderBottom: `1px solid ${accentColor}33`,
    borderTop: "none",
    borderRight: "none",
    transform: "rotate(-45deg)",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5.5rem",
        left: "1.25rem",
        zIndex: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5rem",
      }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={message}
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 4, scale: 0.97 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(13,11,30,0.92)",
              borderTop: `1px solid ${accentColor}33`,
              borderLeft: `1px solid ${accentColor}33`,
              borderRight: `1px solid ${accentColor}33`,
              borderBottom: `1px solid ${accentColor}33`,
              borderRadius: "var(--radius-md)",
              borderBottomLeftRadius: 4,
              padding: "0.6rem 0.8rem",
              maxWidth: 200,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              position: "relative",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {message}
            </p>
            {/* Bubble tail — no shorthand border mixing */}
            <div aria-hidden="true" style={bubbleTailStyle} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle tip */}
      <AnimatePresence>
        {!showBubble && (
          <motion.div
            key={idleIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "rgba(13,11,30,0.7)",
              borderTop: "1px solid var(--border-subtle)",
              borderLeft: "1px solid var(--border-subtle)",
              borderRight: "1px solid var(--border-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              borderBottomLeftRadius: 4,
              padding: "0.4rem 0.7rem",
              maxWidth: 180,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--text-muted)",
                lineHeight: 1.4,
                margin: 0,
                letterSpacing: "0.03em",
              }}
            >
              {IDLE_MESSAGES[idleIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pixel character */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.4rem" }}>
        <button
          onClick={() => setShowBubble((v) => !v)}
          aria-label={
            showBubble
              ? "Hide companion message"
              : "Show companion message"
          }
          title="Click to toggle message"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "block",
          }}
        >
          <PixelCharacter
            accentColor={accentColor}
            reducedMotion={reducedMotion}
          />
        </button>

        {/* Dismiss button */}
        <button
          onClick={dismissCompanion}
          aria-label="Dismiss companion permanently"
          title="Dismiss Bit"
          style={{
            background: "rgba(13,11,30,0.7)",
            borderTop: "1px solid var(--border-subtle)",
            borderLeft: "1px solid var(--border-subtle)",
            borderRight: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-muted)",
            fontSize: "0.55rem",
            marginBottom: "0.2rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--text-muted)";
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function PixelCharacter({
  accentColor,
  reducedMotion,
}: {
  accentColor: string;
  reducedMotion: boolean;
}) {
  const pixels = [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 2, 1, 1, 2, 1, 0],
    [0, 1, 3, 1, 1, 3, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
  ];

  const colorMap: Record<number, string> = {
    1: "var(--dusk-mid)",
    2: accentColor,
    3: "var(--ivory)",
  };

  const PIXEL = 5;

  return (
    <motion.div
      animate={reducedMotion ? {} : { y: [0, -3, 0] }}
      transition={
        reducedMotion
          ? {}
          : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
      }
      aria-label="Bit — your Nimbara companion"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(8, ${PIXEL}px)`,
        gridTemplateRows: `repeat(8, ${PIXEL}px)`,
        imageRendering: "pixelated",
        gap: 0,
        filter: `drop-shadow(0 0 6px ${accentColor}66)`,
      }}
    >
      {pixels.flat().map((val, i) => (
        <div
          key={i}
          style={{
            width: PIXEL,
            height: PIXEL,
            background: val === 0 ? "transparent" : colorMap[val],
          }}
        />
      ))}
    </motion.div>
  );
}