/**
 * PageAmbient — brand-aligned atmospheric lighting for dark theme.
 * All glows derive from logo blue (#305CDE) and soft indigo variants.
 */
import { brandRgb } from "@/lib/brandColors";

export default function PageAmbient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Hero primary — upper-left */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift motion-reduce:animate-none"
        style={{
          top: "0%",
          left: "-12%",
          width: 900,
          height: 680,
          background: `radial-gradient(ellipse, ${brandRgb(0.14)} 0%, ${brandRgb(0.05)} 40%, transparent 70%)`,
          filter: "blur(110px)",
        }}
      />

      {/* Hero secondary — upper-right, lighter brand blue */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift-alt motion-reduce:animate-none"
        style={{
          top: "2%",
          right: "-12%",
          width: 700,
          height: 540,
          background: "radial-gradient(ellipse, rgba(91,127,232,0.10) 0%, rgba(91,127,232,0.03) 45%, transparent 68%)",
          filter: "blur(100px)",
        }}
      />

      {/* Mid-page left — soft indigo */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift motion-reduce:animate-none"
        style={{
          top: "38%",
          left: "-8%",
          width: 660,
          height: 500,
          background: "radial-gradient(ellipse, rgba(74,111,212,0.10) 0%, rgba(74,111,212,0.03) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Mid-page right — brand primary */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift-slow motion-reduce:animate-none"
        style={{
          top: "50%",
          right: "-10%",
          width: 700,
          height: 520,
          background: `radial-gradient(ellipse, ${brandRgb(0.10)} 0%, ${brandRgb(0.03)} 45%, transparent 68%)`,
          filter: "blur(110px)",
        }}
      />

      {/* Footer zone — subtle brand glow */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift motion-reduce:animate-none"
        style={{
          bottom: "0%",
          left: "28%",
          width: 800,
          height: 380,
          background: "radial-gradient(ellipse, rgba(91,127,232,0.07) 0%, rgba(91,127,232,0.02) 45%, transparent 65%)",
          filter: "blur(130px)",
          animationDelay: "14s",
        }}
      />

      {/* Deep center — muted brand */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift motion-reduce:animate-none"
        style={{
          top: "70%",
          left: "15%",
          width: 580,
          height: 420,
          background: `radial-gradient(ellipse, ${brandRgb(0.08)} 0%, transparent 65%)`,
          filter: "blur(120px)",
          animationDelay: "7s",
        }}
      />
    </div>
  );
}
