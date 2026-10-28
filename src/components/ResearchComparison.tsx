import { useState } from 'react';
import type { ResearchComparison as Comparison } from '../data/research';

export default function ResearchComparison({ comparison }: { comparison: Comparison }) {
  const [selectedTone, setSelectedTone] = useState(comparison.rows[0].tone);
  const selected = comparison.rows.find(row => row.tone === selectedTone) ?? comparison.rows[0];
  const maximum = Math.ceil(Math.max(...comparison.rows.flatMap(row => [row.base, row.matched, row.swapped])) * 10) / 10 || 1;
  const difference = (selected.base - selected.matched) / selected.base * 100;
  const comparisonText = difference === 0 ? 'the matched and base errors are equal' : `matched error is ${Math.abs(difference).toFixed(1)}% ${difference > 0 ? 'lower' : 'higher'} than the base`;
  const values = [
    { label: 'Base', value: selected.base, color: 'bg-ink-3' },
    { label: 'Matched tone', value: selected.matched, color: 'bg-accent' },
    { label: 'Swapped tone', value: selected.swapped, color: 'bg-ink-3' },
  ];

  return (
    <figure className="mt-6 border-y border-edge-subtle py-5">
      <figcaption className="text-sm font-medium text-ink">{comparison.title}</figcaption>
      <p className="mt-1 text-xs leading-5 text-ink-2">{comparison.description}</p>
      <div role="group" aria-label="Choose an emotion to compare" className="mt-4 flex flex-wrap gap-2">
        {comparison.rows.map(row => (
          <button
            key={row.tone}
            type="button"
            aria-pressed={selected.tone === row.tone}
            onClick={() => setSelectedTone(row.tone)}
            className={`min-h-10 rounded-full border px-4 text-xs transition-colors ${selected.tone === row.tone ? 'border-accent bg-accent-bg text-ink' : 'border-edge text-ink-2 hover:text-ink'}`}
          >
            {row.tone}
          </button>
        ))}
      </div>
      <div className="mt-5" aria-live="polite" aria-atomic="true">
        <p className="text-xs leading-5 text-ink-2">{selected.tone}: {comparisonText} on this diagnostic.</p>
        <ul className="mt-4 space-y-3">
          {values.map(item => (
            <li key={item.label}>
              <div className="flex items-baseline justify-between gap-3 text-xs leading-5">
                <span className="text-ink-2">{item.label}</span>
                <span className="tabular-nums text-ink">{item.value.toFixed(3)}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-edge-subtle" aria-hidden="true">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value / maximum * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs leading-5 text-ink-3">Bar scale: 0 to {maximum.toFixed(1)}.</p>
      </div>
      <table className="mt-5 w-full border-collapse text-left text-xs leading-5 tabular-nums">
        <caption className="mb-2 text-left text-xs font-medium text-ink">All recorded values</caption>
        <thead className="border-b border-edge text-ink-2">
          <tr>
            <th scope="col" className="py-2 pr-2 font-medium">Tone</th>
            <th scope="col" className="py-2 pr-2 font-medium">Base</th>
            <th scope="col" className="py-2 pr-2 font-medium">Matched</th>
            <th scope="col" className="py-2 font-medium">Swapped</th>
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map(row => (
            <tr key={row.tone} className="border-b border-edge-subtle">
              <th scope="row" className="py-2.5 pr-2 font-medium text-ink">{row.tone}</th>
              <td className="py-2.5 pr-2 text-ink-2">{row.base.toFixed(6)}</td>
              <td className="py-2.5 pr-2 text-ink">{row.matched.toFixed(6)}</td>
              <td className="py-2.5 text-ink-2">{row.swapped.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs leading-5 text-ink-2">{comparison.note}</p>
    </figure>
  );
}
