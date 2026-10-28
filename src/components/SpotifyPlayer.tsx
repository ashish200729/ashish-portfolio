import { RefreshCw } from 'lucide-react';
import { useSpotify } from '../hooks/useSpotify';

// Shown as "On repeat" whenever live Spotify activity is unavailable.
const FALLBACK_TRACK = {
  name: 'Finding Her',
  artists: [{ name: 'Kushagra' }, { name: 'Bharath' }, { name: 'Saaheal' }],
  album: { name: 'Finding Her', images: [{ url: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02292341cd3e621d7f9171331f' }] },
  external_urls: { spotify: 'https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF' },
};

export default function SpotifyPlayer() {
  const { isPlaying, currentTrack, isLoading, error, refreshTrack } = useSpotify(30000);
  const track = currentTrack ?? FALLBACK_TRACK;
  const artists = track.artists.map(artist => artist.name).join(', ');
  return (
    <div className="flex min-w-0 max-w-full items-center gap-2.5 text-xs" aria-busy={isLoading}>
      <img src={track.album.images[0]?.url || '/assets/spotify.svg'} alt={currentTrack ? `${currentTrack.album.name} album cover` : `${track.album.name} album cover`} width="28" height="28" referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/assets/spotify.svg'; }} className="size-7 shrink-0 rounded object-cover" />
      <div className="min-w-0" role="status">
        <p className="text-[10px] leading-4 text-ink-3">{currentTrack ? isPlaying ? 'Now playing' : 'Last played' : 'On repeat'}</p>
        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-link block max-w-[260px] truncate" title={`${track.name} — ${artists}`}>{track.name} <span className="text-ink-2">by {artists}</span></a>
      </div>
      {error && <button type="button" onClick={() => void refreshTrack()} disabled={isLoading} className="icon-button" aria-label="Retry Spotify activity" title="Retry Spotify activity"><RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} /></button>}
    </div>
  );
}
