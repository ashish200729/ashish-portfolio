import SiteHeader from './SiteHeader';
import SpotifyPlayer from './SpotifyPlayer';

const TOOLS = [
  ['TypeScript', 'https://www.typescriptlang.org/'],
  ['React', 'https://react.dev/'],
  ['Next.js', 'https://nextjs.org/'],
  ['Rust', 'https://www.rust-lang.org/'],
  ['Python', 'https://www.python.org/'],
  ['NestJS', 'https://nestjs.com/'],
  ['PostgreSQL', 'https://www.postgresql.org/'],
];

export default function HeroSection() {
  return (
    <>
      <SiteHeader />

      <section aria-labelledby="intro-title" className="reading-column pt-7 sm:pt-8">
        <h1 id="intro-title" className="sr-only">Ashish Prajapati — AI engineer, full-stack developer, and AI expert</h1>
        <div className="space-y-5 text-sm leading-[1.85] text-ink-2">
          <p>Hi, I'm Ashish, an <mark>AI engineer</mark> and <mark>full-stack developer</mark>. I build AI agents and products end to end, from idea to launch.</p>
          <p>
            I work across agent systems, APIs, and user interfaces using{' '}
            {TOOLS.map(([name, url], index) => (
              <span key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-link">{name}</a>
                {index < TOOLS.length - 2 ? ', ' : index === TOOLS.length - 2 ? ', and ' : '.'}
              </span>
            ))}
          </p>
          <p>Interested in working together? <a href="mailto:ashishp.292007@gmail.com" className="text-link">Email me</a> or <a href="/Ashish_Prajapati_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-link">view my résumé</a>.</p>
        </div>
        <div className="mt-6 border-t border-edge-subtle pt-3">
          <SpotifyPlayer />
        </div>
      </section>
    </>
  );
}
