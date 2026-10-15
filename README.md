
# Ashish Portfolio

Personal portfolio for Ashish Prajapati, built with React, TypeScript, Vite, Tailwind CSS, and a small Vercel serverless endpoint for Spotify activity.

## Features

- Responsive portfolio sections for hero, experience, projects, about, and contact.
- Light/dark theme with persisted preference.
- A full-year GitHub activity graph that fits without horizontal scrolling; small screens show two halves of the year.
- Spotify now-playing activity with a selected-song fallback and retry, powered by server-side environment variables.
- Three featured projects on the landing page, a full `/projects` index, and a detail page per project at `/projects/<slug>`, all driven by `src/data/projects.ts`.
- Minimal experience rows, including one whose employer name and logo are blurred. The shipped code contains only a placeholder; the real names are deliberately not in the repository.
- Cursor activity on avatar hover, keyboard focus, or tap; accessible navigation; and a draggable cursor cat that respects reduced motion.
- Self-hosted Geist and Caveat fonts, with their licenses in `public/fonts`.
- A live visitor note at the end of the home page (“Congratulations, you are the 486th visitor of this site”): a past baseline of 485 (`src/data/site.ts`) plus one for each new visitor recorded by `/api/visitors`. A visitor is counted once per day using a salted hash, so no IP address is stored.
- Vercel-ready API route for `/api/spotify/now-playing`, and `vercel.json` rewrites so deep links such as `/projects/agentui` load.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Vercel Functions

## Getting Started

```bash
npm install
npm run dev
```

The site runs locally at the Vite URL printed in your terminal, usually `http://localhost:5173`. Vite serves the frontend only; use `vercel dev` when you need to exercise the serverless Spotify API locally.

## Environment Variables

Copy `.env.example` to `.env` if you want Spotify activity locally or on Vercel:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

### Live visitor counter

The count needs a small key-value store. In the Vercel dashboard open **Storage**, add **Upstash Redis** from the Marketplace, and connect it to this project. That injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`, which `/api/visitors` reads (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` also work). Redeploy afterwards. The first recorded visit shows 486. Until the store is connected, the page shows the baseline, 485, without the live dot. Change `VISITOR_BASELINE` if the starting number should differ.

Spotify setup details are in `SPOTIFY_SETUP.md`. Without these values, the portfolio shows the selected song, “Kun Faya Kun” by A.R. Rahman, Javed Ali, and Mohit Chauhan (*Rockstar*), labeled “On repeat.” Real Spotify activity takes precedence when available. Vite's frontend-only server also uses this fallback.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## License

MIT
