/**
 * PageAmbient — premium multi-zone atmospheric lighting for dark theme.
 *
 * On a dark background, glows are dramatically more visible and impactful.
 * Higher opacity values create visible, intentional light sources that
 * guide attention and reinforce the cybersecurity brand identity.
 *
 * Zone layout:
 *  1. Hero primary (upper-left) — strong indigo presence
 *  2. Hero accent  (upper-right) — cool cyan counter-glow
 *  3. Mid-left — violet atmospheric fill
 *  4. Mid-right — indigo atmospheric fill
 *  5. Footer — soft landing glow
 *  6. Deep center — subtle indigo core presence
 */
export default function PageAmbient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ── Base: deep dark background ────────────────────────────── */}
      <div className="absolute inset-0 bg-background" />

      {/* ── 1. Hero primary — upper-left, strong indigo ───────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift motion-reduce:animate-none"
        style={{
          top: "0%",
          left: "-12%",
          width: 900,
          height: 680,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* ── 2. Hero accent — upper-right, cyan ────────────────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift-alt motion-reduce:animate-none"
        style={{
          top: "2%",
          right: "-12%",
          width: 700,
          height: 540,
          background: "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 45%, transparent 68%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── 3. Mid-page left — violet atmospheric ─────────────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift motion-reduce:animate-none"
        style={{
          top: "38%",
          left: "-8%",
          width: 660,
          height: 500,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0.04) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── 4. Mid-page right — indigo ────────────────────────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift-slow motion-reduce:animate-none"
        style={{
          top: "50%",
          right: "-10%",
          width: 700,
          height: 520,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 45%, transparent 68%)",
          filter: "blur(110px)",
        }}
      />

      {/* ── 5. Footer zone — lower-center, soft cyan ──────────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-orb-drift motion-reduce:animate-none"
        style={{
          bottom: "0%",
          left: "28%",
          width: 800,
          height: 380,
          background: "radial-gradient(ellipse, rgba(6,182,212,0.09) 0%, rgba(6,182,212,0.03) 45%, transparent 65%)",
          filter: "blur(130px)",
          animationDelay: "14s",
        }}
      />

      {/* ── 6. Deep center — subtle indigo core ────────────────────── */}
      <div
        className="absolute rounded-full motion-safe:animate-ambient-drift motion-reduce:animate-none"
        style={{
          top: "70%",
          left: "15%",
          width: 580,
          height: 420,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 65%)",
          filter: "blur(120px)",
          animationDelay: "7s",
        }}
      />
    </div>
  );
}
