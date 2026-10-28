import { ArrowLeft } from 'lucide-react';
import Link from '../components/Link';
import ResearchRow from '../components/ResearchRow';
import { listResearchNotes, RESEARCH_COLLECTION } from '../data/research';

export default function ResearchIndexPage() {
  const notes = listResearchNotes();

  return (
    <section className="reading-column pt-8 sm:pt-10" aria-labelledby="research-index-title">
      <Link to="/" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs no-underline"><ArrowLeft size={13} aria-hidden="true" />Home</Link>
      <h1 id="research-index-title" className="mt-3 text-xl font-medium leading-8 tracking-[-0.02em]">{RESEARCH_COLLECTION.title}</h1>
      <p className="mt-2 max-w-[52ch] text-sm leading-6 text-ink-2">{RESEARCH_COLLECTION.intro}</p>

      {notes.length > 0 ? (
        <ul className="mt-7 divide-y divide-edge-subtle border-t border-edge-subtle">
          {notes.map(note => <ResearchRow key={note.slug} note={note} />)}
        </ul>
      ) : (
        <p className="mt-7 text-sm leading-6 text-ink-2">No writing has been published here yet.</p>
      )}
    </section>
  );
}
