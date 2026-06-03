export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: "ai" | "data" | "software" | "design";
  featured: boolean;
  year: number;
}

export interface Skill {
  name: string;
  level: "seedling" | "growing" | "blooming" | "flourishing";
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  districtLabel: string;
  skills: Skill[];
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: "internship" | "job" | "research" | "volunteering";
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
  location: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  category: "technical" | "design" | "leadership" | "other";
}

export interface JourneyMilestone {
  id: string;
  year: string;
  month?: string;
  title: string;
  description: string;
  type: "education" | "project" | "skill" | "achievement" | "reflection";
  emoji: string;
}

export interface DesignWork {
  id: string;
  title: string;
  category: "illustration" | "branding" | "ui" | "poster" | "other";
  description: string;
  imageUrl: string;
  tools: string[];
  year: number;
}

export interface NavItem {
  label: string;
  districtName: string;
  href: string;
}
// ── existing types above this line ──────────────────────────────

export interface District {
  id: string;
  name: string;
  sectionId: string;
  icon: string;
  accentColor: string;
  mapPosition: { x: number; y: number };
  description: string;
  population: string;
  status: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  trigger: "visit" | "scroll" | "click" | "time";
  triggerValue?: string;
  rarity: "common" | "rare" | "legendary";
}

export interface WorldMetadata {
  version: string;
  cityStatus: string;
  totalProjects: number;
  totalDistricts: number;
  lastUpdated: string;
}

export type DeviceCapability = "high" | "medium" | "low";

export type NimbaraMode = "scroll" | "explore";