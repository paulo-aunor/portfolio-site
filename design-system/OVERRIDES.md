# Portfolio-site design overrides

Version 1.0 · 2026-08-08 · applies on top of `/Users/pauloaunor/Documents/workspace/paulo-aunor/design-standards/DESIGN-STANDARDS.md` v3.0.

This file wins over the standards doc for this project only. Everything not listed here inherits from v3.0.

## Overridden decisions

### 1. Layout — sidebar / long-scroll shell (Chiang-inspired)

**Standards §4a/4b/4c** define dashboard, two-panel marketing/auth, and single-column content as canonical. This site uses a **44/56 sidebar + scroll** shell instead: sticky left column (name + role + one-paragraph blurb + section nav + socials) and a right column with sequential sections in reading order. Below `lg` (1024px), it stacks and the sidebar collapses into a sticky top nav.

**Reasoning:** proven pattern for developer portfolios (brittanychiang.com, letsch.dev). The dashboard shell in §4a is for product surfaces; the two-panel in §4b is for auth/hero pages. A single-column content page (§4c) would flatten the "meet me / read my work" split that the sidebar/scroll gives.

**Where implemented:** `src/App.tsx` — the root `<div>` in `App()` uses `lg:grid lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]`, with `<Sidebar>` in the left column and `<main>` in the right.

### 2. Section nav — horizontal-line indicator (not the dashboard inset bar)

**Standards §5 "Sidebar nav"** describes the dashboard-shell nav (48px pill row, gradient background, inset 3px left bar on active). This site's sidebar nav uses the Chiang-style **growing horizontal line + accent color on hover/active** pattern:
- Rest: 24px `bg-border` line + `text-fg-subtle` label
- Hover: line grows to 40px, shifts to `bg-accent`, label shifts to `text-fg-strong`
- Active: 40px `bg-accent` line with soft accent glow, label `text-fg-strong`

**Reasoning:** the dashboard idiom would visually promise product navigation. The horizontal-line pattern reads as "table of contents", which is what a portfolio sidebar actually is.

**Where implemented:** `src/App.tsx` — `<Sidebar>` component.

### 3. Kicker — no leading number

**Standards §3 "Kicker"** just requires uppercase, weight 800-900, `--color-accent`, letter-spacing ≥ +0.15em. This project's kickers **do not include a leading `[NN]` micro-index** even though the standards permit one. Kickers here are the section label alone (`ABOUT`, `WHAT I BUILD`, `CASE STUDY`, `PROJECTS`, `THE BLUEPRINT`, `CONTACT`).

**Reasoning:** v2.0 used `> 0N.` monospace prefixes and the Kicker component was originally built around that. v3.0 dropped it. Rather than reintroduce numbering in a different form, the kickers read cleaner without it. The Blueprint section still shows `01`-`05` numbers in the top-right corner of each card because those numbers signal a sequential process; section kickers don't need to.

**Where implemented:** `src/App.tsx` — `Kicker` component and its 6 call sites (`<Kicker>About</Kicker>` etc.).

## Non-overrides (worth naming so they don't drift)

- Every color, radius, elevation, motion, focus ring, and font decision here comes from v3.0.
- Cards use the `.surface-card` mix from `src/index.css` + `rounded-[17px]` per §4c radius scale.
- Primary CTAs use the gradient uppercase pattern from §5 (`from-accent-hi` → `to-accent-lo`, `text-on-accent`, lime glow shadow, `hover:-translate-y-1`).
- Section reveal uses the canonical `fadeUp` (translateY 25→0, 700ms, ease-out).
- No web fonts are loaded; system stack only per §8.
- Cursor spotlight (`.cursor-spotlight` in `src/index.css`) is tinted lime per the single-accent rule; it's a portfolio-shell-only detail already sanctioned in v2.0 and carried forward.

## Changelog

- **1.0 (2026-08-08)**: File created when the portfolio was re-skinned from v2.0 (dark-technical, dual-accent blue+green, Inter + JetBrains Mono, `> 0N.` monospace kickers) to v3.0 (lime-on-near-black, single accent, system sans, no kicker prefix). Overrides document what stayed as-is despite v3.0 changing the canonical answer.
