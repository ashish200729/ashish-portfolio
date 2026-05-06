import { useState, useEffect, useCallback } from 'react';

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

export function useSpotify(autoRefreshInterval: number = 5000): UseSpotifyReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrack = useCallback(async () => {
    try {
      const response = await fetch('/api/spotify/now-playing');

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.track) {
        setError(null);
        setCurrentTrack(data.track);
        setIsPlaying(data.isPlaying);
      } else {
        setError(null);
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch track');
      setCurrentTrack(null);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = window.setTimeout(() => {
      void fetchTrack();
    }, 0);

    const interval = setInterval(() => {
      void fetchTrack();
    }, autoRefreshInterval);

    return () => {
      window.clearTimeout(initialFetch);
      clearInterval(interval);
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
