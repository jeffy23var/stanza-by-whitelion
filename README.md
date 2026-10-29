# Stanza by Whitelion

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run lint
```

## Pages

| Route        | What it is                                                     |
| ------------ | -------------------------------------------------------------- |
| `/`          | Homepage — tunnel hero, collections, featured, why, enquiry    |
| `/whitelion` | Whitelion AirQube — 18 pieces, 8 categories                    |
| `/pare`      | PARÉ surfaces — facades, panels, LVT and laminate              |
| `/luft`      | LUFT fans — ceiling, hugger, wall, pedestal, exhaust, purifier |
| `/lmt`       | LMT Automation — gates, barriers, shutters, doors, roofs       |

Brand pages share one layout: `components/brand/brand-page.tsx`. Their copy and
catalogues live in `lib/brand-content.ts`; homepage copy lives in `lib/site-content.ts`.

## The perspective tunnel

`components/ui/perspective-tunnel-hero.tsx` is the 21st.dev *perspective-tunnel-hero*
(by @daiwiikharihar), adapted for this site:

- **Native scroll, not wheel capture.** The original called `preventDefault()` on every
  wheel event, which locked the page and did nothing on phones. Here the hero is a tall
  section (`length` × 100svh) with a sticky stage, and `useScroll` drives the flight —
  so it works with trackpads, mouse wheels, touch, the keyboard and anchor links.
- **Props, not hard-coded images.** `images`, `eyebrow`, `title`, `description`,
  `actions`, `footer`, `topSlot`, `length`, `skipTo`.
- **Brand styling.** Brass and warm black instead of indigo, serif captions,
  `next/image`, product cut-outs on a matching backdrop.
- **Reduced motion.** No flight or parallax; a still spread of cards around the title.
- Uses `motion/react` (the current name of framer-motion — same API), which the project
  already depends on, so no extra package is needed.

The same idea carries through the site:

- `app/template.tsx` — every page arrives from slightly behind the screen.
- `components/site/reveal.tsx` — sections rise forward out of depth as they scroll in.
- Catalogue filters — cards recede and return through depth when the filter changes.

## Enquiries

The enquiry form posts to Netlify Forms (`public/__forms.html` mirrors its fields).
"Enquire" on any product card pre-fills the brand and product and scrolls to the form.
