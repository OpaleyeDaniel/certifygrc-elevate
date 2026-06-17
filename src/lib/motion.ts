import type { Transition, Variants } from "framer-motion";

/** Premium enterprise motion — Stripe / Linear inspired */

export const scrollEase = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.45, 0, 0.15, 1] as const;

/** Duration tokens (seconds) */
export const motionDuration = {
  fast: 0.2,
  standard: 0.4,
  section: 0.65,
  hero: 0.9,
  page: 0.5,
} as const;

export const scrollRevealDuration = motionDuration.section;

export const scrollViewport = {
  once: true as const,
  amount: 0.12,
  margin: "0px 0px -4% 0px",
};

export const transitionBase: Transition = {
  duration: motionDuration.standard,
  ease: easeInOut,
};

export const springBase = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
};

/** Page route transitions — fade + upward motion */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.page, ease: scrollEase },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.38, ease: scrollEase },
  },
};

export const pageLoadStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const revealSection: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.section, ease: scrollEase },
  },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.section, ease: scrollEase, delay },
  }),
};

export const revealBlur: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: motionDuration.hero, ease: scrollEase, delay },
  }),
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: motionDuration.hero, ease: scrollEase, delay },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.section, ease: scrollEase, delay },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.section, ease: scrollEase, delay },
  }),
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...springSoft, delay },
  }),
};

export const dropIn: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSoft, delay },
  }),
};

/** Card grid stagger — 100ms between each card */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

export const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/** Card entrance — fade up with index-based delay */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.section, ease: scrollEase, delay },
  }),
};

/** Card hover / tap micro-interactions */
export const cardHover = {
  y: -4,
  scale: 1.02,
  transition: springBase,
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: motionDuration.fast, ease: easeOut },
};

export const subtleHover = {
  scale: 1.02,
  transition: springBase,
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.15, ease: easeOut },
};

/** Modal / drawer */
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeInOut } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeInOut } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: scrollEase },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: { duration: 0.28, ease: easeInOut },
  },
};

/** Table row reveal */
export const tableRowReveal: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: scrollEase, delay },
  }),
};

export const fadeUpTransition = {
  duration: scrollRevealDuration,
  ease: scrollEase,
} as const;
