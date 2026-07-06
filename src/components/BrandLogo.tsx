import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const LOGO_SRC = "/certifygrc-logo.png";

// Natural PNG is 862×146. The mark (circle + check) occupies the left ~186px;
// "Certify" is baked in as pure white (invisible on light surfaces) and "GRC"
// as brand blue.
const NATURAL_W = 862;
const NATURAL_H = 146;
const MARK_W = 186;

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md";
  /** Wrap in a home link */
  linked?: boolean;
};

export function BrandLogo({ className, size = "md", linked = false }: BrandLogoProps) {
  const { theme } = useTheme();
  const heightPx = size === "sm" ? 20 : 24;
  const heightClass = size === "sm" ? "h-5" : "h-6";
  const maxWidthClass = size === "sm" ? "max-w-[118px]" : "max-w-[132px]";

  let inner: ReactNode;

  if (theme === "dark") {
    // Full raster wordmark reads correctly as-is on a dark surface.
    inner = (
      <img
        src={LOGO_SRC}
        alt="CertifyGRC"
        className={cn(
          "w-auto object-contain object-left bg-transparent transition-opacity duration-300",
          heightClass,
          maxWidthClass,
          className,
        )}
        loading="eager"
        draggable={false}
      />
    );
  } else {
    // Light mode: crop to just the (already-blue) mark and set the wordmark in
    // live, theme-aware text instead of boxing the raster logo in a dark chip.
    const markWidthPx = heightPx * (MARK_W / NATURAL_H);
    const fullWidthPx = heightPx * (NATURAL_W / NATURAL_H);
    inner = (
      <span className={cn("inline-flex items-center gap-1.5", className)}>
        <span
          className="relative shrink-0 overflow-hidden"
          style={{ width: markWidthPx, height: heightPx }}
        >
          <img
            src={LOGO_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute left-0 top-0 max-w-none"
            style={{ width: fullWidthPx, height: heightPx }}
          />
        </span>
        <span
          className={cn(
            "font-display font-extrabold leading-none tracking-tight",
            size === "sm" ? "text-[15px]" : "text-[18px]",
          )}
        >
          <span className="text-foreground">Certify</span>
          <span className="text-primary">GRC</span>
        </span>
      </span>
    );
  }

  if (linked) {
    return (
      <Link to="/" className="group inline-flex items-center hover:opacity-90">
        {inner}
      </Link>
    );
  }

  return inner;
}
