import type { Achievement } from "@/app/types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_arrival",
    title: "First Arrival",
    description: "You found Nimbara floating above the clouds.",
    icon: "✦",
    trigger: "visit",
    triggerValue: "arrival",
    rarity: "common",
  },
  {
    id: "innovation_explorer",
    title: "Innovation Explorer",
    description: "You visited the towers where projects are built.",
    icon: "⚡",
    trigger: "visit",
    triggerValue: "innovation",
    rarity: "common",
  },
  {
    id: "green_thumb",
    title: "Green Thumb",
    description: "You wandered through the Skills Garden.",
    icon: "🌱",
    trigger: "visit",
    triggerValue: "skills",
    rarity: "common",
  },
  {
    id: "guild_member",
    title: "Guild Member",
    description: "You entered the Guild Hall and saw the work.",
    icon: "🏛️",
    trigger: "visit",
    triggerValue: "guild",
    rarity: "common",
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "You visited the Academy and its credentials.",
    icon: "🎓",
    trigger: "visit",
    triggerValue: "academy",
    rarity: "common",
  },
  {
    id: "visionary",
    title: "Visionary",
    description: "You climbed to the top of the Vision Tower.",
    icon: "🌟",
    trigger: "visit",
    triggerValue: "vision",
    rarity: "rare",
  },
  {
    id: "art_critic",
    title: "Art Critic",
    description: "You explored the Studio District's creative works.",
    icon: "🎨",
    trigger: "visit",
    triggerValue: "studio",
    rarity: "common",
  },
  {
    id: "signal_received",
    title: "Signal Received",
    description: "You reached the Beacon at the edge of the city.",
    icon: "📡",
    trigger: "visit",
    triggerValue: "beacon",
    rarity: "rare",
  },
  {
    id: "city_tour",
    title: "City Tour Complete",
    description: "You explored every district in Nimbara. Impressive.",
    icon: "🏙️",
    trigger: "scroll",
    triggerValue: "all_districts",
    rarity: "legendary",
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function getAchievementByTriggerValue(value: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.triggerValue === value);
}

export const RARITY_COLORS: Record<string, string> = {
  common: "var(--teal)",
  rare: "var(--brass)",
  legendary: "var(--lavender)",
};

export const RARITY_LABELS: Record<string, string> = {
  common: "Discovery",
  rare: "Rare Find",
  legendary: "Legendary",
};