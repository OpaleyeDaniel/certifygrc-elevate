import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveSectionIdFromLocation, scrollToSection } from "@/lib/scrollToSection";

/** Scroll to a landing-page section after route/hash navigation. */
export function useSectionScroll(sectionId?: string) {
  const { pathname, hash } = useLocation();
  const targetId = sectionId ?? resolveSectionIdFromLocation(pathname, hash) ?? undefined;

  useEffect(() => {
    if (!targetId) return;
    scrollToSection(targetId);
  }, [targetId, pathname, hash]);
}
