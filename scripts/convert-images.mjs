// One-time conversion of the Figma Make export's images to WebP.
// Figma exports every photo as full-res PNG; this resizes to a sane web
// width and converts to WebP, deleting the originals.
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const MAX_WIDTH = 1920;
const QUALITY = 80;

const targets = [
  { dir: "src/assets", exts: [".png"] },
  { dir: "src/imports", exts: [".jpeg", ".jpg", ".png"] },
];

let before = 0;
let after = 0;
let count = 0;

for (const { dir, exts } of targets) {
  const files = await readdir(dir);
  for (const file of files) {
    if (!exts.includes(path.extname(file).toLowerCase())) continue;
    const src = path.join(dir, file);
    const dest = path.join(dir, path.basename(file, path.extname(file)) + ".webp");
    const srcSize = (await stat(src)).size;
    try {
      await sharp(src)
        .rotate() // respect EXIF orientation before stripping metadata
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);
      const destSize = (await stat(dest)).size;
      before += srcSize;
      after += destSize;
      count++;
      await unlink(src);
    } catch (err) {
      console.error(`FAILED ${src}: ${err.message}`);
    }
  }
}

console.log(`Converted ${count} images`);
console.log(`Before: ${(before / 1048576).toFixed(1)} MB  After: ${(after / 1048576).toFixed(1)} MB  (saved ${(100 - (after / before) * 100).toFixed(0)}%)`);
