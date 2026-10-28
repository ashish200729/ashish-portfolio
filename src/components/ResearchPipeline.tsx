import type { ResearchPipelineFigure } from '../data/research';

/** A short connector whose dashes flow downward, the direction ranked results travel. */
function Connector() {
  return (
    <svg viewBox="0 0 2 20" className="mx-auto block h-5 w-0.5 overflow-visible text-accent" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" strokeWidth="1.5" className="signal-flow" />
    </svg>
  );
}

export default function ResearchPipeline({ figure }: { figure: ResearchPipelineFigure }) {
  const inputs = figure.inputs.length;
  // Each input's centre, in a 0–100 coordinate space that stretches with the grid above it.
  const centres = figure.inputs.map((_, index) => (index + 0.5) / inputs * 100);

  return (
    <figure className="mt-7 border-y border-edge-subtle py-5">
      <figcaption className="text-sm font-medium text-ink">{figure.title}</figcaption>
      <p className="mt-1 text-xs leading-5 text-ink-2">{figure.description}</p>

      <p className="mt-5 font-mono text-[11px] uppercase leading-5 tracking-[0.08em] text-ink-3">Ranked in one SQL statement</p>
      <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {figure.inputs.map(input => (
          <li key={input.label} className="rounded-lg border border-edge bg-canvas px-3 py-2.5">
            <p className="font-mono text-[11px] uppercase leading-4 tracking-[0.06em] text-accent">{input.label}</p>
            <p className="mt-1 text-xs leading-[1.45] text-ink-2">{input.detail}</p>
          </li>
        ))}
      </ul>

      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="hidden h-8 w-full text-accent sm:block" aria-hidden="true">
        {centres.map(x => (
          <path key={x} d={`M${x} 0 C ${x} 18, 50 14, 50 32`} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="signal-flow" />
        ))}
      </svg>
      <div className="sm:hidden"><Connector /></div>

      <ol className="mx-auto max-w-[26rem]">
        {figure.stages.map((stage, index) => (
          <li key={stage.label}>
            {index > 0 && <Connector />}
            <div className="signal-stage flex items-start gap-3 rounded-lg border border-edge bg-canvas px-3.5 py-3" style={{ animationDelay: `${index * 0.9}s` }}>
              <span className="mt-px font-mono text-[11px] leading-5 text-ink-3 tabular-nums" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase leading-5 tracking-[0.06em] text-ink">{stage.label}</span>
                <span className="block text-xs leading-5 text-ink-2">{stage.detail}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-xs leading-5 text-ink-2">{figure.note}</p>
    </figure>
  );
}
