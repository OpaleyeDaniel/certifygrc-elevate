import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", path: "/company" },
  { label: "Application", path: "/software" },
  { label: "Consulting Services", path: "/consulting" },
  { label: "Cyber Aware", path: "/cyber-aware" },
  { label: "Blog", path: "/blog" },
  { label: "Alliance", path: "/partner" },
  { label: "Contact Us", path: "/contact" },
];

interface NavbarProps {
  onTalkWithAdvisor: () => void;
  onBookDemo?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function interpolateScroll(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];
  for (let i = 0; i < input.length - 1; i++) {
    if (value >= input[i] && value <= input[i + 1]) {
      const t = (value - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[output.length - 1];
}

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
        "relative z-10 px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-300",
        active ? "text-white" : "text-slate-400 hover:text-slate-100",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(180deg, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.10) 100%)",
            border: "1px solid rgba(129,140,248,0.28)",
            boxShadow: "0 0 20px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{link.label}</span>
      {active && (
        <motion.span
          layoutId="nav-active-underline"
          className="absolute bottom-1 left-3 right-3 h-px rounded-full bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </Link>
  );
}

export default function Navbar({ onTalkWithAdvisor }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 120, damping: 28, mass: 0.4 });

  /* Fluid scroll morph — no sudden jumps */
  const navHeight = useTransform(smoothScroll, [0, 120], [72, 60]);
  const navBgOpacity = useTransform(smoothScroll, (v) =>
    interpolateScroll(v, [0, 80, 160], isHome ? [0.35, 0.75, 0.97] : [0.92, 0.96, 0.98]),
  );
  const navBlur = useTransform(smoothScroll, [0, 100], [8, 22]);
  const navBorderOpacity = useTransform(smoothScroll, [0, 120], [0.04, 0.12]);
  const logoScale = useTransform(smoothScroll, [0, 120], [1, 0.92]);
  const ctaScale = useTransform(smoothScroll, [0, 120], [1, 0.96]);
  const navBackground = useTransform(navBgOpacity, (o) => `rgba(6,12,22,${o})`);
  const navBorderColor = useTransform(navBorderOpacity, (o) => `rgba(255,255,255,${o})`);
  const navBackdrop = useTransform(navBlur, (b) => `blur(${b}px) saturate(160%)`);
  const navBoxShadow = useTransform(smoothScroll, [0, 100], [
    "none",
    "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 32px -12px rgba(0,0,0,0.55)",
  ]);

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
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: navHeight }}
      >
        <motion.div
          className="absolute inset-0 border-b"
          style={{
            backgroundColor: navBackground,
            borderColor: navBorderColor,
            backdropFilter: navBackdrop,
            WebkitBackdropFilter: navBackdrop,
            boxShadow: navBoxShadow,
          }}
        />

        {/* Top edge highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)",
          }}
        />

        <div className="relative h-full container-wide flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div style={{ scale: logoScale }} className="shrink-0 py-1">
            <BrandLogo linked size="md" />
          </motion.div>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-3xl mx-4"
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.path}
                link={link}
                active={location.pathname === link.path}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div style={{ scale: ctaScale }} className="hidden lg:flex items-center shrink-0">
            <Button
              size="sm"
              onClick={onTalkWithAdvisor}
              className="group relative overflow-hidden px-5 text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: "0 0 28px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Talk with an Advisor
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Button>
          </motion.div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl text-slate-300 hover:text-white transition-colors duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
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
              className="fixed right-0 top-0 z-50 h-dvh w-[min(22rem,88vw)] lg:hidden flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(8,14,26,0.98) 0%, rgba(6,10,18,0.99) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-24px 0 64px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/[0.06]">
                <BrandLogo linked size="sm" className="max-w-[118px]" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: EASE }}
                  >
                    <NavLinkItem
                      link={link}
                      active={location.pathname === link.path}
                      onClick={() => setMobileOpen(false)}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-white/[0.06]">
                <Button onClick={() => { onTalkWithAdvisor(); setMobileOpen(false); }} className="w-full font-semibold">
                  Talk with an Advisor
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
