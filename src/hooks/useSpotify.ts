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
  play: () => Promise<void>;
  pause: () => void;
  refreshTrack: () => Promise<void>;
}

export function useSpotify(autoRefreshInterval: number = 5000): UseSpotifyReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch track data from public API endpoint
  const fetchTrack = useCallback(async () => {
    try {
      setError(null);

      // Use either the API endpoint (production) or fall back to local/dev
      const apiUrl = '/api/spotify/now-playing';

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.track) {
        setCurrentTrack(data.track);
        setIsPlaying(data.isPlaying);
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Error fetching track:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch track');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchTrack();

    const interval = setInterval(() => {
      fetchTrack();
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [fetchTrack, autoRefreshInterval]);

  // Play preview handler
  const play = useCallback(async () => {
    try {
      setError(null);

      if (currentTrack?.preview_url) {
        // Play preview audio
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        if (audioRef.current.paused) {
          audioRef.current.src = currentTrack.preview_url;
          await audioRef.current.play();
          setIsPreviewPlaying(true);

          // Auto-pause when preview ends
          audioRef.current.onended = () => {
            setIsPreviewPlaying(false);
          };
        } else {
          audioRef.current.pause();
          setIsPreviewPlaying(false);
        }
      } else {
        // Open in Spotify if no preview available
        if (currentTrack?.external_urls?.spotify) {
          window.open(currentTrack.external_urls.spotify, '_blank');
        }
      }
    } catch (err) {
      console.error('Error playing track:', err);
      setError(err instanceof Error ? err.message : 'Failed to play track');
    }
  }, [currentTrack]);

  // Pause preview handler
  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPreviewPlaying(false);
    }
  }, []);

  // Manual refresh
  const refreshTrack = useCallback(async () => {
    setIsLoading(true);
    await fetchTrack();
  }, [fetchTrack]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying: isPreviewPlaying,
    currentTrack,
    isLoading,
    error,
    play,
    pause,
    refreshTrack,
  };
}
