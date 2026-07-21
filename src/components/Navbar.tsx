import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", path: "/company" },
  { label: "Application", path: "/software" },
  { label: "Consulting Services", path: "/consulting" },
  { label: "CyberDrill", path: "/cyber-aware" },
  { label: "Blog", path: "/blog" },
  { label: "Alliance", path: "/partner" },
  { label: "Contact Us", path: "/contact" },
];

interface NavbarProps {
  onTalkWithAdvisor: () => void;
  onBookDemo?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Plain-text nav item — active link just changes color, no pill/underline chrome
 *  (matches the clean floating-pill reference: text only, no extra decoration). */
function NavLinkItem({
  link,
  active,
  onClick,
}: {
  link: (typeof navLinks)[number];
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={link.path}
      onClick={onClick}
      className={cn(
        "px-2 py-2 text-[13.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200",
        active ? "text-primary" : "text-foreground/75 hover:text-foreground",
      )}
    >
      {link.label}
    </Link>
  );
}

/**
 * Floating "pill" navbar — a rounded, opaque card that sits with margin from
 * the viewport edges instead of a full-bleed bar, logo left / links centered
 * / an outline + solid CTA pairing on the right (the outline button reuses
 * "Talk with an Advisor", the solid pill reuses "Book a Demo" — this site
 * doesn't have a customer login page, so that slot became the advisor CTA
 * instead of a dead "Log in" link).
 */
export default function Navbar({ onTalkWithAdvisor, onBookDemo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 120, damping: 28, mass: 0.4 });

  /* Subtle only: the pill itself is always opaque, scroll just deepens the shadow a touch. */
  const shadowOpacity = useTransform(smoothScroll, [0, 80], [0.08, 0.16]);
  const navShadow = useTransform(
    shadowOpacity,
    (o) =>
      isDark
        ? `0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 32px -14px rgba(0,0,0,${o + 0.5})`
        : `0 1px 0 rgba(255,255,255,0.7) inset, 0 12px 32px -14px rgba(15,23,42,${o})`,
  );

  /* Premium "auto-hide" scroll behavior: glide the pill off the top when the
     visitor scrolls down, and bring it right back the moment they scroll up
     — even a tiny bit. Stays pinned near the very top of the page so it
     doesn't flicker away on the first few pixels of scroll. */
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const delta = latest - previous;
    lastScrollY.current = latest;

    if (mobileOpen) return;
    if (latest < 96) {
      setHidden(false);
      return;
    }
    if (delta > 4) setHidden(true);
    else if (delta < -4) setHidden(false);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4"
        initial={false}
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <motion.div
          className="relative mx-auto flex h-[3.75rem] max-w-[1320px] items-center justify-between gap-3 rounded-[1.35rem] border px-3 backdrop-blur-xl backdrop-saturate-150 sm:h-[4.25rem] sm:gap-6 sm:rounded-[1.75rem] sm:px-6 lg:px-7"
          style={{
            background: isDark ? "rgba(11,15,26,0.55)" : "rgba(255,255,255,0.58)",
            borderColor: isDark ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.65)",
            boxShadow: navShadow,
          }}
        >
          {/* Logo + desktop nav — grouped together on the left so the two
              flanking gaps a fully-centered nav used to leave (one before
              the links, one after) collapse into a single, intentional gap
              before the CTA cluster instead of reading as wasted space. */}
          <div className="flex min-w-0 items-center gap-8 lg:gap-10">
            <div className="shrink-0">
              <BrandLogo linked size="md" />
            </div>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-0.5 lg:flex"
            >
              {navLinks.map((link) => (
                <NavLinkItem key={link.path} link={link} active={location.pathname === link.path} />
              ))}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={onBookDemo}
              className="group rounded-full px-5 text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap glow-primary"
            >
              <span className="flex items-center gap-1.5">
                Book a Demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/[0.03] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 z-50 flex h-dvh w-[min(22rem,88vw)] flex-col lg:hidden"
              style={{
                background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
                borderLeft: "1px solid hsl(var(--border))",
                boxShadow: "-24px 0 64px rgba(0,0,0,0.25)",
              }}
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
                <BrandLogo linked size="sm" className="max-w-[118px]" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: EASE }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors duration-200",
                        location.pathname === link.path
                          ? "bg-primary/8 text-primary"
                          : "text-foreground/80 hover:bg-foreground/[0.04] hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border p-4">
                <Button
                  className="w-full rounded-full font-semibold glow-primary"
                  onClick={() => {
                    onBookDemo?.();
                    setMobileOpen(false);
                  }}
                >
                  Book a Demo
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
