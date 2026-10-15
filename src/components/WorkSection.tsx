import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import { FEATURED_PROJECTS, PROJECTS, type Project } from '../data/projects';
import { EXPERIENCE, type ExperienceItem } from '../data/experience';
import Link from './Link';
import ProjectMark from './ProjectMark';

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="flex min-w-0 flex-col">
      <Link to={`/projects/${project.slug}`} className="group block rounded-2xl" aria-label={`${project.name} — ${project.summary}`}>
        <div className="flex aspect-[1.7] items-center justify-center rounded-2xl bg-canvas-raised text-ink transition-colors duration-200 group-hover:bg-accent-bg">
          <ProjectMark project={project} size={72} className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium leading-6 tracking-[-0.015em] transition-colors group-hover:text-accent">{project.name}</h3>
          <ArrowRight size={14} aria-hidden="true" className="mt-1 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
        </div>
      </Link>
    </article>
  );
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  const details = [item.role, item.period, item.location].filter(Boolean).join(' · ');
  const period = item.period.replace(/ - /g, ' – ');
  const rowClass = 'group grid min-h-11 w-full grid-cols-[24px_minmax(0,1fr)] items-center gap-x-3 rounded-md py-2 text-left';

  const body = (
    <>
      {item.confidential ? (
        <span className="size-6 overflow-hidden rounded-md bg-white" aria-hidden="true">
          <img src={item.logo} alt="" width="24" height="24" className="size-full scale-110 blur-[3px]" loading="lazy" />
        </span>
      ) : (
        <img src={item.logo} alt="" width="24" height="24" className={`size-6 rounded-md bg-white object-contain ${item.logoClass ?? ''}`} loading="lazy" />
      )}
      <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
          {item.confidential ? (
            <h3 className="text-sm font-medium leading-6">
              <span aria-hidden="true" className="select-none blur-[5px]">{item.company}</span>
              <span className="sr-only">Company name withheld</span>
            </h3>
          ) : (
            <h3 className="text-sm font-medium leading-6 transition-colors group-hover:text-accent">{item.company}</h3>
          )}
          <p className="text-sm leading-6 text-ink-2">{item.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs leading-5 text-ink-3">
          <span className="whitespace-nowrap tabular-nums">{period}</span>
          {item.confidential
            ? <Lock size={12} aria-hidden="true" />
            : item.to
              ? <ArrowRight size={12} aria-hidden="true" className="transition-colors group-hover:text-accent" />
              : <ArrowUpRight size={12} aria-hidden="true" className="transition-colors group-hover:text-accent" />}
        </div>
      </div>
    </>
  );

  if (item.confidential) {
    return (
      <li>
        <div className={rowClass} title={`Company and product names withheld · ${details}`}>
          {body}
          <span className="sr-only">{details}. Company and product names are withheld.</span>
        </div>
      </li>
    );
  }

  if (item.to) {
    return (
      <li>
        <Link to={item.to} className={rowClass} aria-label={`${item.company} — ${details}. View project`} title={details}>
          {body}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a href={item.website} target="_blank" rel="noopener noreferrer" className={rowClass} aria-label={`${item.company} — ${details}. Visit company website, opens in a new tab`} title={details}>
        {body}
      </a>
    </li>
  );
}

export default function WorkSection() {
  return (
    <section id="work" aria-label="Work" className="pt-10 sm:pt-12">
      <div className="showcase-column">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-handwriting text-[38px] leading-none tracking-[-0.02em]">Highlights</h2>
          <Link to="/projects" className="text-link inline-flex min-h-10 items-center gap-1.5 text-xs">
            All {PROJECTS.length} projects<ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid items-stretch gap-x-6 gap-y-9 sm:grid-cols-3">
          {FEATURED_PROJECTS.map(project => <FeaturedProject key={project.slug} project={project} />)}
        </div>
      </div>
      <div className="reading-column pt-12 sm:pt-14">
        <h2 id="experience-title" className="mb-3 text-xs font-medium text-ink-2">Experience</h2>
        <ul className="space-y-1" aria-labelledby="experience-title">
          {EXPERIENCE.map(item => <ExperienceRow key={item.id} item={item} />)}
        </ul>
      </div>
    </section>
  );
}
