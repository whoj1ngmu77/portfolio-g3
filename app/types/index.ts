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
