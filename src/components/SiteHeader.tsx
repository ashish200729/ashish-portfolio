import { BookOpenText, Folder, Moon, Sun, UserRound } from 'lucide-react';
import AvatarStatus from './AvatarStatus';
import Link from './Link';
import { useTheme } from '../context/theme';
import { usePathname } from '../router';

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const projectsActive = pathname === '/projects' || pathname.startsWith('/projects/');
  const researchActive = pathname === '/research' || pathname.startsWith('/research/');
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <header id="home" className="reading-column pt-10 sm:pt-[72px]">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarStatus />
          <div className="min-w-0">
            <p className="text-[15px] font-medium leading-6">Ashish<span className="sr-only min-[420px]:not-sr-only"> Prajapati</span></p>
            <p className="text-xs leading-[18px] text-ink-2">AI engineer<span className="max-[459px]:sr-only"> & full-stack developer</span></p>
          </div>
        </div>
        <nav aria-label="Main navigation" className="flex shrink-0 items-center gap-1">
          <div className="flex rounded-full bg-canvas-raised p-0.5">
            <Link to="/projects" className={`icon-button ${projectsActive ? 'text-ink' : ''}`} aria-label="Projects" title="Projects" aria-current={pathname === '/projects' ? 'page' : projectsActive ? 'location' : undefined}><Folder size={15} /></Link>
            <Link to="/research" className={`icon-button ${researchActive ? 'text-ink' : ''}`} aria-label="Research and writing" title="Research & writing" aria-current={pathname === '/research' ? 'page' : researchActive ? 'location' : undefined}><BookOpenText size={15} /></Link>
            <Link to="/#hire" className="icon-button" aria-label="About" title="About"><UserRound size={15} /></Link>
          </div>
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
