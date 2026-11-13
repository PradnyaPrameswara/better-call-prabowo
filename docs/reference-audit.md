# Better Call Saul reference audit — first pass

Reference: https://bettercallsaul.amc.com/ (examined 2026-11-13).

## Pages and migration targets

| Original page | Project route | Scope |
| --- | --- | --- |
| `/index.php` | `/` | Consultations / home, four video thumbnails |
| `/testimonials.php` | `/testimonials/` | Three client testimonials |
| `/asseenontv.php` | `/asseenontv/` | Three television ads |
| `/ecards.php` | `/ecards/` | Four cards and a form |
| `/livewebcam.php` | `/livewebcam/` | Recorded webcam-style media |

The Astro routes are static, intentionally not PHP. Exact content and interactive behavior are **not** yet implemented.

## Shared structure

1. Centered, fixed-width 2000s-style canvas with gold/orange header.
2. Portrait to the left of a large stylized brand name and tagline.
3. Full-width red CTA announcement strip.
4. Three-column center band: left vertical navigation, main media panel, right promos.
5. Full-width oversized welcome banner with scales illustrations.
6. Advertising tile grid, Spanish-message promo and footer links.

Source assets were inspected at:
- https://bettercallsaul.amc.com/media/images/videoselector.jpg (640 × 384)
- https://bettercallsaul.amc.com/media/images/welcomelawbreakers.jpg (960 × 86)
- https://bettercallsaul.amc.com/media/images/wayfarer515.png
- https://bettercallsaul.amc.com/media/images/polloshermanos.jpg

The likely desktop grid is ~960px wide with 160px / 640px / 160px columns. Treat that as a **working measurement**, not audited CSS. Confirm at full resolution and with screenshots in PR #08.

## Style baseline

- Intentionally saturated yellows, oranges, reds and blues.
- Thick white/red outlined headings; playful drop shadows, gradients and repeating stripes.
- Fixed geometry and visually dense advertisements; do not modernize into a sparse card layout.
- Main content is page-specific; shared chrome stays consistent.
- Smaller screens must not clip interactive controls or create horizontal page overflow.

## Stage boundaries

- PR #01: application foundation.
- PR #02: audit, metadata, asset provenance and reusable site data.
- PR #03: shared chrome and honest placeholders on every planned route.
- PR #04–#06: actual page media, interactions and card/webcam experiences.
- PR #07–#08: responsive and screenshot-parity refinement.
- PR #09: GitHub Pages deployment (including base-path adjustments).

## Open verification items

- Inspect the live DOM/CSS and desktop/mobile screenshots directly; text-only crawling does not expose pixel-accurate browser behavior.
- Confirm navigation, hover/active, media player, audio, e-card form, and footer destinations.
- Determine what remains executable in the original Flash-era media.
- Audit each replacement image's license and framing before shipping a self-contained asset bundle.
