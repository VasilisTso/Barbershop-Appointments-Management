---
name: Barbershop VT
description: An editorial barbershop booking site set like a printed price list on cream paper.
colors:
  paper: "#F4EFE6"
  paper-deep: "#EAE3D6"
  ink: "#1A1714"
  muted: "#6B635A"
  hairline: "#D9D1C4"
  accent: "#7A2E24"
  brass: "#B08D57"
  sage: "#3F5A3A"
  sage-wash: "#E1E6D9"
  ochre: "#7A5714"
  ochre-wash: "#F0E4C6"
  brick: "#8E3B2F"
  brick-wash: "#F1DDD6"
  brick-on-ink: "#E07A6A"
typography:
  display:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "6rem"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "1.9rem"
    fontWeight: 400
    lineHeight: 1.25
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"ss01\", \"tnum\""
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
  caps:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  hair: "2px"
  xs: "3px"
  sm: "4px"
  md: "6px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section: "80px"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "36px"
  button-ghost-hover:
    backgroundColor: "{colors.paper-deep}"
  button-quiet-danger:
    backgroundColor: "transparent"
    textColor: "{colors.brick}"
    rounded: "{rounded.sm}"
  button-quiet-danger-hover:
    backgroundColor: "{colors.brick-wash}"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.brick}"
    rounded: "{rounded.sm}"
  button-danger-hover:
    backgroundColor: "{colors.brick}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "44px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.md}"
  panel-deep:
    backgroundColor: "{colors.paper-deep}"
    rounded: "{rounded.md}"
    padding: "28px"
  status-pending:
    backgroundColor: "{colors.ochre-wash}"
    textColor: "{colors.ochre}"
    rounded: "{rounded.xs}"
    height: "24px"
  status-confirmed:
    backgroundColor: "{colors.sage-wash}"
    textColor: "{colors.sage}"
    rounded: "{rounded.xs}"
    height: "24px"
  status-cancelled:
    backgroundColor: "{colors.brick-wash}"
    textColor: "{colors.brick}"
    rounded: "{rounded.xs}"
    height: "24px"
  status-completed:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.muted}"
    rounded: "{rounded.xs}"
    height: "24px"
  slot:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "44px"
  slot-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  day-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    width: "64px"
    height: "80px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
---

# Design System: Barbershop VT

## Overview

**Creative North Star: "The Chalked Price List"**

Barbershop VT reads like the printed card behind a good barber's chair: cream stock, near-black ink, an oxblood flourish, and prices set against dotted leaders. Every surface is flat paper divided by rules, never a floating panel. Large Instrument Serif headings carry the voice; Geist carries the work (forms, times, prices) with tabular numerals so columns of figures line up.

Density is relaxed on public pages (hero, price list, three-step explainer) and tighter on the booking and admin views, where the same rules, hairlines, and type roles organise slot grids and appointment rows. Motion is a quiet lift-and-fade on entry and a sliding underline or pill for selection, always with a long exponential ease-out and always switched off under reduced motion.

The world rejects the template it replaced: no navy-and-violet night theme, no gradient text, no glass, blur, or glow, no emoji as iconography. It is a light theme only.

**Key Characteristics:**
- Cream paper ground, ink type, a single oxblood accent; brass appears only on ink.
- Instrument Serif display headings, often a roman line followed by an italic oxblood accent phrase.
- Geist body with stylistic set 01 and tabular numerals globally.
- Structure by rules: 1px hairlines between rows, 1px or 2px ink rules above sections and forms.
- Flat surfaces; the only shadow belongs to the toast.
- Tight 2-6px corners, never pills except the status dot.

## Colors

A warm, low-chroma paper-and-ink palette with one deep red accent and three desaturated status inks, each paired with a pale wash.

### Primary
- **Oxblood** (accent): the one voice. Primary-button hover, selected time slot, italic accent phrases in headings, the "VT" of the wordmark, step numerals, the active mobile nav link, selection highlight, caret, and the global focus ring.

### Secondary
- **Brass** (brass): small details on the ink footer only (column headings, footer wordmark "VT", footer focus ring, success toast icon). It fails contrast on paper and never appears there as text.

### Tertiary (status)
- **Sage / Sage Wash** (sage, sage-wash): confirmed.
- **Ochre / Ochre Wash** (ochre, ochre-wash): pending.
- **Brick / Brick Wash** (brick, brick-wash): cancelled, field errors, form error summary, destructive buttons.
- **Brick on Ink** (brick-on-ink): the error colour wherever the ground is ink (error toast icon), because brick disappears there.

### Neutral
- **Paper** (paper): page ground, card fill, text on ink, `theme-color`.
- **Deep Paper** (paper-deep): recessed panels (opening-hours aside), ghost-button hover, skeletons, "your booking" slot fill, completed badge, scrollbar track.
- **Ink** (ink): body text, primary button fill, section rules, footer ground, toast ground, selected day chip and service choice.
- **Muted** (muted): secondary text, ledes, placeholders, input borders at rest, scrollbar thumb, dotted leaders at 50%.
- **Hairline** (hairline): row dividers, card and nav borders, unselected slot and day borders.

### Named Rules
**The One Voice Rule.** Oxblood is the only chromatic accent on paper. It marks selection, emphasis, and focus; it is never a background for large areas.

**The Brass Lives on Ink Rule.** Brass is a footer-and-toast colour. On the paper ground use oxblood or ink instead.

**The Wash Pair Rule.** Every status is an ink-on-wash pair (sage, ochre, brick, or muted on deep paper). Never a saturated fill with white text.

## Typography

**Display Font:** Instrument Serif (with Iowan Old Style, Georgia, serif), roman and italic, weight 400 only.
**Body Font:** Geist (with ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif), weights 400, 500, 600.

**Character:** A condensed, high-contrast editorial serif set big and tight against a calm geometric grotesk. The serif speaks; the sans keeps the books.

### Hierarchy
- **Display** (400, 3.4rem mobile to 6rem desktop, line-height 0.92, -0.03em): the home hero only; auth page titles use the same tight setting at 3.75-4.5rem.
- **Headline** (400, 3rem to 4.5rem, 0.95, -0.02em): page titles via the page header; restricted and 404 headings.
- **Section** (400, 2.25rem to 3.75rem, -0.02em): section headings on Home ("The price list", "How booking works") and in-app section titles at 2.25rem.
- **Title** (400, 1.5rem to 1.9rem, tight): service names in the price list and appointment rows; the selected-service summary.
- **Lede** (Geist 400, 18-20px, line-height 1.625, muted): the paragraph under a display or headline, capped around 36-48rem.
- **Body** (Geist 400, 15-16px): UI copy, nav links (15px), inputs and buttons (15px), prices (18px, 500).
- **Label** (Geist 500, 14px): field labels and fieldset legends; hints and errors at 14px 400.
- **Caps** (Geist 500, 12px, 0.08em, uppercase): weekday and month on date blocks and day chips, the Admin tag; footer column headings use 0.12em in brass.

Big numerals (date numbers in day chips and appointment rows, the 404) are set in the display serif.

### Named Rules
**The Italic Turn Rule.** Display headings may pair a roman phrase with an italic oxblood phrase ("A sharp cut, / *booked in a minute.*", "Welcome *back.*", "Take a *seat.*"). One italic turn per heading, always at the end.

**The Ledger Numerals Rule.** Geist runs with `ss01` and `tnum` on the body; anything that lines up (prices, durations, times, hours) also gets tabular numerals explicitly.

**The No Kicker Rule.** Headings stand alone. No small uppercase label sits above a heading to introduce it.

## Layout

A single centred column, max width 72rem, with 16 / 24 / 32px side gutters at mobile / sm / lg. Main content starts 40px below the 64px sticky nav and ends 96px above the footer. Home sections are separated by a 1px ink rule and 64-80px of vertical padding; heroes and auth screens use a 12-column grid (hero 8 + 4 aside; auth 6 + 5 offset to column 8). Lists are full-width rows rather than card grids: price-list rows at 20px vertical padding, appointment rows at 24px, each closed by a hairline. The booking flow ends in a sticky bottom summary bar topped by a 2px ink rule. Breakpoints are Tailwind defaults (sm 640, md 768, lg 1024); the slot grid steps 4 / 6 / 8 columns across them.

## Elevation & Depth

Flat. Depth comes from tone (paper vs deep paper vs ink) and from rules, not shadow. Cards and panels sit on the page with a hairline or a tonal fill. The single shadow in the system is the toast, which floats over content by necessity.

### Shadow Vocabulary
- **Toast lift** (`box-shadow: 0 8px 24px -8px rgba(26, 23, 20, 0.35)`): react-hot-toast notifications only.

### Named Rules
**The Rule Not Shadow Rule.** Separate with a 1px hairline (rows), a 1px ink rule (sections, page header), or a 2px ink rule (form column, sticky booking bar). Never with a drop shadow.

## Shapes

Small, square-shouldered corners: 2px for the focus outline and tiny swatches, 3px for badges, skeletons and the sliding day pill, 4px for every interactive control (buttons, inputs, slots, day chips, service choices, toast), 6px for cards and recessed panels. The only fully round shapes are the 6px status dot and nothing else. Borders are 1px; heavier 2px rules are horizontal only. Price-list rows use a dotted leader (1px dotted muted at 50%) between name and price, collapsing on narrow screens.

## Components

### Buttons
Ink-solid and confident; colour change, not lift, signals hover.
- **Shape:** gently squared (4px), medium weight, -0.005em tracking.
- **Sizes:** sm 36px tall / 14px padding / 14px text; md 44px / 20px / 15px; lg 52px / 28px / 16px.
- **Primary:** ink fill, paper text; hover turns oxblood.
- **Secondary:** 1px ink border, ink text; hover fills ink with paper text.
- **Ghost:** text only; hover fills deep paper. Used in the nav and for low-stakes actions.
- **Quiet Danger:** brick text; hover brick wash. For destructive actions that sit beside others.
- **Danger:** 1px brick border at 40%, brick text; hover fills brick with paper text. For explicit cancel/delete confirmations.
- **Motion and states:** 200ms colour transition on the expo ease, press scales to 0.98, disabled at 50% opacity without the press. Can render as a router link with identical styling; icons sit inline with an 8px gap.

### Status badges
- **Style:** 24px tall, 8px padding, 3px corners, 12px medium text, a 6px current-colour dot before the label.
- **State:** pending ochre on ochre wash, confirmed sage on sage wash, cancelled brick on brick wash, completed muted on deep paper.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** deep paper (recessed panel, as the opening-hours aside, 24-28px padding). There is no bordered card primitive; lists use hairline rows instead.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** none on the tonal panel.

### Inputs / Fields
- **Style:** transparent fill, 1px muted border, 4px corners, 44px tall, 14px horizontal padding, 15px ink text, muted placeholder. Label above at 14px medium with a 6px gap; hint or error below at 14px.
- **Hover / Focus:** border darkens to ink; keyboard focus adds the 2px oxblood outline at 2px offset. Caret and native accent colour are oxblood.
- **Error:** border turns brick, message in brick, linked via `aria-describedby`. Form-level errors use a brick-wash summary with an alert icon.
- **Password:** same field with a 36px square show/hide toggle inside the right edge, muted to ink on hover.

### Navigation
- **Style:** sticky 64px paper bar with a hairline bottom border. Wordmark left in Instrument Serif (~26px) with an italic oxblood "VT".
- **Links:** 15px Geist, muted at rest, ink on hover and when active; the active link carries a 1px ink underline that slides between items.
- **Actions:** a 20px hairline divider, then ghost "Log in" and primary "Create account" (sm size), or the user name plus a ghost log-out.
- **Mobile:** 44px menu toggle; the panel expands on height and opacity (300ms expo) with links set in 30px serif, hairline-separated, the current page in oxblood, and full-width buttons below.

### Footer
Ink ground, paper text at 60-75% opacity brightening to full on hover. Column headings in 12px uppercase brass at 0.12em. Brass wordmark accent, brass focus ring, monochrome tech-stack and contact icons at 50% paper. A 15%-paper rule separates the credits row.

### Price-list row (signature)
Service name in the display serif (24px to 30px) on the left, a dotted leader stretching to the right, then duration (14px muted) and price (18px medium) in tabular figures. Each row closes with a hairline; optional admin actions sit at the right. The heading level follows the page outline (h2 under a page h1, h3 under a section h2).

### Slot picker (signature)
A horizontally scrolling strip of 64 x 80px day chips (caps weekday, serif date numeral, month or "Closed"); the selected chip fills ink via a sliding pill. Below, a 4/6/8-column grid of 44px time slots: hairline border at rest, ink border on hover, oxblood fill when selected. Past and closing-time slots fade out; slots overlapping the user's own bookings sit on deep paper with struck-through text and a legend. Arrow, Home and End keys move focus within each group.

### Appointment row
A date block (caps weekday, 48px serif numeral, caps month) set off by a hairline column rule, then the service title in serif with its status badge, and a muted tabular meta line (time · duration · price). Admin actions use secondary Confirm and Danger Cancel at sm size.

### Motion
One easing, exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`: entry reveals fade and rise 16px over 700ms once in view; the hero staggers its lines by 120ms; routes cross-fade with an 8px rise over 350ms; selection indicators (nav underline, day pill) slide on a stiff spring. Every motion is disabled under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** set the page on paper (#F4EFE6) with ink text; this is a light-only system.
- **Do** use Instrument Serif at weight 400 for every display heading, service name and big numeral, with negative tracking (-0.02em to -0.03em) and tight leading (0.92-0.95) at headline sizes.
- **Do** let a display heading end in one italic oxblood phrase when it needs emphasis.
- **Do** separate content with hairlines and ink rules, and use deep paper for recessed panels.
- **Do** pair every status ink with its wash and keep the dot-plus-label badge.
- **Do** keep the 2px oxblood focus ring (3px offset) on paper and switch it to brass on ink.
- **Do** label demo shop facts (hours, address) as placeholders wherever they appear.
- **Do** use outline icons from one family (Feather) inline at text size, `aria-hidden`.

### Don't:
- **Don't** put a small uppercase eyebrow or kicker label above a heading.
- **Don't** use gradient text, gradient fills, glass, backdrop blur, or glow.
- **Don't** add drop shadows to cards, buttons or panels; the toast is the only lifted layer.
- **Don't** use emoji as icons or as the logo.
- **Don't** set brass text on paper, or brick on ink (use brick-on-ink there).
- **Don't** introduce a dark theme or a second accent hue.
- **Don't** round controls into pills; stay within 2-6px.
