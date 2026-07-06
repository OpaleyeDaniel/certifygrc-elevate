/**
 * Premium card surface tokens — unified brand-aligned materials.
 * Surfaces differ by subtle navy depth, not rainbow accent colors.
 */

import { BRAND_PRIMARY, brandRgb } from "@/lib/brandColors";

export type CardSurfaceVariant =
  | "default"
  | "compliance"
  | "security"
  | "risk"
  | "assessment"
  | "analytics";

export interface CardSurfaceStyle {
  background: string;
  border: string;
  glow: string;
  wash: string;
}

const BRAND_GLOW = brandRgb(0.20);
const BRAND_WASH = brandRgb(0.12);
const BRAND_BORDER = brandRgb(0.18);

/**
 * Base elevation — flat solid card color (no gradient), derived from theme
 * tokens so it still relights correctly for light/dark. Experiment: cards
 * previously used a 3-stop gradient here; not permanent — restore the
 * linear-gradient below to bring the gradient card look back.
 */
const BASE_ELEVATION = "hsl(var(--card))";
// const BASE_ELEVATION =
//   "linear-gradient(155deg, hsl(var(--card)) 0%, hsl(var(--surface-muted)) 55%, hsl(var(--background)) 100%)";

const NEUTRAL_BORDER = "hsl(var(--foreground) / 0.14)";
const NEUTRAL_GLOW = "hsl(var(--foreground) / 0.14)";
const NEUTRAL_WASH = "hsl(var(--foreground) / 0.06)";

const SURFACES: Record<CardSurfaceVariant, CardSurfaceStyle> = {
  default: {
    background: BASE_ELEVATION,
    border: "hsl(var(--border))",
    glow: BRAND_GLOW,
    wash: BRAND_WASH,
  },
  compliance: {
    background: BASE_ELEVATION,
    border: BRAND_BORDER,
    glow: brandRgb(0.22),
    wash: brandRgb(0.14),
  },
  security: {
    background: BASE_ELEVATION,
    border: NEUTRAL_BORDER,
    glow: NEUTRAL_GLOW,
    wash: NEUTRAL_WASH,
  },
  risk: {
    background: BASE_ELEVATION,
    border: NEUTRAL_BORDER,
    glow: NEUTRAL_GLOW,
    wash: NEUTRAL_WASH,
  },
  assessment: {
    background: BASE_ELEVATION,
    border: BRAND_BORDER,
    glow: brandRgb(0.20),
    wash: brandRgb(0.12),
  },
  analytics: {
    background: BASE_ELEVATION,
    border: BRAND_BORDER,
    glow: brandRgb(0.18),
    wash: brandRgb(0.10),
  },
};

export function getCardSurface(variant: CardSurfaceVariant = "default"): CardSurfaceStyle {
  return SURFACES[variant];
}

/**
 * Brand-tinted surfaces — accent should be a brand blue.
 * Experiment: flat solid tint instead of the multi-stop gradient fill.
 */
export function getAccentSurface(accent: string = BRAND_PRIMARY, featured = false): CardSurfaceStyle {
  return {
    background: `color-mix(in srgb, ${accent} ${featured ? 16 : 10}%, hsl(var(--card)))`,
    border: featured ? `${accent}44` : `${accent}36`,
    glow: `${accent}30`,
    wash: `${accent}1A`,
  };
}

/**
 * Featured card fills — brand primary only by default.
 * Experiment: flat solid accent tint instead of the multi-stop gradient fill.
 */
export function getSolidAccentSurface(accent: string = BRAND_PRIMARY, featured = false): CardSurfaceStyle {
  const mixMid = featured ? 0.58 : 0.48;
  return {
    background: `color-mix(in srgb, ${accent} ${Math.round(mixMid * 100)}%, hsl(225 47% 6%))`,
    border: `color-mix(in srgb, ${accent} 65%, white 14%)`,
    glow: `color-mix(in srgb, ${accent} 45%, transparent)`,
    wash: `color-mix(in srgb, ${accent} 22%, transparent)`,
  };
}
