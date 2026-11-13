# Banner artwork adaptation

Source: user-supplied `image(20261113-032855).png`, 2048 × 682 px.

The two committed AVIF images are derived **only from the supplied graphic**:
- `public/images/header/better-call-prabowo-desktop.avif` — 1200 × 220 (60:11, approximately 5.45:1)
- `public/images/header/better-call-prabowo-mobile.avif` — 900 × 300 (3:1)

The broad white top and bottom margins were removed, and existing visual areas were rearranged within a shallow horizontal banner to fit the reference site's 960px-wide shell. This retains the handwritten title, Prabowo imagery, and the red CTA without disproportionate CSS stretching or cropping faces. The mobile version prioritizes readable logo and CTA text over the left-side explosion graphic.

The previous separately rendered header typography, portrait, and red CTA strip are removed; the illustration already contains these. An accessible clickable hotspot over its bottom CTA links to the site's content, not an external or government service. The standard footer still states that this is an independent, unofficial creative project.

The files are static and local; no external image URL, AI asset service, or new dependency is required. Playwright checks responsive source selection, image loading, layout dimensions, and all five routes. Exact screenshot parity with AMC remains a visual design target, not a pixel-perfect claim.

## Repair: duplicated upper-right photo layer (2026-11-13)

The old AVIF contained photographic artifacts **inside the banner pixels**. A prior compositor had copied the right portrait's black peci and orange/yellow source background into the 24px top stripe, then overlaid the same portrait a second time. CSS-only sizing changes could not remove that duplicated silhouette.

The one-time restoration script `scripts/repair-header-artwork.py` cleans the original embedded background fragments in the existing 1200×220 desktop AVIF and restores the right-side portrait as a **single masked foreground**. It retains the left archival vignette, brand lettering and CTA; the two intentionally different subject compositions remain, without doubled cutout layers.

The browser regression test samples two pixel locations where the previous black/colored ghosts appeared to protect against reintroducing this problem. The output is an updated local AVIF at the same URL, so no CSS or page layout changes are needed.

## Permanent structural repair — November 2026

The last raster patch still contained a doubled peci and a rectangular yellow seam on the right, visible at higher browser zoom. This was **part of the image pixels**, not a CSS crop. Further pixel masking was therefore abandoned.

The shared Astro header is now a responsive **three-panel composition**:
- Left: only the intact leftmost vignette of the previously approved composite, isolated as a CSS background so damaged pixels on its right side can never render.
- Center: accessible native text for “Better Call Prabowo!”, “PRABOWO” and “PRESIDEN INDONESIA”. Typography stays sharp as browser zoom changes.
- Right: **one** locally stored official Prabowo portrait, rendered with `object-fit: contain`, not an overlaid version of the damaged illustration.
- Bottom: a native, keyboard-accessible red CTA with visible text.

This changes the specific right-hand pose from the damaged wink cutout to a single clear official portrait. It preserves the reference-inspired bright color palette and the approx. 60:11 desktop header proportions. On narrow screens the header gains height as necessary instead of cropping words or faces.

No additional image generation, network assets, JS hydration or new dependencies are required. The broken flattened banner remains in the repository only as a cropped **left decorative background** and must not be restored as the complete banner.
