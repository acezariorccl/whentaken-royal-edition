import { photoDetails } from "./photo-details";

export type PhotoCredit =
  | { kind: "anonymous" }
  | { kind: "named"; name: string };
// Gallery regions, in the order shown by the filter buttons.
export const regions = [
  "Latin America",
  "North America",
  "Caribbean",
  "Europe",
  "Asia",
  "Africa",
  "Oceania",
] as const;
export type Region = (typeof regions)[number];
export interface Photo {
  id: string;
  title: string;
  country: string;
  region?: Region;
  year?: number;
  image: string;
  alt: string;
  credit: PhotoCredit;
  story: string;
  mapUrl?: string;
}

// Every image in src/assets/rounds/round-<N>/ becomes a photo of round N, in file-name
// order. At build time each one is resized, re-encoded as WebP and published under a
// neutral name (/images/rounds/<N>/photo-<K>.webp) by src/pages/images/rounds/. That also
// removes EXIF data (GPS location, camera, date) and hides the original file name.
const files = Object.keys(
  import.meta.glob("/src/assets/rounds/round-*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}"),
);

export interface PhotoSource {
  round: number;
  number: number;
  file: string;
  path: string; // project-relative path of the original image
}

const entries = files
  .map((path) => {
    const match = path.match(/round-(\d+)\/([^/]+)$/);
    return match ? { round: Number(match[1]), file: match[2], path } : null;
  })
  .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
  .sort((a, b) => a.round - b.round || a.file.localeCompare(b.file, undefined, { numeric: true }));

export const photosByRound: Record<number, Photo[]> = {};
export const photoSources: PhotoSource[] = [];

for (const entry of entries) {
  const list = (photosByRound[entry.round] ??= []);
  const number = list.length + 1;
  const details = photoDetails[`${entry.round}/${entry.file}`];
  const creditName = details?.credit?.kind === "named" ? details.credit.name : undefined;
  photoSources.push({ ...entry, number });
  list.push({
    id: `round-${entry.round}-photo-${number}`,
    title: details ? (details.title ?? (creditName ? `Photo by ${creditName}` : "")) : "Mystery destination",
    country: details?.country ?? "Location revealed soon",
    region: details?.region,
    year: details?.year,
    image: `/images/rounds/${entry.round}/photo-${number}.webp`,
    alt: details ? (details.alt ?? `Photo of ${details.country}`) : `Round ${entry.round}, photo ${number}`,
    credit: details?.credit ?? { kind: "anonymous" },
    story: details?.story ?? "",
    mapUrl: details?.mapUrl,
  });
}

export const allPhotos: Photo[] = Object.values(photosByRound).flat();
