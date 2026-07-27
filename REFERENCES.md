# REFERENCES.md — Redesign source material

Captured 2026-07-26 via `firecrawl scrape --format branding,images`. Raw payloads live in `.firecrawl/*-branding.json`. Font-size numbers from the scrape are best-guess and were sanity-checked against source pages (Firecrawl's automated size extraction is unreliable; treat as inferred).

## Source table

| Site | Vibe | BG | Fonts | Accent | Layout signature | What to steal |
| --- | --- | --- | --- | --- | --- | --- |
| brittanychiang.com | Dark technical, restrained, monospace kickers | #0F172A slate-900 | Inter (sans) | Yellow #EAB308 → **swap to blue** | **Fixed left sidebar (name + role + nav + socials) / scrolling right column** with hover-highlighted active section | Sidebar+scroll shell, section numbering (01/02/03), monospace kickers, cursor spotlight, minimal chrome |
| letsch.dev | Dark developer, terminal-green accent | #111827 gray-900 | Fira Code (monospace throughout) | Green #00D089 + cyan #14AADB | Single-column, generous vertical rhythm, essay-heavy | **Terminal green** for status/labels, monospace body option, 10px card radius (softer than Chiang) |
| avinash-singh.in | Dark editorial with serif hero | #0A0A0A near-black | Outfit body + Instrument Serif headings | Neutral white (no chromatic accent) | Extreme dark contrast, pill CTAs (huge radius), big serif hero heading | Deeper background floor (#0A0A0A tone), optional serif for one hero flourish |
| kennethsunjaya.com | Warm editorial (light theme, opposite direction) | #FAF8F1 cream | Inter + Poppins | Dusty blue #536493 | Long-scroll case-study cards with logo + tags, "tech stacks" strip | Case-study card composition (logo → title → tags → read more), tech-stack chip strip |

## Recommendation for Paulo's redesign

**Anchor: Chiang's shell.** The fixed left-column layout with a scrolling right column is what makes Chiang's site read as intentional instead of generic — it commits to a shape and everything hangs off it. Everything else (Letsch's green, Avinash's dark floor, Kenneth's case-study cards) becomes a texture layered on top.

### Tokens

Locked from Paulo's brief plus the references:

```
--color-bg          #0B0F19   (deeper than Chiang, echoes Avinash's #0A0A0A)
--color-surface     #111827   (one step up for cards)
--color-surface-2   #1F2937   (hover / active lift)
--color-border      #1F2937
--color-border-mute #1F293780 (50% for very quiet dividers)
--color-fg          #E5E7EB   (Chiang-style slate-200 body)
--color-fg-strong   #F1F5F9   (headings)
--color-fg-muted    #94A3B8   (slate-400 secondary)
--color-fg-subtle   #64748B   (slate-500 tertiary / captions)
--color-accent      #3B82F6   (blue — links, primary CTA)
--color-accent-hi   #60A5FA   (hover blue)
--color-accent-sub  #1E3A8A20 (translucent blue chip bg)
--color-term        #10B981   (terminal green — kickers, code, status, monospace flourishes)
--color-term-hi     #34D399   (hover green)
--color-term-sub    #10B98115 (translucent green chip bg)
```

Two accents on purpose: **blue for navigation/CTAs (the thing you click)**, **green for structure/labels (the thing that tells you where you are)**. Never both on the same element. Never on the same line.

### Typography

- Body / UI: **Inter** — same as Chiang, safe, ships from Google Fonts.
- Monospace: **JetBrains Mono** — for section kickers, tech chips, stat numbers, `> WORK` prompts.
- No serif in v1. Adding Instrument Serif is a v2 flourish if the hero feels flat.

### Layout signature (what actually changes)

Current site is a stacked single-column page. New layout:

- **≥1024px:** two-column shell.
  - **Left column (fixed, 40% width, sticky full-height):** Name, one-line role, one paragraph blurb, vertical nav with active-section highlight (line grows on hover, terminal green), socials pinned to bottom (email/GitHub/LinkedIn/CV).
  - **Right column (scroll):** About → Work → Case study → Blueprint → Contact.
- **<1024px:** stacked. Sidebar collapses to a normal header with a sticky top nav. Nothing else changes.

### Section styling

- **Kicker** above every section: monospace, uppercase, `text-term`, prefixed with `> 0N.` — e.g. `> 01. WHAT I BUILD`.
- **Cards:** `bg-surface`, `border-border`, 10px radius (Letsch), hover lifts to `surface-2` with a 1px green top border animating in.
- **Chips (tech / status):** `bg-term-sub`, `text-term`, monospace, uppercase, 11px, no border.
- **Primary CTA:** solid blue, white text, 8px radius, subtle blue glow shadow on hover.
- **Secondary CTA:** transparent, blue border, blue text (Letsch's shape, blue instead of green).
- **Links inline in prose:** underline in blue on hover, no underline at rest.
- **Stat numbers:** JetBrains Mono, tabular-nums, terminal green.
- **Progress bars in case study:** rail in `border`, fill in green.

### Motion

- Section entrances fade+rise 12px on scroll (IntersectionObserver, one-shot, 300ms).
- Active nav item: 24px line on the left grows to 40px and shifts to green (240ms).
- Cursor spotlight (Chiang's signature): radial gradient of the blue token at 6% opacity following the cursor across the page. Disabled under `prefers-reduced-motion`.
- Nothing else. No parallax, no scroll-jack, no letter-by-letter reveals — those belong to Kenneth Sunjaya's site and would fight the technical tone we're going for.

### What we deliberately DON'T copy

- Chiang's yellow accent → replaced by blue/green scheme.
- Kenneth's serif dense case-study layout → too editorial for a dev-focused pitch.
- Avinash's giant pill buttons → too consumer, softens the technical read.
- Letsch's all-monospace body → too heavy at long-form reading sizes; monospace stays as accent.

### Content changes

Copy stays as-is — the current site's writing is strong and matches the technical tone we're leaning into. Restructure is visual only:
- Hero → merged into left sidebar (name/role/blurb) + right-column intro paragraph.
- Work / Case study / Blueprint / Contact → keep as separate scroll sections in the right column, gain new section kickers.
- New addition: small "> currently" line in the sidebar (Chiang has one) — one sentence about what Paulo's working on right now.

## Rerun inputs

```
workflow: firecrawl-website-design-clone
sources: brittanychiang.com, letsch.dev, kennethsunjaya.com, avinash-singh.in
anchor: brittanychiang.com
target_stack: Vite + React 19 + TS + Tailwind v4
output: DESIGN.md (this file) + rewrite of src/App.tsx + src/index.css
```
