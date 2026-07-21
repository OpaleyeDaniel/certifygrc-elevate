import { useCallback, useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ExternalLink, ShieldCheck, Radio, TrendingUp, MousePointerClick } from "lucide-react";
import {
  SUPADEMO_DEFAULT_EMBED_URL,
  SUPADEMO_DEFAULT_OPEN_URL,
} from "@/constants/supademo";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

function getEmbedUrl(): string {
  const v = import.meta.env.VITE_SUPADEMO_EMBED_URL;
  return typeof v === "string" && v.trim() ? v.trim() : SUPADEMO_DEFAULT_EMBED_URL;
}

function getOpenUrl(): string {
  const v = import.meta.env.VITE_SUPADEMO_OPEN_URL;
  return typeof v === "string" && v.trim() ? v.trim() : SUPADEMO_DEFAULT_OPEN_URL;
}

/**
 * SupaDemo hero panel — staged as a large slab that tilts out of a backdrop
 * "wall" toward the viewer, with a mouse-tracking 3D tilt, a slow ambient
 * drift so it keeps reading as "alive" from different angles, and a clear
 * click-to-launch affordance instead of a raw, silently-interactive iframe.
 */
export default function HeroSupademo() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const embedUrl = getEmbedUrl();
  const openUrl = getOpenUrl();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openExternal = useCallback(() => {
    window.open(openUrl, "_blank", "noopener,noreferrer");
  }, [openUrl]);

  /* ── 3D tilt: gentler on phones; full tilt on desktop ── */
  const baseRotateY = useMotionValue(reduceMotion ? -4 : -10);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 22, mass: 0.5 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 22, mass: 0.5 });

  const rotateY = useTransform([baseRotateY, springX], (latest) => {
    const [base, px] = latest as number[];
    return base + px * 5;
  });
  const rotateX = useTransform(springY, (py: number) => 2 - py * 5);

  // Entrance: fade + tilt in from a steeper angle, then settle into a slow,
  // perpetual drift between a few resting angles — reads as a product that's
  // alive and worth clicking, not a static screenshot.
  useEffect(() => {
    if (reduceMotion) return;
    let idle: AnimationPlaybackControls | undefined;
    const entrance = animate(baseRotateY, -4, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
      onComplete: () => {
        idle = animate(baseRotateY, [-4, -6, -3, -5, -4], {
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        });
      },
    });
    return () => {
      entrance.stop();
      idle?.stop();
    };
  }, [reduceMotion, baseRotateY]);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY, reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <div className="relative w-full py-6 sm:py-8">
      {/* Soft ambient halo — bright, airy tint in light mode; deeper glow in dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[2rem] opacity-70 blur-[70px]"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 75% 65% at 60% 45%, rgba(48,92,222,0.32) 0%, rgba(6,182,212,0.12) 45%, transparent 75%)"
            : "radial-gradient(ellipse 75% 65% at 60% 45%, rgba(67,97,238,0.16) 0%, rgba(6,182,212,0.08) 45%, transparent 75%)",
        }}
      />

      {/* Backdrop "wall" slab the panel appears to pivot out of — a clean
          frosted-glass slab in light mode instead of the dark, semi-opaque
          navy wash (which read as a muddy smudge against a light hero). */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-3 -inset-y-6 -z-10 rounded-[1.75rem] border sm:-inset-x-6",
          isDark ? "border-white/[0.06]" : "border-white/60",
        )}
        style={
          isDark
            ? {
                background:
                  "linear-gradient(135deg, rgba(67,97,238,0.16) 0%, rgba(10,14,26,0.55) 48%, rgba(6,182,212,0.09) 100%)",
                transform: "rotate(-1.4deg)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 40px 100px -35px rgba(0,0,0,0.75)",
              }
            : {
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(238,243,255,0.55) 48%, rgba(236,250,255,0.5) 100%)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                transform: "rotate(-1.4deg)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 30px 80px -30px rgba(30,41,82,0.22)",
              }
        }
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-[1.75rem]"
          style={{
            opacity: isDark ? 0.3 : 0.5,
            backgroundImage: isDark
              ? "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 72px)"
              : "repeating-linear-gradient(90deg, rgba(30,41,82,0.035) 0px, rgba(30,41,82,0.035) 1px, transparent 1px, transparent 72px)",
          }}
        />
      </div>

      {/* Hinge seam — bright edge where the panel "pivots" off the wall */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-8 bottom-8 -z-[5] hidden w-[3px] rounded-full sm:block"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(129,140,248,0.9) 25%, rgba(6,182,212,0.55) 70%, transparent)",
          boxShadow: "0 0 26px 4px rgba(99,102,241,0.4)",
        }}
      />

      {/* Floating badge — framework alignment */}
      <motion.div
        className="pointer-events-none absolute -left-3 top-2 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#0d1220]/90 px-3 py-2 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex motion-safe:animate-badge-float-a"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-400/30">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">NIST CSF 2.0</div>
          <div className="text-[10px] text-white/45">Controls verified</div>
        </div>
      </motion.div>

      {/* Floating badge — live compliance score */}
      <motion.div
        className="pointer-events-none absolute -right-2 bottom-6 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#0d1220]/90 px-3 py-2 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex motion-safe:animate-badge-float-b sm:-right-4 lg:-right-6"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">98% compliance score</div>
          <div className="text-[10px] text-white/45">Updated in real time</div>
        </div>
      </motion.div>

      {/* Floating badge — live indicator */}
      <motion.div
        className="pointer-events-none absolute right-3 -top-1 z-20 hidden items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-1 sm:flex motion-safe:animate-badge-float-c"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-rose-200">Live</span>
      </motion.div>

      {/* 3D tilt container */}
      <div
        className="relative z-10"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          id="hero-demo"
          className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c1018] shadow-[0_30px_100px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(48,92,222,0.12)]"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.012 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          {/* Browser chrome */}
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.03] px-4 py-3 sm:px-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex shrink-0 gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <div className="min-w-0 flex-1 truncate rounded-md border border-white/[0.08] bg-black/30 px-3 py-1.5 text-center text-[10px] font-medium text-white/45 sm:text-[11px]">
                app.supademo.com · CertifyGRC · Live product demo
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden items-center gap-1 rounded-full border border-indigo-400/35 bg-indigo-500/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-200 sm:inline-flex">
                <Radio className="h-2.5 w-2.5" aria-hidden />
                Interactive
              </span>
              <button
                type="button"
                onClick={openExternal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[11px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="hidden sm:inline">Open in browser</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>

          {/* Demo viewport — fully interactive, exactly like the live Supademo tour */}
          <div className="group/demo relative aspect-[16/10] w-full overflow-hidden bg-[#0a0e16]">
            <iframe
              title="CertifyGRC interactive product demo — Supademo"
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIframeLoaded(true)}
            />

            {!iframeLoaded && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-transparent to-accent/5"
              />
            )}

            {/* Subtle, non-blocking cursor cue — invites the click without covering the tour */}
            <motion.div
              className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 backdrop-blur-sm transition-opacity duration-300 group-hover/demo:opacity-0"
              animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MousePointerClick className="h-3.5 w-3.5 text-white/80" aria-hidden />
              <span className="text-[10px] font-medium text-white/70">Click to explore</span>
            </motion.div>
          </div>

          {/* Top sheen — sells the glassy, tilted surface */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 22%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Contact shadow grounding the panel */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-6 right-6 h-10 rounded-full opacity-60 blur-2xl"
          style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)" }}
        />
      </div>
    </div>
  );
}
