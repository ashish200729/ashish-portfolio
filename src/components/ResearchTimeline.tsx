import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import type { ResearchTimelineFigure } from '../data/research';
import { useInView, useReducedMotion } from '../hooks/useMotion';

const STEP_MS = 4200;

type Fact = ResearchTimelineFigure['steps'][number]['facts'][number];

function describe(fact: Fact, axis: string[]) {
  const from = axis[fact.from];
  if (fact.state === 'replaced') return `Earlier belief, ${fact.value} from ${from}, closed but kept.`;
  return fact.to === undefined ? `${fact.value} from ${from}, still true.` : `${fact.value} from ${from} until ${axis[fact.to]}.`;
}

export default function ResearchTimeline({ figure }: { figure: ResearchTimelineFigure }) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(root, { threshold: 0.4 });
  const [index, setIndex] = useState(0);
  // Plays on its own until the visitor takes control; never for reduced motion.
  const [autoplay, setAutoplay] = useState(true);
  const playing = autoplay && !reducedMotion && inView;
  const step = figure.steps[index];
  const columns = figure.axis.length;
  const rowCount = Math.max(...figure.steps.map(item => item.facts.length));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % figure.steps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, figure.steps.length]);

  const choose = (next: number) => {
    setAutoplay(false);
    setIndex(next);
  };

  return (
    <figure ref={root} className="mt-7 border-y border-edge-subtle py-5">
      <figcaption className="text-sm font-medium text-ink">{figure.title}</figcaption>
      <p className="mt-1 text-xs leading-5 text-ink-2">{figure.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Choose a step" className="flex gap-1.5">
          {figure.steps.map((item, stepIndex) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={stepIndex === index}
              aria-label={`Step ${stepIndex + 1}: ${item.title}`}
              onClick={() => choose(stepIndex)}
              className={`flex size-10 items-center justify-center rounded-full border font-mono text-xs tabular-nums transition-colors ${stepIndex === index ? 'border-accent bg-accent text-white dark:text-canvas' : 'border-edge text-ink-2 hover:text-ink'}`}
            >
              {String(stepIndex + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => {
              if (!autoplay && index === figure.steps.length - 1) setIndex(0);
              setAutoplay(!autoplay);
            }}
            className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs text-ink-2 transition-colors hover:bg-canvas-raised hover:text-ink"
          >
            {autoplay
              ? <><Pause size={13} aria-hidden="true" />Pause</>
              : index === figure.steps.length - 1
                ? <><RotateCcw size={13} aria-hidden="true" />Replay</>
                : <><Play size={13} aria-hidden="true" />Play</>}
          </button>
        )}
      </div>

      <div className="mt-5" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.08em] text-accent">Step {index + 1} of {figure.steps.length}</p>
        <p className="mt-1 text-sm font-medium leading-6 text-ink">{step.title}</p>
        <p className="mt-1 min-h-[3rem] text-xs leading-5 text-ink-2">{step.caption}</p>
        <ul className="sr-only">
          {step.facts.map((fact, factIndex) => <li key={factIndex}>{describe(fact, figure.axis)}</li>)}
          {step.answers?.map(answer => <li key={answer.query}>{answer.query}: {answer.answer}.</li>)}
        </ul>
      </div>

      <div className="mt-4" aria-hidden="true">
        <div className="grid text-center font-mono text-[10px] uppercase leading-4 tracking-[0.06em] text-ink-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {figure.axis.map(label => <span key={label}>{label}</span>)}
        </div>
        <div className="relative mt-2 rounded-xl bg-canvas-raised px-0 py-2">
          <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {figure.axis.map((label, column) => <span key={label} className={column ? 'border-l border-edge-subtle' : ''} />)}
          </div>
          {Array.from({ length: rowCount }, (_, row) => {
            const fact = step.facts[row];
            const end = fact ? fact.to ?? columns : 0;
            const style = fact
              ? { left: `${fact.from / columns * 100}%`, width: `${(end - fact.from) / columns * 100}%`, opacity: 1 }
              : { left: '0%', width: '0%', opacity: 0 };
            const tone = !fact ? '' : fact.state === 'current'
              ? 'bg-accent text-white dark:text-canvas'
              : fact.state === 'past'
                ? 'bg-ink-3/20 text-ink'
                : 'border border-dashed border-ink-3/70 text-ink-3';
            return (
              <div key={row} className="relative h-9">
                <div
                  className={`absolute inset-y-1.5 flex items-center overflow-hidden rounded-md px-2.5 font-mono text-[11px] leading-none transition-all duration-700 ease-out ${tone} ${fact?.to === undefined && fact?.state === 'current' ? 'rounded-r-none' : ''}`}
                  style={style}
                >
                  {fact && <span className="truncate">{fact.state === 'replaced' ? `${fact.value} · earlier belief` : fact.value}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative mt-1 h-5">
          {(step.marks ?? []).map(mark => (
            <span key={`${mark.at}-${mark.label}`} className="absolute top-0 flex -translate-x-px items-start gap-1 font-mono text-[10px] uppercase leading-4 tracking-[0.04em] text-accent" style={{ left: `${mark.at / columns * 100}%` }}>
              <span className="h-3 w-px bg-accent" />
              <span>{mark.label}</span>
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-3 flex min-h-[2.5rem] flex-wrap gap-2" aria-hidden="true">
        {step.answers?.map((answer, answerIndex) => (
          <li
            key={answer.query}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-bg px-3 py-1.5 text-xs leading-5 text-ink motion-safe:animate-fade-in"
            style={{ animationDelay: `${answerIndex * 120}ms`, animationFillMode: 'both' }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-2">{answer.query}</span>
            <span aria-hidden="true" className="text-ink-3">→</span>
            <span className="font-medium">{answer.answer}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs leading-5 text-ink-2">{figure.note}</p>
    </figure>
  );
}
