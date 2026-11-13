# Browser QA and GitHub Pages

## Browser QA

Run locally (Node >= 22.23.4):

```sh
pnpm install
pnpm exec playwright install chromium
pnpm run test:browser
```

Playwright tests cover the five pages at 1920×1080, 1440×900, 768×1024, 390×844 and 320×720 (25 screenshots), plus focused interactions:

- navigation links, page headings, active route and 960px desktop wrapper
- no horizontal document overflow, loaded images and uncaught client errors
- homepage selection/playback/switching
- clearly fictional testimonials
- e-card preview and copy
- simulated webcam selection

The project disables Astro's development toolbar so it cannot cover screenshots. Interaction tests await the Astro island hydration boundary before clicking.

The committed `pnpm-lock.yaml` is used with frozen installations in both CI and deployment.

The CI workflow uploads `test-results/screenshots` and the Playwright HTML report for inspection. These are **local page screenshots, not automatic pixel-diff proof against AMC**. Different photos/text/video require masking before meaningful pixel-diff calculations.

## GitHub Pages

The Astro build uses `SITE_BASE=/better-call-prabowo/` and `SITE_URL=https://pradnyaprameswara.github.io`. Local development keeps `/`. All source images and internal links use `import.meta.env.BASE_URL`.

Expected production URL after merging and enabling Pages:
https://pradnyaprameswara.github.io/better-call-prabowo/

1. In repository **Settings → Pages**, set **Build and deployment → Source → GitHub Actions** (requires repository administration).
2. Merge the stacked PRs in order into `main`.
3. The workflow `Deploy GitHub Pages` triggers on pushes to `main`. It builds the prefixed static site, checks media and generated paths, and deploys with `actions/deploy-pages`.
4. Check the actual deployment URL, all five routes, generated image URLs and the 404 page after deployment.

Do not claim the production URL is live until GitHub Pages reports a successful deployment. If the Pages source cannot be set, the workflow may fail at deployment even though its build succeeded.

The original reference used Flash-era media, so functional parity means analogous modern behaviors, not cloning unsupported Flash plugins.

## Published-site smoke test

The Pages workflow now performs a **post-deploy HTTP smoke test** against the URL returned by `actions/deploy-pages`. It verifies the canonical project path, all five public page responses containing the site identity, and the portrait and scales assets. Repeated transient HTTP failures are retried; a permanent missing page or wrong path fails the deployment job.

These checks run **only after a deployment occurs on `main` or a manual workflow dispatch**. CI on feature PRs continues to test generated Pages asset paths and full browser behavior, without treating the already-published old version as evidence for unmerged code.

A successful build alone is not proof of a working public website; inspect the final *deploy* job status after merging this change.
