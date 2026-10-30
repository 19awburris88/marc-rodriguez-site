<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules (Marc Rodriguez site)

- Product brief: `docs/BRIEF.md`. Open content items: `docs/CONTENT_GAPS.md`.
- Never invent testimonials, past events, clients, credentials, statistics, military details (rank, deployments, unit), fees, or service offerings.
- All copy lives in `src/content/` with `status: "draft" | "approved"`. Only Marc can approve. Drafts render only in preview mode.
- Do not copy course details, schedules, enrollment claims, or "pending approval" testimonials from the Manifest business sites — link to them.
- Never substitute a stock or other person's photo for Marc. Use the `Photo` placeholder until real files exist.
- The contact form must never report success unless the provider accepted the message.
