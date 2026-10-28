import { useRef, type SyntheticEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from '../components/Link';
import ResearchComparison from '../components/ResearchComparison';
import type { ResearchNote, ResearchParagraph, ResearchReference } from '../data/research';

function Citations({ ids, references }: { ids?: string[]; references: ResearchReference[] }) {
  if (!ids?.length) return null;
  return (
    <span className="whitespace-nowrap">
      {' '}{ids.map(id => {
        const index = references.findIndex(reference => reference.id === id);
        if (index < 0) return null;
        return <a key={id} href={`#ref-${id}`} className="text-link ml-1" aria-label={`Reference ${index + 1}: ${references[index].label}`}>[{index + 1}]</a>;
      })}
    </span>
  );
}

function Paragraphs({ paragraphs, references }: { paragraphs: ResearchParagraph[]; references: ResearchReference[] }) {
  return (
    <div className="space-y-4 text-sm leading-[1.85] text-ink-2">
      {paragraphs.map(paragraph => <p key={paragraph.text}>{paragraph.text}<Citations ids={paragraph.citations} references={references} /></p>)}
    </div>
  );
}

export default function ResearchPage({ note }: { note: ResearchNote }) {
  const samples = useRef<HTMLUListElement>(null);
  const pauseOtherSamples = (event: SyntheticEvent<HTMLAudioElement>) => {
    const current = event.currentTarget;
    samples.current?.querySelectorAll('audio').forEach(audio => { if (audio !== current) audio.pause(); });
  };

  return (
    <article className="reading-column pt-10 sm:pt-12">
      <Link to="/research" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs no-underline">
        <ArrowLeft size={13} aria-hidden="true" />Research & writing
      </Link>

      <header className="mt-5">
        <h1 className="text-lg font-medium leading-7 tracking-[-0.02em]">{note.title}</h1>
        <p className="mt-3 text-sm leading-[1.85] text-ink-2">{note.summary}</p>
        <p className="citation_author mt-4 text-sm font-medium leading-6 text-ink">By Ashish Prajapati</p>
        <p className="mt-1 text-xs leading-5 text-ink-3">{note.date} · {note.kind === 'working-paper' ? 'Independent working paper' : 'Article'}</p>
        {note.pdfUrl && <a href={note.pdfUrl} download className="text-link mt-3 inline-flex min-h-10 items-center text-xs">Download the paper (PDF)</a>}
      </header>

      <nav className="mt-8 border-y border-edge-subtle py-4" aria-label="On this page">
        <p className="text-xs font-medium text-ink-2">On this page</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-6">
          <li><a href="#abstract" className="text-link">{note.kind === 'working-paper' ? 'Abstract' : 'Overview'}</a></li>
          {note.samples && <li><a href="#samples" className="text-link">Listen</a></li>}
          {note.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-link">{section.title}</a></li>)}
          {note.references.length > 0 && <li><a href="#references" className="text-link">References</a></li>}
        </ul>
      </nav>

      <section id="abstract" className="mt-9" aria-labelledby="abstract-title">
        <h2 id="abstract-title" className="mb-3 text-sm font-medium leading-6 text-ink">{note.kind === 'working-paper' ? 'Abstract' : 'Overview'}</h2>
        <Paragraphs paragraphs={note.abstract} references={note.references} />
      </section>

      {note.samples && (
        <section id="samples" className="mt-10 border-t border-edge-subtle pt-7" aria-labelledby="samples-title">
          <h2 id="samples-title" className="text-sm font-medium leading-6 text-ink">Listen to the same line</h2>
          <p className="mt-3 text-sm leading-[1.85] text-ink-2">{note.samples.description} Starting another sample pauses the previous one.</p>
          <blockquote className="mt-3 text-sm leading-[1.85] text-ink">“{note.samples.text}”</blockquote>
          <ul ref={samples} className="mt-5 space-y-4">
            {note.samples.items.map(sample => (
              <li key={sample.label}>
                <p className="mb-1.5 text-xs font-medium text-ink-2">{sample.label}</p>
                <audio controls preload="metadata" onPlay={pauseOtherSamples} aria-label={`${sample.label} speech example`} className="block h-10 w-full max-w-full [color-scheme:light] dark:[color-scheme:dark]">
                  <source src={sample.src} type="audio/wav" />
                  <a href={sample.src}>Download the {sample.label.toLowerCase()} audio sample</a>
                </audio>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-ink-2">{note.samples.note}</p>
        </section>
      )}

      {note.sections.map(section => (
        <section id={section.id} key={section.id} className="mt-10" aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`} className="mb-3 text-sm font-medium leading-6 text-ink">{section.title}</h2>
          <Paragraphs paragraphs={section.paragraphs} references={note.references} />
          {section.comparison && <ResearchComparison comparison={section.comparison} />}
        </section>
      ))}

      {note.references.length > 0 && (
        <section id="references" className="mt-10 border-t border-edge-subtle pt-7" aria-labelledby="references-title">
          <h2 id="references-title" className="text-sm font-medium leading-6 text-ink">References</h2>
          {note.samples && <p className="mt-3 text-sm leading-[1.85] text-ink-2">{note.samples.attribution}<Citations ids={note.samples.attributionCitations} references={note.references} /></p>}
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-2">
            {note.references.map(reference => (
              <li id={`ref-${reference.id}`} key={reference.id}>
                <a href={reference.url} target={reference.url.startsWith('https://') ? '_blank' : undefined} rel={reference.url.startsWith('https://') ? 'noopener noreferrer' : undefined} className="text-link inline-flex min-h-9 items-center gap-1.5">
                  {reference.label}{reference.url.startsWith('https://') && <><ArrowUpRight size={13} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></>}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {note.records && note.records.length > 0 && (
        <section id="records" className="mt-8" aria-labelledby="records-title">
          <h2 id="records-title" className="text-sm font-medium leading-6 text-ink">Experiment records</h2>
          <ul className="mt-3 space-y-1">
            {note.records.map(record => <li key={record.url}><a href={record.url} download className="text-link inline-flex min-h-9 items-center text-sm">{record.label}</a></li>)}
          </ul>
        </section>
      )}

      {note.projectSlug && (
        <p className="mt-10 border-t border-edge-subtle pt-6">
          <Link to={`/projects/${note.projectSlug}`} className="text-link inline-flex min-h-10 items-center gap-1.5 text-sm">Project overview<ArrowRight size={14} aria-hidden="true" /></Link>
        </p>
      )}
    </article>
  );
}
