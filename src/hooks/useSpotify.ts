import { useState, useEffect, useCallback, useRef } from 'react';

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

interface UseSpotifyReturn {
  isPlaying: boolean;
  currentTrack: SpotifyTrack | null;
  isLoading: boolean;
  error: string | null;
  refreshTrack: () => Promise<void>;
}

function isTrack(value: unknown): value is SpotifyTrack {
  if (!value || typeof value !== 'object') return false;
  const track = value as SpotifyTrack;
  return typeof track.name === 'string'
    && Array.isArray(track.artists) && track.artists.every(artist => artist && typeof artist.name === 'string')
    && typeof track.album?.name === 'string' && Array.isArray(track.album.images)
    && track.album.images.every(image => image && typeof image.url === 'string' && image.url.startsWith('https://'))
    && typeof track.external_urls?.spotify === 'string' && track.external_urls.spotify.startsWith('https://open.spotify.com/');
}

export function useSpotify(autoRefreshInterval: number = 5000): UseSpotifyReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeRequest = useRef<AbortController | null>(null);

  const fetchTrack = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch('/api/spotify/now-playing', { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (activeRequest.current !== controller) return;
      if (!data || typeof data !== 'object' || (data.track != null && !isTrack(data.track))) {
        throw new Error('Invalid Spotify response');
      }

      if (data.track) {
        setError(null);
        setCurrentTrack(data.track);
        setIsPlaying(data.isPlaying === true);
      } else {
        setError(null);
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      if (activeRequest.current !== controller) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch track');
      setCurrentTrack(null);
      setIsPlaying(false);
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = window.setTimeout(() => {
      void fetchTrack();
    }, 0);

    const interval = setInterval(() => {
      if (!document.hidden) void fetchTrack();
    }, autoRefreshInterval);

    return () => {
      window.clearTimeout(initialFetch);
      clearInterval(interval);
      activeRequest.current?.abort();
      activeRequest.current = null;
    };
  }, [fetchTrack, autoRefreshInterval]);

  const refreshTrack = useCallback(async () => {
    setIsLoading(true);
    await fetchTrack();
  }, [fetchTrack]);

  return {
    isPlaying,
    currentTrack,
    isLoading,
    error,
    refreshTrack,
  };
}
