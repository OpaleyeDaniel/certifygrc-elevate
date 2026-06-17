import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollViewport, staggerContainer, staggerGrid, staggerSlow } from "@/lib/motion";

type StaggerGroupProps = HTMLMotionProps<"div"> & {
  /** Stagger preset */
  speed?: "default" | "grid" | "slow";
};

/**
 * Stagger container for card grids and section content.
 */
export default function StaggerGroup({
  children,
  className,
  speed = "default",
  ...props
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants =
    speed === "grid" ? staggerGrid : speed === "slow" ? staggerSlow : staggerContainer;

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
