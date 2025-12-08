// Spotify API Service with PKCE Authentication

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:5173/callback';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming'
].join(' ');

// PKCE Helper Functions
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

function base64encode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Spotify API Types
export interface SpotifyTrack {
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

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
  timestamp: number;
}

// Authentication Functions
export async function redirectToSpotifyAuth(): Promise<void> {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // Store code verifier for later use
  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  const params = {
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export async function handleCallback(code: string): Promise<void> {
  const codeVerifier = localStorage.getItem('spotify_code_verifier');

  if (!codeVerifier) {
    throw new Error('Code verifier not found');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();

  // Store tokens
  localStorage.setItem('spotify_access_token', data.access_token);
  localStorage.setItem('spotify_refresh_token', data.refresh_token);
  localStorage.setItem('spotify_token_expiry', String(Date.now() + data.expires_in * 1000));

  // Clean up
  localStorage.removeItem('spotify_code_verifier');
}

export async function refreshAccessToken(): Promise<void> {
  const refreshToken = localStorage.getItem('spotify_refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    // If refresh fails, clear tokens and require re-authentication
    clearTokens();
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();

  localStorage.setItem('spotify_access_token', data.access_token);
  localStorage.setItem('spotify_token_expiry', String(Date.now() + data.expires_in * 1000));

  if (data.refresh_token) {
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }
}

export function clearTokens(): void {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_token_expiry');
  localStorage.removeItem('spotify_code_verifier');
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem('spotify_token_expiry');
  if (!expiry) return true;
  return Date.now() >= parseInt(expiry);
}

export function hasValidToken(): boolean {
  const token = localStorage.getItem('spotify_access_token');
  return !!token && !isTokenExpired();
}

async function getValidAccessToken(): Promise<string> {
  if (!hasValidToken()) {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    if (refreshToken) {
      await refreshAccessToken();
    } else {
      throw new Error('No valid token available. Please authenticate.');
    }
  }

  return localStorage.getItem('spotify_access_token')!;
}

// Spotify API Calls
export async function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  try {
    const token = await getValidAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      // No content - nothing is playing
      return null;
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    throw error;
  }
}

export async function getRecentlyPlayed(): Promise<SpotifyTrack | null> {
  try {
    const token = await getValidAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items?.[0]?.track || null;
  } catch (error) {
    console.error('Error fetching recently played:', error);
    throw error;
  }
}

export async function playTrack(trackUri: string): Promise<void> {
  try {
    const token = await getValidAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    });

    if (!response.ok && response.status !== 204) {
      throw new Error(`Failed to play track: ${response.status}`);
    }
  } catch (error) {
    console.error('Error playing track:', error);
    throw error;
  }
}

export async function pausePlayback(): Promise<void> {
  try {
    const token = await getValidAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok && response.status !== 204) {
      throw new Error(`Failed to pause: ${response.status}`);
    }
  } catch (error) {
    console.error('Error pausing playback:', error);
    throw error;
  }
}
