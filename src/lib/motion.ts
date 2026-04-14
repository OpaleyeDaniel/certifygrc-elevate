import type { Variants } from "framer-motion";

/** Smooth, noticeable scroll reveals — shared easing across the app */
export const scrollEase = [0.16, 1, 0.3, 1] as const;

export const scrollRevealDuration = 0.95;

/** Default `viewport` for `whileInView` — triggers when ~⅕ visible, slightly before center */
export const scrollViewport = {
  once: true as const,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
};

export const transitionBase = {
  duration: 0.48,
  ease: "easeInOut",
} as const;

export const springBase = {
  type: "spring" as const,
  stiffness: 240,
  damping: 26,
};

// Page-level transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: scrollEase },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.38, ease: scrollEase },
  },
};

// Scroll-reveal: fade up
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: scrollRevealDuration, ease: scrollEase, delay },
  }),
};

// Scroll-reveal: fade in (no vertical movement)
export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.85, ease: scrollEase, delay },
  }),
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: scrollRevealDuration, ease: scrollEase, delay },
  }),
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: scrollRevealDuration, ease: scrollEase, delay },
  }),
};

// Scale up (pop in)
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 28, delay },
  }),
};

// Scale down (drop in from above, like a card dropping)
export const dropIn: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 28, delay },
  }),
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

// Faster stagger for tight card grids
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

// Slower stagger for feature sections
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

// Card hover effect (use with whileHover on motion.div)
export const cardHover = {
  scale: 1.025,
  y: -4,
  transition: { type: "spring" as const, stiffness: 320, damping: 22 },
};

// Subtle hover for nav/buttons
export const subtleHover = {
  scale: 1.04,
  transition: { type: "spring" as const, stiffness: 400, damping: 20 },
};
