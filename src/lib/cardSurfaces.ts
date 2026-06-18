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

const SURFACES: Record<CardSurfaceVariant, CardSurfaceStyle> = {
  default: {
    background:
      "linear-gradient(155deg, hsl(225 42% 15%) 0%, hsl(225 47% 11%) 55%, hsl(225 47% 9%) 100%)",
    border: "rgba(255,255,255,0.09)",
    glow: BRAND_GLOW,
    wash: BRAND_WASH,
  },
  compliance: {
    background:
      "linear-gradient(155deg, hsl(225 48% 16%) 0%, hsl(225 45% 12%) 50%, hsl(225 42% 10%) 100%)",
    border: BRAND_BORDER,
    glow: brandRgb(0.22),
    wash: brandRgb(0.14),
  },
  security: {
    background:
      "linear-gradient(155deg, hsl(225 18% 16%) 0%, hsl(225 20% 12%) 50%, hsl(225 22% 10%) 100%)",
    border: "rgba(148,163,184,0.16)",
    glow: "rgba(148,163,184,0.16)",
    wash: "rgba(148,163,184,0.08)",
  },
  risk: {
    background:
      "linear-gradient(155deg, hsl(225 22% 16%) 0%, hsl(225 20% 12%) 50%, hsl(225 18% 10%) 100%)",
    border: "rgba(100,116,139,0.18)",
    glow: "rgba(100,116,139,0.18)",
    wash: "rgba(100,116,139,0.10)",
  },
  assessment: {
    background:
      "linear-gradient(155deg, hsl(225 42% 16%) 0%, hsl(225 38% 12%) 50%, hsl(225 35% 10%) 100%)",
    border: BRAND_BORDER,
    glow: brandRgb(0.20),
    wash: brandRgb(0.12),
  },
  analytics: {
    background:
      "linear-gradient(155deg, hsl(225 35% 14%) 0%, hsl(225 32% 11%) 50%, hsl(225 30% 9%) 100%)",
    border: BRAND_BORDER,
    glow: brandRgb(0.18),
    wash: brandRgb(0.10),
  },
};

export function getCardSurface(variant: CardSurfaceVariant = "default"): CardSurfaceStyle {
  return SURFACES[variant];
}

/** Brand-tinted surfaces — accent should be a brand blue */
export function getAccentSurface(accent: string = BRAND_PRIMARY, featured = false): CardSurfaceStyle {
  const alphaStrong = featured ? "40" : "32";
  const alphaMid = featured ? "22" : "18";
  const alphaSoft = featured ? "10" : "08";
  return {
    background: featured
      ? `linear-gradient(155deg, ${accent}${alphaStrong} 0%, ${accent}${alphaMid} 42%, ${accent}${alphaSoft} 68%, hsl(225,47%,10%) 100%)`
      : `linear-gradient(155deg, ${accent}${alphaStrong} 0%, ${accent}${alphaMid} 50%, hsl(225,47%,11%) 100%)`,
    border: featured ? `${accent}44` : `${accent}36`,
    glow: `${accent}30`,
    wash: `${accent}1A`,
  };
}

/** Featured card fills — brand primary only by default */
export function getSolidAccentSurface(accent: string = BRAND_PRIMARY, featured = false): CardSurfaceStyle {
  const mix = featured ? 0.78 : 0.68;
  const mixMid = featured ? 0.58 : 0.48;
  const mixDeep = featured ? 0.38 : 0.30;
  return {
    background: `linear-gradient(165deg,
      color-mix(in srgb, ${accent} ${Math.round(mix * 100)}%, hsl(225 47% 7%)) 0%,
      color-mix(in srgb, ${accent} ${Math.round(mixMid * 100)}%, hsl(225 47% 6%)) 48%,
      color-mix(in srgb, ${accent} ${Math.round(mixDeep * 100)}%, hsl(225 47% 5%)) 100%)`,
    border: `color-mix(in srgb, ${accent} 65%, white 14%)`,
    glow: `color-mix(in srgb, ${accent} 45%, transparent)`,
    wash: `color-mix(in srgb, ${accent} 22%, transparent)`,
  };
}
