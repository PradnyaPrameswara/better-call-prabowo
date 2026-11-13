# Stage 3 reference parity notes

Date: 2026-11-13

The historical reference screenshot confirms a **left-aligned wordmark and right-aligned portrait** in the yellow/orange header, and a **large central media screen with a narrow vertical video selector to its right**. The first implementation had these elements reversed or placed as a center grid.

Source visual: [L'Express archival screenshot](https://www.lexpress.fr/entrepreneurs/les-avocats-nouveaux-rois-de-la-publicite_1518761.html); live [AMC parody reference](https://bettercallsaul.amc.com/).

## Changes

- Header wordmark moved to left; portrait on right; thin red-orange site label strip added.
- Homepage and As Seen on TV changed to a 640:160 main player/selector geometry inside the 960px shell (the outer 160px navigation remains).
- Video selector buttons update the selected media; switching video stops the previous iframe. Video embeds only start when explicitly requested. Real videos remain linked to their original source.
- Distinct narrower responsive layouts preserve page access on mobile.

## Limits

This is a geometry and hierarchy refinement, **not pixel-perfect proof**. Source screenshot is cropped and old Flash content may not render in modern browsers. Image and text replacement intentionally differ from the AMC originals. Browser screenshots and interaction checks are maintained in the next PR.
