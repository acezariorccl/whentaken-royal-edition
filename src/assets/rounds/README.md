# Round photos

Put each round's photos in a folder named `round-<number>`:

```
src/assets/rounds/round-1/   <- photos for round 1
src/assets/rounds/round-2/   <- photos for round 2
```

- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
- File names do not matter. Photos are shown in file-name order (numbers sort naturally, so `photo-2` comes before `photo-10`).
- At build time every photo is resized to 1600 px wide, converted to WebP, and published as `/images/rounds/<round>/photo-<n>.webp`. EXIF data such as GPS location and camera details is removed, and the original file name is never published.
- A new photo shows up on its round page right away, even while `npm run dev` is running. Until you add details for it in `src/data/photo-details.ts`, it appears as a "Mystery destination" and stays out of the gallery.
- Only add images you have the rights to use.
