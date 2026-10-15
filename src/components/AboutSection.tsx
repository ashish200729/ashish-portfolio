import { lazy, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';

const GitHubGraph = lazy(() => import('./GitHubGraph'));

export default function AboutSection() {
  return (
    <>
      <section id="hire" className="reading-column pt-12" aria-labelledby="about-title">
        <h2 id="about-title" className="section-title">About me</h2>
        <div className="flex items-start gap-4">
          <img src="/image.jpg" alt="Ashish Prajapati" width="64" height="64" className="size-16 shrink-0 rounded-xl object-cover" loading="lazy" />
          <div>
            <h3 className="text-sm font-medium">Ashish Prajapati</h3>
            <p className="mt-2 text-sm leading-[1.85] text-ink-2">I'm an AI engineer, full-stack developer, and AI expert. I love building products to solve real-world problems, and I specialize in building MVPs and AI-powered applications.</p>
          </div>
        </div>
        <div className="pt-10">
          <h2 className="section-title">Tools I reach for</h2>
          <p className="text-sm leading-[1.85] text-ink-2">React · Go · JavaScript · TypeScript · Next.js · Rust · NestJS · PostgreSQL · Supabase · Python</p>
        </div>
        <div className="pt-10">
          <Suspense fallback={<p className="py-8 text-sm text-ink-2" role="status">Loading GitHub activity…</p>}><GitHubGraph /></Suspense>
        </div>
      </section>
      <section className="reading-column pt-12 sm:pt-14" aria-labelledby="contact-title">
        <h2 id="contact-title" className="text-lg font-medium tracking-[-0.02em]">Hey, you scrolled this far.</h2>
        <p className="mt-3 text-sm leading-6 text-ink-2">Let's create something amazing together.</p>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <a href="https://wa.me/7623075589" target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-10 items-center gap-1.5 text-sm">Book a call<ArrowUpRight size={14} /></a>
          <a href="mailto:ashishp.292007@gmail.com" className="text-link inline-flex min-h-10 items-center text-sm">Say hello</a>
        </div>
      </section>
    </>
  );
}
