import { motion } from "framer-motion";
import { scrollEase, scrollRevealDuration, scrollViewport } from "@/lib/motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

/**
 * Animated section heading.
 * Uses its own whileInView so it works whether or not its parent section
 * also has animation wrappers.
 */
export default function SectionHeading({
  badge,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      {badge && (
        <motion.span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-4"
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={scrollViewport}
          transition={{ duration: 0.75, ease: [...scrollEase] }}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: scrollRevealDuration, ease: [...scrollEase], delay: badge ? 0.1 : 0 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-4 text-muted-foreground text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.88, ease: [...scrollEase], delay: badge ? 0.16 : 0.08 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
