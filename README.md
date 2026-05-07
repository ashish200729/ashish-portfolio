
# Ashish Portfolio

Personal portfolio for Ashish Prajapati, built with React, TypeScript, Vite, Tailwind CSS, and a small Vercel serverless endpoint for Spotify activity.

## Features

- Responsive portfolio sections for hero, experience, projects, about, and contact.
- Light/dark theme with persisted preference.
- GitHub activity graph with real API data and honest empty fallback.
- Optional Spotify now-playing card powered by server-side environment variables.
- Vercel-ready API route for `/api/spotify/now-playing`.

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

Spotify setup details are in `SPOTIFY_SETUP.md`. Without these values, the portfolio still runs and shows an empty Spotify state.

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
=======
x_---_-__--__-_-_-
>>>>>>> 2d2c53c1ad42ad10d68ff1c7ab38be645c796a8d
