"use client";

import { useEffect } from "react";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import type { DeviceCapability } from "@/app/types";

/**
 * Runs once on mount. Detects device capability and reduced-motion
 * preference. Sets results into the Zustand store.
 *
 * HIGH   → desktop, likely dedicated GPU
 * MEDIUM → tablet or integrated GPU
 * LOW    → mobile or low-end device
 */
export function useDeviceCapability(): DeviceCapability {
  const setDeviceCapability = useNimbaraStore((s) => s.setDeviceCapability);
  const setReducedMotion = useNimbaraStore((s) => s.setReducedMotion);
  const deviceCapability = useNimbaraStore((s) => s.deviceCapability);

  useEffect(() => {
    // Reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mq.addEventListener("change", onMotionChange);

    // Device capability heuristic
    const cores = navigator.hardwareConcurrency ?? 2;
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    const isTablet =
      /iPad|Tablet/i.test(navigator.userAgent) ||
      (window.innerWidth >= 768 && window.innerWidth < 1200 && isMobile);
    const prefersReducedMotion = mq.matches;

    let capability: DeviceCapability;

    if (prefersReducedMotion || (isMobile && cores < 4)) {
      capability = "low";
    } else if (isTablet || (isMobile && cores >= 4) || cores < 6) {
      capability = "medium";
    } else {
      capability = "high";
    }

    setDeviceCapability(capability);

    return () => {
      mq.removeEventListener("change", onMotionChange);
    };
  }, [setDeviceCapability, setReducedMotion]);

  return deviceCapability;
}