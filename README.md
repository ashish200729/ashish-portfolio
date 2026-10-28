
# Ashish Portfolio

Personal portfolio for Ashish Prajapati, built with React, TypeScript, Vite, Tailwind CSS, and a small Vercel serverless endpoint for Spotify activity.

## Features

- Responsive portfolio sections for hero, experience, projects, about, and contact.
- Light/dark theme with persisted preference.
- A full-year GitHub activity graph that fits without horizontal scrolling; small screens show two halves of the year.
- Spotify now-playing activity with a selected-song fallback and retry, powered by server-side environment variables.
- Three featured projects on the landing page, a full `/projects` index, and a detail page per project at `/projects/<slug>`, all driven by `src/data/projects.ts`.
- An optional product film on a project page (Ventmark's launch film), with its share image and `VideoObject` structured data.
- Recent research and writing below Experience, plus a full `/research` index and individual working-paper or article pages.
- Minimal experience rows, including one whose employer name and logo are blurred. The site's code contains only a placeholder; the real names deliberately appear only in the downloadable résumé.
- Cursor activity on avatar hover, keyboard focus, or tap; accessible navigation; and a draggable cursor cat that respects reduced motion.
- Self-hosted Geist and Caveat fonts, with their licenses in `public/fonts`.
- A live visitor note at the end of the home page (“Congratulations, you are the 486th visitor of this site”): a past baseline of 485 (`src/data/site.ts`) plus one for each new visitor recorded by `/api/visitors`. A visitor is counted once per day using a salted hash, so no IP address is stored.
- Vercel-ready API route for `/api/spotify/now-playing`, and `vercel.json` rewrites so deep links such as `/projects/agentui` load.

## SEO

`npm run build` generates static HTML for the home page, `/projects`, `/research`, every project, and every research article. Each has its own title, description, canonical URL, Open Graph and Twitter tags, JSON-LD, and a crawlable no-JavaScript fallback (`scripts/seo-plugin.ts`). The build also writes `sitemap.xml`, `robots.txt`, and `404.html` (served with a real 404 status).

The site URL comes from `SITE_URL`, then Vercel's production domain, then the canonical `https://www.ashishprajapati.me` fallback. An empty `SITE_URL` does not override the fallback. The Google Search Console HTML verification file is in `public/` and is served unchanged from the site root after deployment. The optional `GOOGLE_SITE_VERIFICATION` variable supports the alternative meta-tag method.

### Add research or writing

Add an entry to `RESEARCH_NOTES` in `src/data/research.ts` with a unique slug, title, summary, display date, `createdAt` in `YYYY-MM-DD` format, kind, abstract or overview, sections, and references. A project link, paper PDF, social image, audio samples, comparison figures, and downloadable records are optional. Put local assets in `public/assets/` and link citations to reference IDs. `createdAt` and optional `modifiedAt` describe the actual content dates; set `publishedAt` only when the publication date is known. Update `modifiedAt` when making a significant content change.

The research index, three most recent home-page entries, article routes, crawlable fallbacks, structured data, and sitemap entries are generated from the same data. Entries sort by `publishedAt` when supplied, otherwise by `createdAt`. The build checks duplicate slugs, citation IDs, figures, project links, and local assets so a new entry does not silently create broken pages. A project can link to a note by setting its `researchSlug` in `src/data/projects.ts`.

For the Pocket TTS working paper, regenerate its printable PDF after editing the note (Node with TypeScript stripping, `uv`, and Arial or DejaVu Sans are required):

```sh
node --experimental-strip-types --input-type=module -e "import { getResearchNote } from './src/data/research.ts'; process.stdout.write(JSON.stringify(getResearchNote('expressive-pocket-tts')));" | uv run --no-project --with 'reportlab==5.1.0' python scripts/render-research-paper.py --output public/research/expressive-pocket-tts/paper.pdf
```

Use `--site https://your-canonical-domain.example` when rendering if the canonical domain changes. A PDF is useful for sharing, but indexing or Google Scholar inclusion is not guaranteed. Supply a real `publishedAt` date after publication rather than inventing one.

Research pages without a custom image use the research index share card. Custom research social images must be 1200×630 PNGs; the build validates their dimensions. The Pocket TTS card uses the actual Happy sample's normalized waveform. Regenerate it after changing the paper title, summary, date, or sample:

```sh
node --experimental-strip-types --input-type=module -e "import { getResearchNote } from './src/data/research.ts'; process.stdout.write(JSON.stringify(getResearchNote('expressive-pocket-tts')));" | uv run --no-project --with 'pillow==13.0.0' python scripts/render-research-social.py --output public/assets/research/pocket-tts/social.png
```

For another entry, substitute its slug and output path. If it has no WAV sample, the generator creates a clean text-only card. To refresh the research index card after changing `RESEARCH_COLLECTION`:

```sh
node --experimental-strip-types --input-type=module -e "import { RESEARCH_COLLECTION } from './src/data/research.ts'; process.stdout.write(JSON.stringify(RESEARCH_COLLECTION));" | uv run --no-project --with 'pillow==13.0.0' python scripts/render-research-social.py --collection --output public/assets/research/social.png
```

### Add a project film

Set `video` on a project in `src/data/projects.ts` and put its files in `public/assets/projects/<slug>/`: an H.264/AAC MP4 with `+faststart`, a JPEG poster, and optionally a 1200×630 PNG `socialImage` for share cards. The build fails if a file is missing, the share image is the wrong size, or `uploadDate` and `seconds` are malformed. The film autoplays muted and loops without controls (`src/components/ProjectVideo.tsx`); clicking it pauses, and it waits on the poster when the visitor prefers reduced motion or has data saver on.

Ventmark's film is rendered by its own repository (`apps/video`, Remotion) at 1920×1080, 60 fps, about 24 MB. The site copy is re-encoded to 30 fps, about 6 MB, and the poster and share image are its final frame:

```sh
SRC=../suremrr/apps/video/out/ventmark-launch.mp4
OUT=public/assets/projects/ventmark
ffmpeg -i "$SRC" -c:v libx264 -preset slow -crf 24 -profile:v high -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart -map_metadata -1 "$OUT/launch.mp4"
ffmpeg -ss 33.8 -i "$OUT/launch.mp4" -frames:v 1 -vf scale=1280:720:flags=lanczos -q:v 3 "$OUT/launch-poster.jpg"
ffmpeg -ss 33.8 -i "$SRC" -frames:v 1 -vf "scale=1200:675:flags=lanczos,crop=1200:630" "$OUT/social.png"
```

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

Spotify setup details are in `SPOTIFY_SETUP.md`. Without these values, the portfolio shows the selected song, “Finding Her” by Kushagra, Bharath, and Saaheal, labeled “On repeat.” Real Spotify activity takes precedence when available. Vite's frontend-only server also uses this fallback.

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
