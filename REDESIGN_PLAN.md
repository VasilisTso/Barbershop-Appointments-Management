# Barbershop VT — Editorial Redesign

> **Living plan.** Canonical copy lives at project root: `REDESIGN_PLAN.md`.
> Each session: read this file first, continue from first unchecked phase, tick boxes + add a line to **Session log** before ending.

## Context
Frontend (React 19 + Vite + Tailwind v4 + framer-motion) looks like a generic AI template: `#030014` navy, radial violet glow in `src/App.jsx:78`, violet→fuchsia gradient text, `blur-[100px]` glow blobs (Login, Register, Appointments), glass `backdrop-blur` cards, colored `shadow-violet-*`, emoji logo. Goal: modern, distinctive **editorial barbershop** look across all pages, purposeful animation, zero glow/gradient slop. Home refocuses on the shop; tech stack + contacts move to footer. No backend changes.

Decisions made with user: direction = Editorial barbershop · scope = all pages · tech stack + contacts move from Home to Footer.

## Skills used
- **impeccable** (primary, `~/.claude/skills/impeccable`): run `scripts/impeccable context` once per session; `reference/new-work.md` (redesign = replace world); read `reference/craft-floor.md` before every UI edit (bans glow/gradient-text reflexes); `reference/animate.md` for motion; `audit` + `polish` at end; `document` writes DESIGN.md.
- **ui-ux-pro-max** (reference data): `scripts/search.py --design-system "barbershop booking editorial"` to sanity-check palette/fonts; `--domain ux` for form/a11y rules; `--stack react`. Validates choices, does not override brief.

## Design direction
- **Palette** (Tailwind v4 `@theme` tokens in `src/index.css`): paper `#F4EFE6`, ink `#1A1714`, muted `#6B635A`, hairline `#D9D1C4`, accent oxblood `#7A2E24`, brass `#B08D57` (small details only). Status colors desaturated (sage / ochre / brick). Light theme only.
- **Type**: Instrument Serif (display) + Geist (sans, tabular numerals), replacing Outfit. Big display headings. No eyebrow labels above headings (impeccable craft-floor ban).
- **Surfaces**: flat paper, 1px hairlines, radius 4–8px, no shadows except menus/focus. No gradients, blur, glass, emoji.
- **Motion** (framer-motion): staggered hero reveal, `whileInView` fades (once), nav underline `layoutId`, `AnimatePresence` list enter/exit, press scale, route fade. All honor `prefers-reduced-motion` / `useReducedMotion`.

## Phases

### Phase 0 — Setup
- [x] Copy this plan to `REDESIGN_PLAN.md` at project root.
- [x] Run `impeccable context`; read `new-work.md` + `craft-floor.md`. (Wrote PRODUCT.md via init: portfolio/demo audience, demo-marked shop facts.)
- [x] Add to `.gitignore`: `.playwright-mcp/`, `screenshots-tmp/`, `*.png` under those dirs (safety net for verification artifacts).
- [x] Baseline screenshots of current site — committed `Screenshots/` (13 captures, all roles) used as baseline; backend not installed yet (no node_modules/.env), set up in Phase 6.

### Phase 1 — Foundation
- [x] `index.html`: font preconnect/links, `theme-color` meta.
- [x] `src/index.css`: drop Outfit + violet scrollbar; `@theme` tokens, base body, `:focus-visible` ring, reduced-motion rule.
- [x] `src/main.jsx`: restyle `<Toaster>` to tokens.
- [x] New `src/components/ui/`: `Button` (primary/secondary/ghost/danger), `Field` (label+input+error), `PasswordInput` (dedupes eye-toggle SVG from Login/Register), `Card`, `StatusBadge`, `PageHeader`, `Reveal` (motion wrapper), `Skeleton`.

### Phase 2 — Shell
- [x] `src/App.jsx`: remove radial glow, `bg-paper text-ink`; `AnimatedRoutes` (AnimatePresence keyed by location) inside BrowserRouter; restyle 404.
- [x] `src/components/Navbar.jsx`: serif wordmark (no emoji/gradient), flat bar + bottom hairline, AnimatePresence mobile menu, aria-labels on hamburger/logout.
- [x] `src/components/Footer.jsx`: shop blurb, nav links, "Built with" tech list (monochrome icons, moved from Home), contact links (LinkedIn/GitHub/email, moved from Home), copyright + university note, back-to-top.

### Phase 3 — Public pages
- [x] `src/pages/Home.jsx`: editorial hero (serif headline, copy, CTA, static hours/address column), services preview as menu rows (name … dotted leader … duration · price), "How booking works" 3-step strip. Remove tech + contact sections and unused imports.
- [x] `src/pages/Services.jsx`: price-menu layout, shared Buttons; replace `window.confirm`/`alert` with inline confirm + toast.

### Phase 4 — App + auth pages
- [x] `src/pages/Appointments.jsx`: Field/Button booking form (controlled state, drop `document.getElementById`), list with date block + StatusBadge, AnimatePresence, Skeleton loader, restyled restricted state (no glow).
- [x] `src/pages/Login.jsx`, `Register.jsx`: editorial form, shared Field/PasswordInput/Button, fix error box, fix low-contrast `text-violet-800` link.
- [x] `src/pages/ServiceForm.jsx`: shared components, drop gradient bar, `alert` → toast.

### Phase 5 — Signature feature: visual slot picker (purely frontend)
- [x] Replace native `datetime-local` on Appointments with: horizontal **date strip** (next 14 days, day name + number chips, animated selection) + **time-slot grid** (e.g. 09:00–20:00, 30-min steps), selected service's duration shown, past slots disabled, slots overlapping user's own existing bookings greyed (data already loaded). Summary line "Haircut · Thu 12 Nov · 14:30 · €25" above Book button.
- [x] Still posts same `{ serviceId, startAt }` ISO to existing API — no backend change. Keyboard-navigable (arrow keys, `aria-pressed`).

### Phase 6 — Verify + polish
- [x] `npm run lint` (src clean; backend jest-globals errors pre-existing), `npm run build` pass.
- [x] Backend (against scratchpad copy of dev.db) + dev server; Playwright/Chrome MCP screenshots of every route at 375 / 768 / 1280 as guest, user, admin.
- [x] `grep -rE "blur-|gradient|shadow-violet|violet|fuchsia" src` returns nothing.
- [x] Contrast ≥ 4.5:1, visible focus, keyboard nav, reduced-motion disables animation.
- [x] Functional smoke: register → login → book via slot picker → admin confirm/cancel → service create/edit/delete.
- [x] impeccable `audit` + `polish`; `document` writes DESIGN.md.
- [x] **Cleanup**: delete every screenshot / snapshot / trace produced by Playwright or Chrome MCP (`.playwright-mcp/`, any `*.png`/`*.jpeg`/`*.yml` snapshots created this session in project dir); confirm with `git status` that only intended source files changed. Prefer saving artifacts to scratchpad from the start.
- [x] No commit unless user asks.

## Session log
- 2026-11-07 — Session 1: investigated repo + skills, agreed direction, wrote plan. Next: Phase 0.
- 2026-11-07 — Session 2: Phases 0–5 built; Phase 6 verified (guest/user/admin at 375/768/1280, register error, login error+redirect, slot booking + own-slot greying + arrow/Home/End keys, admin confirm, service create/delete inline confirm, 404). Fixes from verification: fieldset min-width overflow in slot picker, past-row opacity (contrast), input border/placeholder contrast, footer 768 grid, quietDanger button variant. Reduced motion handled in code (useReducedMotion + CSS) but not emulated in browser. Remaining: impeccable `audit` + `polish`, `document` → DESIGN.md.

- Session 3: audit 17/20, fixed footer focus ring (brass on ink), Services heading order (ServiceRow headingLevel), booking-bar copy, toast tokens; removed App.css, Card.jsx, unused tokens; reduced motion verified in browser; DESIGN.md + .impeccable/design.json written.
