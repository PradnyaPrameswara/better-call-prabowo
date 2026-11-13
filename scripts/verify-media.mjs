import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const names = [
  "decorated-portrait.jpg",
  "cabinet-announcement.jpg",
  "turkey-speech.jpg",
  "portrait.jpg",
  "inauguration.jpg",
  "inauguration-closeup.jpg",
  "g20.jpg",
  "united-nations.jpg",
  "meeting.jpg",
  "white-house.jpg",
];

let total = 0;
for (const name of names) {
  const path = fileURLToPath(new URL(`../public/images/prabowo/${name}`, import.meta.url));
  const contents = await readFile(path);
  if (contents.length < 1024 || contents[0] !== 0xff || contents[1] !== 0xd8) {
    throw new Error(`Invalid JPEG: ${name}`);
  }
  total += contents.length;
}

const sealUrl = new URL("../public/images/presidential-seal-gold.svg", import.meta.url);
const seal = await readFile(sealUrl, "utf8");
if (!seal.includes("<svg") || seal.length < 10000 || /<script\\b/i.test(seal)) {
  throw new Error("Missing or invalid presidential seal SVG");
}
process.stdout.write(`Verified ${names.length} JPEG media files (${total} bytes) and the presidential seal SVG\\n`);
