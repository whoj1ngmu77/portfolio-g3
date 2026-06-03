"use client";

import { useEffect, useRef } from "react";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

/**
 * Tracks page scroll progress (0 = top, 1 = bottom).
 * Updates the Zustand store. Uses passive listener for performance.
 * Returns the current progress value directly for convenience.
 */
export function useScrollProgress(): number {
  const setScrollProgress = useNimbaraStore((s) => s.setScrollProgress);
  const scrollProgress = useNimbaraStore((s) => s.scrollProgress);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const calculate = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(Number(progress.toFixed(4)));
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calculate);
    };

    calculate(); // initial value
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [setScrollProgress]);

  return scrollProgress;
}