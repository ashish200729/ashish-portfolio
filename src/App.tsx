import { lazy, Suspense, useState } from 'react';
import HeroSection from './components/HeroSection';

// Lazy load heavy sections for better performance
const WorkSection = lazy(() => import('./components/WorkSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen px-6 py-20 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <HeroSection scrollToSection={scrollToSection} />

      <main className="pt-20">
        <Suspense fallback={<SectionLoader />}>
          <WorkSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
