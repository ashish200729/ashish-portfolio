import { lazy, Suspense } from 'react';
import HeroSection from './components/HeroSection';
import Link from './components/Link';
import SiteHeader from './components/SiteHeader';
import SocialLinks from './components/SocialLinks';
import VisitorCount from './components/VisitorCount';
import { getProject } from './data/projects';
import { getResearchNote } from './data/research';
import { HOME_META, NOT_FOUND_META, PROJECTS_META, RESEARCH_META, projectMeta, researchMeta, type PageMeta } from './data/seo';
import { useVisitorCount } from './hooks/useVisitorCount';
import { matchRoute, usePathname, useRouteEffects } from './router';

const WorkSection = lazy(() => import('./components/WorkSection'));
const ResearchSection = lazy(() => import('./components/ResearchSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ResearchIndexPage = lazy(() => import('./pages/ResearchIndexPage'));

const SectionLoader = () => (
  <div className="reading-column py-12 text-sm text-ink-2" role="status">Loading…</div>
);

function NotFound() {
  return (
    <div className="reading-column pt-10 sm:pt-12">
      <h1 className="text-lg font-medium tracking-[-0.02em]">Page not found</h1>
      <p className="mt-3 text-sm leading-[1.85] text-ink-2">That page doesn’t exist. Try the <Link to="/" className="text-link">home page</Link> or browse <Link to="/projects" className="text-link">all projects</Link>.</p>
    </div>
  );
}

function App() {
  const pathname = usePathname();
  const route = matchRoute(pathname);
  const visitors = useVisitorCount();
  const project = route.name === 'project' ? getProject(route.slug) : undefined;
  const research = route.name === 'research' ? getResearchNote(route.slug) : undefined;

  let meta: PageMeta = NOT_FOUND_META;
  if (route.name === 'home') meta = HOME_META;
  else if (route.name === 'projects') meta = PROJECTS_META;
  else if (route.name === 'research-index') meta = RESEARCH_META;
  else if (project) meta = projectMeta(project);
  else if (research) meta = researchMeta(research);
  useRouteEffects(pathname, meta, project, research);

  let page;
  if (route.name === 'home') {
    page = (
      <>
        <Suspense fallback={<SectionLoader />}><WorkSection /></Suspense>
        <Suspense fallback={<SectionLoader />}><ResearchSection /></Suspense>
        <Suspense fallback={<SectionLoader />}><AboutSection /></Suspense>
      </>
    );
  } else if (route.name === 'projects') {
    page = <Suspense fallback={<SectionLoader />}><ProjectsPage /></Suspense>;
  } else if (route.name === 'research-index') {
    page = <Suspense fallback={<SectionLoader />}><ResearchIndexPage /></Suspense>;
  } else if (project) {
    page = <Suspense fallback={<SectionLoader />}><ProjectPage key={project.slug} project={project} /></Suspense>;
  } else if (research) {
    page = <Suspense fallback={<SectionLoader />}><ResearchPage key={research.slug} note={research} /></Suspense>;
  } else {
    page = <NotFound />;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {route.name === 'home' ? <HeroSection /> : <SiteHeader />}
      <main id="main" tabIndex={-1}>{page}</main>
      <footer className="reading-column pb-10 pt-8 sm:pb-16">
        <div className="border-t border-edge-subtle pt-6">
          {route.name === 'home' && <VisitorCount visitors={visitors} />}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <p className="text-xs text-ink-3">© {new Date().getFullYear()} Ashish Prajapati</p>
            <SocialLinks />
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
