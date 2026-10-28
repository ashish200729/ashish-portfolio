import type { ResearchFigure as Figure, ResearchTableFigure } from '../data/research';
import ResearchBars from './ResearchBars';
import ResearchPipeline from './ResearchPipeline';
import ResearchTimeline from './ResearchTimeline';

function ResearchTable({ figure }: { figure: ResearchTableFigure }) {
  return (
    <figure className="mt-7 border-y border-edge-subtle py-5">
      <figcaption className="text-sm font-medium text-ink">{figure.title}</figcaption>
      <p className="mt-1 text-xs leading-5 text-ink-2">{figure.description}</p>
      <table className="mt-4 w-full border-collapse text-left text-xs leading-5">
        <thead className="border-b border-edge text-ink-2">
          <tr>{figure.columns.map(column => <th key={column} scope="col" className="py-2 pr-2 font-medium last:pr-0">{column}</th>)}</tr>
        </thead>
        <tbody>
          {figure.rows.map(row => (
            <tr key={row.join('|')} className="border-b border-edge-subtle">
              {row.map((cell, index) => index === 0
                ? <th key={index} scope="row" className="py-2.5 pr-2 font-medium text-ink">{cell}</th>
                : <td key={index} className="py-2.5 pr-2 text-ink-2 last:pr-0">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {figure.note && <p className="mt-3 text-xs leading-5 text-ink-2">{figure.note}</p>}
    </figure>
  );
}

export default function ResearchFigure({ figure }: { figure: Figure }) {
  if (figure.kind === 'bars') return <ResearchBars figure={figure} />;
  if (figure.kind === 'timeline') return <ResearchTimeline figure={figure} />;
  if (figure.kind === 'pipeline') return <ResearchPipeline figure={figure} />;
  return <ResearchTable figure={figure} />;
}
