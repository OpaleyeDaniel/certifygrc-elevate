/**
 * GrcInteractiveWorkspaceExperience
 *
 * Cinema-quality, auto-scrolling product showcase for the Application page.
 * - Real app screenshots in a premium Mac-style browser frame
 * - Tab navigation grouped into sections (Overview / NIST CSF / Assessment / …)
 * - "Play Demo" auto-advances through all slides with smooth cross-fade
 * - Scroll-to-section animation on first Play press
 * - Mouse-tracking glow on the preview frame
 * - Fully accessible (prefers-reduced-motion)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  interactiveWorkspaceSteps,
  WORKSPACE_TABS,
  type WorkspaceStep,
} from "@/components/marketing/grcInteractiveWorkspaceData";

type Props = {
  onBookDemo?: () => void;
};

const SLIDE_DURATION_MS = 4800;

export default function GrcInteractiveWorkspaceExperience({ onBookDemo }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const steps = interactiveWorkspaceSteps;
  const sectionRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [hoverPause, setHoverPause] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const active: WorkspaceStep = steps[index];

  /* ── Navigation ───────────────────────────────── */
  const goTo = useCallback(
    (next: number) => {
      const n = ((next % steps.length) + steps.length) % steps.length;
      setIndex(n);
      setProgress(0);
      // Sync the active tab
      const ti = WORKSPACE_TABS.findIndex((t) =>
        (t.ids as readonly string[]).includes(steps[n].id),
      );
      if (ti !== -1) setActiveTab(ti);
    },
    [steps],
  );

  const prev = useCallback(() => {
    setAutoPlay(false);
    goTo(index - 1);
  }, [goTo, index]);

  const next = useCallback(() => {
    setAutoPlay(false);
    goTo(index + 1);
  }, [goTo, index]);

  /** Jump to first slide in a tab group */
  const selectTab = useCallback(
    (ti: number) => {
      setAutoPlay(false);
      setActiveTab(ti);
      const firstId = WORKSPACE_TABS[ti].ids[0];
      const si = steps.findIndex((s) => s.id === firstId);
      if (si !== -1) goTo(si);
    },
    [goTo, steps],
  );

  /* ── Auto-play progress bar ───────────────────── */
  useEffect(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (!autoPlay || hoverPause || prefersReducedMotion) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const tick = 50;
    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIndex((i) => {
            const n = (i + 1) % steps.length;
            const ti = WORKSPACE_TABS.findIndex((t) =>
              (t.ids as readonly string[]).includes(steps[n].id),
            );
            if (ti !== -1) setActiveTab(ti);
            return n;
          });
          return 0;
        }
        return p + (tick / SLIDE_DURATION_MS) * 100;
      });
    }, tick);
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [autoPlay, hoverPause, prefersReducedMotion, steps]);

  const togglePlay = useCallback(() => {
    setAutoPlay((p) => {
      if (!p && sectionRef.current) {
        // Smooth-scroll into view on first play
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return !p;
    });
  }, []);

  /* ── Mouse glow on frame ──────────────────────── */
  const frameRef = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);

  /* ── Keyboard navigation ──────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, togglePlay]);

  return (
    <div id="interactive-grc-workspace" ref={sectionRef} className="mt-6 select-none md:mt-8">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">

        {/* ── LEFT: narrative + controls ─────────────── */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Interactive workspace
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.15rem] lg:leading-[1.12]">
            Step Inside Your GRC Command Center
          </h2>
          <p className="mt-3 text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
            Real screenshots. Live product. Zero sign-up required.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Explore every corner of the CertifyGRC platform — from the GRC Command Center to AI-powered evidence analysis, 
            NIST CSF 2.0 assessments, audit reports, and risk registers. Hit Play Demo and watch the full tour unfold.
          </p>

          {/* Active slide info card */}
          <motion.div
            layout
            key={active.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${active.accentColor}38`,
              background: `linear-gradient(155deg, ${active.accentColor}28 0%, ${active.accentColor}12 38%, hsl(222,47%,11%) 72%, hsl(222,47%,9%) 100%)`,
              boxShadow: `0 1px 0 rgba(255,255,255,0.07) inset, 0 6px 24px rgba(0,0,0,0.45), 0 8px 32px -8px ${active.accentColor}22`,
            }}
          >
            {/* Color accent top bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${active.accentColor}, ${active.accentColor}60)` }} />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Now viewing</p>
                <span className="tabular-nums text-xs font-semibold text-muted-foreground">
                  {index + 1} / {steps.length}
                </span>
              </div>
              <p className="font-display font-semibold text-foreground mb-1" style={{ color: active.accentColor }}>
                {active.tourTitle}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{active.tourBody}</p>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-6 rounded-2xl p-4" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Playback controls</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-xl"
                onClick={prev}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Previous
              </Button>
              <Button type="button" size="sm" className="gap-1.5 rounded-xl" onClick={next}>
                Next
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant={autoPlay ? "secondary" : "default"}
                size="sm"
                className="ml-auto gap-1.5 rounded-xl font-semibold"
                onClick={togglePlay}
                style={
                  !autoPlay
                    ? { background: "linear-gradient(135deg, #305CDE, #4A6FD4)", color: "white" }
                    : {}
                }
              >
                {autoPlay ? (
                  <>
                    <Pause className="h-4 w-4" aria-hidden />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" aria-hidden />
                    Play Demo
                  </>
                )}
              </Button>
            </div>

            {/* Progress bar */}
            {autoPlay && !hoverPause && !prefersReducedMotion && (
              <div className="mt-3 h-1 w-full rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${active.accentColor}, ${active.accentColor}80)` }}
                />
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="glow-primary rounded-xl px-6">
              <a href="#waitlist">Join the waitlist</a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-primary/30 px-6">
              <Link to="/contact">Start your assessment</Link>
            </Button>
            {onBookDemo && (
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl px-6 text-primary hover:text-primary"
                onClick={onBookDemo}
              >
                Book a live walkthrough <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* ── RIGHT: cinema viewer ────────────────────── */}
        <div className="lg:col-span-7">
          {/* Tab bar */}
          <div
            className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Workspace sections"
          >
            {WORKSPACE_TABS.map((tab, ti) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={ti === activeTab}
                onClick={() => selectTab(ti)}
                className={cn(
                  "inline-flex min-w-[max-content] items-center rounded-xl border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200",
                  ti === activeTab
                    ? "border-primary/35 bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20"
                    : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/25 hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Premium Mac-style browser frame */}
          <div
            ref={frameRef}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setHoverPause(true)}
            onMouseLeave={() => setHoverPause(false)}
            className="group relative rounded-[1.75rem] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(18,16,45,0.96) 0%, rgba(8,6,25,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: [
                "0 0 0 1px rgba(48,92,222,0.12)",
                "0 2px 0 0 rgba(255,255,255,0.06) inset",
                "0 32px 80px -16px rgba(0,0,0,0.55)",
                "0 8px 32px rgba(48,92,222,0.08)",
              ].join(", "),
            }}
          >
            {/* Mouse glow inside frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[1.75rem]"
              style={{
                background: "radial-gradient(380px circle at var(--gx, 50%) var(--gy, 50%), rgba(48,92,222,0.06), transparent 70%)",
              }}
            />

            {/* Top chrome bar */}
            <div className="relative z-20 flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.08]">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5780]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e80]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84080]" />
              </div>
              {/* URL bar */}
              <div className="flex-1 flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 mx-4 max-w-xs">
                <div className="h-2 w-2 rounded-full bg-[#28c840] shrink-0 shadow-[0_0_4px_#28c84099]" />
                <span className="text-[11px] text-white/50 truncate font-mono">app.certifygrc.com</span>
              </div>
              {/* Playing indicator */}
              <AnimatePresence>
                {autoPlay && !hoverPause && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5 rounded-full bg-white/[0.08] border border-white/[0.1] px-2.5 py-1"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-[11px] font-semibold text-white/80">Playing</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Step counter */}
              <span className="text-[11px] font-semibold text-white/40 tabular-nums ml-auto shrink-0">
                {index + 1}/{steps.length}
              </span>
            </div>

            {/* Slide viewport — native screenshot ratio (1024×597) for sharp rendering */}
            <div className="relative overflow-hidden bg-[#0a0818]" style={{ aspectRatio: "1024/597" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-start justify-center"
                >
                  <img
                    ref={imgRef}
                    src={active.imageSrc}
                    alt={active.imageAlt}
                    width={1024}
                    height={597}
                    className="h-full w-full object-contain object-top [image-rendering:-webkit-optimize-contrast]"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    draggable={false}
                  />
                  {/* Screenshot overlay gradient — subtle vignette */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(8,6,25,0.5) 100%)" }} />
                </motion.div>
              </AnimatePresence>

              {/* Tour caption overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-caption"}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl"
                    style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${active.accentColor}30` }}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: `${active.accentColor}cc` }}>
                      {active.tourTitle}
                    </p>
                    <p className="text-[13px] leading-snug text-white/90">{active.tourBody}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next overlay arrows */}
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={prev}
                className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={next}
                className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Progress rail */}
            <div className="h-1 w-full bg-white/[0.06]">
              <motion.div
                className="h-full origin-left"
                style={{
                  background: `linear-gradient(90deg, ${active.accentColor}, ${active.accentColor}80)`,
                  width: autoPlay && !hoverPause && !prefersReducedMotion ? `${progress}%` : `${((index + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0 }}
              />
            </div>

            {/* Bottom chrome — dots */}
            <div className="flex items-center justify-between gap-4 px-5 py-3">
              {/* Mini dots */}
              <div className="flex gap-1 overflow-hidden max-w-[260px] items-center">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Go to ${s.tabLabel}`}
                    onClick={() => { setAutoPlay(false); goTo(i); }}
                    className={cn(
                      "h-1.5 shrink-0 rounded-full transition-all duration-300",
                      i === index
                        ? "w-6"
                        : "w-1.5 bg-white/20 hover:bg-white/40",
                    )}
                    style={i === index ? { background: active.accentColor } : {}}
                  />
                ))}
              </div>
              {/* Play/Pause shortcut */}
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {autoPlay ? "Pause" : "Play"}
              </button>
            </div>
          </div>

          {/* Screenshot strip below the frame */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.tabLabel}
                onClick={() => { setAutoPlay(false); goTo(i); }}
                className={cn(
                  "relative shrink-0 h-14 w-24 rounded-lg overflow-hidden border-2 transition-all duration-200",
                  i === index ? "border-primary shadow-[0_0_8px_rgba(48,92,222,0.4)]" : "border-transparent opacity-50 hover:opacity-80 hover:border-border/60",
                )}
              >
                <img
                  src={s.imageSrc}
                  alt={s.tabLabel}
                  width={1024}
                  height={597}
                  className="h-full w-full object-cover object-top [image-rendering:-webkit-optimize-contrast]"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            {steps.length} screens · Swipe or use arrows to navigate · Press Space to play/pause
          </p>
        </div>
      </div>
    </div>
  );
}
