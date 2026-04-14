import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

/** Matches primary navigation on [certifygrc.com](https://certifygrc.com/) */
const navLinks = [
  { label: "About", path: "/company" },
  { label: "Application", path: "/software" },
  { label: "Consulting Services", path: "/consulting" },
  { label: "E-Learning", path: "/e-learning" },
  { label: "Alliance", path: "/partner" },
  { label: "Contact Us", path: "/contact" },
];

interface NavbarProps {
  onTalkWithAdvisor: () => void;
  onBookDemo: () => void;
}

export default function Navbar({ onTalkWithAdvisor, onBookDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isLight = theme === "light";

  return (
    <motion.nav
      animate={
        isLight
          ? {
              backgroundColor: "hsla(0, 0%, 100%, 0.92)",
              borderBottomColor: "hsl(214 32% 91% / 0.95)",
              backdropFilter: "blur(14px)",
            }
          : {
              backgroundColor: scrolled ? "hsl(var(--background) / 0.88)" : "hsl(var(--background) / 0)",
              borderBottomColor: scrolled ? "hsl(var(--border) / 0.5)" : "hsl(var(--border) / 0)",
              backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
            }
      }
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isLight && "shadow-sm shadow-slate-900/8",
        !isLight && scrolled && "glass-strong shadow-lg shadow-background/25",
      )}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 gap-2">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src="/certifygrc-logo.png" alt="CertifyGRC" className="h-8 w-auto" loading="eager" />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-4xl mx-2">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  active && "text-primary bg-primary/10",
                  !active &&
                    isLight &&
                    "text-neutral-950 hover:text-neutral-950 hover:bg-slate-100/95",
                  !active && !isLight && "text-white hover:text-white hover:bg-white/14",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              isLight && "text-neutral-900 hover:text-neutral-950 hover:bg-slate-100/90",
              !isLight && "text-white hover:text-white hover:bg-white/14",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Button size="sm" onClick={onTalkWithAdvisor} className="glow-primary px-5 whitespace-nowrap">
            Talk with an Advisor
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-all",
              isLight && "text-neutral-900 hover:text-neutral-950",
              !isLight && "text-white hover:text-white",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "p-2 rounded-lg",
              isLight && "text-neutral-950",
              !isLight && "text-white",
            )}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-background/45 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-16 md:top-20 z-50 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-[min(24rem,88vw)] lg:hidden glass-strong border-l border-border/60 shadow-2xl"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.34, ease: "easeInOut" }}
            >
              <div className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                        active && "text-primary bg-primary/10",
                        !active && isLight && "text-neutral-950 hover:text-neutral-950 hover:bg-slate-100/85",
                        !active && !isLight && "text-white hover:text-white hover:bg-white/10",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button onClick={onTalkWithAdvisor} className="w-full glow-primary">
                    Talk with an Advisor
                  </Button>
                  <Button variant="outline" onClick={onBookDemo} className="w-full border-primary/30">
                    Book a Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
