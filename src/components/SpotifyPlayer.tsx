import { Play, Pause, RefreshCw } from 'lucide-react';
import { useSpotify } from '../hooks/useSpotify';

export default function SpotifyPlayer() {
  const {
    isPlaying,
    currentTrack,
    isLoading,
    error,
    play,
    pause,
    refreshTrack,
  } = useSpotify(5000); // Refresh every 5 seconds

  // Loading state
  if (isLoading && !currentTrack) {
    return (
      <div className="w-full max-w-2xl mt-2">
        <div className="flex flex-col gap-3 text-sm p-3 rounded-lg bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-32"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-48"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !currentTrack) {
    return (
      <div className="w-full max-w-2xl mt-2">
        <div className="flex flex-col gap-3 text-sm p-3 rounded-lg bg-red-900/20 border border-red-800/50 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-red-500 text-xl">⚠️</div>
              <div className="flex flex-col gap-1">
                <span className="text-red-400 text-sm font-medium">Error loading Spotify</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{error}</span>
              </div>
            </div>
            <button
              onClick={refreshTrack}
              className="p-2 hover:bg-gray-200 dark:bg-gray-800 rounded-md transition-colors"
              aria-label="Retry"
            >
              <RefreshCw className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No track state
  if (!currentTrack) {
    return (
      <div className="w-full max-w-2xl mt-2">
        <div className="flex flex-col gap-3 text-sm p-3 rounded-lg bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <img
                alt="Spotify"
                width="24"
                height="24"
                className="filter drop-shadow-sm"
                src="/assets/spotify.svg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Spotify</span>
              <span className="text-gray-900 dark:text-white text-sm">No recent activity</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main player with track
  const albumArt = currentTrack.album.images[0]?.url || '/assets/spotify.svg';
  const artistNames = currentTrack.artists.map((artist) => artist.name).join(', ');

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  return (
    <div className="w-full max-w-2xl mt-2">
      <div className="flex flex-col gap-3 text-sm p-3 rounded-lg bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 shadow-inner">
        <div className="flex items-center gap-3">
          <img
            alt="Album art"
            width="48"
            height="48"
            className="rounded-md shadow-inner ring-1 ring-black/10 dark:ring-white/10"
            src={albumArt}
          />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-green-500/10 shadow-inner transition-opacity">
                <img
                  alt="Spotify"
                  width="14"
                  height="14"
                  className="filter drop-shadow-sm"
                  src="/assets/spotify.svg"
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last played</span>
            </div>
            <div className="flex flex-col min-h-[2.5rem] max-h-[2.5rem]" style={{ opacity: 1, transform: 'none' }}>
              <a
                href={currentTrack.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium truncate text-gray-900 dark:text-white hover:underline hover:text-green-500 transition-colors cursor-pointer h-5 inline-block max-w-full"
                title="Open in Spotify"
              >
                {currentTrack.name}
              </a>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate h-4">by {artistNames}</span>
            </div>
          </div>
        </div>
        <audio className="hidden" loop=""></audio>
      </div>
    </div>
  );
}
