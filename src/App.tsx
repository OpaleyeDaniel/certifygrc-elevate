import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { pageTransition } from "@/lib/motion";
import Index from "./pages/Index";
import Software from "./pages/Software";
import Consulting from "./pages/Consulting";
import ELearning from "./pages/ELearning";
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Frameworks from "./pages/Frameworks";
import Company from "./pages/Company";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={prefersReducedMotion ? undefined : pageTransition}
        initial={prefersReducedMotion ? false : "initial"}
        animate={prefersReducedMotion ? undefined : "animate"}
        exit={prefersReducedMotion ? undefined : "exit"}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/software" element={<Software />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/e-learning" element={<ELearning />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/company" element={<Company />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
