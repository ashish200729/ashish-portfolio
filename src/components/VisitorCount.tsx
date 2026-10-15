import { VISITOR_BASELINE } from '../data/site';
import type { VisitorState } from '../hooks/useVisitorCount';

const format = (value: number) => value.toLocaleString('en-IN');

function ordinal(value: number) {
  const lastTwo = value % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${format(value)}th`;
  return `${format(value)}${({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[value % 10] ?? 'th'}`;
}

export default function VisitorCount({ visitors }: { visitors: VisitorState }) {
  const live = visitors.count !== null;
  const total = VISITOR_BASELINE + (visitors.count ?? 0);
  const place = visitors.position === null ? null : VISITOR_BASELINE + visitors.position;

  let message = <>{format(total)} people have visited this site.</>;
  if (place !== null && visitors.isNew) {
    message = <>Congratulations, you are the <span className="font-medium text-ink">{ordinal(place)}</span> visitor of this site.</>;
  } else if (place !== null) {
    message = <>Welcome back. You were the <span className="font-medium text-ink">{ordinal(place)}</span> visitor of this site.</>;
  }

  return (
    <div className="mb-5 text-xs leading-5">
      <p className="text-ink-2" aria-live="polite">{message}</p>
      {live && place !== null && (
        <p className="mt-1 flex items-center gap-2 text-ink-3">
          <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true" />
          <span><span className="tabular-nums">{format(total)}</span> visitors so far</span>
        </p>
      )}
    </div>
  );
}
