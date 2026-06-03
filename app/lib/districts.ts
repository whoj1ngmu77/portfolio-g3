import type { District } from "@/app/types";

export const DISTRICTS: District[] = [
  {
    id: "arrival",
    name: "Arrival Gate",
    sectionId: "hero",
    icon: "✦",
    accentColor: "var(--brass)",
    mapPosition: { x: 50, y: 10 },
    description: "The entry point to Nimbara. Where every journey begins.",
    population: "∞ visitors",
    status: "Always open",
  },
  {
    id: "innovation",
    name: "Innovation District",
    sectionId: "projects",
    icon: "⚡",
    accentColor: "var(--teal)",
    mapPosition: { x: 72, y: 32 },
    description: "Towers of code and logic. Where projects are born.",
    population: "4 structures",
    status: "Under construction",
  },
  {
    id: "skills",
    name: "Skills Garden",
    sectionId: "skills",
    icon: "🌱",
    accentColor: "var(--bloom)",
    mapPosition: { x: 28, y: 38 },
    description: "An organic garden of growing capabilities.",
    population: "30+ specimens",
    status: "Flourishing",
  },
  {
    id: "guild",
    name: "Guild Hall",
    sectionId: "experience",
    icon: "🏛️",
    accentColor: "var(--brass)",
    mapPosition: { x: 50, y: 48 },
    description: "The civic heart. Where experience is honoured.",
    population: "1 active role",
    status: "Operational",
  },
  {
    id: "academy",
    name: "The Academy",
    sectionId: "certifications",
    icon: "🎓",
    accentColor: "var(--lavender)",
    mapPosition: { x: 75, y: 58 },
    description: "A campus of earned knowledge and open doors.",
    population: "4 credentials",
    status: "Accepting learners",
  },
  {
    id: "vision",
    name: "The Vision Tower",
    sectionId: "vision",
    icon: "🌟",
    accentColor: "var(--brass)",
    mapPosition: { x: 25, y: 62 },
    description: "The highest point in Nimbara. Where ambition lives.",
    population: "1 dreamer",
    status: "Always rising",
  },
  {
    id: "studio",
    name: "Studio District",
    sectionId: "design",
    icon: "🎨",
    accentColor: "var(--ember)",
    mapPosition: { x: 38, y: 78 },
    description: "The creative quarter. Where art and engineering meet.",
    population: "6 works",
    status: "Creating",
  },
  {
    id: "beacon",
    name: "The Beacon",
    sectionId: "contact",
    icon: "📡",
    accentColor: "var(--teal)",
    mapPosition: { x: 62, y: 82 },
    description: "The lighthouse at the edge. Sending signals outward.",
    population: "Open to all",
    status: "Broadcasting",
  },
];

export const WORLD_METADATA = {
  version: "1.0",
  cityStatus: "Expanding",
  totalProjects: 4,
  totalDistricts: 8,
  lastUpdated: "2026",
} as const;

export function getDistrictById(id: string): District | undefined {
  return DISTRICTS.find((d) => d.id === id);
}

export function getDistrictBySectionId(sectionId: string): District | undefined {
  return DISTRICTS.find((d) => d.sectionId === sectionId);
}