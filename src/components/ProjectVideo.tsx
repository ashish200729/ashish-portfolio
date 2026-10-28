import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { ProjectVideo as Video } from '../data/projects';

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/** Autoplay only when the visitor hasn't asked for less motion or less data. */
function canAutoplay() {
  if (typeof window === 'undefined') return false;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !saveData && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** A silent, looping film without browser controls. The whole frame is a play/pause button. */
export default function ProjectVideo({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [autoplay] = useState(canAutoplay);
  const [playing, setPlaying] = useState(autoplay);

  useEffect(() => {
    const element = ref.current;
    if (!element || !autoplay) return;
    // Browsers only autoplay muted video, and React doesn't reliably reflect the muted attribute.
    element.muted = true;
    element.play().catch(() => setPlaying(false));
  }, [autoplay]);

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      element.muted = true;
      element.play().catch(() => setPlaying(false));
    } else {
      element.pause();
    }
  };

  return (
    <figure className="mt-4">
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? 'Pause' : 'Play'} the ${video.title}`}
        aria-describedby="project-video-description"
        className="relative block w-full overflow-hidden rounded-2xl bg-canvas-raised"
      >
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay={autoplay}
          preload={autoplay ? 'auto' : 'none'}
          poster={video.poster}
          width={video.width}
          height={video.height}
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="pointer-events-none block aspect-video h-auto w-full object-cover"
        >
          <source src={video.src} type="video/mp4" />
        </video>
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex size-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
              <Play size={18} fill="currentColor" className="translate-x-px" />
            </span>
          </span>
        )}
      </button>
      <figcaption className="mt-2 text-xs leading-5 text-ink-3">
        {video.title} · <span className="tabular-nums">{formatDuration(video.seconds)}</span>
      </figcaption>
      <p id="project-video-description" className="sr-only">{video.description}</p>
    </figure>
  );
}
