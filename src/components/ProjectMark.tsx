import type { ReactNode } from 'react';
import { AppWindow, AudioLines, Cloud, Compass, Gauge, GitBranch, ScanLine, Server, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import type { Project } from '../data/projects';

/** Hand-drawn glyphs on a 48-unit grid. They inherit the text color, so they follow the theme. */
const GLYPHS: Record<string, ReactNode> = {
  mandatepay: <path d="M12 36V12l12 12 12-12v24" />,
  agentui: (
    <g transform="scale(.046875)" strokeWidth="144">
      <path d="M512 152H372C250.5 152 152 250.5 152 372V652C152 773.5 250.5 872 372 872H588" />
      <path d="M872 588V372C872 250.5 773.5 152 652 152H512" />
      <rect x="698" y="698" width="174" height="174" rx="56" fill="currentColor" stroke="none" />
    </g>
  ),
  'computer-mcp': <path d="M14 8v28l7-6.5L26 40l5-2.5L26 27h9.5z" />,
};

const ICONS: Record<string, LucideIcon> = {
  runner: Server,
  cloud: Cloud,
  bench: Gauge,
  openrunable: AppWindow,
  voice: AudioLines,
  shield: ShieldCheck,
  capture: ScanLine,
  browser: Compass,
  syncspace: Users,
  git: GitBranch,
};

interface ProjectMarkProps {
  project: Pick<Project, 'mark' | 'image' | 'imageClass'>;
  /** Width and height of the box the mark sits in, in pixels. */
  size: number;
  className?: string;
}

export default function ProjectMark({ project, size, className = '' }: ProjectMarkProps) {
  if (project.image) {
    return <img src={project.image} alt="" width={size} height={size} className={`object-contain ${project.imageClass ?? ''} ${className}`} loading="lazy" />;
  }

  // Line glyphs sit slightly inside the box so they match the optical weight of the logos.
  const glyphSize = Math.round(size * 0.78);
  const glyph = project.mark ? GLYPHS[project.mark] : undefined;
  if (glyph) {
    return (
      <svg viewBox="0 0 48 48" width={glyphSize} height={glyphSize} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        {glyph}
      </svg>
    );
  }

  const Icon = (project.mark && ICONS[project.mark]) || Server;
  return <Icon size={glyphSize} strokeWidth={1.5} aria-hidden="true" className={className} />;
}
