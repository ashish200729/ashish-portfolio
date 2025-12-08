# Spotify Integration Setup Guide (Public Display)

This setup displays YOUR currently playing/recently played Spotify tracks on your portfolio **without requiring visitors to authenticate**. Perfect for showing what you're listening to!

## 🎯 How It Works

- Your portfolio displays YOUR Spotify activity (not your visitors')
- No "Connect" button needed - it's automatic
- Updates every 5 seconds
- Shows currently playing or last played track
- Visitors can click to open songs in Spotify or play 30-second previews

## 📋 Setup Steps

### Step 1: Create Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in:
   - **App Name**: `My Portfolio`
   - **App Description**: `Portfolio website Spotify integration`
   - **Redirect URI**: `http://localhost:5177/callback`
5. Click **"Save"**
6. You'll see your **Client ID** and **Client Secret** (click "Show Client Secret")

### Step 2: Get Your Refresh Token

1. Get your **Client Secret** from the Spotify Dashboard (click "Show Client Secret")

2. Open the token generator tool:
   ```bash
   # Open in browser
   open ashish-portfolio/scripts/get-refresh-token.html
   # OR navigate to: http://localhost:5177/scripts/get-refresh-token.html
   ```

3. Enter your:
   - **Client ID** (already pre-filled)
   - **Client Secret** (from Spotify Dashboard)

4. Click **"Authorize with Spotify"**

5. Login to Spotify and approve the permissions

6. Copy the **Refresh Token** that appears

### Step 3: Update Environment Variables

1. Open `ashish-portfolio/.env`

2. Add your credentials:
   ```env
   # Frontend (already filled)
   VITE_SPOTIFY_CLIENT_ID=75849fa18f434e938476aaf082a3a96b
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:5177/callback

   # Backend (paste these)
   SPOTIFY_CLIENT_ID=75849fa18f434e938476aaf082a3a96b
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   ```

### Step 4: Test Locally

```bash
cd ashish-portfolio
npm run dev
```

Open http://localhost:5177 - you should see your last played track!

## 🚀 Deploy to Production (Vercel)

### One-Time Setup

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Add Environment Variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     SPOTIFY_CLIENT_ID=75849fa18f434e938476aaf082a3a96b
     SPOTIFY_CLIENT_SECRET=<your_secret>
     SPOTIFY_REFRESH_TOKEN=<your_token>
     ```

4. Update Redirect URI in Spotify Dashboard:
   - Go to your Spotify app settings
   - Add redirect URI: `https://yourdomain.vercel.app/callback`

5. Deploy!

### For Future Deployments

Just push to GitHub - Vercel will auto-deploy!

## 🎵 Features

✅ **Real-time tracking** - Updates every 5 seconds
✅ **No authentication required** - Visitors just see your music
✅ **Smart fallback** - Shows last played if nothing is currently playing
✅ **Playback controls** - 30-second previews or open in Spotify
✅ **Beautiful UI** - Matches your portfolio design

## 🔒 Security Notes

- ✅ **Client Secret** and **Refresh Token** are stored securely as environment variables
- ✅ Never exposed to frontend/browser
- ✅ API endpoint is serverless and runs on Vercel's secure infrastructure
- ✅ Tokens automatically refresh when expired

## 🐛 Troubleshooting

### "Error loading Spotify"

1. Check your `.env` file has all 3 backend variables filled
2. Make sure Client Secret and Refresh Token are correct
3. Restart the dev server after updating `.env`

### "No recent activity"

1. Make sure you've played something on Spotify recently
2. Check that the scopes in the token generator include:
   - `user-read-currently-playing`
   - `user-read-recently-played`

### Refresh Token Expired

Refresh tokens usually last forever, but if it expires:
1. Re-run `scripts/get-refresh-token.html`
2. Get a new refresh token
3. Update your `.env` and Vercel environment variables

## 📁 Architecture

```
Frontend (Browser)
    ↓
/api/spotify/now-playing (Vercel Serverless Function)
    ↓
Your Spotify Account (via Refresh Token)
    ↓
Returns currently playing/recently played track
    ↓
Displayed on portfolio (public)
```

## 🎉 That's it!

Your portfolio now displays your real-time Spotify activity! Play any song on Spotify (phone, desktop, web) and watch it appear on your portfolio automatically.
