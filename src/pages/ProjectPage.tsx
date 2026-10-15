import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from '../components/Link';
import ProjectMark from '../components/ProjectMark';
import type { Project } from '../data/projects';

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <article className="reading-column pt-10 sm:pt-12">
      <Link to="/projects" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs no-underline"><ArrowLeft size={13} aria-hidden="true" />All projects</Link>

      <header className="mt-4 flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-canvas-raised text-ink">
          <ProjectMark project={project} size={40} />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-medium leading-7 tracking-[-0.02em]">{project.name}</h1>
          <p className="mt-1 text-sm leading-6 text-ink-2">{project.summary}</p>
        </div>
      </header>

      <p className="mt-6 text-xs leading-5 text-ink-3">{[project.role, project.period, project.status].join(' · ')}</p>

      <p className="mt-4 text-sm leading-[1.85] text-ink-2">{project.overview}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-[1.85] text-ink-2 marker:text-ink-3">
          {project.highlights.map(item => <li key={item}>{item}</li>)}
        </ul>
      )}

      <p className="mt-6 text-xs leading-5 text-ink-3">{project.stack.join(' · ')}</p>

      {project.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          {project.links.map(link => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-10 items-center gap-1.5 text-sm">
                {link.label}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
