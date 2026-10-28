import { ArrowRight } from 'lucide-react';
import Link from './Link';
import type { ResearchNote } from '../data/research';

export default function ResearchRow({ note, compact = false }: { note: ResearchNote; compact?: boolean }) {
  if (compact) {
    return (
      <li>
        <Link to={`/research/${note.slug}`} className="group flex min-h-10 items-start gap-3 rounded-md py-2">
          <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-ink transition-colors group-hover:text-accent">{note.title}</span>
          <span className="sr-only shrink-0 text-xs leading-5 text-ink-3 sm:not-sr-only">{note.date}</span>
          <ArrowRight size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
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
        className="group block rounded-sm py-5 sm:py-6"
      >
        <h2 id={`research-${note.slug}-title`} className="text-base font-medium leading-6 tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">{note.title}</h2>
        <p id={`research-${note.slug}-summary`} className="mt-1.5 max-w-[52ch] text-sm leading-6 text-ink-2">{note.summary}</p>
        <span className="mt-3.5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs leading-5">
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
