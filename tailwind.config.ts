import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.875rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.375rem, 2.5vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        surface: {
          elevated: "hsl(var(--surface-elevated))",
          muted: "hsl(var(--surface-muted))",
          subtle: "hsl(var(--surface-subtle))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -5px hsl(var(--primary) / 0.25)" },
          "50%": { boxShadow: "0 0 40px -5px hsl(var(--primary) / 0.45)" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "hero-bg-drift": {
          "0%, 100%": { transform: "scale(1.06) translate(0, 0)" },
          "50%": { transform: "scale(1.06) translate(-1.2%, -0.8%)" },
        },
        "hero-text-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-media-in": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "hero-image-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.02)" },
        },
        "hero-glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "marquee-stream": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ambient-drift": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.04) translate(1.5%, -1%)" },
        },
        "ambient-drift-slow": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)", opacity: "0.85" },
          "50%": { transform: "scale(1.03) translate(-1%, 0.5%)", opacity: "1" },
        },
        "grid-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, -1.5%) scale(1.04)" },
          "66%": { transform: "translate(-1.5%, 1%) scale(0.97)" },
        },
        "orb-drift-alt": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(-2%, 1.5%) scale(1.05)" },
          "70%": { transform: "translate(1.5%, -1%) scale(0.96)" },
        },
        /* Badge float — three staggered phases so badges don't all move in sync */
        "badge-float-a": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "badge-float-b": {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(6px)" },
        },
        "badge-float-c": {
          "0%, 100%": { transform: "translateY(4px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        /* Pulse ring — expanding ring that fades out */
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        /* Shimmer scan — scanning highlight for NIST CSF cards */
        "shimmer-scan": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateX(300%) skewX(-15deg)", opacity: "0" },
        },
        /* Rotate slow — for orbital elements */
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        /* Count up — for animated stat numbers */
        "count-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Ambient drift slow — PageAmbient mid-page orbs */
        "ambient-drift-slow": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)", opacity: "0.85" },
          "35%": { transform: "scale(1.05) translate(-1.5%, 1.2%)", opacity: "1" },
          "70%": { transform: "scale(0.97) translate(1%, -0.8%)", opacity: "0.9" },
        },
        /* Geo float variants for SVG geometry shapes */
        "geo-float-a": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "40%": { transform: "translateY(-14px) rotate(4deg)" },
          "80%": { transform: "translateY(-6px) rotate(-2deg)" },
        },
        "geo-float-b": {
          "0%, 100%": { transform: "translateY(-4px) rotate(0deg)" },
          "50%": { transform: "translateY(12px) rotate(-5deg)" },
        },
        "geo-float-c": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(3deg)" },
          "66%": { transform: "translateY(-18px) rotate(-3deg)" },
        },
        /* Section blend — fade in from white (used on section dividers) */
        "section-reveal": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.55s ease-out forwards",
        "fade-in-slow": "fade-in-slow 0.75s ease-out forwards",
        "slide-up": "slide-up 0.65s ease-out forwards",
        "scale-in": "scale-in 0.45s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scroll": "scroll 32s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "hero-bg-drift": "hero-bg-drift 26s ease-in-out infinite",
        "hero-text-in": "hero-text-in 0.68s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "hero-media-in": "hero-media-in 0.74s cubic-bezier(0.2, 0.8, 0.2, 1) 0.12s forwards",
        "hero-image-float": "hero-image-float 7s ease-in-out infinite",
        "hero-glow-pulse": "hero-glow-pulse 9s ease-in-out infinite",
        "marquee-stream": "marquee-stream 48s linear infinite",
        "marquee-stream-reverse": "marquee-stream 54s linear infinite reverse",
        "ambient-drift": "ambient-drift 52s ease-in-out infinite",
        "ambient-drift-slow": "ambient-drift-slow 68s ease-in-out infinite",
        "grid-fade-in": "grid-fade-in 0.8s ease-out forwards",
        "orb-drift": "orb-drift 42s ease-in-out infinite",
        "orb-drift-alt": "orb-drift-alt 56s ease-in-out infinite",
        "badge-float-a": "badge-float-a 6s ease-in-out infinite",
        "badge-float-b": "badge-float-b 7.5s ease-in-out infinite",
        "badge-float-c": "badge-float-c 9s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.8s ease-out infinite",
        "shimmer-scan": "shimmer-scan 3s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 60s linear infinite",
        "count-in": "count-in 0.5s ease-out forwards",
        "ambient-drift-slow": "ambient-drift-slow 72s ease-in-out infinite",
        "geo-float-a": "geo-float-a 14s ease-in-out infinite",
        "geo-float-b": "geo-float-b 18s ease-in-out infinite",
        "geo-float-c": "geo-float-c 22s ease-in-out infinite",
        "section-reveal": "section-reveal 0.6s ease-out forwards",
      },
      boxShadow: {
        /* Dark-theme shadows — deeper, more dramatic */
        elevated: "0 1px 0 rgba(255,255,255,0.04) inset, 0 14px 40px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
        "elevated-lg": "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
        "card": "0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 8px rgba(0,0,0,0.5), 0 8px 32px -8px rgba(0,0,0,0.4)",
        "card-hover": "0 1px 0 rgba(255,255,255,0.06) inset, 0 4px 8px rgba(0,0,0,0.6), 0 20px 50px -16px rgba(99,102,241,0.26), 0 0 0 1px rgba(99,102,241,0.08)",
        "card-featured": "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px -8px rgba(99,102,241,0.22), 0 0 0 1px rgba(99,102,241,0.10)",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
