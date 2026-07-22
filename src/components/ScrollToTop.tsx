import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { resolveSectionIdFromLocation, scrollToSection } from "@/lib/scrollToSection";

/**
 * Resets window scroll to the top of the new route on every PUSH/REPLACE navigation.
 * - POP (back/forward) is left alone so the browser's native scroll restoration works.
 * - When the URL carries a `#hash` or section alias path, scroll to that section.
 *
 * Place ONCE, inside <BrowserRouter>, above any route-rendering UI.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("scrollRestoration" in window.history)) return;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const sectionId = resolveSectionIdFromLocation(pathname, hash);

    if (sectionId) {
      scrollToSection(sectionId);
      isFirstRender.current = false;
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (navigationType === "POP") return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }

    window.__certifygrcLenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, search, hash, navigationType]);

  return null;
}
