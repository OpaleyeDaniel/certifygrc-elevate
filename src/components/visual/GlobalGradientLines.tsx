/**
 * Ambient depth only — no line grid (keeps backgrounds clean).
 */
export default function GlobalGradientLines() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,hsl(var(--primary)/0.07),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_100%,hsl(var(--accent)/0.06),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_0%_100%,hsl(var(--primary)/0.04),transparent_50%)]" />
    </div>
  );
}
