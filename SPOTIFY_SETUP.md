# Spotify Integration Setup

This portfolio can show your currently playing or most recently played Spotify track without asking visitors to authenticate. The browser calls `/api/spotify/now-playing`, and the serverless function uses your private Spotify refresh token.

## 1. Create a Spotify App

1. Open the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create an app.
3. Add this local redirect URI:

```text
http://localhost:5173/callback
```

4. Save your client ID and client secret.

## 2. Get a Refresh Token

Run the Vite dev server:

```bash
npm run dev
```

Open the helper page:

```text
http://localhost:5173/scripts/get-refresh-token.html
```

Enter your Spotify client ID and client secret, authorize your Spotify account, then copy the refresh token that appears.

## 3. Configure Environment Variables

Create `.env` locally or add these variables in Vercel project settings:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

Never commit `.env`, client secrets, or refresh tokens.

To test the API locally, run the project through Vercel's local runtime:

```bash
vercel dev
```

Plain `npm run dev` is still useful for frontend work, but it does not execute the Vercel serverless function.

## 4. Deploy

In production, add your deployed callback URL to the Spotify app as well:

```text
https://your-domain.example/callback
```

Then deploy the project. If the Spotify variables are missing, the site still works and the Spotify card shows an empty state.
