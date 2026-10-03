# Milaan — Market Integration for All Artisans

Milaan connects India's rural artisans with buyers through voice-first
technology. Artisans describe their crafts in their own language; Milaan
translates it, prices it fairly, and lists it.

This is a hackathon prototype. All prices and payments are examples.

## Features

- **Scroll-driven darwaza hero** — 3D carved doors open as you scroll,
  built with framer-motion scroll primitives and Lenis smooth scrolling.
- **Voice-to-listing (real AI)** — artisans speak in Hindi, Odia, Bengali,
  Santhali, or English. Web Speech API captures the text, an optional photo
  is resized to 1024px, and the Gemini API generates a complete listing.
  Falls back to a simulated example when offline.
- **Craft catalog** — eight craft categories, 36 states, signature-hub
  badges, full-text search, and maker's story modals.
- **Craft map** — interactive India map with state-level craft data.
- **Fair price calculator** — materials + hours × skill rate + shipping.
- **Problem section** — "Who keeps the money" split-bar comparison.
- **Multi-currency display** (INR / USD / EUR / GBP / JPY), persistent
  cart, keyboard-accessible modals, `prefers-reduced-motion` support.

> **Note:** Milaan is a concept demo. Prices, people, and payments shown
> are examples — no real transactions take place.

## Tech stack

- React 19 + TypeScript (strict) + Vite 7
- Tailwind CSS 4 with a natural-dye palette (khadi `#EDE4D3`, indigo
  `#1F2A5A`, madder `#B23A2E`, haldi `#E3A71F`, neem `#4C5A2E`,
  kiln `#6B3414`)
- framer-motion, lucide-react, Lenis
- Fonts: Rozha One (display) + Mukta (body)
- Vercel serverless function for the Gemini API proxy

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

### AI voice-to-listing setup

The voice-to-listing feature calls a Vercel serverless function that proxies
the Gemini API. To enable it:

1. Get a Gemini API key from https://aistudio.google.com/apikey
2. Create `.env.local` in the project root (already git-ignored):
   ```
   GEMINI_API_KEY=your-actual-key-here
   ```
3. On Vercel, add `GEMINI_API_KEY` in **Settings → Environment Variables**.

Without the key, the site still works — the voice flow shows an "Offline
example" fallback using the preset data.

**Rate limit:** 10 requests per IP per hour. Request body max 1 MB.

### Scripts

| Command             | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Production build to `dist/`          |
| `npm run preview`   | Preview the production build         |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`)    |
| `npm run lint`      | ESLint                               |
| `npm run format`    | Prettier                             |

## Deployment

The site deploys to Vercel. The `api/` directory contains a serverless
function for the Gemini proxy. Point a Vercel project at the repo, framework
preset "Vite", output directory `dist`, and add `GEMINI_API_KEY` to env vars.

## License

MIT — see [LICENSE](./LICENSE).
