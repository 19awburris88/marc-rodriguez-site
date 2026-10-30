# Launch checklist

`[x]` means verified in the preview build on 2026-10-30. `[ ]` means it's still open.

## Content (see CONTENT_GAPS.md)

- [ ] Marc approves the hero copy, short bio, and at least one speaking topic
- [x] Approved primary portrait added
- [ ] Speaking and candid photos
- [ ] Full bio from the client interview
- [ ] Proposed topics confirmed, replaced, or removed
- [ ] Privacy notice reviewed: host, privacy contact, analytics
- [ ] No draft labels or "Photo needed" frames appear when built with `NEXT_PUBLIC_SITE_MODE=production` (the launch gate enforces the blocking items)

## Configuration

- [ ] Domain chosen and `NEXT_PUBLIC_SITE_URL` set
- [ ] Hosting chosen. Production env vars set on the host, never committed.
- [ ] Resend domain verified. `CONTACT_DELIVERY=resend`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` set.
- [ ] **Controlled end-to-end inquiry reaches the configured recipient**, with Reply-To set to the sender
- [ ] Host firewall or bot protection set for `/api/contact` (the in-memory rate limiter is per instance)
- [ ] Optional: analytics provider installed and privacy notice updated
- [ ] Optional: UTM attribution configured

## Verified in preview

- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes in preview mode. All pages except `/api/contact` are statically prerendered.
- [x] A production-mode build fails and lists every blocker
- [x] One-page layout: `/`, `/privacy`, `/sitemap.xml`, `/robots.txt`, and `/opengraph-image` return 200. Unknown routes (including the old `/about`) return the 404 page.
- [x] Header links jump to the About, Speaking, Manifest, and Contact sections, and the scroll-spy highlights the section on screen. Mobile menu links close the menu and scroll to their section.
- [x] No horizontal overflow at 360, 390, 768, or 1440px on any route
- [x] The speaking CTA (`/?type=speaking#contact`) scrolls to the form with Speaking preselected and the event fields shown
- [x] Client validation shows an error summary that takes focus and links to each field
- [x] Server validation returns field errors (400). Cross-origin requests get 403, non-JSON gets 415, and the honeypot is accepted quietly without sending.
- [x] The rate limit returns 429 on the 6th request within 10 minutes
- [x] Test delivery shows "Your message was not sent", never a success message
- [x] Missing delivery configuration returns 503 and the UI reports that nothing was sent
- [x] The mobile menu opens, closes with Escape, and returns focus to the toggle. A Tab focus trap is implemented but hasn't had an automated test.
- [x] Content stays fully visible with `prefers-reduced-motion: reduce`
- [x] Preview builds send `noindex, nofollow` and robots.txt disallows everything

## Do before launch, once real media exists

- [ ] Lighthouse on mobile, with real photos: LCP ≤ 2.5s, CLS ≤ 0.1. Record lab results separately from field data.
- [ ] Keyboard-only walkthrough of every page
- [ ] Screen reader pass (VoiceOver) on the home page and contact form
- [ ] Recheck contrast if any colors change. Current pairs (Manifest palette): iron/marble 18.5, marble on red 5.7, red/marble 5.7, stone-soft/iron 9.9, bronze/iron 5.3, steel/marble 10.1. Never use red text on iron or Stone Gray text on marble.
- [ ] Production metadata uses the real domain (canonical URLs, sitemap, Open Graph, Person JSON-LD)
- [ ] Swap the text-only social card for a portrait version
- [ ] Remove `.env.local` test settings from any shared environment
