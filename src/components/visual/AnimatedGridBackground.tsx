interface AnimatedGridBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  fadeEdges?: boolean;
  className?: string;
}

/**
 * CSS-only animated grid background. No canvas, no re-renders.
 * Respects prefers-reduced-motion.
 */
export default function AnimatedGridBackground({
  variant = "section",
  fadeEdges = true,
  className = "",
}: AnimatedGridBackgroundProps) {
  const opacity = variant === "hero" ? "opacity-[0.055]" : variant === "subtle" ? "opacity-[0.03]" : "opacity-[0.045]";
  const size = variant === "hero" ? "48px 48px" : "40px 40px";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${opacity} ${className}`}
      style={{
        backgroundImage: `linear-gradient(hsl(239 84% 67% / 0.7) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67% / 0.7) 1px, transparent 1px)`,
        backgroundSize: size,
        ...(fadeEdges
          ? {
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            }
          : {}),
      }}
    />
  );
}
