import { ArrowRight } from 'lucide-react';
import Link from './Link';
import type { ResearchNote } from '../data/research';

export default function ResearchRow({ note, compact = false }: { note: ResearchNote; compact?: boolean }) {
  if (compact) {
    return (
      <li>
        <Link to={`/research/${note.slug}`} title={note.title} className="group flex min-h-10 items-center gap-3 rounded-md py-2">
          {/* One line, always: a long title truncates here and reads in full on the index and the paper. */}
          <span className="min-w-0 flex-1 truncate text-sm font-medium leading-5 text-ink transition-colors group-hover:text-accent">{note.title}</span>
          <span className="sr-only shrink-0 whitespace-nowrap text-xs leading-5 text-ink-3 tabular-nums sm:not-sr-only">{note.date}</span>
          <ArrowRight size={14} aria-hidden="true" className="shrink-0 text-ink-3 transition-[color,transform] group-hover:text-accent motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={`/research/${note.slug}`}
        aria-labelledby={`research-${note.slug}-title`}
        aria-describedby={`research-${note.slug}-summary research-${note.slug}-meta`}
        className="group block rounded-sm py-5"
      >
        <h2 id={`research-${note.slug}-title`} className="text-balance text-[15px] font-medium leading-6 tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">{note.title}</h2>
        <p id={`research-${note.slug}-summary`} className="mt-1 line-clamp-2 max-w-[54ch] text-sm leading-6 text-ink-2">{note.summary}</p>
        <span className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs leading-5">
          <span id={`research-${note.slug}-meta`} className="text-ink-3">
            <span className="font-medium text-ink-2">{note.kind === 'working-paper' ? 'Working paper' : 'Article'}</span>
            {' · '}{note.date}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors group-hover:text-accent" aria-hidden="true">
            {note.kind === 'working-paper' ? 'Read paper' : 'Read article'}
            <ArrowRight size={14} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
          </span>
        </span>
      </Link>
    </li>
  );
}
