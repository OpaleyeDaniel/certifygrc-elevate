import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Resets window scroll to the top of the new route on every PUSH/REPLACE navigation.
 * - POP (back/forward) is left alone so the browser's native scroll restoration works.
 * - When the URL carries a `#hash`, we scroll to that element instead of the top.
 * - Uses `useLayoutEffect` so the reset happens before the new page paints (no flash of old offset).
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

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (navigationType === "POP") return;

    if (hash) {
      const id = hash.slice(1);
      const attempt = () => {
        const el = id ? document.getElementById(id) : null;
        if (el) {
          el.scrollIntoView({ block: "start", behavior: "auto" });
          return true;
        }
        return false;
      };
      if (!attempt()) {
        requestAnimationFrame(() => {
          if (!attempt()) requestAnimationFrame(attempt);
        });
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname, search, hash, navigationType]);

  return null;
}
