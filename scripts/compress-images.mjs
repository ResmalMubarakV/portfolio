/**
 * Image compression script using sharp.
 * Compresses project screenshots and profile images for the portfolio.
 * Run with: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../src/assets');

const targets = [
  {
    file: 'demo1.webp',
    // Large project screenshot — target ≤ 400KB at quality 70
    quality: 70,
    maxWidth: 1400,
  },
  {
    file: 'dreamlands.webp',
    // Medium project screenshot — target ≤ 300KB at quality 75
    quality: 75,
    maxWidth: 1400,
  },
  {
    file: 'avora.webp',
    // Smaller screenshot — quality 80 keeps it crisp
    quality: 80,
    maxWidth: 1200,
  },
  {
    file: 'profile.webp',
    // Hero background portrait — already small but re-encode for consistency
    quality: 82,
    maxWidth: 1600,
  },
];

async function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function compress({ file, quality, maxWidth }) {
  const inputPath = path.join(assetsDir, file);
  const outputPath = path.join(assetsDir, file); // overwrite in-place

  const before = (await stat(inputPath)).size;

  const metadata = await sharp(inputPath).metadata();
  const resizeWidth = Math.min(metadata.width, maxWidth);

  await sharp(inputPath)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outputPath + '.tmp');

  // Replace original with compressed version
  const { rename } = await import('fs/promises');
  await rename(outputPath + '.tmp', outputPath);

  const after = (await stat(outputPath)).size;
  const saving = (((before - after) / before) * 100).toFixed(1);

  console.log(
    `✅ ${file}: ${await formatBytes(before)} → ${await formatBytes(after)} (${saving}% saved)`
  );
}

console.log('🔧 Compressing portfolio images...\n');

for (const target of targets) {
  try {
    await compress(target);
  } catch (err) {
    console.error(`❌ Failed to compress ${target.file}:`, err.message);
  }
}

console.log('\n✨ Done! Rebuild the app to pick up the new assets.');
