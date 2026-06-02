"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/app/components/ui/SocialIcons";
import SectionHeader from "@/app/components/ui/SectionHeader";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: "", email: "", subject: "", message: "" };

function InputField({
  label, id, type = "text", value, onChange, required, placeholder, rows,
}: {
  label: string; id: string; type?: string;
  value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--card-bg)",
    border: `1px solid ${focused ? "var(--brass)" : "var(--border-subtle)"}`,
    borderRadius: "var(--radius-md)",
    padding: rows ? "0.9rem 1.1rem" : "0.85rem 1.1rem",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.92rem",
    resize: rows ? "vertical" as const : undefined,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? "0 0 0 3px rgba(212,168,67,0.12)" : "none",
    backdropFilter: "blur(8px)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          color: focused ? "var(--brass)" : "var(--text-muted)",
          letterSpacing: "0.1em", textTransform: "uppercase",
          transition: "color 0.2s",
        }}
      >
        {label}{required && " *"}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={placeholder}
          rows={rows}
          aria-required={required}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={placeholder}
          aria-required={required}
          style={baseStyle}
        />
      )}
    </div>
  );
}

export default function TheBeacon() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [state, setState] = useState<FormState>("idle");

  const setField = (field: keyof FormData) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    // Simulate submission — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
    setForm(INITIAL_FORM);
  };

  return (
    <section
      id="contact"
      aria-label="Contact — The Beacon"
      style={{
        background: "linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, var(--bg-primary) 100%)",
      }}
    >
      <div className="section-wrapper">
        <SectionHeader
          districtLabel="The Beacon"
          title="Send a"
          titleHighlight="Signal"
          subtitle="The lighthouse at the edge of Nimbara. Whether you're a recruiter, collaborator, or curious visitor — I'd love to hear from you."
          align="center"
        />

        {/* Beacon illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
          style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}
        >
          <div style={{ position: "relative", width: 80, height: 80 }}>
            {/* Outer pulse rings */}
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                animate={{ scale: [1, 1.8 + n * 0.3], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: n * 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid var(--brass)",
                }}
              />
            ))}
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--brass), var(--ember))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem",
              boxShadow: "var(--glow-brass)",
            }}>
              📡
            </div>
          </div>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "2rem",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            {state === "success" ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "1rem", padding: "2rem 0", textAlign: "center",
              }}>
                <CheckCircle size={48} style={{ color: "var(--bloom)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "var(--text-primary)" }}>
                  Message received!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  The beacon lit up. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="btn-primary btn-outline"
                  style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem",
                  color: "var(--text-primary)", marginBottom: "1.5rem",
                }}>
                  Send a message
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <InputField label="Your name" id="name" value={form.name}
                      onChange={setField("name")} required placeholder="Ada Lovelace" />
                    <InputField label="Email" id="email" type="email" value={form.email}
                      onChange={setField("email")} required placeholder="ada@example.com" />
                  </div>
                  <InputField label="Subject" id="subject" value={form.subject}
                    onChange={setField("subject")} placeholder="Internship opportunity / Collab / Hi!" />
                  <InputField label="Message" id="message" value={form.message}
                    onChange={setField("message")} required
                    placeholder="Tell me what's on your mind..." rows={5} />

                  {state === "error" && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      color: "#F87171", fontSize: "0.82rem",
                      padding: "0.75rem 1rem",
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: "var(--radius-md)",
                    }}>
                      <AlertCircle size={15} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="btn-primary btn-brass"
                    style={{ justifyContent: "center", opacity: state === "submitting" ? 0.7 : 1 }}
                    aria-busy={state === "submitting"}
                  >
                    {state === "submitting" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "rgba(0,0,0,0.8)", borderRadius: "50%" }}
                        />
                        Transmitting...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Availability badge */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: "var(--bloom)",
                  boxShadow: "0 0 10px var(--bloom)",
                  animation: "pulse-teal 2s infinite",
                }} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--bloom)", letterSpacing: "0.08em" }}>
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Currently seeking internships for Summer 2025 in Data Science, AI/ML, or Software Development.
              </p>
            </div>

            {/* Connect links */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Find me on
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: Mail, label: "Email", value: "gayathri@example.com", href: "mailto:gayathri@example.com", color: "var(--brass)" },
                  { icon: GithubIcon, label: "GitHub", value: "github.com/gayathri", href: "https://github.com", color: "var(--teal)" },
                  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/gayathri", href: "https://linkedin.com", color: "#0A66C2" },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${value}`}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      textDecoration: "none",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--glass-01)",
                      border: "1px solid var(--border-subtle)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-02)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--glass-01)";
                    }}
                  >
                    <Icon size={16} style={{ color, flexShrink: 0 }} aria-hidden="true" />
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.82rem", color: "var(--text-primary)" }}>
                        {label}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)" }}>
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div style={{
              padding: "0.9rem 1.1rem",
              background: "var(--glass-01)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}>
              ⏱ &nbsp;Typical response time: 24–48 hours
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.5rem",
          textAlign: "center",
        }}
        role="contentinfo"
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
          Built with curiosity in Nimbara &nbsp;·&nbsp; Gayathri © {new Date().getFullYear()}
          &nbsp;·&nbsp;
          <span style={{ color: "var(--brass)" }}>Phase 1</span>
        </p>
      </footer>
    </section>
  );
}
