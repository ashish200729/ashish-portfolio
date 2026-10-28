import { ArrowRight } from 'lucide-react';
import Link from './Link';
import ResearchRow from './ResearchRow';
import { listResearchNotes, RESEARCH_COLLECTION } from '../data/research';

export default function ResearchSection() {
  const notes = listResearchNotes().slice(0, 3);
  if (notes.length === 0) return null;

  return (
    <section className="reading-column pt-8 sm:pt-10" aria-labelledby="research-home-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="research-home-title" className="text-xs font-medium text-ink-2">{RESEARCH_COLLECTION.title}</h2>
        <Link to="/research" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs">All writing<ArrowRight size={13} aria-hidden="true" /></Link>
      </div>
      <ul className="mt-1 space-y-0.5">
        {notes.map(note => <ResearchRow key={note.slug} note={note} compact />)}
      </ul>
    </section>
  );
}
