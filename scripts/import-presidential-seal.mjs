import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL("../public/images/presidential-seal-gold.svg", import.meta.url));
let source;
try {
  source = await readFile(path, "utf8");
} catch {
  const url = "https://upload.wikimedia.org/wikipedia/commons/9/90/Indonesian_Presidential_Seal_gold.svg";
  const response = await fetch(url, {
    signal: AbortSignal.timeout(30000),
    headers: {
      "User-Agent": "BetterCallPrabowo/1.0 (archival image credit: Wikimedia Commons)",
      Accept: "image/svg+xml",
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch presidential seal: HTTP ${response.status}`);
  source = await response.text();
  if (!source.includes("<svg") || source.length < 10000 || source.length > 250000 || /<script\b/i.test(source)) {
    throw new Error("Unexpected content for Presidential Seal SVG");
  }
  await mkdir(fileURLToPath(new URL("../public/images/", import.meta.url)), { recursive: true });
  await writeFile(path, source);
  process.stdout.write(`Imported Wikimedia presidential seal (${source.length} chars)\n`);
}
if (!source.includes("<svg") || /<script\b/i.test(source)) {
  throw new Error("Presidential seal SVG missing or invalid");
}
process.stdout.write("Verified presidential seal SVG\n");
