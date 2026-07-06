/**
 * DotGridTexture — subtle dotted-grid background texture for cards,
 * thumbnails, and preview boxes. Distinct from the page-level BlueprintGrid
 * line texture: this one lives *inside* contained elements, not across the
 * full page.
 *
 * Renders a single absolutely-positioned layer of small low-opacity dots.
 * It relies on its parent for clipping (`overflow-hidden` + the card's own
 * border-radius) and for stacking — the parent should render its real
 * content in a `relative z-10` (or similar) wrapper so content stays crisp
 * on top of the dots, which paint with no explicit z-index (i.e. right at
 * the back of that stacking context).
 *
 * Color is theme-aware via the `--foreground` token so the dots read as
 * faint light specks on dark cards and faint dark specks on light cards,
 * instead of being hardcoded to one theme.
 */
export default function DotGridTexture({
  opacity = 0.16,
  spacing = 14,
}: {
  /** Dot opacity relative to the card background — keep low, 0.12–0.2. */
  opacity?: number;
  /** Grid spacing in pixels — keep consistent across cards for rhythm. */
  spacing?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(hsl(var(--foreground) / ${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}
