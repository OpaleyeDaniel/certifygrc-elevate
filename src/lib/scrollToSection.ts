import type Lenis from "lenis";

declare global {
  interface Window {
    __certifygrcLenis?: Lenis;
  }
}

const NAV_OFFSET = 96;
const RETRY_DELAYS_MS = [0, 50, 150, 300, 600, 1000, 1500, 2000];
const ALIGNMENT_TOLERANCE_PX = 32;

function getScrollTopForElement(el: HTMLElement): number {
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  return Math.max(0, top);
}

function isSectionAligned(el: HTMLElement): boolean {
  return Math.abs(el.getBoundingClientRect().top - NAV_OFFSET) <= ALIGNMENT_TOLERANCE_PX;
}

function scrollWithNative(el: HTMLElement): void {
  const top = getScrollTopForElement(el);
  window.scrollTo({ top, left: 0, behavior: "auto" });
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = top;
  }
}

function scrollWithLenis(lenis: Lenis, el: HTMLElement): void {
  lenis.scrollTo(el, {
    offset: -NAV_OFFSET,
    duration: 0,
    immediate: true,
    force: true,
  });
}

function attemptScroll(sectionId: string): boolean {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  const lenis = window.__certifygrcLenis;
  if (lenis) {
    scrollWithLenis(lenis, el);
  } else {
    scrollWithNative(el);
  }

  return isSectionAligned(el);
}

/** Scroll to a section id — works with Lenis and retries until the target mounts. */
export function scrollToSection(sectionId: string): void {
  if (typeof window === "undefined" || !sectionId) return;

  RETRY_DELAYS_MS.forEach((delay) => {
    window.setTimeout(() => {
      attemptScroll(sectionId);
    }, delay);
  });
}

/** Read hash or pathname aliases like /free-assessment */
export function resolveSectionIdFromLocation(pathname: string, hash: string): string | null {
  if (hash) return hash.replace(/^#/, "");
  if (pathname === "/free-assessment") return "free-assessment";
  return null;
}
