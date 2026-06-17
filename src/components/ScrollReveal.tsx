import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

export type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport">;

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...scrollViewport, once }}
      transition={{ duration: scrollRevealDuration, ease: [...scrollEase], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
