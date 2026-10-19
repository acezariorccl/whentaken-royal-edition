# Voyage Guess · Royal Caribbean Edition

A responsive, statically generated [Astro](https://astro.build) site for a friendly weekly geography competition. Players guess where and when a picture was taken, and the site tracks round results, an all-time leaderboard, and a destination gallery.

## Run it locally

You need [Node.js](https://nodejs.org) 20.3 or newer (22 LTS recommended).

```powershell
npm install
npm run dev
```

Then open <http://localhost:4321>.

Other commands:

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload      |
| `npm run build`   | Build the static site into `dist/`                |
| `npm run preview` | Serve the production build locally                |
| `npm run check`   | Build every route and type-check the TypeScript   |

The build output is plain HTML and CSS with a small gallery script, so `dist/` can be hosted on any static host.

## Deploy to Cloudflare Pages

The site is fully static, so it needs no adapter or Worker. In the Cloudflare dashboard, create a Pages project from this GitHub repository with:

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Astro           |
| Build command          | `npm run build` |
| Build output directory | `dist`          |

`.node-version` pins Node 22 for the build. Every push to `main` redeploys the site. Commit `package-lock.json` along with `package.json` changes, because Cloudflare installs dependencies from it.

## Update the scorebook

- `src/data/game.ts` holds the players, rounds, and results. The crew is André, Luisa, Walman, Juan Mejia, Fede, Sebas, Mari, Silvia, Sergio, Angel, Kevin, and Victor. Round 1 is loaded with its photos and results.
- To finish a round, fill in its `results` in `src/data/game.ts` (the `round1` object). Each result references a player ID. Add later rounds to the `rounds` array newest first; standings, totals, averages, personal bests, wins, and archive pages are derived automatically. Rounds with fewer than three results still render.
- Each result stores location points and year points; the total is their sum. Ties use competition ranks (6=, 6=, 9). Dates are optional ISO strings such as `"2026-10-16"`.
- `src/data/photo-details.ts` holds the title, location, region, year, story, and credit of each photo, keyed by `"<round>/<file name>"` (an example is in the file). A credit is either `{ kind: "anonymous" }` or `{ kind: "named", name: "Display name" }`. Keep personal data (emails, timestamps) out of this file.
- `src/data/site.ts` holds the site name, edition label, and description.

## Photos

Drop each round's images into `src/assets/rounds/round-<number>/` (for example `src/assets/rounds/round-1/`). That's it: no renaming and no registration.

- Photos appear on their round page automatically, in file-name order, even while `npm run dev` is running.
- At build time every photo is resized to 1600 px, converted to WebP, and published as `/images/rounds/<round>/photo-<n>.webp`. EXIF data (GPS location, camera, date) is removed and the original file name is never published.
- Until you add details for a photo in `src/data/photo-details.ts`, it shows as a "Mystery destination" and stays out of the gallery. Add its details after the round to reveal the answer and publish it in the gallery.
- Only use images you have the rights to use.

The code lives in `src/data/photos.ts` and `src/pages/images/rounds/[round]/[photo].webp.ts`.

## Structure

- `src/components`: round view, photo cards, avatars, and inline SVG icons.
- `src/layouts/Layout.astro`: accessible site shell and navigation.
- `src/pages`: leaderboard home, round archive, generated round pages, gallery, and the round photo endpoint.
- `src/styles/global.css`: responsive design, reduced-motion support, and the color tokens at the top of the file.

## Styling

Typography is Montserrat for headings and controls and Lato for body text, loaded from Google Fonts with Arial fallbacks. The palette is inspired by a cruise-line look: deep navy `#061a40`, royal blue `#0057b8`, gold `#f2b632`, and pale sea-foam blue `#e8f1fb`. Change the tokens in the `:root` block of `src/styles/global.css` to adjust the theme.
