"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      sectionId: string
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      });
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => handleIntersection(entries, id),
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
