# Editing content

All site copy lives in `src/content/`. You don't need to touch components for routine edits. When you're done, run `npm run build` to confirm everything still compiles.

## Approving something Marc signed off on

1. Find the record, for example `hero` in `src/content/person.ts`.
2. Update the text to match exactly what Marc approved.
3. Set `status: "approved"`, and update `note` with who approved it and when, e.g. `note: "Approved by Marc via text, 2026-11-04"`.

Records still in `draft` are hidden in production. In preview they show a *Draft · pending approval* label.

## Adding a photo

1. Export it as WebP or AVIF, about 2000px on the long side for heroes, and save it in `public/images/`.
2. Fill in the matching image record:

```ts
portrait: {
  src: "/images/marc-portrait.webp",
  width: 1600,
  height: 2000,
  alt: "Marc Rodriguez in the Manifest Dallas training space",
  needed: "...",              // keep — used if the file is ever removed
  status: "approved",
  note: "Original from Marc, 2026-11-05. Permission to publish.",
},
```

`next/image` handles responsive sizes and lazy loading. Hero images load early, using `preload`.

## Speaking topics (`topics.ts`)

Each topic needs `id` (used as its anchor, e.g. `/#leadership`), `title`, `short`, `audience`, and `takeaway`. The Speaking section shows topics in the order they appear in this list. To remove a proposed concept Marc rejected, delete its entry.

## Media and testimonials (`media.ts`)

Add up to three media items with a real URL, a date, and an approved local thumbnail. A testimonial needs the person's real name, their role, and a `permission` value describing their written OK. Both sections show up automatically once they have approved entries.

## Speaker reel and speaker sheet (`topics.ts`)

- `speakerReel`: `{ url, title, transcriptUrl? }`. A "Watch the speaker reel" button appears in the Speaking section once this is set.
- `speakerSheet`: put the PDF in `public/`, then set `{ href: "/marc-rodriguez-speaker-sheet.pdf", label: "Download speaker sheet" }`.

## Ventures (`ventures.ts`)

Each business has a name, Marc's role there, a one-sentence description, CTA text, and a URL. Keep descriptions general and send visitors to the business sites for programs, schedules, and pricing.

## Privacy (`privacy.ts`)

Once you've chosen a host, analytics provider (if any), and privacy contact, update `host`, `analytics`, and `privacyContact`. After Marc has reviewed the notice, set `status: "approved"`.
