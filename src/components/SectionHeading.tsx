import { motion } from "framer-motion";
import { scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

/**
 * Animated section heading with badge, title, and optional description.
 * Uses the premium type scale from the design system.
 */
export default function SectionHeading({
  badge,
  title,
  description,
  center = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? "text-center" : ""} ${className}`}>
      {badge && (
        <motion.span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-primary/8 text-primary border border-primary/15 mb-3"
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={scrollViewport}
          transition={{ duration: 0.65, ease: [...scrollEase] }}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        className="font-display font-bold text-display-lg text-foreground"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: scrollRevealDuration, ease: [...scrollEase], delay: badge ? 0.08 : 0 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-3 text-muted-foreground text-body-lg leading-relaxed ${center ? "max-w-xl mx-auto" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, ease: [...scrollEase], delay: badge ? 0.14 : 0.06 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
