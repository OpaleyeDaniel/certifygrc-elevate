import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

export type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal animation starts (milliseconds) */
  delayMs?: number;
  /** Trigger the reveal only once (default: true) */
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport">;

/**
 * Generic scroll-reveal wrapper.
 * Each child section should prefer its own internal `whileInView` animations
 * for full stagger control. Use this wrapper only when a simple fade-up is enough.
 */
export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  once = true,
  ...props
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = Math.max(0, delayMs) / 1000;

  if (prefersReducedMotion) {
    return <div className={cn(className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...scrollViewport, once }}
      transition={{ duration: scrollRevealDuration, ease: [...scrollEase], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
