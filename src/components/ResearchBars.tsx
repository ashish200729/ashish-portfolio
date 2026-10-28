import { useRef, useState } from 'react';
import type { ResearchBarsFigure } from '../data/research';
import { useInView } from '../hooks/useMotion';

const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

/** Bars grow in when the figure first appears and glide between measures. */
export default function ResearchBars({ figure }: { figure: ResearchBarsFigure }) {
  const root = useRef<HTMLElement>(null);
  const shown = useInView(root, { once: true, threshold: 0.3 });
  const [metricId, setMetricId] = useState(figure.metrics[0].id);
  const metric = figure.metrics.find(item => item.id === metricId) ?? figure.metrics[0];
  const values = figure.rows.map(row => row.values[metric.id]);
  const best = metric.better === 'higher' ? Math.max(...values) : Math.min(...values);
  const leaders = figure.rows.filter(row => row.values[metric.id] === best).map(row => row.label);

  return (
    <figure ref={root} className="mt-7 border-y border-edge-subtle py-5">
      <figcaption className="text-sm font-medium text-ink">{figure.title}</figcaption>
      <p className="mt-1 text-xs leading-5 text-ink-2">{figure.description}</p>

      <div role="group" aria-label="Choose a measure" className="mt-4 flex flex-wrap gap-2">
        {figure.metrics.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === metric.id}
            onClick={() => setMetricId(item.id)}
            className={`min-h-10 rounded-full border px-4 text-xs transition-colors ${item.id === metric.id ? 'border-accent bg-accent-bg text-ink' : 'border-edge text-ink-2 hover:text-ink'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5" aria-live="polite" aria-atomic="true">
        <p className="font-mono text-[11px] uppercase leading-5 tracking-[0.08em] text-ink-3">
          {metric.label} · {metric.better === 'higher' ? 'higher is better' : 'lower is better'}
        </p>
        <p className="sr-only">Best: {leaders.join(' and ')} at {percent(best)}.</p>
        <ul className="mt-3 space-y-3.5">
          {figure.rows.map((row, index) => {
            const value = row.values[metric.id];
            return (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-3 text-xs leading-5">
                  <span className={row.highlight ? 'font-medium text-ink' : 'text-ink-2'}>{row.label}</span>
                  <span className={`font-mono tabular-nums ${row.highlight ? 'text-accent' : 'text-ink'}`}>{percent(value)}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-edge-subtle" aria-hidden="true">
                  <div
                    className={`h-full origin-left rounded-full transition-transform duration-700 ease-out ${row.highlight ? 'bg-accent' : 'bg-ink-3/60'}`}
                    style={{ transform: `scaleX(${shown ? value : 0})`, transitionDelay: shown ? `${index * 70}ms` : '0ms' }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-left text-xs leading-5 tabular-nums">
          <caption className="mb-2 text-left text-xs font-medium text-ink">All values</caption>
          <thead className="border-b border-edge text-ink-2">
            <tr>
              <th scope="col" className="py-2 pr-2 align-bottom font-medium">System</th>
              {figure.metrics.map(item => <th key={item.id} scope="col" className="py-2 pr-2 text-right align-bottom font-medium last:pr-0">{item.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {figure.rows.map(row => (
              <tr key={row.label} className="border-b border-edge-subtle">
                <th scope="row" className={`py-2.5 pr-2 font-medium ${row.highlight ? 'text-ink' : 'text-ink-2'}`}>{row.label}</th>
                {figure.metrics.map(item => <td key={item.id} className={`py-2.5 pr-2 text-right font-mono last:pr-0 ${row.highlight ? 'text-ink' : 'text-ink-2'}`}>{percent(row.values[item.id])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-5 text-ink-2">{figure.note}</p>
    </figure>
  );
}
