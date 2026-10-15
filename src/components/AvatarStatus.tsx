import { useEffect, useRef, useState } from 'react';
import Link from './Link';

export default function AvatarStatus() {
  const container = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || focused || pinned;

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setHovered(false); setFocused(false); setPinned(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setHovered(false); setFocused(false); setPinned(false); }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div
      ref={container} className="relative shrink-0"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={event => { if (event.target.matches(':focus-visible')) setFocused(true); }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          setHovered(false); setFocused(false); setPinned(false);
          event.stopPropagation();
        }
      }}
    >
      <Link to="/" aria-label="Ashish Prajapati — home" className="block rounded-xl" aria-describedby={open ? 'cursor-activity' : undefined}>
        <img src="/image.jpg" alt="Ashish's avatar" width="44" height="44" className="size-11 rounded-xl object-cover" />
      </Link>
      <button type="button" className="absolute -bottom-2 -right-2 flex size-6 items-center justify-center rounded-full" aria-label="Cursor activity" title="Cursor activity" aria-expanded={open} aria-controls="cursor-activity" onClick={() => { setPinned(value => !value); setFocused(false); }}>
        <span className="size-3.5 rounded-full border-2 border-canvas bg-ink-3" aria-hidden="true" />
      </button>
      <div id="cursor-activity" role="tooltip" hidden={!open} className="absolute left-0 top-full z-20 w-56 pt-3">
        <div className="rounded-xl border border-edge bg-canvas p-4 text-xs text-ink-2">
          <p className="mb-2 text-[10px] text-ink-3">Last recorded activity</p>
          <p className="flex items-center gap-2"><img src="/assets/cursor-ai.png" alt="" width="16" height="16" /> Offline in Cursor</p>
          <p className="mt-2">Work session <strong className="font-medium text-ink">7h 10m</strong></p>
        </div>
      </div>
    </div>
  );
}
