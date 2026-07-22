import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { pageTransition } from "@/lib/motion";
import Index from "./pages/Index";
import Software from "./pages/Software";
import Consulting from "./pages/Consulting";
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Frameworks from "./pages/Frameworks";
import Company from "./pages/Company";
import EarlyAccess from "./pages/EarlyAccess";
import CyberAwarePage from "./pages/CyberAware";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";

const queryClient = new QueryClient();

/** Lenis smooth scroll — initialized once at app level, respects prefers-reduced-motion */
function useLenis() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);
}

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={prefersReducedMotion ? undefined : pageTransition}
        initial={false}
        animate={prefersReducedMotion ? undefined : "animate"}
        exit={prefersReducedMotion ? undefined : "exit"}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/free-assessment" element={<Navigate to="/#free-assessment" replace />} />
          <Route path="/software" element={<Software />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/cyber-aware" element={<CyberAwarePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/company" element={<Company />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:categorySlug" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppInner() {
  useLenis();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const App = () => <AppInner />;

export default App;
