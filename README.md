# Marc Rodriguez — Personal Brand Site

A one-page personal website for **Marc Rodriguez**, founder and CEO of Manifest Fitness Institute and owner of Manifest Dallas. Its main job is to bring in speaking inquiries. Its secondary job is to send visitors on to the two Manifest businesses.

The full product brief is in [docs/BRIEF.md](docs/BRIEF.md).

> **Status: private preview.** This site has not been deployed. Most of the copy is still proposed draft text waiting for Marc's approval, and none of his photos have arrived yet. Before you launch, work through [docs/CONTENT_GAPS.md](docs/CONTENT_GAPS.md) and [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md).

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) with React 19 and TypeScript
- **Tailwind CSS v4**. The design tokens in `src/app/globals.css` use the Manifest brand palette (Manifest Red, Iron, Marble, Steel, Stone Gray, Limestone, Travertine, Bronze, Pewter), with contrast ratios noted alongside them.
- **Fraunces** for headings and **Inter** for body text, both self-hosted through `next/font`
- No database, CMS, or login. Content is kept in typed files under `src/content/`.
- The contact form posts to a server route (`/api/contact`). That route emails each inquiry through Resend's REST API, using `fetch` rather than an SDK.

## Getting started

```bash
npm install
cp .env.example .env.local   # defaults: preview mode + test delivery
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds for production. In production mode the build **fails** while launch blockers remain. |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint |
| `npx tsc --noEmit` | Runs the type check |

## Environment variables

| Name | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_MODE` | public | `preview` (the default) shows draft content with labels and sets `noindex`. `production` shows approved content only and turns on the launch gate. |
| `NEXT_PUBLIC_SITE_URL` | public | The canonical origin, used for canonical URLs, the sitemap, and structured data. **No domain has been chosen yet.** |
| `CONTACT_DELIVERY` | server | `test` logs each inquiry to the server console. It only works in preview mode, and the form tells the visitor nothing was sent. `resend` sends real email. If unset, the form reports that it can't send. |
| `RESEND_API_KEY` | server | Resend API key |
| `CONTACT_TO_EMAIL` | server | The inbox that receives inquiries. **Marc or Austin must supply this.** Don't assume the Institute's general address. |
| `CONTACT_FROM_EMAIL` | server | A sender verified in Resend, for example `Marc Rodriguez Site <inquiries@yourdomain.com>` |
| `NEXT_PUBLIC_UTM_SOURCE` / `_MEDIUM` / `_CAMPAIGN` | public | Optional UTM tags on outbound business links. They're off unless `_SOURCE` is set, and they never overwrite query parameters already on a link. |

## How content approval works

Every public record in `src/content/` has a status:

- **`approved`**: Marc has confirmed it, or it's a verifiable fact Austin supplied that a public source backs up. It renders everywhere.
- **`draft`**: proposed copy or an unconfirmed detail. In **preview** it renders with a dashed outline and a *Draft · pending approval* label. In **production** it doesn't render.

Missing photos show up in preview as labeled "Photo needed" frames that describe the shot we need. They're never filled with a stand-in person. Optional sections such as media, testimonials, the speaker reel, and the speaker sheet are left out entirely while they're empty.

**Launch gate:** `src/lib/launch.ts` lists the content and configuration that must be in place. If you build with `NEXT_PUBLIC_SITE_MODE=production` before those items are resolved, the build fails and prints exactly what's missing.

How-to guide for editing content: [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md).

## Page layout

For now the site is a single page. The header links jump to sections: **About** (`#about`), **Speaking** (`#speaking`), **Manifest** (`#manifest`), and **Contact** (`#contact`). A scroll-spy highlights whichever section is on screen. Only the privacy notice and the 404 page are separate pages. If you want separate pages again later, the sections are self-contained components in `src/components/home.tsx`.

## Project structure

```
src/
  app/            routes: / (one page), privacy, 404, api/contact,
                  sitemap.ts, robots.ts, opengraph-image.tsx
  components/     Header (mobile menu, scroll-spy), Footer, home sections
                  (Hero, RoleStrip, About, Speaking, Ventures, Proof, Contact), ContactForm,
                  Draft (approval wrapper), Photo (image or placeholder), ui
  content/        person, biography, topics, ventures, media, privacy, sources
  lib/            config, content visibility, validation, email adapter,
                  rate limiting, analytics, UTM links, metadata, launch gate
docs/             BRIEF, CONTENT_GAPS, CONTENT_EDITING, LAUNCH_CHECKLIST
public/images/    approved photos and logos go here
```

## Contact form behavior

- Fields: name, email, inquiry type (Speaking, Media or Podcast, Partnership, General), and message are required. Organization and website are optional. Event date and location appear only when Speaking is selected.
- Links to `/?type=speaking#contact` (every "Inquire About Speaking" button) scroll to the form with Speaking already selected.
- Validation runs in the browser and again on the server, using the same rules from `src/lib/validation.ts`. Errors are announced, and an error summary links to each problem field.
- Spam and abuse controls: a hidden honeypot field, a same-origin check, a cap on request size, and a per-IP rate limit (5 requests per 10 minutes).
- The form shows success **only** after Resend accepts the message. That confirms the provider took it, not that it reached the inbox. Test mode, a missing configuration, and provider failures each get their own message, and whatever the visitor typed stays in the form.
- In outgoing email, user input is HTML-escaped and the visitor's address is set as Reply-To.

## Hero video

The home hero plays a muted background video (`src/components/HeroVideo.tsx`, configured in `person.heroVideo`). How it works:

- It loads from `youtube-nocookie.com` and starts at 0:09. It jumps back to 0:09 just before the end, so YouTube's end screen never appears.
- The poster frame renders first and is the LCP image. The video fades in only once YouTube reports that it's playing.
- A pause/play button is always available.
- If the visitor's device asks for reduced motion or Data Saver, the video doesn't autoplay. The visitor can still press play.
- **Known issue:** YouTube can show its own round pause icon in the middle of the player when controls are hidden. That icon can't be turned off with embed parameters. Re-hosting the clip as a self-hosted MP4 would remove it and drop the YouTube dependency.

## Analytics

`src/lib/analytics.ts` records three events: `speaking_cta_click`, `business_referral`, and `inquiry_submitted`. It sends them to Plausible if `window.plausible` is present, logs them to the console in development, and does nothing otherwise. No names, email addresses, or message text are ever sent. No analytics script is installed yet. If you add one, update `src/content/privacy.ts` too.

## Known limitations

- The rate limiter keeps its counts in the memory of a single process. On serverless hosts, back it with the host's firewall or bot rules, or a shared store, before launch.
- There's no CMS, so content changes mean editing code. Add a CMS only if Marc needs to edit the site himself.
- The social card (`opengraph-image.tsx`) is text-only for now. Replace it with a portrait version once a photo is approved.
- The site isn't deployed and has no domain or hosting yet. Those decisions, and any purchases, need separate sign-off.
