"use client";

import { useEffect, useRef } from "react";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import {
  getAchievementByTriggerValue,
  getAchievementById,
} from "@/app/lib/achievements";

export function useAchievements() {
  const activeDistrict = useNimbaraStore((s) => s.activeDistrict);
  const visitedDistricts = useNimbaraStore((s) => s.visitedDistricts);
  const unlockedAchievements = useNimbaraStore((s) => s.unlockedAchievements);
  const unlockAchievement = useNimbaraStore((s) => s.unlockAchievement);
  const processedDistricts = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!activeDistrict) return;
    if (processedDistricts.current.has(activeDistrict)) return;
    processedDistricts.current.add(activeDistrict);

    const achievement = getAchievementByTriggerValue(activeDistrict);
    if (achievement && !unlockedAchievements.includes(achievement.id)) {
      const t = setTimeout(() => {
        unlockAchievement(achievement);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [activeDistrict, unlockedAchievements, unlockAchievement]);

  useEffect(() => {
    const allDistricts = [
      "arrival", "innovation", "skills", "guild",
      "academy", "vision", "studio", "beacon",
    ];
    const allVisited = allDistricts.every((d) => visitedDistricts.includes(d));
    if (!allVisited) return;

    const cityTour = getAchievementById("city_tour");
    if (cityTour && !unlockedAchievements.includes("city_tour")) {
      const t = setTimeout(() => unlockAchievement(cityTour), 800);
      return () => clearTimeout(t);
    }
  }, [visitedDistricts, unlockedAchievements, unlockAchievement]);
}