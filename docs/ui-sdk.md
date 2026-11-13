# Vercel UI SDK integration

Source: https://github.com/vercel-labs/ui — documentation: https://ui-sdk.dev/docs

Installed in `package.json`:
- `@ui-sdk/core@0.1.0-beta.1`: headless behavior primitives.
- `@ui-sdk/react@0.1.0-beta.1`: React 19 adapter.

Run `pnpm install` after checkout. React and TypeScript were already installed in PR #01.

## Usage for future pages

- Keep Astro for static page structure; use React islands only when an interaction genuinely needs client state.
- Import targeted React components, e.g. `import { Button } from '@ui-sdk/react/button'`, **not** from `@ui-sdk/react` root.
- Components have no default styles. Match the reference website's colors, geometry and typography via existing site CSS/Tailwind.
- `@layer ui-sdk;` is declared before the Tailwind import in `src/styles/global.css`, as recommended upstream. The optional `@ui-sdk/core/web.css` is deliberately not imported.
- Don't introduce Radix or `useEffect` to set up UI SDK.
- Check the installed version's `node_modules/@ui-sdk/react/docs/llms.txt`, then the specific component docs before composing new controls. Upstream also offers a coding-agent skill: `npx skills add vercel-labs/ui --skill ui-sdk` (optional, not installed in this repo).
- No Vercel hosting, AI provider, API keys or server-side AI endpoint are needed for UI SDK.

## Scope and verification

This PR installs the library and checks import resolution in CI. It does not replace working static Astro markup, add a sample UI, or claim visual parity. Build and type checks remain in CI. Before using beta controls in production, verify keyboard, focus, screen-reader names and visual behavior in the browser.
