# portfolio-site

Paulo Aunor's portfolio and AI-automation service landing page. Replaces the old `portfolio-website` repo (2026-07-09).

Built to the design framework at `../design-standards/DESIGN-STANDARDS.md` — any UI change here (by human or AI model) follows that document.

## Stack

Vite + React 19 + TypeScript (strict) + Tailwind CSS v4. Design tokens live in `src/index.css` under `@theme`; components use tokens only, no raw hex values.

## Commands

```sh
npm install
npm run dev       # dev server on :5173
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/ locally
```

## Deploy

Static output in `dist/`. Target: GitHub Pages or Cloudflare Pages (free tier).

## TODO

- [ ] Set `LINKEDIN_URL` in `src/App.tsx` (link renders only when set)
- [ ] Deploy and log the URL in the vault: `projects/ai-automation-side/PLAN.md` Task 1.2
