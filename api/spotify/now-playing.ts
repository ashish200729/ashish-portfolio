import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
}

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  return data.access_token;
}

async function getNowPlaying(accessToken: string) {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json();
}

async function getRecentlyPlayed(accessToken: string) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  const data = await response.json();
  return data.items?.[0] || null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = await getAccessToken();

    // Try to get currently playing
    const nowPlaying = await getNowPlaying(accessToken);

    if (nowPlaying && nowPlaying.item) {
      return res.status(200).json({
        isPlaying: nowPlaying.is_playing,
        track: {
          id: nowPlaying.item.id,
          name: nowPlaying.item.name,
          artists: nowPlaying.item.artists.map((artist: any) => ({ name: artist.name })),
          album: {
            name: nowPlaying.item.album.name,
            images: nowPlaying.item.album.images,
          },
          preview_url: nowPlaying.item.preview_url,
          external_urls: nowPlaying.item.external_urls,
          duration_ms: nowPlaying.item.duration_ms,
        },
      });
    }

    // If nothing is playing, get recently played
    const recentlyPlayed = await getRecentlyPlayed(accessToken);

    if (recentlyPlayed && recentlyPlayed.track) {
      return res.status(200).json({
        isPlaying: false,
        track: {
          id: recentlyPlayed.track.id,
          name: recentlyPlayed.track.name,
          artists: recentlyPlayed.track.artists.map((artist: any) => ({ name: artist.name })),
          album: {
            name: recentlyPlayed.track.album.name,
            images: recentlyPlayed.track.album.images,
          },
          preview_url: recentlyPlayed.track.preview_url,
          external_urls: recentlyPlayed.track.external_urls,
          duration_ms: recentlyPlayed.track.duration_ms,
        },
      });
    }

    return res.status(200).json({
      isPlaying: false,
      track: null,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return res.status(500).json({
      error: 'Failed to fetch Spotify data',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
