// ─── Site-wide color tokens ───────────────────────────────────────────────────
// Change these once to restyle the entire site.

/** Primary dark background — deep ocean teal, pairs perfectly with the gold/orange CTA */
export const DARK = "#0D1E26";

/** rgba helpers for overlays / translucent surfaces */
export const darkRgba = (alpha: number) => `rgba(13, 30, 38, ${alpha})`;

/** Gold accent — unchanged */
export const GOLD = "#E8A838";
export const GOLD_DARK = "#c8821a";

/** CTA gradient */
export const goldGradient = `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`;