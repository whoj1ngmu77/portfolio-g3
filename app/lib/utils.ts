import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    seedling: "Learning",
    growing: "Developing",
    blooming: "Proficient",
    flourishing: "Advanced",
  };
  return labels[level] ?? level;
}

export function getLevelDots(level: string): number {
  const dots: Record<string, number> = {
    seedling: 1,
    growing: 2,
    blooming: 3,
    flourishing: 4,
  };
  return dots[level] ?? 1;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    ai: "var(--lavender)",
    data: "var(--brass)",
    software: "var(--teal)",
    design: "var(--ember)",
    technical: "var(--teal)",
    leadership: "var(--ember)",
    other: "var(--brass)",
    education: "var(--teal)",
    project: "var(--ember)",
    skill: "var(--bloom)",
    achievement: "var(--brass)",
    reflection: "var(--lavender)",
  };
  return colors[category] ?? "var(--teal)";
}
