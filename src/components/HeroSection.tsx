import { Moon, Sun, Github, Youtube, Instagram, Mail, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/image.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('work')}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm font-medium"
            >
              Projects
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <div className="relative w-5 h-5">
                <Sun className="w-5 h-5 absolute inset-0 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="w-5 h-5 absolute inset-0 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen px-6 py-20 flex items-center">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-start space-y-6">
            <div className="relative group">
              <div className="relative inline-block">
                <img
                  src="/image.jpg"
                  alt="Profile"
                  className="size-24 rounded-full object-cover bg-blue-300 dark:bg-yellow-300"
                  loading="eager"
                />
                <div className="absolute bottom-0 right-0 group/status">
                  <div className="w-6 h-6 bg-[#0a0a0a] border-2 border-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover/status:scale-110 transition-transform duration-200 cursor-pointer">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-4 min-w-[280px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 bg-gray-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                          Offline in
                          <img
                            src="/assets/cursor-ai.png"
                            alt="Cursor"
                            className="w-4 h-4 inline-block"
                            loading="lazy"
                          />
                          Cursor
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Yesterday worked <span className="text-black dark:text-white font-semibold">7h 10m</span>
                      </p>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white dark:bg-[#1a1a1a] border-l border-b border-gray-200 dark:border-gray-800 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full">
              <h1 className="text-3xl md:text-3xl font-bold leading-tight text-black dark:text-white">
                Hi, I'm Ashish — <span className="text-gray-500">A Full Stack web developer.</span>
              </h1>

              <div className="text-base text-gray-500 dark:text-gray-400 space-y-2 leading-relaxed">
                <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  <span>I build interactive web apps using</span>
                  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/15 border border-gray-300 dark:border-white/30 rounded-md text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                    <span className="text-blue-500 font-bold text-xs">TS</span>
                    Typescript
                  </a>
                  <span>,</span>
                  <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/15 border border-gray-300 dark:border-white/30 rounded-md text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                    <span className="text-cyan-400">⚛</span>
                    React
                  </a>
                  <span>,</span>
                  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/15 border border-gray-300 dark:border-white/30 rounded-md text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                    <span className="font-bold">N</span>
                    Next.js
                  </a>
                  <span>,</span>
                  <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/15 border border-gray-300 dark:border-white/30 rounded-md text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                    <span className="text-yellow-500">🐍</span>
                    Python
                  </a>
                  <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/15 border border-gray-300 dark:border-white/30 rounded-md text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                    <span className="text-blue-400">🐘</span>
                    PostgreSQL
                  </a>
                  <span>. With a focus on</span>
                  <b className="text-gray-900 dark:text-white">UI</b>
                  <span>design. Enthusiastic about</span>
                  <b className="text-gray-900 dark:text-white">Machine Learning & AI</b>
                  <span>, driven by a keen eye for design.</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a href="/ashish_resume_new4.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-white dark:bg-[#0f0f0f] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 rounded-lg transition-colors flex items-center gap-2 text-gray-900 dark:text-white text-sm font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="w-4 h-4">
                  <path d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23h0a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM178.26,224h0L48,201,77.75,32,208,55ZM89.34,58.42a8,8,0,0,1,9.27-6.48l83,14.65a8,8,0,0,1-1.39,15.88,8.36,8.36,0,0,1-1.4-.12l-83-14.66A8,8,0,0,1,89.34,58.42ZM83.8,89.94a8,8,0,0,1,9.27-6.49l83,14.66A8,8,0,0,1,174.67,114a7.55,7.55,0,0,1-1.41-.13l-83-14.65A8,8,0,0,1,83.8,89.94Zm-5.55,31.51A8,8,0,0,1,87.52,115L129,122.29a8,8,0,0,1-1.38,15.88,8.27,8.27,0,0,1-1.4-.12l-41.5-7.33A8,8,0,0,1,78.25,121.45Z"></path>
                </svg>
                Resume / CV
              </a>
              <a href="mailto:ashishp.292007@gmail.com" className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="w-4 h-4">
                  <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
                </svg>
                Get in touch
              </a>
            </div>

            <div className="flex items-center flex-wrap gap-1 text-gray-400 dark:text-gray-400">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="w-5 h-5">
                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ashish-prajapati-95a77036a/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="w-5 h-5">
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </a>
              <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:ashishp.292007@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" aria-label="Mail">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="w-full max-w-2xl mt-2">
              <div className="flex flex-col gap-3 text-sm p-3 rounded-lg bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 shadow-sm dark:shadow-inner flex-1 shadow-gray-200 dark:shadow-none">
                <div className="flex items-center gap-3">
                  <img
                    alt="Album art"
                    width="48"
                    height="48"
                    className="rounded-md shadow-inner ring-1 ring-black/10 dark:ring-white/10"
                    src="https://i.scdn.co/image/ab67616d0000b27383141000ee8ce3b893a0b425"
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-green-500/10 shadow-inner transition-opacity">
                        <img
                          alt="Spotify"
                          width="14"
                          height="14"
                          className="filter drop-shadow-sm"
                          src="/assets/spotify.svg"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last played</span>
                    </div>
                    <div className="flex flex-col min-h-[2.5rem] max-h-[2.5rem]" style={{ opacity: 1, transform: 'none' }}>
                      <a
                        href="https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium truncate text-gray-900 dark:text-white hover:underline hover:text-green-600 dark:hover:text-green-500 transition-colors cursor-pointer h-5 inline-block max-w-full"
                        title="Open in Spotify"
                      >
                        Finding Her
                      </a>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate h-4">by Kushagra, Bharath, Saaheal</span>
                    </div>
                  </div>

                </div>
                <audio className="hidden" loop=""></audio>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
