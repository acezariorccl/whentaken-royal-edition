// Publishes each round photo as a resized WebP with a neutral file name.
// sharp drops all metadata (EXIF, GPS, camera) unless it is explicitly kept.
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { photoSources } from "../../../../data/photos";

export const getStaticPaths: GetStaticPaths = () =>
  photoSources.map((source) => ({
    params: { round: String(source.round), photo: `photo-${source.number}` },
    props: { file: source.path },
  }));

export const GET: APIRoute = async ({ props }) => {
  const original = await readFile(path.join(process.cwd(), props.file as string));
  const body = await sharp(original)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  return new Response(new Uint8Array(body), {
    headers: { "Content-Type": "image/webp" },
  });
};
