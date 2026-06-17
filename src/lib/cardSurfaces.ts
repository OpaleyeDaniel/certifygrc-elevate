/**
 * Premium card surface tokens — meaningful GRC category colors.
 * Each variant is a full material fill, not border-only styling.
 */

export type CardSurfaceVariant =
  | "default"
  | "compliance"   /* Deep navy */
  | "security"     /* Graphite */
  | "risk"         /* Dark slate */
  | "assessment"   /* Dark indigo */
  | "analytics";   /* Rich midnight */

export interface CardSurfaceStyle {
  background: string;
  border: string;
  glow: string;
  wash: string;
}

const SURFACES: Record<CardSurfaceVariant, CardSurfaceStyle> = {
  default: {
    background:
      "linear-gradient(155deg, hsl(221 42% 15%) 0%, hsl(222 47% 11%) 55%, hsl(222 47% 9%) 100%)",
    border: "rgba(255,255,255,0.09)",
    glow: "rgba(99,102,241,0.22)",
    wash: "rgba(99,102,241,0.14)",
  },
  compliance: {
    background:
      "linear-gradient(155deg, hsl(221 48% 17%) 0%, hsl(222 45% 12%) 50%, hsl(223 42% 10%) 100%)",
    border: "rgba(99,102,241,0.22)",
    glow: "rgba(99,102,241,0.28)",
    wash: "rgba(99,102,241,0.18)",
  },
  security: {
    background:
      "linear-gradient(155deg, hsl(220 18% 16%) 0%, hsl(222 20% 12%) 50%, hsl(223 22% 10%) 100%)",
    border: "rgba(148,163,184,0.18)",
    glow: "rgba(148,163,184,0.20)",
    wash: "rgba(148,163,184,0.10)",
  },
  risk: {
    background:
      "linear-gradient(155deg, hsl(215 25% 16%) 0%, hsl(217 22% 12%) 50%, hsl(218 20% 10%) 100%)",
    border: "rgba(100,116,139,0.20)",
    glow: "rgba(100,116,139,0.22)",
    wash: "rgba(100,116,139,0.12)",
  },
  assessment: {
    background:
      "linear-gradient(155deg, hsl(234 42% 17%) 0%, hsl(235 38% 12%) 50%, hsl(236 35% 10%) 100%)",
    border: "rgba(129,140,248,0.24)",
    glow: "rgba(129,140,248,0.26)",
    wash: "rgba(129,140,248,0.16)",
  },
  analytics: {
    background:
      "linear-gradient(155deg, hsl(228 35% 14%) 0%, hsl(230 32% 11%) 50%, hsl(232 30% 9%) 100%)",
    border: "rgba(6,182,212,0.20)",
    glow: "rgba(6,182,212,0.22)",
    wash: "rgba(6,182,212,0.12)",
  },
};

export function getCardSurface(variant: CardSurfaceVariant = "default"): CardSurfaceStyle {
  return SURFACES[variant];
}

/** Rich accent-tinted surfaces — visible color fill, not transparent washes */
export function getAccentSurface(accent: string, featured = false): CardSurfaceStyle {
  const alphaStrong = featured ? "52" : "40";
  const alphaMid = featured ? "28" : "22";
  const alphaSoft = featured ? "12" : "10";
  return {
    background: featured
      ? `linear-gradient(155deg, ${accent}${alphaStrong} 0%, ${accent}${alphaMid} 42%, ${accent}${alphaSoft} 68%, hsl(222,47%,10%) 100%)`
      : `linear-gradient(155deg, ${accent}${alphaStrong} 0%, ${accent}${alphaMid} 50%, hsl(222,47%,11%) 100%)`,
    border: featured ? `${accent}55` : `${accent}42`,
    glow: `${accent}38`,
    wash: `${accent}26`,
  };
}

/** Bold, fully saturated card fills — accent reads clearly (red is red, etc.) */
export function getSolidAccentSurface(accent: string, featured = false): CardSurfaceStyle {
  const mix = featured ? 0.82 : 0.72;
  const mixMid = featured ? 0.62 : 0.52;
  const mixDeep = featured ? 0.42 : 0.34;
  return {
    background: `linear-gradient(165deg,
      color-mix(in srgb, ${accent} ${Math.round(mix * 100)}%, hsl(222 47% 7%)) 0%,
      color-mix(in srgb, ${accent} ${Math.round(mixMid * 100)}%, hsl(222 47% 6%)) 48%,
      color-mix(in srgb, ${accent} ${Math.round(mixDeep * 100)}%, hsl(222 47% 5%)) 100%)`,
    border: `color-mix(in srgb, ${accent} 70%, white 14%)`,
    glow: `color-mix(in srgb, ${accent} 55%, transparent)`,
    wash: `color-mix(in srgb, ${accent} 28%, transparent)`,
  };
}
