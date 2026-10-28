import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from '../components/Link';
import MemoryField from '../components/MemoryField';
import ResearchComparison from '../components/ResearchComparison';
import ResearchFigure from '../components/ResearchFigure';
import type { ResearchNote, ResearchParagraph, ResearchReference } from '../data/research';

const label = 'font-mono text-[11px] uppercase leading-5 tracking-[0.08em]';

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

/** Tracks which section is being read, for the contents rail. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(' ');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = key.split(' ').map(id => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -70% 0px' });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

export default function ResearchPage({ note }: { note: ResearchNote }) {
  const samples = useRef<HTMLUListElement>(null);
  const signal = note.theme === 'signal';
  const abstractLabel = note.kind === 'working-paper' ? 'Abstract' : 'Overview';
  const contents = [
    { id: 'abstract', title: abstractLabel },
    ...(note.samples ? [{ id: 'samples', title: 'Listen' }] : []),
    ...note.sections.map(section => ({ id: section.id, title: section.title })),
    ...(note.references.length > 0 ? [{ id: 'references', title: 'References' }] : []),
  ];
  const active = useActiveSection(signal ? contents.map(item => item.id) : []);
  const pauseOtherSamples = (event: SyntheticEvent<HTMLAudioElement>) => {
    const current = event.currentTarget;
    samples.current?.querySelectorAll('audio').forEach(audio => { if (audio !== current) audio.pause(); });
  };

  const sectionHeading = (id: string, title: string, number?: number) => signal ? (
    <h2 id={`${id}-title`} className="mb-4">
      {number !== undefined && <span className={`${label} block text-ink-3`}>{String(number).padStart(2, '0')}</span>}
      <span className="mt-1 block text-lg font-normal leading-7 tracking-[-0.02em] text-ink">{title}</span>
    </h2>
  ) : (
    <h2 id={`${id}-title`} className="mb-3 text-sm font-medium leading-6 text-ink">{title}</h2>
  );

  return (
    <article className={`reading-column pt-10 sm:pt-12 ${signal ? 'paper-signal relative' : ''}`}>
      <Link to="/research" className={signal ? `${label} inline-flex min-h-10 items-center gap-1.5 text-ink-2 transition-colors hover:text-ink` : 'text-link inline-flex min-h-10 items-center gap-1.5 text-xs no-underline'}>
        <ArrowLeft size={13} aria-hidden="true" />{signal ? 'Research' : 'Research & writing'}
      </Link>

      {signal ? (
        <header className="mt-6">
          {note.eyebrow && <p className={`${label} text-ink-3`}>{note.eyebrow}</p>}
          <h1 className="mt-3 text-balance text-[26px] font-normal leading-[1.2] tracking-[-0.025em] text-ink sm:text-[32px]">{note.title}</h1>
          <p className="mt-4 text-[15px] leading-[1.75] text-ink-2">{note.summary}</p>
          <p className="citation_author mt-5 text-sm font-medium leading-6 text-ink">By Ashish Prajapati</p>
          <p className="mt-1 text-xs leading-5 text-ink-3">{note.date} · {note.kind === 'working-paper' ? 'Independent working paper' : 'Article'}</p>
          {note.pdfUrl && <a href={note.pdfUrl} download className="text-link mt-3 inline-flex min-h-10 items-center text-xs">Download the paper (PDF)</a>}
          {note.stats && note.stats.length > 0 && (
            <dl className="mt-7 grid border border-edge" style={{ gridTemplateColumns: `repeat(${note.stats.length}, minmax(0, 1fr))` }}>
              {note.stats.map((stat, index) => (
                <div key={stat.label} className={`flex flex-col-reverse justify-end gap-1 px-3 py-3.5 sm:px-4 sm:py-4 ${index ? 'border-l border-edge' : ''}`}>
                  <dt className="text-[11px] leading-4 text-ink-2 sm:text-xs">{stat.label}</dt>
                  <dd className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-accent tabular-nums sm:text-[26px] sm:leading-8">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <MemoryField caption="Each dot is a fact. When one stops being true it becomes a ring: closed, not deleted, and linked to the fact that replaced it." />
        </header>
      ) : (
        <header className="mt-5">
          <h1 className="text-lg font-medium leading-7 tracking-[-0.02em]">{note.title}</h1>
          <p className="mt-3 text-sm leading-[1.85] text-ink-2">{note.summary}</p>
          <p className="citation_author mt-4 text-sm font-medium leading-6 text-ink">By Ashish Prajapati</p>
          <p className="mt-1 text-xs leading-5 text-ink-3">{note.date} · {note.kind === 'working-paper' ? 'Independent working paper' : 'Article'}</p>
          {note.pdfUrl && <a href={note.pdfUrl} download className="text-link mt-3 inline-flex min-h-10 items-center text-xs">Download the paper (PDF)</a>}
        </header>
      )}

      {signal ? (
        <nav aria-label="On this page" className="mt-9 border-y border-edge-subtle py-4 xl:absolute xl:right-full xl:top-0 xl:mr-12 xl:mt-0 xl:h-full xl:w-48 xl:border-0 xl:pt-[7.5rem]">
          <div className="xl:sticky xl:top-10">
            <p className={`${label} text-ink-3`}>On this page</p>
            <ol className="mt-3 grid gap-x-5 gap-y-0.5 sm:grid-cols-2 xl:grid-cols-1">
              {contents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`group flex min-h-8 items-center gap-2.5 text-xs leading-5 transition-colors xl:min-h-9 ${active === item.id ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
                  >
                    <span className={`h-px shrink-0 transition-all duration-300 ${active === item.id ? 'w-5 bg-accent' : 'w-2.5 bg-edge group-hover:bg-ink-3'}`} aria-hidden="true" />
                    <span className="font-mono text-[10px] text-ink-3 tabular-nums" aria-hidden="true">{String(index).padStart(2, '0')}</span>
                    <span className="truncate">{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      ) : (
        <nav className="mt-8 border-y border-edge-subtle py-4" aria-label="On this page">
          <p className="text-xs font-medium text-ink-2">On this page</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-6">
            {contents.map(item => <li key={item.id}><a href={`#${item.id}`} className="text-link">{item.title}</a></li>)}
          </ul>
        </nav>
      )}

      <section id="abstract" className={signal ? 'mt-12' : 'mt-9'} aria-labelledby="abstract-title">
        {sectionHeading('abstract', abstractLabel)}
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

      {note.sections.map((section, index) => (
        <section id={section.id} key={section.id} className={signal ? 'mt-14' : 'mt-10'} aria-labelledby={`${section.id}-title`}>
          {sectionHeading(section.id, section.title, index + 1)}
          <Paragraphs paragraphs={section.paragraphs} references={note.references} />
          {section.comparison && <ResearchComparison comparison={section.comparison} />}
          {section.figure && <ResearchFigure figure={section.figure} />}
        </section>
      ))}

      {note.references.length > 0 && (
        <section id="references" className={signal ? 'mt-14 border-t border-edge-subtle pt-8' : 'mt-10 border-t border-edge-subtle pt-7'} aria-labelledby="references-title">
          {signal
            ? <h2 id="references-title" className={`${label} text-ink-3`}>References</h2>
            : <h2 id="references-title" className="text-sm font-medium leading-6 text-ink">References</h2>}
          {note.samples && <p className="mt-3 text-sm leading-[1.85] text-ink-2">{note.samples.attribution}<Citations ids={note.samples.attributionCitations} references={note.references} /></p>}
          <ol className={`mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-2 ${signal ? 'marker:font-mono marker:text-xs marker:text-ink-3' : ''}`}>
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
          {signal
            ? <h2 id="records-title" className={`${label} text-ink-3`}>Experiment records</h2>
            : <h2 id="records-title" className="text-sm font-medium leading-6 text-ink">Experiment records</h2>}
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
