"use client";

import { useState, useEffect } from "react";
import { useNimbaraStore } from "@/app/store/nimbaraStore";
import { getDistrictBySectionId } from "@/app/lib/districts";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");
  const setActiveDistrict = useNimbaraStore((s) => s.setActiveDistrict);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      sectionId: string
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);

          // Sync to Zustand store
          const district = getDistrictBySectionId(sectionId);
          if (district) {
            setActiveDistrict(district.id);
          }
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
  }, [sectionIds, setActiveDistrict]);

  return activeSection;
}