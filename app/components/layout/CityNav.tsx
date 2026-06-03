"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Sun, Moon } from "lucide-react";
import { NAV_ITEMS } from "@/app/lib/data";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useTheme } from "@/app/hooks/useTheme";
import { GithubIcon, LinkedinIcon } from "@/app/components/ui/SocialIcons";
import ModeToggle from "@/app/components/layout/ModeToggle";

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace("#", ""));

const iconBtnBase: React.CSSProperties = {
  width: 36,
  height: 36,
  border: "1px solid var(--border-subtle)",
  borderRadius: "50%",
  background: "var(--card-bg)",
  color: "var(--text-secondary)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  backdropFilter: "blur(8px)",
  flexShrink: 0,
};

export default function CityNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goTop = () => scrollTo("#hero");

  const openGithub = () =>
    window.open("https://github.com/whoj1ngmu77", "_blank", "noopener,noreferrer");

  const openLinkedin = () =>
    window.open(
      "https://www.linkedin.com/in/gayathri-menon-328376274/",
      "_blank",
      "noopener,noreferrer"
    );

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume-Gayathri.pdf";
    link.download = "Resume-Gayathri.pdf";
    link.click();
  };

  const hoverBrass = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--brass)";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--brass)";
  };
  const hoverTeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--teal)";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--teal)";
  };
  const hoverBlue = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "#0A66C2";
    (e.currentTarget as HTMLButtonElement).style.borderColor = "#0A66C2";
  };
  const hoverReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
    (e.currentTarget as HTMLButtonElement).style.borderColor =
      "var(--border-subtle)";
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="banner"
        style={{
          position: "fixed",
          top: 32,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <button
            onClick={goTop}
            aria-label="Nimbara — back to top"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.15rem",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              flexShrink: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--brass), var(--ember))",
                boxShadow: "var(--glow-brass)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
              }}
            >
              ✦
            </span>
            <span className="gradient-text" style={{ fontFamily: "var(--font-display)" }}>
              Nimbara
            </span>
          </button>

          {/* Desktop nav links */}
          <ul
            role="list"
            className="hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      padding: "0.4rem 0.75rem",
                      color: isActive ? "var(--brass)" : "var(--text-secondary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            <div className="hidden-mobile">
              <ModeToggle />
            </div>

            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                style={iconBtnBase}
                onMouseEnter={hoverBrass}
                onMouseLeave={hoverReset}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <button
              onClick={openGithub}
              aria-label="GitHub profile"
              className="hidden-mobile"
              style={iconBtnBase}
              onMouseEnter={hoverTeal}
              onMouseLeave={hoverReset}
            >
              <GithubIcon size={15} />
            </button>

            <button
              onClick={openLinkedin}
              aria-label="LinkedIn profile"
              className="hidden-mobile"
              style={iconBtnBase}
              onMouseEnter={hoverBlue}
              onMouseLeave={hoverReset}
            >
              <LinkedinIcon size={15} />
            </button>

            <button
              onClick={downloadResume}
              aria-label="Download resume"
              className="btn-primary btn-brass hidden-mobile"
              style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}
            >
              <Download size={13} />
              Resume
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="show-mobile"
              style={{
                width: 36,
                height: 36,
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                background: "var(--card-bg)",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "var(--bg-primary)",
              display: "flex",
              flexDirection: "column",
              padding: "5.5rem 2rem 2rem",
              gap: "0.25rem",
            }}
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--border-subtle)",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    color: isActive ? "var(--brass)" : "var(--text-primary)",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.districtName}
                  </span>
                </motion.button>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ paddingTop: "1rem" }}
            >
              <ModeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: "auto",
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                onClick={openGithub}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--text-secondary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                <GithubIcon size={16} /> GitHub
              </button>

              <button
                onClick={openLinkedin}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--text-secondary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                <LinkedinIcon size={16} /> LinkedIn
              </button>

              <button
                onClick={downloadResume}
                className="btn-primary btn-brass"
                style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}
              >
                <Download size={13} /> Resume
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}