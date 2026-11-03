import type { PhotoCredit, Region } from "./photos";

export interface PhotoDetails {
  country: string; // place name shown as the photo's heading
  region: Region; // Latin America | North America | Caribbean | Europe | Asia | Africa | Oceania
  title?: string; // optional caption; defaults to "Photo by <credit name>"
  year?: number; // optional year the photo was taken
  story?: string; // optional comment, shown behind "Reveal the story"
  alt?: string; // optional; defaults to "Photo of <country>"
  credit?: PhotoCredit; // optional; defaults to anonymous
  mapUrl?: string; // optional link to the place on a map
}

// Details for each photo, keyed by "<round number>/<file name>". The extension is
// optional: "2/Andre-1" matches Andre-1.jpg, Andre-1.jpeg or Andre-1.png.
//
// A photo dropped into src/assets/rounds/round-N/ shows up automatically. Until you add
// details for it here, it appears on its round page as a mystery destination and stays
// out of the gallery, so you can reveal the answer after the round is played.
export const photoDetails: Record<string, PhotoDetails> = {
  "2/Andre-1": {
    country: "Blue Mountains, New South Wales, Australia",
    region: "Oceania",
    year: 2019,
    story:
      "Blue Mountains is a park in New South Wales, Australia, I went there for a month to visit my wife when she was there.",
    alt: "A forested valley with sandstone cliffs and flat-topped ridges under a cloudy sky",
    credit: { kind: "named", name: "André" },
  },
  "2/Fede-2": {
    country: "Palermo, Buenos Aires, Argentina",
    region: "Latin America",
    year: 2026,
    alt: "An outdoor fitness park with green turf, concrete benches and exercise equipment under tall trees",
    credit: { kind: "named", name: "Fede" },
  },
  "2/Sebas-3": {
    country: "Puerto Madero, Buenos Aires, Argentina",
    region: "Latin America",
    year: 2026,
    story:
      "Puerto Madero in Buenos Aires. I ran there everyday to train for my first half marathon in November!",
    credit: { kind: "named", name: "Sebas" },
  },
  "2/Walman-4": {
    country: "Cueva de Taulabé, Honduras",
    region: "Latin America",
    year: 2021,
    credit: { kind: "named", name: "Walman" },
  },
  "2/Kevin-5": {
    country: "Huacachina Oasis, Peru",
    region: "Latin America",
    year: 2025,
    story: "Adventure in the Peruvian desert",
    credit: { kind: "named", name: "Kevin" },
  },
  "1/1-Fede.jpeg": {
    country: "Bariloche, Argentina",
    region: "Latin America",
    credit: { kind: "named", name: "Fede" },
  },
  "1/2-Walman.jpeg": {
    country: "Lake Ilopango, El Salvador",
    region: "Latin America",
    story: "The lake is inside the inactive volcano.",
    credit: { kind: "named", name: "Walman" },
  },
  "1/3 - Luisa in peru.jpg": {
    country: "Humantay Lake, Peru",
    region: "Latin America",
    credit: { kind: "named", name: "Luisa" },
  },
  "1/4-Japon - Sebas.jpg": {
    country: "Tokyo, Japan",
    region: "Asia",
    story: "A classic wedding that is still celebrated with traditional clothes.",
    credit: { kind: "named", name: "Sebas" },
  },
  "1/5-victor.jpg": {
    country: "Villa de Leyva, Colombia",
    region: "Latin America",
    story: "Hot day at the Colonial city of Villa de Leyva. Had a tasty milhojas!",
    credit: { kind: "named", name: "Victor" },
  },
};
