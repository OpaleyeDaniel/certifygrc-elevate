import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function scrollToHashTarget(hash: string): boolean {
  const id = hash.slice(1);
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ block: "start", behavior: "auto" });
  return true;
}

function scrollToHashWithRetry(hash: string) {
  if (scrollToHashTarget(hash)) return;
  requestAnimationFrame(() => {
    if (!scrollToHashTarget(hash)) requestAnimationFrame(() => scrollToHashTarget(hash));
  });
}

/**
 * Resets window scroll to the top of the new route on every PUSH/REPLACE navigation.
 * - POP (back/forward) is left alone so the browser's native scroll restoration works.
 * - When the URL carries a `#hash`, we scroll to that element instead of the top.
 * - Hash links also work on the first paint (e.g. /#free-assessment, /free-assessment redirect).
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

    if (hash) {
      scrollToHashWithRetry(hash);
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
  }, [pathname, search, hash, navigationType]);

  return null;
}
