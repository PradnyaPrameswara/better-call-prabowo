import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const names = [
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

process.stdout.write(`Verified ${names.length} JPEG media files (${total} bytes)\n`);
