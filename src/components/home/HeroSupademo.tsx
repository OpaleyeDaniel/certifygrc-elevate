import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  SUPADEMO_DEFAULT_EMBED_URL,
  SUPADEMO_DEFAULT_OPEN_URL,
} from "@/constants/supademo";

function getEmbedUrl(): string {
  const v = import.meta.env.VITE_SUPADEMO_EMBED_URL;
  return typeof v === "string" && v.trim() ? v.trim() : SUPADEMO_DEFAULT_EMBED_URL;
}

function getOpenUrl(): string {
  const v = import.meta.env.VITE_SUPADEMO_OPEN_URL;
  return typeof v === "string" && v.trim() ? v.trim() : SUPADEMO_DEFAULT_OPEN_URL;
}

/**
 * Clean standalone SupaDemo frame — browser chrome + iframe, no floating overlays.
 */
export default function HeroSupademo() {
  const reduceMotion = useReducedMotion();
  const embedUrl = getEmbedUrl();
  const openUrl = getOpenUrl();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openExternal = useCallback(() => {
    window.open(openUrl, "_blank", "noopener,noreferrer");
  }, [openUrl]);

  return (
    <div className="relative w-full">
      {/* Soft halo — keeps focus on the frame without 3D clutter */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[1.75rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(99,102,241,0.28) 0%, transparent 70%)",
        }}
      />

      <motion.div
        id="hero-demo"
        className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c1018] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(99,102,241,0.1)]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
            <span className="hidden rounded-full border border-indigo-400/35 bg-indigo-500/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-200 sm:inline-flex">
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

        {/* Demo viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0e16]">
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
              className="absolute inset-0 animate-pulse bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/5"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
