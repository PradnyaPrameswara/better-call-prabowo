# Better Call Prabowo

A clearly labeled, unofficial **parody** site inspired by the colorful early-2000s layout of AMC's fictional *Better Call Saul* attorney website.

**Independent creative project; not an official site and not endorsed by Prabowo Subianto, the Indonesian government, or AMC.**

## Stack

Astro 7, Tailwind CSS 4, React 19 for interactive islands when needed, TypeScript, shadcn-compatible component configuration, Vercel UI SDK (headless behaviors), Lucide and pnpm 12. No Radix or `useEffect` required for the foundation.

## Run locally

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

Node.js 22.23.4 or newer.

## Vercel UI SDK

Installed: `@ui-sdk/core@0.1.0-beta.1` and `@ui-sdk/react@0.1.0-beta.1`.

UI SDK is an unstyled behavior/interaction library, **not the Vercel AI SDK**. Its default `web.css` theme is intentionally not imported so the reference website's retro visual design stays intact. The packages are ready for future interactive React islands, but no existing Astro navigation or layout has been rewritten.

See [UI SDK integration notes](docs/ui-sdk.md).

## Development

Changes are organized as stacked pull requests: foundation → [reference audit](docs/reference-audit.md) → shared layout → page content → interaction/visual parity → deployment.

See [asset provenance](docs/asset-inventory.md). The public Wikimedia portrait is used remotely during layout development; replace with a reviewed local asset when finalizing the design.

Reference: https://bettercallsaul.amc.com/
