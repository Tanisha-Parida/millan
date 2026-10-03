# MILAAN — People • Crafts • Culture

A single-page showcase site for India's living artisan crafts. MILAAN imagines a direct
trade corridor between rural kaarigars and global patrons: a scroll-driven temple-gate
hero, a three-level "Artisan Vault" discovery engine (craft categories → Indian states →
artisan listings), a global trade globe, and a vernacular Voice Studio concept for
zero-literacy artisan onboarding.

## Features

- **Scroll-driven darwaza hero** — 3D doors open as you scroll, built with framer-motion
  scroll primitives and Lenis smooth scrolling.
- **Artisan Vault** — eight craft categories, 36 states and territories, signature-hub
  badges, full-text search, Living Label provenance modals with cost-plus fair-wage
  escrow breakdowns.
- **Global Trade Corridor** — golden celestial globe with telemetry HUD cards and an
  interactive India craft-constellation map.
- **Voice Studio concept** — dialect presets, simulated voice ingestion, and generated
  ONDC Beckn v2 JSON payloads with transparent fair-wage pricing.
- **Multi-currency display** (INR / USD / EUR / GBP / JPY), persistent cart via
  localStorage, keyboard-accessible modals with focus trapping, and
  `prefers-reduced-motion` support throughout.

> **Note:** MILAAN is a concept demo. All trade data, escrow figures, prices, ONDC/Beckn
> payloads, and "live" corridors shown on the site are simulated for illustration — no
> real transactions, contracts, or network calls take place.

## Tech Stack

- React 19 + TypeScript (strict) + Vite 7
- Tailwind CSS 4 with a heritage palette (obsidian `#060709`, gold `#D4AF37`,
  terracotta `#C85A32`, ivory `#FAF7F2`)
- framer-motion, lucide-react, Lenis + GSAP ticker
- Fonts: Cinzel, Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the Vite dev server         |
| `npm run build`     | Production build to `dist/`       |
| `npm run preview`   | Preview the production build      |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint`      | ESLint over the repository        |
| `npm run format`    | Prettier formatting               |

## Deployment

The site is a static Vite app and deploys to Vercel with zero configuration — point a
Vercel project at the repo, framework preset "Vite", output directory `dist`.

## License

MIT — see [LICENSE](./LICENSE).
