# Content gaps and asset register

Last updated: 2026-10-30. Owners: **Marc** (approvals, content, photos) and **Austin** (configuration, coordinating with Marc).

"Blocks launch" means the production build will fail until the item is resolved. These checks are enforced in `src/lib/launch.ts`.

## Content

| Item | Owner | Blocks launch | Current preview treatment | Where it goes |
| --- | --- | --- | --- | --- |
| Approve the hero headline, tagline, and intro | Marc | **Yes** | Draft copy from the brief, labeled | `content/person.ts` → `hero` |
| Approve the short bio | Marc | **Yes** | Draft copy from the brief, labeled | `content/biography.ts` → `shortBio` |
| Full bio, 250–400 words (client interview) | Marc | No, but strongly recommended | Chapter drafts with bracketed gaps | `content/biography.ts` → `chapters` |
| Leadership philosophy in Marc's own words | Marc | No | "Pending client interview" block, preview only | `content/biography.ts` → `philosophy` |
| Confirm speaking topics: titles, descriptions, audiences | Marc | **Yes** (needs at least one) | 3 *proposed* concepts, labeled | `content/topics.ts` |
| Speaking formats, availability, travel preferences | Marc | No | Not shown anywhere | Add to `/speaking` once confirmed |
| Speaking intro/positioning copy | Marc | No | Draft, labeled | `content/topics.ts` → `speakingIntro` |
| Story preview paragraph | Marc | No | Draft, labeled (paraphrases the Manifest Dallas bio) | `content/biography.ts` → `storyPreview` |
| Wording for "U.S. Marine Corps, Retired" | Marc | No | Draft, labeled | `content/person.ts` → `military` |
| Whether to use the "The Real Manifest CEO" alias | Marc | No | Not rendered | `content/person.ts` → `socialAlias` |
| Public booking/contact email, if any | Marc | No | Instagram is the only public contact link | `content/person.ts` → `publicEmail` |
| Testimonials, with written permission | Marc | No | Section hidden | `content/media.ts` → `testimonials` |
| Media appearances / selected clips (up to 3) | Marc | No | Section hidden | `content/media.ts` → `media` |
| Speaker reel, with captions or transcript | Marc | No | Block hidden | `content/topics.ts` → `speakerReel` |
| Speaker sheet (PDF) | Marc / Austin | No | No download link shown | `public/` + `content/topics.ts` → `speakerSheet` |
| Privacy review: host, privacy contact, analytics choice | Marc / Austin | **Yes** | Draft notice, labeled | `content/privacy.ts` |

## Configuration

| Item | Owner | Blocks launch | Notes |
| --- | --- | --- | --- |
| Domain (`NEXT_PUBLIC_SITE_URL`) | Austin / Marc | **Yes** | Not chosen. Registration needs separate sign-off. |
| Hosting destination | Austin | Yes (practically) | Not chosen. Vercel is the natural fit for Next.js. |
| Inquiry recipient (`CONTACT_TO_EMAIL`) | Marc / Austin | **Yes** | Don't assume the Institute's general inbox. |
| Resend account, verified sender domain, API key | Austin | **Yes** | Requires a verified domain. |
| Analytics provider (optional) | Austin | No | If enabled, update `content/privacy.ts`. |
| UTM attribution (optional) | Austin | No | Set `NEXT_PUBLIC_UTM_SOURCE` once the domain is known. |
| Shared-store rate limiting (if serverless) | Austin | No | See README → Known limitations. |

## Asset register

Save files under `public/images/`. Set `src`, `width`, `height`, and `status: "approved"` on the matching record, and log permission below.

| Asset | Needed for | Status | Permission / source | Record |
| --- | --- | --- | --- | --- |
| Primary portrait of Marc | About hero; home story section until a candid photo arrives | **Added 2026-10-30** (`public/images/marc-portrait.jpg`) | Supplied by Austin. The filename suggests it came from the Institute site, so confirm publishing rights. | `person.portrait` |
| Candid: Marc teaching, working, or leading | Home story preview | Missing | — | `person.candid` |
| Marc speaking / on stage | Speaking hero | Missing | — | `person.speakingPhoto` |
| 1–3 more supporting photos | About page, future use | Missing | — | — |
| Manifest Fitness Institute logo | Ventures panel | Missing (name shown as text) | Needs reuse permission | `ventures[institute].logo` |
| Institute photo | Ventures panel | **Added 2026-10-30** (`public/images/mfi-teaching.jpg`), cropped from an Institute marketing graphic to remove the URL, logo, and tagline | Supplied by Austin. Confirm reuse permission with the Institute. | `ventures[institute].image` |
| Hero background video | Home hero | **Added 2026-10-30**: YouTube `2deAiHLGVps`, starting at 0:09, poster at `public/images/hero-poster.jpg` | Supplied by Austin. Uploaded by a third-party channel (Austin Kent), so confirm Marc is comfortable featuring it and the uploader has given permission. Recommended: re-host it on Marc's channel or as a self-hosted MP4. | `person.heroVideo` |
| Manifest Dallas logo | Ventures panel | Missing (name shown as text) | Needs reuse permission | `ventures[dallas].logo` |
| Manifest Dallas facility photo | Ventures panel | Missing | Needs reuse permission | `ventures[dallas].image` |
| Media thumbnails | Selected media | n/a until media is supplied | — | `media[].thumbnail` |

## Sources behind the current factual copy

| Fact | Source |
| --- | --- |
| Name, Founder/CEO of Manifest Fitness Institute, owner of Manifest Dallas | Supplied by Austin. Supported by https://www.instagram.com/therealmanifestceo/ and https://manifestdallas.com/ |
| Keynote speaker on leadership, entrepreneurship, and fitness business | Instagram bio |
| USMC retired; 21 years of Marine Corps service | Instagram bio; Manifest Dallas biography |
| Path from independent trainer to facility owner, educator, and mentor | Manifest Dallas biography |
| Institute: fitness education + coaching + business development | https://manifestfitnessinstitute.com/ and /about |
| Manifest Dallas: training environment + trainer directory | https://manifestdallas.com/ |

## Deliberately excluded (do not add)

- The Institute's testimonials marked "pending approval"
- Course lengths. The Institute homepage and About FAQ give different numbers, so the businesses need to resolve this on their own sites.
- Schedules, enrollment claims, facility statistics, and pricing
- Rank, deployments, unit, past clients, event logos, press, awards, certifications, fees, and audience outcomes, unless Marc supplies them with evidence
