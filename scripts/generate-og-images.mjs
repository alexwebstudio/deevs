// Превью для соцсетей по каждому проекту: первое фото из галереи → JPG 1200×630.
// Запуск после добавления проекта или замены фото: npm run og:projects
import { readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = join(root, "public/images/portfolio");
const out = join(root, "public/images/og/projects");
await mkdir(out, { recursive: true });

const firstPhotos = (await readdir(src)).filter((f) => /-01\.webp$/.test(f));
for (const file of firstPhotos) {
  const slug = file.replace(/-01\.webp$/, "");
  await sharp(join(src, file))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(join(out, `${slug}.jpg`));
  console.log(`og: ${slug}.jpg`);
}
