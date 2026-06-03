"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

// ── Cloud definitions ─────────────────────────────────────────
const CLOUDS = [
  // [left%, top%, width, height, opacity, blur, duration, delay]
  { left: "-5%",  top: "18%", w: 520, h: 120, op: 0.55, blur: 28, dur: 140, del: 0    },
  { left: "30%",  top: "28%", w: 380, h: 90,  op: 0.45, blur: 22, dur: 180, del: -60  },
  { left: "60%",  top: "14%", w: 460, h: 100, op: 0.50, blur: 25, dur: 160, del: -90  },
  { left: "-10%", top: "42%", w: 600, h: 130, op: 0.35, blur: 32, dur: 200, del: -30  },
  { left: "50%",  top: "50%", w: 420, h: 95,  op: 0.30, blur: 28, dur: 170, del: -120 },
  { left: "15%",  top: "60%", w: 700, h: 150, op: 0.28, blur: 36, dur: 220, del: -80  },
  { left: "70%",  top: "68%", w: 350, h: 80,  op: 0.22, blur: 24, dur: 150, del: -45  },
];

// ── Distant city silhouette ───────────────────────────────────
function DistantCity() {
  return (
    <svg
      viewBox="0 0 1200 160"
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1200px, 100vw)",
        opacity: 0.055,
        filter: "blur(2.5px)",
        pointerEvents: "none",
      }}
    >
      {/* Far background buildings */}
      <rect x="80"  y="110" width="18" height="50"  rx="1" fill="#3D2F5C" />
      <rect x="105" y="95"  width="22" height="65"  rx="1" fill="#3D2F5C" />
      <rect x="135" y="80"  width="28" height="80"  rx="2" fill="#3D2F5C" />
      <rect x="170" y="70"  width="14" height="90"  rx="1" fill="#3D2F5C" />
      <rect x="190" y="55"  width="32" height="105" rx="2" fill="#3D2F5C" />
      <rect x="230" y="85"  width="20" height="75"  rx="1" fill="#3D2F5C" />
      <rect x="258" y="40"  width="38" height="120" rx="2" fill="#3D2F5C" />
      <line x1="277" y1="40" x2="277" y2="18" stroke="#3D2F5C" strokeWidth="2" />
      <circle cx="277" cy="16" r="3" fill="#3D2F5C" />
      <rect x="305" y="65"  width="24" height="95"  rx="1" fill="#3D2F5C" />
      <rect x="338" y="30"  width="44" height="130" rx="3" fill="#3D2F5C" />
      <line x1="360" y1="30" x2="360" y2="5"  stroke="#3D2F5C" strokeWidth="2.5" />
      <circle cx="360" cy="3"  r="4" fill="#3D2F5C" />
      <rect x="392" y="70"  width="20" height="90"  rx="1" fill="#3D2F5C" />
      <rect x="420" y="50"  width="30" height="110" rx="2" fill="#3D2F5C" />
      <rect x="460" y="80"  width="18" height="80"  rx="1" fill="#3D2F5C" />
      <rect x="486" y="45"  width="36" height="115" rx="2" fill="#3D2F5C" />
      <line x1="504" y1="45" x2="504" y2="22" stroke="#3D2F5C" strokeWidth="1.5" />
      <circle cx="504" cy="20" r="2.5" fill="#3D2F5C" />
      <rect x="530" y="75"  width="22" height="85"  rx="1" fill="#3D2F5C" />
      <rect x="560" y="60"  width="28" height="100" rx="2" fill="#3D2F5C" />
      <rect x="596" y="40"  width="40" height="120" rx="2" fill="#3D2F5C" />
      <line x1="616" y1="40" x2="616" y2="14" stroke="#3D2F5C" strokeWidth="2" />
      <circle cx="616" cy="12" r="3.5" fill="#3D2F5C" />
      <rect x="644" y="70"  width="20" height="90"  rx="1" fill="#3D2F5C" />
      <rect x="672" y="55"  width="32" height="105" rx="2" fill="#3D2F5C" />
      <rect x="712" y="85"  width="18" height="75"  rx="1" fill="#3D2F5C" />
      <rect x="738" y="35"  width="42" height="125" rx="3" fill="#3D2F5C" />
      <line x1="759" y1="35" x2="759" y2="8"  stroke="#3D2F5C" strokeWidth="2.5" />
      <circle cx="759" cy="6"  r="4" fill="#3D2F5C" />
      <rect x="790" y="65"  width="24" height="95"  rx="1" fill="#3D2F5C" />
      <rect x="822" y="80"  width="18" height="80"  rx="1" fill="#3D2F5C" />
      <rect x="848" y="50"  width="30" height="110" rx="2" fill="#3D2F5C" />
      <rect x="886" y="70"  width="22" height="90"  rx="1" fill="#3D2F5C" />
      <rect x="916" y="42"  width="36" height="118" rx="2" fill="#3D2F5C" />
      <line x1="934" y1="42" x2="934" y2="18" stroke="#3D2F5C" strokeWidth="1.5" />
      <circle cx="934" cy="16" r="2.5" fill="#3D2F5C" />
      <rect x="960" y="88"  width="16" height="72"  rx="1" fill="#3D2F5C" />
      <rect x="984" y="65"  width="26" height="95"  rx="1" fill="#3D2F5C" />
      <rect x="1018" y="45" width="34" height="115" rx="2" fill="#3D2F5C" />
      <rect x="1060" y="75" width="20" height="85"  rx="1" fill="#3D2F5C" />
      <rect x="1088" y="55" width="28" height="105" rx="2" fill="#3D2F5C" />

      {/* Island base — very soft */}
      <ellipse cx="600" cy="158" rx="520" ry="18" fill="#3D2F5C" opacity="0.5" />

      {/* Mist over island base */}
      <rect x="0" y="140" width="1200" height="20" fill="url(#mistGrad)" />
      <defs>
        <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8EF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFF8EF" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Floating elements ─────────────────────────────────────────
function FloatingLanterns({ reducedMotion }: { reducedMotion: boolean }) {
  const lanterns = [
    { x: "12%",  startY: "75%", size: 10, dur: 22, del: 0,   op: 0.55 },
    { x: "28%",  startY: "80%", size: 8,  dur: 28, del: -8,  op: 0.45 },
    { x: "72%",  startY: "70%", size: 12, dur: 25, del: -14, op: 0.50 },
    { x: "85%",  startY: "78%", size: 7,  dur: 32, del: -5,  op: 0.40 },
    { x: "45%",  startY: "82%", size: 9,  dur: 20, del: -18, op: 0.35 },
    { x: "58%",  startY: "76%", size: 6,  dur: 35, del: -22, op: 0.30 },
  ];

  return (
    <>
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -(window?.innerHeight ?? 800) * 0.7],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                  opacity: [0, l.op, l.op, 0],
                }
          }
          transition={{
            duration: l.dur,
            repeat: Infinity,
            delay: l.del,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: l.x,
            top: l.startY,
            width: l.size,
            height: l.size * 1.4,
            borderRadius: "50% 50% 40% 40%",
            background:
              "radial-gradient(ellipse at 40% 35%, rgba(255,230,140,0.95), rgba(255,180,60,0.7))",
            boxShadow: `0 0 ${l.size * 2}px rgba(255,200,80,0.6), 0 0 ${l.size * 4}px rgba(255,160,40,0.25)`,
          }}
        />
      ))}
    </>
  );
}

function FloatingBirds({ reducedMotion }: { reducedMotion: boolean }) {
  const birds = [
    { startX: "-5%", y: "22%", dur: 45, del: 0   },
    { startX: "-5%", y: "26%", dur: 52, del: -18  },
    { startX: "-5%", y: "18%", dur: 60, del: -35  },
  ];

  return (
    <>
      {birds.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={
            reducedMotion
              ? {}
              : { x: ["0vw", "110vw"], opacity: [0, 0.4, 0.35, 0] }
          }
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.del,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: b.startX,
            top: b.y,
          }}
        >
          {/* Simple bird — two bezier wings as SVG */}
          <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
            <path
              d="M12 5 Q6 0 0 3"
              stroke="rgba(60,45,90,0.5)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M12 5 Q18 0 24 3"
              stroke="rgba(60,45,90,0.5)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// ── Main component ────────────────────────────────────────────
export default function SunriseAtmosphere() {
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    const read = () => {
      setIsLight(
        document.documentElement.getAttribute("data-theme") === "light"
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLight && (
        <motion.div
          key="sunrise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* ── Layer 1: Sunrise sky gradient ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(
                180deg,
                #d8d6f5 0%,
                #eecdb8 22%,
                #f7ddb0 42%,
                #fde9c0 62%,
                #fff4e0 80%,
                #fff8ef 100%
              )`,
            }}
          />

          {/* ── Layer 2: Solar halo behind horizon ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              transform: "translate(-50%, -50%)",
              width: "70vw",
              height: "35vw",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255,210,100,0.28) 0%, rgba(255,170,70,0.12) 45%, transparent 72%)",
              filter: "blur(12px)",
            }}
          />

          {/* ── Layer 3: Sun disk ── */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : { scale: [1, 1.025, 1], opacity: [0.88, 1, 0.88] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "54%",
              transform: "translate(-50%, -50%)",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #ffe566 0%, #ffb830 55%, transparent 78%)",
              boxShadow:
                "0 0 48px rgba(255,210,80,0.55), 0 0 100px rgba(255,170,50,0.22)",
            }}
          />

          {/* ── Layer 4: Sunrays ── */}
          {!reducedMotion &&
            [-30, -18, -8, 0, 8, 18, 30].map((angle, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.04, 0.09, 0.04],
                  scaleY: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  bottom: "46%",
                  left: "50%",
                  width: 2,
                  height: `${38 + Math.abs(angle)}vh`,
                  background:
                    "linear-gradient(to top, rgba(255,200,80,0.7), transparent)",
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  transformOrigin: "bottom center",
                  opacity: 0.06,
                }}
              />
            ))}

          {/* ── Layer 5: Atmospheric clouds ── */}
          {CLOUDS.map((c, i) => (
            <motion.div
              key={i}
              animate={
                reducedMotion
                  ? {}
                  : { x: [`-${c.w}px`, `calc(100vw + ${c.w}px)`] }
              }
              transition={{
                duration: c.dur,
                repeat: Infinity,
                delay: c.del,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                top: c.top,
                left: c.left,
                width: c.w,
                height: c.h,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(255,248,235,0.9), rgba(255,235,210,0.6))",
                filter: `blur(${c.blur}px)`,
                opacity: c.op,
              }}
            />
          ))}

          {/* ── Layer 6: Horizon mist bank ── */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "56%",
              height: 120,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(255,240,210,0.35) 40%, rgba(255,248,235,0.6) 100%)",
              filter: "blur(6px)",
            }}
          />

          {/* ── Layer 7: Distant horizon line ── */}
          <motion.div
            animate={
              reducedMotion ? {} : { opacity: [0.3, 0.55, 0.3] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: "57%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(220,160,70,0.5), rgba(240,180,80,0.7), rgba(220,160,70,0.5), transparent)",
            }}
          />

          {/* ── Layer 8: Distant city silhouette ── */}
          <DistantCity />

          {/* ── Layer 9: Cloud ocean below city ── */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "38%",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(255,240,220,0.25) 30%, rgba(255,248,235,0.55) 70%, rgba(255,252,245,0.8) 100%)",
            }}
          />

          {/* ── Layer 10: Floating lanterns ── */}
          <FloatingLanterns reducedMotion={reducedMotion} />

          {/* ── Layer 11: Birds ── */}
          <FloatingBirds reducedMotion={reducedMotion} />

          {/* ── Layer 12: Drifting particles ── */}
          {!reducedMotion &&
            Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -(60 + i * 8)],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 2)],
                  opacity: [0, 0.35, 0],
                }}
                transition={{
                  duration: 8 + i * 1.2,
                  repeat: Infinity,
                  delay: i * 1.1,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  left: `${5 + i * 5.8}%`,
                  top: `${55 + (i % 5) * 8}%`,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  borderRadius: "50%",
                  background: "rgba(255,200,100,0.8)",
                  boxShadow: "0 0 5px rgba(255,180,60,0.5)",
                }}
              />
            ))}

          {/* ── Layer 13: Edge softening vignette ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(210,180,140,0.06) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}