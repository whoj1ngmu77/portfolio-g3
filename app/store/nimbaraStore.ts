import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Achievement, DeviceCapability, NimbaraMode } from "@/app/types";

interface NimbaraState {
  // ── Mode ────────────────────────────────────────────────────────
  mode: NimbaraMode;
  setMode: (mode: NimbaraMode) => void;

  // ── Navigation ──────────────────────────────────────────────────
  activeDistrict: string;
  visitedDistricts: string[];
  setActiveDistrict: (id: string) => void;
  markDistrictVisited: (id: string) => void;

  // ── Scroll ──────────────────────────────────────────────────────
  scrollProgress: number;
  setScrollProgress: (value: number) => void;

  // ── Achievements ────────────────────────────────────────────────
  unlockedAchievements: string[];
  pendingAchievement: Achievement | null;
  unlockAchievement: (achievement: Achievement) => void;
  clearPendingAchievement: () => void;

  // ── Companion ───────────────────────────────────────────────────
  companionVisible: boolean;
  companionMessage: string;
  companionDismissed: boolean;
  setCompanionMessage: (msg: string) => void;
  toggleCompanion: () => void;
  dismissCompanion: () => void;

  // ── Device ──────────────────────────────────────────────────────
  deviceCapability: DeviceCapability;
  reducedMotion: boolean;
  setDeviceCapability: (cap: DeviceCapability) => void;
  setReducedMotion: (value: boolean) => void;
}

export const useNimbaraStore = create<NimbaraState>()(
  persist(
    (set, get) => ({
      // ── Mode ──────────────────────────────────────────────────
      mode: "scroll",
      setMode: (mode) => set({ mode }),

      // ── Navigation ────────────────────────────────────────────
      activeDistrict: "arrival",
      visitedDistricts: [],
      setActiveDistrict: (id) => {
        set({ activeDistrict: id });
        get().markDistrictVisited(id);
      },
      markDistrictVisited: (id) => {
        const current = get().visitedDistricts;
        if (!current.includes(id)) {
          set({ visitedDistricts: [...current, id] });
        }
      },

      // ── Scroll ────────────────────────────────────────────────
      scrollProgress: 0,
      setScrollProgress: (value) => set({ scrollProgress: value }),

      // ── Achievements ──────────────────────────────────────────
      unlockedAchievements: [],
      pendingAchievement: null,
      unlockAchievement: (achievement) => {
        const current = get().unlockedAchievements;
        if (current.includes(achievement.id)) return;
        set({
          unlockedAchievements: [...current, achievement.id],
          pendingAchievement: achievement,
        });
      },
      clearPendingAchievement: () => set({ pendingAchievement: null }),

      // ── Companion ─────────────────────────────────────────────
      companionVisible: true,
      companionMessage: "Welcome to Nimbara.",
      companionDismissed: false,
      setCompanionMessage: (msg) => set({ companionMessage: msg }),
      toggleCompanion: () =>
        set((s) => ({ companionVisible: !s.companionVisible })),
      dismissCompanion: () =>
        set({ companionDismissed: true, companionVisible: false }),

      // ── Device ────────────────────────────────────────────────
      deviceCapability: "high",
      reducedMotion: false,
      setDeviceCapability: (cap) => set({ deviceCapability: cap }),
      setReducedMotion: (value) => set({ reducedMotion: value }),
    }),
    {
      name: "nimbara-store",
      // Only persist these keys across sessions
      partialize: (state) => ({
        visitedDistricts: state.visitedDistricts,
        unlockedAchievements: state.unlockedAchievements,
        companionDismissed: state.companionDismissed,
        mode: state.mode,
      }),
    }
  )
);