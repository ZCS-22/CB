import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../src/assets');
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function* walkDir(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(fullPath);
    else yield fullPath;
  }
}

let compressed = 0, skipped = 0, savedBytes = 0;

for await (const filePath of walkDir(ASSETS_DIR)) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) continue;

  const { size: before } = await stat(filePath);

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    // Skip if already small enough (under 300 KB)
    if (before < 300 * 1024) { skipped++; continue; }

    const resized = meta.width > MAX_WIDTH ? img.resize(MAX_WIDTH) : img;
    const buf = ext === '.png'
      ? await resized.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
      : await resized.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

    // Only overwrite if we actually saved space
    if (buf.length < before) {
      const { writeFile } = await import('fs/promises');
      // Rename .heic → .jpg
      const outPath = ext === '.heic' ? filePath.replace(/\.heic$/i, '.jpg') : filePath;
      await writeFile(outPath, buf);
      savedBytes += before - buf.length;
      compressed++;
      const pct = Math.round((1 - buf.length / before) * 100);
      console.log(`✓ ${basename(filePath)}  ${(before/1024/1024).toFixed(1)}MB → ${(buf.length/1024/1024).toFixed(1)}MB  (-${pct}%)`);
    } else {
      skipped++;
    }
  } catch (e) {
    console.error(`✗ ${basename(filePath)}: ${e.message}`);
  }
}

console.log(`\nDone: ${compressed} compressed, ${skipped} skipped, saved ${(savedBytes/1024/1024).toFixed(0)} MB total`);
