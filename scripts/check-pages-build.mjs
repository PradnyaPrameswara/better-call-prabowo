import { readFile, stat } from "node:fs/promises";
const base = "/better-call-prabowo/";
const routes = [
  "index.html",
  "testimonials/index.html",
  "asseenontv/index.html",
  "ecards/index.html",
  "livewebcam/index.html",
  "404.html",
];
for (const path of routes) {
  const html = await readFile(`dist/${path}`, "utf8");
  if (!html.includes("Better Call Prabowo")) throw new Error(`Brand missing: ${path}`);
  if (!html.includes(base)) throw new Error(`Base path missing: ${path}`);
  if (html.includes('src="/_astro/') || html.includes('href="/_astro/') || html.includes('src="/images/')) {
    throw new Error(`Root-relative asset path in ${path}`);
  }
}
for (const image of ["portrait", "inauguration", "inauguration-closeup", "g20", "united-nations", "meeting", "white-house"]) {
  await stat(`dist/images/prabowo/${image}.jpg`);
}
await stat("dist/images/scales.svg");
process.stdout.write("Verified six HTML routes and all 8 local images for project-site base path.\n");
