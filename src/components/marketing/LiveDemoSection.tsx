import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { SUPADEMO_DEFAULT_EMBED_URL } from "@/constants/supademo";

function getEmbedUrl(): string {
  const v = import.meta.env.VITE_SUPADEMO_EMBED_URL;
  return typeof v === "string" && v.trim() ? v.trim() : SUPADEMO_DEFAULT_EMBED_URL;
}

/* ─── Abstract dotted "world map" backdrop ──────────────────────────────
   Stylized, not geographically precise — organic CSS blob shapes filled
   with the same dot texture used elsewhere on the site, loosely arranged
   like continents (west cluster / center cluster / east cluster). */

const MAP_BLOBS = [
  // Northern row — North America, Europe, Asia
  { top: "2%", left: "1%", w: 230, h: 150, radius: "42% 58% 65% 35% / 45% 45% 55% 55%", rotate: -8 },
  { top: "-2%", left: "38%", w: 140, h: 100, radius: "50% 50% 55% 45% / 45% 55% 45% 55%", rotate: 4 },
  { top: "-4%", left: "56%", w: 280, h: 190, radius: "55% 45% 40% 60% / 50% 55% 45% 50%", rotate: 3 },
  // Middle row — Central America, N. Africa / Middle East, more of Asia
  { top: "28%", left: "10%", w: 110, h: 80, radius: "48% 52% 58% 42% / 50% 46% 54% 50%", rotate: 10 },
  { top: "30%", left: "40%", w: 160, h: 140, radius: "45% 55% 50% 50% / 55% 45% 55% 45%", rotate: -3 },
  { top: "26%", left: "64%", w: 170, h: 120, radius: "52% 48% 45% 55% / 48% 55% 45% 52%", rotate: 5 },
  // Southern row — South America, Africa, SE Asia / Indonesia, Australia
  { top: "54%", left: "4%", w: 160, h: 210, radius: "38% 62% 55% 45% / 50% 40% 60% 50%", rotate: -5 },
  { top: "56%", left: "38%", w: 150, h: 180, radius: "48% 52% 42% 58% / 55% 45% 55% 45%", rotate: 2 },
  { top: "58%", left: "62%", w: 150, h: 100, radius: "55% 45% 50% 50% / 45% 55% 45% 55%", rotate: -4 },
  { top: "74%", left: "80%", w: 120, h: 90, radius: "50% 50% 55% 45% / 50% 50% 50% 50%", rotate: 6 },
] as const;

function WorldMapBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {MAP_BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: b.top,
            left: b.left,
            width: b.w,
            height: b.h,
            borderRadius: b.radius,
            transform: `rotate(${b.rotate}deg)`,
            backgroundImage: "radial-gradient(hsl(var(--foreground) / 0.22) 1.5px, transparent 1.5px)",
            backgroundSize: "10px 10px",
          }}
        />
      ))}
      {/* Only a soft fade right at the panel's own edges — the map itself
          should read clearly across the whole card, laptop included. */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 90px 40px hsl(var(--card))",
        }}
      />
    </div>
  );
}

/* ─── Location pins + avatar tokens scattered on the map ────────────────── */

const PINS = [
  { top: "12%", left: "16%" },
  { top: "68%", left: "12%" },
  { top: "18%", left: "65%" },
  { top: "74%", left: "78%" },
] as const;

const AVATARS = [
  { top: "8%", left: "30%", tint: BRAND_PRIMARY },
  { top: "16%", left: "8%", tint: "#5B7FE8" },
  { top: "70%", left: "22%", tint: "#4A6FD4" },
  { top: "12%", left: "82%", tint: BRAND_PRIMARY },
] as const;

function MapMarkers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {PINS.map((p, i) => (
        <span key={`pin-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: p.top, left: p.left }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: BRAND_PRIMARY }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: BRAND_PRIMARY }} />
          </span>
        </span>
      ))}
      {AVATARS.map((a, i) => (
        <span
          key={`avatar-${i}`}
          className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg sm:h-9 sm:w-9"
          style={{ top: a.top, left: a.left, background: `${a.tint}1c`, borderColor: "hsl(var(--card))" }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: a.tint }} />
        </span>
      ))}
    </div>
  );
}

/* ─── Laptop mockup with the live Supademo screen inside ────────────────── */

function LaptopMockup() {
  const embedUrl = getEmbedUrl();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Screen + bezel */}
      <div
        className="relative overflow-hidden rounded-t-xl rounded-b-md border border-white/10 bg-[#15181f] p-2 sm:p-2.5"
        style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55)" }}
      >
        {/* Camera notch */}
        <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-white/15 sm:top-1.5" aria-hidden />

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-[#0a0e16]">
          <iframe
            title="CertifyGRC interactive product demo — Supademo"
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
          />
          {!loaded && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-transparent to-accent/5"
            />
          )}
        </div>
      </div>

      {/* Hinge line */}
      <div className="h-[3px] w-full bg-gradient-to-b from-white/20 to-white/5" aria-hidden />

      {/* Base / keyboard deck */}
      <div className="relative mx-auto h-4 w-[104%] max-w-none -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-[#dfe2e8] to-[#c3c7d0] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.45)] sm:h-5">
        <div className="absolute left-1/2 top-0 h-1 w-[14%] -translate-x-1/2 rounded-b-md bg-[#b7bbc4]" aria-hidden />
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full opacity-50 blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)" }}
      />
    </div>
  );
}

/* ─── Floating feature callout, matching the reference composition ─────── */

function FloatingCallout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="pointer-events-none absolute -bottom-4 left-2 z-20 hidden w-56 rounded-xl border border-border/60 bg-card/95 p-4 shadow-[0_20px_44px_-16px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:-bottom-6 sm:left-4 sm:block"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
        </span>
        <p className="text-xs font-bold text-foreground">Live compliance tracking</p>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        Controls, evidence, and training status update in real time across every framework.
      </p>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────────── */

export default function LiveDemoSection() {
  return (
    <section id="live-demo" className="section-padding relative overflow-hidden bg-transparent">
      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Live Demo"
          title="See CertifyGRC in action"
          description="A guided walkthrough of the platform, right in your browser — no signup required."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          <motion.div
            variants={revealUp}
            className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
          >
            <WorldMapBackdrop />
            <MapMarkers />

            <div className="relative z-10">
              <LaptopMockup />
              <FloatingCallout />
            </div>

            {/* Live indicator, top-right of the panel */}
            <span className="absolute right-6 top-6 z-10 hidden items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-1 sm:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-rose-500">Live demo</span>
            </span>

            {/* Reach indicator, top-left of the panel — echoes the map theme */}
            <span className="absolute left-6 top-6 z-10 hidden items-center gap-1.5 text-[11px] font-medium text-muted-foreground sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
              Trusted across every region we serve
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
