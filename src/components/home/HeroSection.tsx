import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const rotatingWords = ["Smarter Compliance", "Simplified", "Intelligent", "Secure"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } },
};

const heroEase = [0.16, 1, 0.3, 1] as const;

const itemUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: heroEase } },
};

const dashboardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.95, ease: heroEase, delay: 0.5 },
  },
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setWordIndex((prev) => (prev + 1) % rotatingWords.length),
      2500,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[100vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-16">

      {/* ── Background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 motion-safe:animate-hero-bg-drift"
        style={{ backgroundImage: "url(/hero-background.png)" }}
        aria-hidden
      />

      {/*
        ── Top readability scrim ──
        Always dark — works in both light and dark mode.
        No more `from-background/80` which was pure white in light mode.
      */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"
        aria-hidden
      />

      {/*
        ── Bottom page-blend ──
        Thin strip so the section fades into the page below.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Glow orbs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[180px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-[-5%] right-[-5%] w-[350px] h-[350px] bg-accent/6 rounded-full blur-[130px] pointer-events-none" aria-hidden />

      {/* ── Text content ── */}
      {/*
        hero-text-white forces all text to white regardless of light/dark theme.
        The overlay above ensures white text is always readable over the image.
      */}
      <motion.div
        className="relative z-10 max-w-3xl w-full hero-text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase"
          variants={itemUp}
        >
          Enterprise-Grade Compliance Platform
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight !text-white"
          variants={itemUp}
        >
          Practical GRC Solutions
        </motion.h1>

        {/* Animated rotating tagline */}
        <motion.div variants={itemUp} className="mt-4 h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIndex}
              className="text-2xl font-semibold gradient-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
            >
              — {rotatingWords[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed !text-white/80"
          variants={itemUp}
        >
          Manage compliance, reduce risk, and automate governance with a platform
          built for modern organizations.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="mt-8 flex flex-wrap justify-center gap-4" variants={itemUp}>
          <Button asChild size="lg" className="px-8 h-12 glow-primary group">
            <Link to="/consulting">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 h-12 border-white/25 bg-white/8 backdrop-blur-sm hover:bg-white/15 !text-white hover:border-white/40"
          >
            <Link to="/software">
              <Play className="mr-2 w-4 h-4" /> Live Demo
            </Link>
          </Button>
        </motion.div>

        {/* Trust badge pills */}
        <motion.div className="mt-9 flex flex-wrap justify-center gap-2.5" variants={itemUp}>
          {([
            { icon: ShieldCheck, label: "ISO 27001 Ready" },
            { icon: Zap, label: "AI Risk Detection" },
            { icon: BarChart3, label: "Real-time Dashboards" },
          ] as const).map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 !text-white/90"
            >
              <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Dashboard mockup ── */}
      <motion.div
        className="relative z-10 mt-12 sm:mt-16 w-full max-w-5xl px-0 sm:px-4"
        variants={dashboardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">

          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-white/40 hidden sm:block">CertifyGRC Platform</span>
          </div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6">
            <motion.div
              className="p-4 rounded-xl bg-white/5 border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs text-white/50">Compliance Score</p>
              <h3 className="text-2xl font-bold mt-2 text-green-400">92%</h3>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-white/5 border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs text-white/50">Active Risks</p>
              <h3 className="text-2xl font-bold mt-2 text-red-400">12</h3>
              <p className="text-xs text-white/40 mt-2">↓ 3 from last audit</p>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-white/5 border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs text-white/50">Audit Status</p>
              <h3 className="text-xl font-bold mt-2 text-primary">Ongoing</h3>
              <p className="text-xs text-white/40 mt-2">3 controls pending</p>
            </motion.div>

            {/* Animated bar chart */}
            <div className="col-span-1 sm:col-span-3 h-28 sm:h-36 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 flex flex-col items-start justify-end border border-white/5 relative overflow-hidden p-4">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm text-white/30 pointer-events-none">
                Interactive Analytics Preview
              </span>
              <div className="flex items-end gap-1 sm:gap-1.5 h-14 w-full">
                {[0.4, 0.65, 0.75, 0.55, 0.85, 0.6, 0.9, 0.7, 0.8, 0.5, 0.7, 0.95].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/50"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: h }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.055, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating labels — hidden on tiny screens */}
        <motion.div
          className="absolute -top-4 right-4 sm:-top-5 sm:right-10 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border border-white/20 shadow-lg hidden sm:block text-white"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ✔ ISO 27001 Ready
        </motion.div>
        <motion.div
          className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-10 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border border-white/20 shadow-lg hidden sm:block text-white"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          ⚡ AI Risk Detection
        </motion.div>
      </motion.div>
    </section>
  );
}
