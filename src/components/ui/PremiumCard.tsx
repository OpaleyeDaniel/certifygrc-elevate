import { useCallback, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollEase, scrollViewport } from "@/lib/motion";
import {
  getAccentSurface,
  getCardSurface,
  getSolidAccentSurface,
  type CardSurfaceVariant,
} from "@/lib/cardSurfaces";

import { BRAND_PRIMARY } from "@/lib/brandColors";

const DEFAULT_ACCENT = BRAND_PRIMARY;

export const premiumCardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const premiumCardItemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: scrollEase },
  },
};

type Padding = "none" | "sm" | "md" | "lg";

const paddingClass: Record<Padding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-7 md:p-8",
};

export type PremiumCardShellProps = {
  accent?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  padding?: Padding;
  /** Use featured gradient background */
  featured?: boolean;
  /** Semantic surface material — compliance, security, risk, etc. */
  surface?: CardSurfaceVariant;
  /** Full saturated accent fill — color reads boldly, not dusty */
  solidAccent?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler;
  "aria-pressed"?: boolean;
};

/** Visual card surface — accent bar, mouse glow, shimmer */
export function PremiumCardShell({
  accent = DEFAULT_ACCENT,
  children,
  className,
  contentClassName,
  padding = "md",
  featured = false,
  surface = "default",
  solidAccent = false,
  href,
  to,
  onClick,
  role,
  tabIndex,
  onKeyDown,
  "aria-pressed": ariaPressed,
}: PremiumCardShellProps) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [],
  );

  const surfaceClass = cn(
    "group relative h-full flex flex-col overflow-hidden rounded-2xl",
    featured && "ring-1 ring-white/[0.06]",
    (onClick || to || href) && "cursor-pointer",
    className,
  );

  const material = solidAccent
    ? getSolidAccentSurface(accent, featured)
    : surface !== "default"
      ? getCardSurface(surface)
      : accent !== DEFAULT_ACCENT || featured
        ? getAccentSurface(accent, featured)
        : getCardSurface("default");

  const surfaceStyle = {
    border: `1px solid ${material.border}`,
    background: material.background,
    boxShadow: solidAccent
      ? `0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 28px rgba(0,0,0,0.45), 0 0 0 1px color-mix(in srgb, ${accent} 25%, transparent)`
      : `0 1px 0 rgba(255,255,255,0.07) inset, 0 6px 24px rgba(0,0,0,0.5), 0 12px 40px -12px ${material.glow}`,
    "--mx": "50%",
    "--my": "50%",
  } as React.CSSProperties;

  const inner = (
    <>
      {/* Internal highlight — top-left surface sheen */}
      {!solidAccent && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 65% at 0% 0%, ${material.wash}, transparent 58%)`,
          }}
        />
      )}
      {solidAccent && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 22%, transparent 100%)`,
          }}
        />
      )}
      {/* Secondary depth layer */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", solidAccent ? "opacity-35" : "opacity-60")}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 28%, rgba(0,0,0,0.08) 100%)",
        }}
      />
      {/* Mouse-tracking radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mx) var(--my), ${accent}${solidAccent ? "33" : "22"}, transparent 70%)`,
        }}
      />
      {/* Shimmer sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[850ms] ease-out"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)",
          }}
        />
      </div>
      {/* Edge highlight — subtle top-left glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        style={{
          background: "radial-gradient(180px circle at 0% 0%, rgba(255,255,255,0.06), transparent)",
        }}
      />
      <div className={cn("relative z-10 flex flex-col flex-1", paddingClass[padding], contentClassName)}>
        {children}
      </div>
    </>
  );

  if (to) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        onMouseMove={onMouseMove}
        className={surfaceClass}
        style={surfaceStyle}
      >
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        className={surfaceClass}
        style={surfaceStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-pressed={ariaPressed}
      className={surfaceClass}
      style={surfaceStyle}
    >
      {inner}
    </div>
  );
}

export type PremiumCardProps = PremiumCardShellProps & {
  /** Animate on scroll — set false when inside PremiumCardGrid */
  animate?: boolean;
  /** Hover lift + tap press */
  interactive?: boolean;
  id?: string;
};

/** Animated premium card — use inside PremiumCardGrid or standalone with animate */
export function PremiumCard({
  animate = true,
  interactive = true,
  className,
  ...shellProps
}: PremiumCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const hover = interactive && !prefersReducedMotion
    ? { y: -4, transition: { type: "spring" as const, stiffness: 400, damping: 28 } }
    : undefined;
  const tap = interactive && !prefersReducedMotion ? { scale: 0.985 } : undefined;

  if (!animate) {
    return (
      <motion.div whileHover={hover} whileTap={tap} className={cn("h-full", className)}>
        <PremiumCardShell {...shellProps} className={undefined} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={premiumCardItemVariants}
      whileHover={hover}
      whileTap={tap}
      className={cn("h-full", className)}
    >
      <PremiumCardShell {...shellProps} />
    </motion.div>
  );
}

type PremiumCardGridProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

/** Stagger container for PremiumCard children */
export function PremiumCardGrid({ children, className, ...props }: PremiumCardGridProps) {
  return (
    <motion.div
      variants={premiumCardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Standalone card with its own scroll reveal (outside a grid) */
export function PremiumCardStandalone({ className, id, ...props }: PremiumCardProps) {
  return (
    <motion.div
      id={id}
      variants={premiumCardItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      whileHover={
        props.interactive !== false
          ? { y: -4, transition: { type: "spring", stiffness: 400, damping: 28 } }
          : undefined
      }
      whileTap={props.interactive !== false ? { scale: 0.985 } : undefined}
      className={cn("h-full", className)}
    >
      <PremiumCardShell {...props} className={undefined} />
    </motion.div>
  );
}
