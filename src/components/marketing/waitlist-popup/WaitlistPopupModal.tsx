import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Lock, ShieldCheck, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrivacyPolicyDialog from "@/components/legal/PrivacyPolicyDialog";
import { HoneypotField, readHoneypotValue } from "@/components/forms/HoneypotField";
import { scrollEase } from "@/lib/motion";
import { submitWaitlistRequest } from "@/lib/waitlistSubmit";
import type { WaitlistRequestBody } from "@/lib/waitlistFormSchema";
import { cn } from "@/lib/utils";
import { waitlistPopupCopy as copy } from "./waitlistPopupCopy";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const SOURCE: WaitlistRequestBody["source"] = "landing";

const LOGO_SRC = "/certifygrc-logo.png";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const easePremium = [0.16, 1, 0.3, 1] as const;

/** Slow ambient motion for banner glows (UI-only). */
function BannerAmbientOrbs() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <>
        <div className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-[80px]" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-indigo-500/25 blur-[72px]" />
      </>
    );
  }
  return (
    <>
      <motion.div
        className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-[80px]"
        animate={{ opacity: [0.18, 0.32, 0.2], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-indigo-500/28 blur-[72px]"
        animate={{ opacity: [0.22, 0.34, 0.24], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-[50%] w-[120%] -translate-x-1/2 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl"
        animate={{ opacity: [0.12, 0.22, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

/** Diagonal light sweep — refined, low-amplitude. */
function BannerLightTrails() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      <motion.div
        className="absolute -left-1/3 top-[-20%] h-[140%] w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-70 blur-2xl"
        animate={{ x: ["-8%", "18%", "-8%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-1/4 bottom-[-30%] h-[90%] w-[45%] rotate-[-12deg] bg-gradient-to-l from-transparent via-primary/15 to-transparent opacity-60 blur-3xl"
        animate={{ x: ["6%", "-10%", "6%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden
      />
    </>
  );
}

/** Decorative grid + glow for the premium banner (no external assets). */
function BannerBackdrop() {
  const rawId = useId().replace(/:/g, "");
  const gridGradId = `wl-grid-fade-${rawId}`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#030711] via-[#0a1e38] to-[#050c14]"
        style={{ backgroundColor: "#030711" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_85%_-15%,rgba(34,211,238,0.12),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_5%_105%,rgba(129,140,248,0.2),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(15,118,178,0.06),transparent_70%)]" />
      <BannerLightTrails />
      <svg
        className="absolute -left-[10%] top-0 h-full w-[120%] opacity-[0.4]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gridGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="22%" stopColor="white" stopOpacity="0.45" />
            <stop offset="78%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i + 1) * 5.5}%`}
            y1="0%"
            x2={`${(i + 1) * 5.5}%`}
            y2="100%"
            stroke={`url(#${gridGradId})`}
            strokeWidth="0.5"
            opacity="0.22"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0%"
            y1={`${(i + 1) * 8}%`}
            x2="100%"
            y2={`${(i + 1) * 8}%`}
            stroke="rgba(148,163,184,0.1)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      <BannerAmbientOrbs />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030711]/92 via-[#030711]/25 to-[#030711]/50" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_42%,transparent_58%,rgba(255,255,255,0.02)_100%)]" />
    </div>
  );
}

/** Lightweight dashboard-style illustration (compliance / metrics feel). */
function BannerDashboardMock({ animate }: { animate: boolean }) {
  const bars = [40, 72, 55, 88, 64, 92, 48, 76, 58, 95, 52, 82];
  return (
    <motion.div
      className="relative mt-8 w-full max-w-[340px] sm:max-w-none"
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easePremium, delay: animate ? 0.12 : 0 }}
      aria-hidden
    >
      <motion.div
        animate={animate ? { y: [0, -3, 0] } : { y: 0 }}
        transition={{ duration: 6, repeat: animate ? Infinity : 0, ease: "easeInOut" }}
        className="relative"
      >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.07] p-4",
          "shadow-[0_28px_72px_-20px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          "backdrop-blur-[24px] ring-1 ring-white/[0.08]",
        )}
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-indigo-500/25 blur-2xl" />
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-primary/70" />
          </div>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-sky-200/90">
            NIST CSF 2.0
          </span>
        </div>
        <div className="mb-3 flex gap-3">
          <div className="hidden w-14 shrink-0 flex-col gap-2 sm:flex">
            <div className="h-2 rounded bg-white/15" />
            <div className="h-2 rounded bg-white/10" />
            <div className="h-2 w-8 rounded bg-sky-400/40" />
            <div className="h-2 rounded bg-white/10" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex h-24 items-end justify-between gap-1 rounded-lg bg-black/25 px-2 pb-2 pt-3 ring-1 ring-white/[0.06]">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-full max-w-[14px] rounded-sm bg-gradient-to-t from-primary/25 to-accent/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.05]" />
              <div className="h-10 flex-1 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.05]" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-white/[0.08] pt-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
            <ShieldMini />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="h-2 w-3/4 max-w-[180px] rounded bg-white/20" />
            <div className="h-2 w-1/2 max-w-[120px] rounded bg-white/10" />
          </div>
          <div className="rounded-md bg-primary/12 px-2 py-1 text-[10px] font-semibold text-primary/90">
            98%
          </div>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}

function ShieldMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary" aria-hidden>
      <path
        d="M12 3L5 6v6c0 4.5 3.5 8.5 7 9.5 3.5-1 7-5 7-9.5V6l-7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const bannerBlockVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0.12 : 0.42, ease: easePremium },
  }),
};

const bannerContainerVariants = {
  hidden: {},
  visible: (reduce: boolean) => ({
    transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.05 },
  }),
};

function BannerContent({ compact }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const r = reduce ?? false;

  return (
    <motion.div
      className={cn(
        "relative z-10 flex min-h-0 flex-1 flex-col text-white",
        compact ? "p-6 pb-5" : "p-8 pb-8 lg:p-9",
      )}
      variants={bannerContainerVariants}
      initial="hidden"
      animate="visible"
      custom={r}
    >
      <motion.div className="mb-6 flex items-center gap-3" variants={bannerBlockVariants} custom={r}>
        <img
          src={LOGO_SRC}
          alt="CertifyGRC"
          width={160}
          height={40}
          decoding="async"
          className="h-9 w-auto brightness-0 invert drop-shadow-[0_2px_20px_rgba(56,189,248,0.35)] sm:h-10"
        />
      </motion.div>

      <motion.div
        variants={bannerBlockVariants}
        custom={r}
        className={cn(
          "mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-3.5 py-1.5",
          "text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-100/85 backdrop-blur-md",
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]",
        )}
      >
        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
        {copy.bannerKicker}
      </motion.div>

      <motion.h2
        variants={bannerBlockVariants}
        custom={r}
        className={cn(
          "text-balance font-display font-semibold leading-[1.1] tracking-tight text-white",
          "drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]",
          compact ? "text-xl sm:text-2xl" : "text-[1.65rem] xl:text-[1.85rem]",
        )}
      >
        {copy.bannerHeadline}
      </motion.h2>
      <motion.p
        variants={bannerBlockVariants}
        custom={r}
        className={cn(
          "mt-3.5 max-w-[42ch] text-pretty leading-[1.65] text-slate-300/95",
          compact ? "text-sm" : "text-[0.9375rem]",
        )}
      >
        {copy.bannerSubtext}
      </motion.p>

      <motion.div
        variants={bannerBlockVariants}
        custom={r}
        className={cn(
          "pointer-events-none mt-6 inline-flex w-fit select-none items-center justify-center rounded-xl border border-white/22",
          "bg-gradient-to-b from-white/[0.18] to-white/[0.06] px-5 py-2.5 text-sm font-semibold tracking-tight text-white",
          "shadow-[0_16px_48px_-14px_rgba(34,211,238,0.4),inset_0_1px_0_0_rgba(255,255,255,0.22)]",
        )}
        aria-hidden
      >
        {copy.bannerCtaVisual}
      </motion.div>

      {!compact ? <BannerDashboardMock animate={!r} /> : null}

      <motion.p
        variants={bannerBlockVariants}
        custom={r}
        className={cn(
          "mt-auto border-t border-white/[0.08] pt-5 text-[11px] font-medium leading-relaxed tracking-wide text-slate-400/95 sm:text-xs",
          compact && "mt-5 border-0 pt-0",
        )}
      >
        {copy.bannerFooter}
      </motion.p>
    </motion.div>
  );
}

/**
 * Global waitlist modal — two-column premium banner + form; form logic unchanged.
 */
export default function WaitlistPopupModal({ open, onOpenChange }: Props) {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const reduce = useReducedMotion();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const submitLock = useRef(false);

  const stagger = reduce ? 0 : 0.055;

  const handleClose = useCallback(
    (next: boolean) => {
      if (!next && status === "success") {
        setStatus("idle");
        setMessage("");
        setFullName("");
        setEmail("");
      }
      onOpenChange(next);
    },
    [onOpenChange, status],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || submitLock.current) return;
    setMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length < 2) {
      setStatus("error");
      setMessage("Please enter your full name.");
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Enter a valid work email.");
      return;
    }

    submitLock.current = true;
    setStatus("loading");

    try {
      const result = await submitWaitlistRequest({
        fullName: trimmedName,
        email: trimmedEmail,
        source: SOURCE,
        _gotcha: readHoneypotValue(honeypotRef),
      });

      if (result.ok === false) {
        setStatus("error");
        setMessage(result.error);
        return;
      }

      setStatus("success");
      setMessage(result.message ?? copy.successFallback);
      setFullName("");
      setEmail("");
      window.setTimeout(() => handleClose(false), 2600);
    } catch (err) {
      console.error("[waitlist-popup] submit", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      submitLock.current = false;
    }
  };

  const disabled = status === "loading" || status === "success";

  const containerVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: reduce ? 0 : 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.12 : 0.38, ease: easePremium } },
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          showCloseButton={false}
          aria-labelledby={`${baseId}-title`}
          aria-describedby={`${baseId}-desc`}
          overlayClassName={cn(
            "bg-black/50 backdrop-blur-[16px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:duration-500 data-[state=closed]:duration-300",
          )}
          className={cn(
            "w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-hidden border-0 p-0 shadow-none sm:w-full",
            "sm:max-w-[min(96vw,1000px)]",
            "rounded-[1.125rem] sm:rounded-[1.25rem]",
            "bg-transparent",
            "gap-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:duration-300 data-[state=open]:duration-600",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98]",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          )}
        >
          <div
            className={cn(
              "texture-grain relative isolate flex max-h-[min(92vh,780px)] flex-col overflow-hidden rounded-[1.125rem] border border-border/45 bg-card shadow-2xl sm:rounded-[1.25rem]",
              "ring-1 ring-white/[0.06]",
              "shadow-[0_32px_80px_-28px_rgba(15,23,42,0.35)]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"
              aria-hidden
            />

            <div className="grid flex-1 overflow-y-auto lg:grid-cols-[minmax(300px,1.02fr)_minmax(0,1fr)] lg:overflow-hidden">
              {/* Left — premium banner (desktop) */}
              <aside
                className={cn(
                  "relative hidden min-h-0 flex-col overflow-hidden lg:flex",
                  "border-b border-white/[0.07] lg:border-b-0 lg:border-r lg:border-white/[0.08]",
                )}
              >
                <BannerBackdrop />
                <BannerContent />
              </aside>

              {/* Banner — stacked above form on small screens */}
              <div className={cn("relative overflow-hidden border-b border-white/[0.08] lg:hidden")}>
                <BannerBackdrop />
                <BannerContent compact />
              </div>

              {/* Form column */}
              <div
                className={cn(
                  "relative flex min-h-0 flex-col",
                  "bg-gradient-to-b from-card via-card to-muted/20",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_0%,hsl(var(--primary)/0.06),transparent_55%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary/20 via-primary/15 to-transparent lg:block"
                  aria-hidden
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-3 top-3 z-30 h-10 w-10 rounded-xl border border-border/40 bg-background/55 shadow-sm backdrop-blur-md",
                    "text-muted-foreground transition-all duration-200",
                    "hover:border-border/70 hover:bg-background/80 hover:text-foreground hover:shadow-md",
                    "focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  )}
                  onClick={() => handleClose(false)}
                  aria-label={copy.closeLabel}
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </Button>

                <div className="relative hidden border-b border-border/30 px-8 pb-7 pt-10 lg:block">
                  <DialogHeader className="space-y-3 pr-12 text-left">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                      {copy.formPanelKicker}
                    </div>
                    <DialogTitle
                      id={`${baseId}-title`}
                      className="font-display text-[1.6875rem] font-semibold leading-[1.12] tracking-tight text-foreground xl:text-[1.75rem]"
                    >
                      {copy.formTitle}
                    </DialogTitle>
                    <DialogDescription
                      id={`${baseId}-desc`}
                      className="text-[0.9375rem] leading-[1.65] text-muted-foreground sm:max-w-[26rem]"
                    >
                      {copy.formDescription}
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <div className="relative flex flex-1 flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-7 lg:px-8 lg:pb-10 lg:pt-5">
                  <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary lg:hidden">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    {copy.formPanelKicker}
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground lg:hidden">
                    {copy.formDescription}
                  </p>

                  <div
                  className="mb-5 flex items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-3.5 py-2.5 text-[11px] font-medium text-muted-foreground shadow-sm sm:text-xs"
                  >
                    <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                    <span>{copy.formTrustStrip}</span>
                  </div>

                  <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className={cn(
                      "relative flex flex-1 flex-col gap-5 rounded-2xl border border-border/55 bg-background/60 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_18px_48px_-28px_rgba(15,23,42,0.1)] sm:gap-6 sm:p-7",
                    )}
                    noValidate
                    aria-busy={status === "loading"}
                  >
                    <HoneypotField ref={honeypotRef} />
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label
                        htmlFor={nameId}
                        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {copy.nameLabel}
                      </Label>
                      <Input
                        id={nameId}
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        disabled={disabled}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy.namePlaceholder}
                        className={cn(
                          "h-12 rounded-xl border-border/60 bg-background px-4 text-[0.9375rem] shadow-sm",
                          "placeholder:text-muted-foreground/50",
                          "transition-[border-color,box-shadow] duration-200",
                          "hover:border-border/80 hover:shadow-md",
                          "focus-visible:border-primary/55 focus-visible:ring-2 focus-visible:ring-primary/18 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label
                        htmlFor={emailId}
                        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {copy.emailLabel}
                      </Label>
                      <Input
                        id={emailId}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={email}
                        disabled={disabled}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={copy.emailPlaceholder}
                        className={cn(
                          "h-12 rounded-xl border-border/60 bg-background px-4 text-[0.9375rem] shadow-sm",
                          "placeholder:text-muted-foreground/50",
                          "transition-[border-color,box-shadow] duration-200",
                          "hover:border-border/80 hover:shadow-md",
                          "focus-visible:border-primary/55 focus-visible:ring-2 focus-visible:ring-primary/18 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="min-h-[3.25rem]" aria-live="polite">
                      <AnimatePresence mode="wait" initial={false}>
                        {status === "success" ? (
                          <motion.div
                            key="success"
                            role="status"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.32, ease: scrollEase }}
                            className="flex gap-3 rounded-xl border border-primary/22 bg-primary/[0.08] px-4 py-4 shadow-sm"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
                              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                            </div>
                            <div className="space-y-1 pt-0.5">
                              <p className="text-sm font-semibold text-foreground">{copy.successTitle}</p>
                              <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
                            </div>
                          </motion.div>
                        ) : null}

                        {status === "error" ? (
                          <motion.div
                            key="error"
                            role="alert"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22, ease: scrollEase }}
                            className="rounded-xl border border-destructive/30 bg-destructive/[0.08] px-4 py-3.5 text-sm leading-relaxed text-destructive shadow-sm"
                          >
                            {message}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="mt-auto flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-11 shrink-0 justify-center rounded-xl text-sm font-medium text-muted-foreground sm:justify-start",
                          "hover:bg-muted/50 hover:text-foreground",
                          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        )}
                        onClick={() => handleClose(false)}
                      >
                        {copy.dismiss}
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={disabled}
                        className={cn(
                          "group relative h-[3.25rem] w-full overflow-hidden rounded-xl font-semibold tracking-tight sm:min-w-[232px] sm:flex-1",
                          "bg-primary text-primary-foreground",
                          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_12px_44px_-10px_hsl(var(--primary)/0.55)]",
                          "transition-[transform,box-shadow,filter] duration-300",
                          "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-white/10 before:opacity-0 before:transition-opacity hover:before:opacity-100",
                          "hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_18px_52px_-12px_hsl(var(--primary)/0.58)]",
                          "active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:hover:before:opacity-0",
                          "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                      >
                        <span className="relative z-10 inline-flex w-full items-center justify-center gap-2">
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                              {copy.ctaLoading}
                            </>
                          ) : (
                            <>
                              {copy.ctaIdle}
                              <ArrowRight
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden
                              />
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className="text-center text-[11px] leading-relaxed text-muted-foreground/95 sm:text-xs"
                    >
                      {copy.privacyLead}{" "}
                      <button
                        type="button"
                        className="font-medium text-foreground underline decoration-border/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                        onClick={() => setPrivacyOpen(true)}
                      >
                        {copy.privacyLink}
                      </button>
                    </motion.p>
                  </motion.form>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
}
