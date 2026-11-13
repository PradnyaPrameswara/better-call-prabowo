# Reference fidelity refinements — November 13, 2026

An [archival image of the original homepage](https://www.ibtimes.com/better-call-saul-website-5-breaking-bad-easter-eggs-fans-will-love-1539180) reveals an essential detail the previous layout missed: **four 2×2 consultation video thumbnails, with an additional portrait/marketing message**. PR #8 had incorrectly changed the homepage to a main player with a vertical selector.

This revision restores the homepage's visual hierarchy with four locally sourced Prabowo archival thumbnails, centered 2×2 media grid, a promotional portrait, and the same 960px/160px three-column shell. The large main player remains on the TV page where it belongs in this adaptation.

The original page also has a chunky 3D orange welcome banner and a visually noisy advertising strip. The previous three plain flat-colored boxes are replaced with three intentionally dense image-led faux billboards, each showing clear parody and archival-photo wording. No original AMC artwork is copied.

## Verification

CI already includes five pages × five viewports and interaction tests. This PR adjusts those tests to assert a two-column consultation grid, video/photo dialogs, Escape-close behavior, and TV player selection. Screenshots of every page are archived by CI.

These changes are an initial **reference-verified structural refinement**, not proof of 100% pixel equivalence. The screenshots and text differ intentionally and the reference has Flash-era media that cannot be recreated exactly. Do not remove attribution or independent-parody disclosures.
