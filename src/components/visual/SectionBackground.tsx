interface SectionBackgroundProps {
  variant?: "default" | "muted" | "gradient" | "grid" | "mesh";
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a section with a premium background treatment.
 * All variants now use transparent top/bottom gradients to avoid
 * harsh edges between adjacent sections — everything blends into white.
 */
export default function SectionBackground({
  variant = "default",
  children,
  className = "",
}: SectionBackgroundProps) {
  const backgrounds: Record<string, string> = {
    default: "bg-transparent",
    muted: "bg-transparent",
    gradient: "bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.04]",
    grid: "bg-transparent",
    mesh: "bg-transparent",
  };

  return (
    <div className={`relative overflow-hidden ${backgrounds[variant]} ${className}`}>
      {(variant === "grid" || variant === "mesh") && (
        <>
          {/* Dot grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.032]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(239 84% 67% / 0.7) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67% / 0.7) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 85% 85% at 50% 50%, black 15%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 85% at 50% 50%, black 15%, transparent 100%)",
            }}
          />
        </>
      )}
      {variant === "mesh" && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 opacity-25"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 100% 0%, hsl(var(--accent) / 0.07), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-1/2 h-1/2 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 0% 100%, hsl(var(--primary) / 0.05), transparent 60%)",
            }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
