import { ArrowLeft } from 'lucide-react';
import Link from '../components/Link';
import ProjectMark from '../components/ProjectMark';
import { PROJECTS, type Project } from '../data/projects';

function ProjectRow({ project }: { project: Project }) {
  return (
    <li>
      <Link to={`/projects/${project.slug}`} className="group grid min-h-14 grid-cols-[24px_minmax(0,1fr)] items-start gap-x-3 rounded-md py-2">
        <span className="mt-0.5 flex size-6 items-center justify-center text-ink" aria-hidden="true">
          <ProjectMark project={project} size={24} className="rounded-md" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <span className="min-w-0">
            <span className="block text-sm font-medium leading-6 transition-colors group-hover:text-accent">{project.name}</span>
            <span className="block text-sm leading-6 text-ink-2">{project.summary}</span>
          </span>
          <span className="shrink-0 whitespace-nowrap text-xs leading-5 text-ink-3 tabular-nums">{project.status} · {project.year}</span>
        </span>
      </Link>
    </li>
  );
}

export default function ProjectsPage() {
  const featured = PROJECTS.filter(project => project.featured);
  const more = PROJECTS.filter(project => !project.featured);

  return (
    <div className="reading-column pt-10 sm:pt-12">
      <Link to="/" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs no-underline"><ArrowLeft size={13} aria-hidden="true" />Home</Link>
      <h1 className="mt-4 text-lg font-medium tracking-[-0.02em]">Projects</h1>
      <p className="mt-3 text-sm leading-[1.85] text-ink-2">
        Products, open-source tools, and experiments, mostly around AI agents and developer tooling.
      </p>

      <h2 id="featured-title" className="mb-2 mt-10 text-xs font-medium text-ink-2">Featured</h2>
      <ul aria-labelledby="featured-title" className="space-y-1">
        {featured.map(project => <ProjectRow key={project.slug} project={project} />)}
      </ul>

      <h2 id="more-title" className="mb-2 mt-10 text-xs font-medium text-ink-2">More projects</h2>
      <ul aria-labelledby="more-title" className="space-y-1">
        {more.map(project => <ProjectRow key={project.slug} project={project} />)}
      </ul>
    </div>
  );
}
