import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { mkdir, rename, unlink, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const directory = fileURLToPath(new URL("../public/images/prabowo/", import.meta.url));
const commons = (name, width) => {
  const file = name.replaceAll(" ", "_");
  const md5 = createHash("md5").update(file).digest("hex");
  const prefix = `https://upload.wikimedia.org/wikipedia/commons/${width ? "thumb/" : ""}${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(file)}`;
  return width ? `${prefix}/${width}px-${encodeURIComponent(file)}` : prefix;
};

const files = [
  ["decorated-portrait.jpg", commons("President Prabowo Subianto in 2024 with decorations.jpg", 500)],
  ["cabinet-announcement.jpg", commons("Prabowo Subianto announces new cabinet.jpg")],
  ["turkey-speech.jpg", commons("Prabowo delivers Speech before Turkish Parliament.jpg")],
  ["portrait.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/500px-Prabowo_Subianto_2024_official_portrait.jpg"],
  ["inauguration.jpg", "https://upload.wikimedia.org/wikipedia/commons/6/64/Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_01.jpg"],
  ["inauguration-closeup.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_04.jpg/960px-Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_04.jpg"],
  ["g20.jpg", "https://upload.wikimedia.org/wikipedia/commons/6/6a/Prabowo_in_G20.jpg"],
  ["united-nations.jpg", "https://upload.wikimedia.org/wikipedia/commons/6/63/Prabowo_give_speech_in_UN_General_Assembly_2025.jpg"],
  ["meeting.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/40/Prabowo_and_Jokowi_in_2024.jpg"],
  ["white-house.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Prabowo_Subianto%2C_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12%2C_2024_in_the_White_House_Oval_Office_%28cropped%29.jpg/960px-Prabowo_Subianto%2C_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12%2C_2024_in_the_White_House_Oval_Office_%28cropped%29.jpg"],
];

await mkdir(directory, { recursive: true });

for (const [filename, url] of files) {
  const target = join(directory, filename);
  if (existsSync(target)) {
    process.stdout.write(`Retained ${filename}\n`);
    continue;
  }

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const partial = `${target}.part`;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30_000),
        headers: {
          "User-Agent": "BetterCallPrabowo/1.0 (public Wikimedia photo archive; https://github.com/PradnyaPrameswara/better-call-prabowo)",
          "Accept": "image/jpeg",
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${filename}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1024 || bytes.length > 8 * 1024 * 1024 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
        throw new Error(`Invalid JPEG or unexpected size for ${filename}: ${bytes.length} B`);
      }
      await writeFile(partial, bytes);
      await rename(partial, target);
      process.stdout.write(`Imported ${filename} (${bytes.length} B)\n`);
      lastError = undefined;
      break;
    } catch (error) {
      lastError = error;
      await unlink(partial).catch(() => {});
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 1200));
    }
  }
  if (lastError) throw lastError;
}
