"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Compass } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PERSONAL } from "@/app/lib/data";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

const NimbaraWorld = dynamic(
  () => import("@/app/components/three/NimbaraWorld"),
  { ssr: false, loading: () => null }
);

const BOOT_LINES = [
  { text: "Loading gayathri.exe...",            delay: 0    },
  { text: "Calibrating curiosity engines... ✓", delay: 900  },
  { text: "Initialising design modules... ✓",   delay: 1700 },
  { text: "Charging neural pathways... ✓",      delay: 2500 },
  { text: "Entering Nimbara...",                delay: 3300 },
];

const TYPEWRITER_SPEED = 28;

function useTypewriter(text: string, active: boolean, speed = TYPEWRITER_SPEED) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
}

function BootLine({ text, startDelay }: { text: string; startDelay: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);
  const displayed = useTypewriter(text, active);
  if (!active && displayed === "") return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--teal)" }}>❯</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        {displayed}
        {displayed.length < text.length && (
          <span style={{ borderRight: "2px solid var(--teal)", marginLeft: 1 }}>&nbsp;</span>
        )}
      </span>
    </div>
  );
}

// Dark mode SVG skyline — only shown in dark mode
function CityIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 900 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(900px, 100vw)",
        opacity: 0.18,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <ellipse cx="450" cy="195" rx="420" ry="22" fill="var(--dusk-mid)" opacity="0.6" />
      <rect x="40"  y="130" width="28" height="70"  rx="2" fill="var(--dusk-mid)" opacity="0.7" />
      <rect x="44"  y="140" width="4"  height="5"   rx="1" fill="var(--brass)"    opacity="0.9" />
      <rect x="52"  y="140" width="4"  height="5"   rx="1" fill="var(--brass)"    opacity="0.6" />
      <rect x="72"  y="110" width="36" height="90"  rx="2" fill="var(--dusk-mid)" opacity="0.8" />
      <rect x="78"  y="118" width="5"  height="6"   rx="1" fill="var(--brass)"    opacity="0.9" />
      <rect x="87"  y="118" width="5"  height="6"   rx="1" fill="var(--ember)"    opacity="0.7" />
      <rect x="120" y="80"  width="42" height="120" rx="3" fill="var(--dusk)"     opacity="0.9" />
      <rect x="127" y="88"  width="6"  height="7"   rx="1" fill="var(--brass)"    opacity="1"   />
      <rect x="138" y="88"  width="6"  height="7"   rx="1" fill="var(--teal)"     opacity="0.8" />
      <line x1="141" y1="80" x2="141" y2="58" stroke="var(--lavender)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="141" cy="56" r="2.5" fill="var(--brass)" opacity="0.9" />
      <rect x="220" y="50"  width="55" height="150" rx="4" fill="var(--dusk)"     opacity="0.95" />
      <rect x="228" y="62"  width="7"  height="8"   rx="1" fill="var(--brass)"    opacity="1"    />
      <rect x="240" y="62"  width="7"  height="8"   rx="1" fill="var(--teal)"     opacity="0.8"  />
      <rect x="252" y="62"  width="7"  height="8"   rx="1" fill="var(--brass)"    opacity="0.7"  />
      <line x1="247" y1="50" x2="247" y2="22" stroke="var(--lavender)" strokeWidth="2" opacity="0.6" />
      <circle cx="247" cy="20" r="3" fill="var(--ember)" opacity="1" />
      <rect x="282" y="30"  width="68" height="170" rx="4" fill="var(--dusk)"     opacity="1"   />
      <rect x="292" y="42"  width="8"  height="9"   rx="1" fill="var(--brass)"    opacity="1"   />
      <rect x="306" y="42"  width="8"  height="9"   rx="1" fill="var(--teal)"     opacity="0.9" />
      <rect x="320" y="42"  width="8"  height="9"   rx="1" fill="var(--brass)"    opacity="0.7" />
      <line x1="316" y1="30" x2="316" y2="4" stroke="var(--brass)" strokeWidth="2.5" opacity="0.7" />
      <circle cx="316" cy="2" r="3.5" fill="var(--brass)" opacity="1" />
      <rect x="358" y="65"  width="50" height="135" rx="3" fill="var(--dusk)"     opacity="0.9"  />
      <rect x="468" y="60"  width="52" height="140" rx="3" fill="var(--dusk)"     opacity="0.9"  />
      <line x1="494" y1="60" x2="494" y2="36" stroke="var(--lavender)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="494" cy="34" r="2.5" fill="var(--teal)" opacity="0.9" />
      <rect x="572" y="75"  width="44" height="125" rx="3" fill="var(--dusk)"     opacity="0.85" />
      <rect x="662" y="90"  width="36" height="110" rx="2" fill="var(--dusk)"     opacity="0.8"  />
      <rect x="740" y="110" width="34" height="90"  rx="2" fill="var(--dusk-mid)" opacity="0.7"  />
      <rect x="816" y="120" width="30" height="80"  rx="2" fill="var(--dusk-mid)" opacity="0.65" />
      <ellipse cx="450" cy="200" rx="380" ry="18" fill="var(--brass)" opacity="0.04" />
    </svg>
  );
}

export default function ArrivalGate() {
  const [showCity, setShowCity] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const sectionRef = useRef<HTMLElement>(null);
  const deviceCapability = useNimbaraStore((s) => s.deviceCapability);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay;
  const isLight = currentTheme === "light";

  // Only show 3D in dark mode — light mode uses SunriseAtmosphere
  const show3D = !isLight && deviceCapability !== "low" && !reducedMotion;

  // Track theme
  useEffect(() => {
    const read = () => {
      setCurrentTheme(
        document.documentElement.getAttribute("data-theme") ?? "dark"
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

  useEffect(() => {
    const lastText = BOOT_LINES[BOOT_LINES.length - 1].text;
    const totalDelay = lastDelay + lastText.length * TYPEWRITER_SPEED + 600;
    const t = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowCity(true), 400);
    }, totalDelay);
    return () => clearTimeout(t);
  }, [lastDelay]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(-rect.top / sectionHeight, 1));
      setHeroScrollY(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume-Gayathri.pdf";
    link.download = "Resume-Gayathri.pdf";
    link.click();
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero — Arrival Gate"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 1.5rem 4rem",
        // Light mode: transparent — SunriseAtmosphere (fixed) shows through
        // Dark mode: keep existing gradient
        background: isLight
          ? "transparent"
          : "var(--hero-gradient, radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,27,105,0.55) 0%, transparent 70%))",
      }}
    >
      {/* Dark mode radial gradient overlay */}
      {!isLight && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,27,105,0.55) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,140,66,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* CSS cloud layer — dark mode only */}
      {!isLight && (
        <div className="cloud-layer" aria-hidden="true">
          <div className="cloud" />
          <div className="cloud" />
          <div className="cloud" />
          <div className="cloud" />
          <div className="cloud" />
          <div className="cloud" />
        </div>
      )}

      {/* 3D world — dark mode + capable devices */}
      {show3D && <NimbaraWorld scrollY={heroScrollY} />}

      {/* Dark mode SVG skyline fallback */}
      {!show3D && !isLight && <CityIllustration />}

      {/* Bottom fade — adapts to theme */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 200,
          background: `linear-gradient(to top, var(--bg-secondary) 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 2,
          transition: "background 0.6s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: 820 }}>

        {/* Boot terminal */}
        <AnimatePresence>
          {!showCity && (
            <motion.div
              key="boot"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(13,11,30,0.88)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem 2rem",
                backdropFilter: "blur(12px)",
                display: "inline-flex",
                flexDirection: "column",
                gap: "0.55rem",
                minWidth: 340,
                maxWidth: "90vw",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              {BOOT_LINES.map((line) => (
                <BootLine key={line.text} text={line.text} startDelay={line.delay} />
              ))}
              {bootComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--bloom)", marginTop: "0.25rem" }}
                >
                  ✓ Welcome to Nimbara
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main hero */}
        <AnimatePresence>
          {showCity && (
            <motion.div
              key="city"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="section-label"
                style={{ marginBottom: "1.5rem" }}
              >
                ✦ &nbsp;Arrival Gate — Welcome to Nimbara
              </motion.p>

              {/* Headshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
              >
                <div style={{ position: "relative", width: 116, height: 116 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--brass), var(--teal), var(--lavender))",
                      zIndex: 0,
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", inset: 3,
                      borderRadius: "50%",
                      background: "var(--bg-primary)",
                      zIndex: 1,
                      transition: "background 0.6s ease",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ scale: [1, 1.14], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: "50%",
                      border: "2px solid var(--brass)",
                      zIndex: 0,
                    }}
                  />
                  <Image
                    src={PERSONAL.headshot}
                    alt="Gayathri Menon"
                    width={110}
                    height={110}
                    priority
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      position: "absolute",
                      inset: 3,
                      zIndex: 2,
                      width: "calc(100% - 6px)",
                      height: "calc(100% - 6px)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 7vw, 5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                }}
              >
                {"Gayathri "}
                <span
                  className="gradient-text glow-text-brass"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Menon
                </span>
              </motion.h1>

              {/* Role tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}
              >
                {["ECS @ VIT", "AI & ML", "Frontend Dev", "Designer"].map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: "0.72rem" }}>{tag}</span>
                ))}
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  maxWidth: "52ch",
                  margin: "0 auto 0.75rem",
                  lineHeight: 1.65,
                }}
              >
                {"A floating city built from "}
                <span style={{ color: "var(--teal)" }}>projects</span>
                {", "}
                <span style={{ color: "var(--brass)" }}>ideas</span>
                {", "}
                <span style={{ color: "var(--ember)" }}>experiments</span>
                {", and curiosity."}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  marginBottom: "2.5rem",
                }}
              >
                Engineer by training · Builder by nature · Designer at heart
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.5 }}
                style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
              >
                <button
                  onClick={scrollToProjects}
                  className="btn-primary btn-brass"
                  aria-label="Explore Nimbara"
                >
                  <Compass size={16} />
                  Explore Nimbara
                </button>
                <button
                  onClick={downloadResume}
                  className="btn-primary btn-outline"
                  aria-label="Download resume"
                >
                  <Download size={16} />
                  Download Resume
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "3.5rem", flexWrap: "wrap" }}
              >
                {[
                  { value: "8.3", label: "CGPA / 10.0"   },
                  { value: "4+",  label: "Projects Built" },
                  { value: "4+",  label: "Certifications" },
                  { value: "3rd", label: "Year ECS @ VIT" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "var(--brass)",
                      lineHeight: 1,
                      marginBottom: "0.2rem",
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll cue */}
      {showCity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: "2rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "0.3rem",
            color: "var(--text-muted)",
            zIndex: 3,
          }}
          aria-hidden="true"
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}