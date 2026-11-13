# Repository development guidance

This is an Astro static website reconstructing a retro visual reference as a clearly labeled independent parody.

- Keep the existing Astro/Tailwind/React architecture; no Radix or `useEffect`.
- Use `@ui-sdk/react` (React adapter) and `@ui-sdk/core` for future complex interactive components, not for static links or display-only elements.
- Read `node_modules/@ui-sdk/react/docs/llms.txt` and only the relevant component docs before using UI SDK. Use component subpath imports, such as `@ui-sdk/react/button`.
- UI SDK is headless. Do not import its optional default stylesheet or redesign the reference layout.
- Consult `docs/reference-audit.md` and `docs/asset-inventory.md` before replacing artwork or media.
- Run focused diagnostics and a build for code changes. Report unverified browser interactions explicitly.
