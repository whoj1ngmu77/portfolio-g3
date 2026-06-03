"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/app/components/ui/SocialIcons";
import { PERSONAL } from "@/app/lib/data";

const QUICK_LINKS = [
  { label: "Projects",       sectionId: "projects",       icon: "⚡", color: "var(--teal)"    },
  { label: "Skills",         sectionId: "skills",         icon: "🌱", color: "var(--bloom)"   },
  { label: "Experience",     sectionId: "experience",     icon: "🏛️", color: "var(--brass)"   },
  { label: "Certifications", sectionId: "certifications", icon: "🎓", color: "var(--lavender)"},
  { label: "Contact",        sectionId: "contact",        icon: "📡", color: "var(--teal)"    },
];

const iconBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-muted)",
  background: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  flexShrink: 0,
};

export default function RecruiterPanel() {
  const mode = useNimbaraStore((s) => s.mode);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);

  const isOpen = mode === "scroll";

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume-Gayathri.pdf";
    link.download = "Resume-Gayathri.pdf";
    link.click();
  };

  const openGithub = () =>
    window.open(PERSONAL.github, "_blank", "noopener,noreferrer");

  const openLinkedin = () =>
    window.open(PERSONAL.linkedin, "_blank", "noopener,noreferrer");

  const openEmail = () =>
    window.open(`mailto:${PERSONAL.email}`);

  const hoverTeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--teal)";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--teal)";
  };
  const hoverBlue = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "#0A66C2";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "#0A66C2";
  };
  const hoverBrass = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--brass)";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--brass)";
  };
  const hoverReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="recruiter-panel"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Recruiter quick access panel"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 140,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            background: "rgba(13,11,30,0.92)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.5)",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "calc(100vw - 3rem)",
          }}
        >
          {/* Label */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              paddingRight: "0.25rem",
              borderRight: "1px solid var(--border-subtle)",
              marginRight: "0.25rem",
              whiteSpace: "nowrap",
            }}
          >
            Quick Access
          </span>

          {/* Section links */}
          {QUICK_LINKS.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollTo(link.sectionId)}
              aria-label={`Go to ${link.label}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0.7rem",
                border: "1px solid transparent",
                borderRadius: "99px",
                background: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = `${link.color}15`;
                btn.style.borderColor = `${link.color}40`;
                btn.style.color = link.color;
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "none";
                btn.style.borderColor = "transparent";
                btn.style.color = "var(--text-secondary)";
              }}
            >
              <span style={{ fontSize: "0.75rem" }} aria-hidden="true">
                {link.icon}
              </span>
              {link.label}
            </button>
          ))}

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              width: 1,
              height: 20,
              background: "var(--border-subtle)",
              margin: "0 0.25rem",
            }}
          />

          {/* Social + resume buttons */}
          <button
            onClick={openGithub}
            aria-label="GitHub profile"
            style={iconBtn}
            onMouseEnter={hoverTeal}
            onMouseLeave={hoverReset}
          >
            <GithubIcon size={13} />
          </button>

          <button
            onClick={openLinkedin}
            aria-label="LinkedIn profile"
            style={iconBtn}
            onMouseEnter={hoverBlue}
            onMouseLeave={hoverReset}
          >
            <LinkedinIcon size={13} />
          </button>

          <button
            onClick={openEmail}
            aria-label="Send email"
            style={iconBtn}
            onMouseEnter={hoverBrass}
            onMouseLeave={hoverReset}
          >
            <Mail size={13} />
          </button>

          <button
            onClick={downloadResume}
            aria-label="Download resume"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.35rem 0.8rem",
              border: "none",
              borderRadius: "99px",
              background: "linear-gradient(135deg, var(--brass), var(--ember))",
              color: "#0D0B1E",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.7rem",
              boxShadow: "var(--glow-brass)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(212,168,67,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--glow-brass)";
            }}
          >
            <Download size={11} />
            Resume
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}