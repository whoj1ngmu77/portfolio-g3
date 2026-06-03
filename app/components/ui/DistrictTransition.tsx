"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

interface DistrictTransitionProps {
  fromDistrict?: string;
  toDistrict?: string;
  variant?: "mist" | "canal" | "arch" | "horizon";
}

export default function DistrictTransition({
  fromDistrict,
  toDistrict,
  variant = "mist",
}: DistrictTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      role="presentation"
      style={{
        position: "relative",
        height: 120,
        overflow: "hidden",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top fade from previous section */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          background:
            "linear-gradient(to bottom, var(--bg-primary), transparent)",
          zIndex: 2,
        }}
      />

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background:
            "linear-gradient(to top, var(--bg-primary), transparent)",
          zIndex: 2,
        }}
      />

      {/* Variant content */}
      {variant === "mist" && (
        <MistVariant isInView={isInView} reducedMotion={reducedMotion} />
      )}
      {variant === "canal" && (
        <CanalVariant isInView={isInView} reducedMotion={reducedMotion} />
      )}
      {variant === "arch" && (
        <ArchVariant isInView={isInView} reducedMotion={reducedMotion} />
      )}
      {variant === "horizon" && (
        <HorizonVariant isInView={isInView} reducedMotion={reducedMotion} />
      )}

      {/* District label strip */}
      {(fromDistrict || toDistrict) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          style={{
            position: "absolute",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {fromDistrict && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                opacity: 0.6,
              }}
            >
              {fromDistrict}
            </span>
          )}
          {fromDistrict && toDistrict && (
            <div
              style={{
                width: 32,
                height: 1,
                background:
                  "linear-gradient(90deg, var(--text-muted), var(--brass), var(--text-muted))",
                opacity: 0.4,
              }}
            />
          )}
          {toDistrict && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                opacity: 0.6,
              }}
            >
              {toDistrict}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ── Variants ─────────────────────────────────────────────────────

function MistVariant({
  isInView,
  reducedMotion,
}: {
  isInView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{
            opacity: isInView ? [0, 0.12, 0.08, 0.14, 0] : 0,
            scaleX: isInView ? [0.6, 1.1, 0.9, 1.05, 0.6] : 0.6,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }
          }
          style={{
            position: "absolute",
            width: `${60 + i * 20}%`,
            height: 40 + i * 10,
            borderRadius: "50%",
            background: "var(--lavender)",
            filter: "blur(24px)",
            top: `${30 + i * 12}%`,
          }}
        />
      ))}
    </>
  );
}

function CanalVariant({
  isInView,
  reducedMotion,
}: {
  isInView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, width: "0%" }}
      animate={{
        opacity: isInView ? 0.4 : 0,
        width: isInView ? "70%" : "0%",
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
      }
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent, var(--ember), var(--brass), var(--ember), transparent)",
        position: "absolute",
      }}
    />
  );
}

function ArchVariant({
  isInView,
  reducedMotion,
}: {
  isInView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 400 80"
      style={{
        position: "absolute",
        width: "min(500px, 90vw)",
        opacity: 0,
      }}
      animate={{ opacity: isInView ? 0.08 : 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
    >
      <path
        d="M0 80 Q200 0 400 80"
        fill="none"
        stroke="var(--lavender)"
        strokeWidth="1"
      />
      <path
        d="M40 80 Q200 20 360 80"
        fill="none"
        stroke="var(--brass)"
        strokeWidth="0.5"
        strokeDasharray="4 8"
      />
    </motion.svg>
  );
}

function HorizonVariant({
  isInView,
  reducedMotion,
}: {
  isInView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      <motion.div
        animate={{ opacity: isInView ? 0.07 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, var(--horizon), transparent)",
        }}
      />
      <motion.div
        animate={{ opacity: isInView ? 0.5 : 0, width: isInView ? "40%" : "0%" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
        style={{
          position: "absolute",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--brass), transparent)",
        }}
      />
    </>
  );
}