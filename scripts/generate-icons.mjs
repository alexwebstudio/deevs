// favicon.ico (16/32/48) и apple-icon.png (180) из app/icon.svg. Запуск: npm run icons
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile("app/icon.svg");
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// ICO-контейнер с PNG внутри (поддерживается всеми современными браузерами и Яндексом)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...images]));

// apple-touch-icon: без скругления и прозрачности (iOS скругляет сам) — фон графитовый
await sharp(svg, { density: 384 }).resize(180, 180).flatten({ background: "#111111" }).png().toFile("app/apple-icon.png");
console.log("icons: app/favicon.ico, app/apple-icon.png");
