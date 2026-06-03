"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";
import DistrictHeader from "@/app/components/ui/DistrictHeader";
import { GithubIcon } from "@/app/components/ui/SocialIcons";
import { PROJECTS } from "@/app/lib/data";
import type { Project } from "@/app/types";

const CATEGORY_COLORS: Record<string, string> = {
  ai: "var(--lavender)",
  data: "var(--brass)",
  software: "var(--teal)",
  design: "var(--ember)",
};

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI & ML",
  data: "Data Science",
  software: "Software",
  design: "Design",
};

function GridDecoration() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0, right: 0,
        width: 320, height: 320,
        opacity: 0.03,
        pointerEvents: "none",
      }}
      viewBox="0 0 320 320"
    >
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 36} y={r * 36}
            width="28" height="28" rx="4"
            fill="var(--teal)"
          />
        ))
      )}
    </svg>
  );
}

function ProjectCard({ project, index, onClick }: {
  project: Project; index: number; onClick: () => void;
}) {
  const accentColor = CATEGORY_COLORS[project.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ padding: "1.75rem", cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", gap: "1rem" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    >
      {/* Accent top border */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, opacity: 0.8 }} />

      {/* Corner circuit decoration */}
      <svg aria-hidden="true" style={{ position: "absolute", bottom: 8, right: 8, opacity: 0.06, pointerEvents: "none" }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M60 0 L60 60 L0 60" fill="none" stroke="var(--teal)" strokeWidth="1" />
        <circle cx="60" cy="60" r="4" fill="var(--teal)" />
        <path d="M48 0 L48 48 L0 48" fill="none" stroke="var(--teal)" strokeWidth="0.5" />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.15rem 0.6rem",
              border: `1px solid ${accentColor}33`,
              borderRadius: "99px",
              background: `${accentColor}11`,
            }}>
              {CATEGORY_LABELS[project.category]}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {project.title}
          </h3>
        </div>
        <ArrowUpRight size={18} aria-hidden="true" style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "0.2rem" }} />
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65, flex: 1 }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.techStack.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>

      <div
        style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`GitHub for ${project.title}`}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <GithubIcon size={14} /> GitHub
        </a>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Live demo for ${project.title}`}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ExternalLink size={14} /> Live Demo
        </a>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const accentColor = CATEGORY_COLORS[project.category];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(13,11,30,0.85)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card"
        style={{ maxWidth: 620, width: "100%", padding: "2.25rem", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "var(--glass-02)", border: "1px solid var(--border-subtle)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
          <X size={16} />
        </button>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {CATEGORY_LABELS[project.category]} · {project.year}
          </span>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.03em", color: "var(--text-primary)", marginTop: "0.4rem" }}>
            {project.title}
          </h3>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {project.longDescription}
        </p>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Tech Stack</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.techStack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-outline" style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
            <GithubIcon size={15} /> View on GitHub
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-brass" style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
            <ExternalLink size={15} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InnovationDistrict() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" aria-label="Projects — Innovation District" style={{ position: "relative", overflow: "hidden" }}>
      <GridDecoration />
      <div className="section-wrapper">
        <DistrictHeader
          districtName="Innovation District"
          title="Things I've"
          titleHighlight="Built"
          subtitle="Each project is a building in Nimbara — a real structure of code, design, and curiosity. Click any to explore inside."
          icon="⚡"
          accentColor="var(--teal)"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}