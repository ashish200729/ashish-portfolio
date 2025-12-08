import { useState } from 'react';

export default function WorkSection() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleExpand = (company: string) => {
    setExpandedCompany(expandedCompany === company ? null : company);
  };

  const renderUpsurgeDetails = () => (
    <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
      <div className="transition-all duration-500 ease-out">
        <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
        <div className="flex flex-wrap gap-2">
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://nodejs.org/">
            <span className="text-green-500 font-bold">⬢</span>
            <p className="ml-1 text-sm font-bold">Node.js</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://expressjs.com/">
            <span className="font-bold">E</span>
            <p className="ml-1 text-sm font-bold">Express</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://www.mongodb.com/">
            <span className="text-green-600 font-bold">M</span>
            <p className="ml-1 text-sm font-bold">MongoDB</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://www.postman.com/">
            <span className="text-orange-500">◉</span>
            <p className="ml-1 text-sm font-bold">Postman</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://git-scm.com/">
            <span className="text-orange-600 font-bold">⎇</span>
            <p className="ml-1 text-sm font-bold">Git</p>
          </a>
        </div>
      </div>
      <div className="text-gray-400 flex flex-col mt-4">
        <p>• Developed and maintained RESTful APIs using Node.js and Express.js for the Bhindi.io platform</p>
        <p>• Implemented database schemas and optimized queries using MongoDB for efficient data management</p>
        <p>• Collaborated with frontend developers to integrate APIs and ensure seamless data flow</p>
        <p>• Participated in code reviews and contributed to improving backend architecture and performance</p>
      </div>
    </div>
  );

  const renderPrepeasyDetails = () => (
    <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
      <div className="transition-all duration-500 ease-out">
        <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
        <div className="flex flex-wrap gap-2">
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://react.dev/">
            <span className="text-cyan-400">⚛</span>
            <p className="ml-1 text-sm font-bold">React</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://tailwindcss.com/">
            <span className="text-cyan-400">~</span>
            <p className="ml-1 text-sm font-bold">Tailwind CSS</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://typescriptlang.org/">
            <span className="text-blue-500 font-bold text-xs">TS</span>
            <p className="ml-1 text-sm font-bold">TypeScript</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://nodejs.org/">
            <span className="text-green-500 font-bold">⬢</span>
            <p className="ml-1 text-sm font-bold">Node.js</p>
          </a>
          <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://firebase.google.com/">
            <span className="text-orange-400 font-bold">🔥</span>
            <p className="ml-1 text-sm font-bold">Firebase</p>
          </a>
        </div>
      </div>
      <div className="text-gray-400 flex flex-col mt-4">
        <p>• Built and deployed core features for the AI-powered interview preparation platform</p>
        <p>• Implemented user authentication and real-time data synchronization using Firebase</p>
        <p>• Developed responsive UI components with React and Tailwind CSS for optimal user experience</p>
        <p>• Integrated AI APIs for intelligent interview question generation and feedback systems</p>
      </div>
    </div>
  );

  return (
    <section id="work" className="px-6 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div>
          <p className="text-gray-400 text-sm mb-2">Featured</p>
          <h2 className="text-2xl font-bold">Experience</h2>
        </div>

        <div className="mt-4 flex flex-col gap-8">
          {/* First Company - with blur effect on name */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                  💼
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold blur-[5px]">good day :3</h3>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                      </svg>
                    </a>
                    <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                      <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                      Working
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Founding Frontend Engineer</p>
                </div>
              </div>
              <div className="text-gray-400 flex flex-col md:text-right">
                <p>August 2025 - Present</p>
                <p>United States (Remote)</p>
              </div>
            </div>

            <div className="overflow-hidden">
              <div>
                <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://nextjs.org/">
                    <span className="font-bold">N</span>
                    <p className="ml-1 text-sm font-bold">Next.js</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://tailwindcss.com/">
                    <span className="text-cyan-400">~</span>
                    <p className="ml-1 text-sm font-bold">Tailwind CSS</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://typescriptlang.org/">
                    <span className="text-blue-500 font-bold text-xs">TS</span>
                    <p className="ml-1 text-sm font-bold">TypeScript</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://react.dev/">
                    <span className="text-cyan-400">⚛</span>
                    <p className="ml-1 text-sm font-bold">React</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://figma.com/">
                    <span className="text-purple-400">◐</span>
                    <p className="ml-1 text-sm font-bold">Figma</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://vercel.com/">
                    <span className="font-bold">▲</span>
                    <p className="ml-1 text-sm font-bold">Vercel</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://aws.amazon.com/">
                    <span className="text-orange-400">aws</span>
                    <p className="ml-1 text-sm font-bold">AWS</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://www.postman.com/">
                    <span className="text-orange-500">◉</span>
                    <p className="ml-1 text-sm font-bold">Postman</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://bun.sh/">
                    <span className="text-pink-400">◐</span>
                    <p className="ml-1 text-sm font-bold">Bun</p>
                  </a>
                </div>
              </div>
              <div className="text-gray-400 flex flex-col mt-4">
                <p>• Architected and developed the complete frontend infrastructure for the platform, a comprehensive solution for creating and managing promotional campaigns.</p>
                <p>• Led a comprehensive codebase refactoring initiative that improved maintainability, scalability, and development velocity across the entire platform.</p>
                <p>• Integrated and optimized backend API connections, implementing efficient data fetching strategies and error handling mechanisms.</p>
                <p>• Enhanced user experience and interface design through implementation of consistent design systems, accessibility standards, and performance optimizations.</p>
              </div>
            </div>
          </div>

          {/* Upsurge Labs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
                  UL
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Upsurge Labs</h3>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://bhindi.io">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://x.com/upsurgelabs">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://www.linkedin.com/company/upsurge-labs-pte-ltd">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://github.com/upsurgeio">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                      </svg>
                    </a>
                    <button
                      className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                      aria-label="Expand details"
                      aria-expanded={expandedCompany === 'upsurge'}
                      onClick={() => toggleExpand('upsurge')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className={`size-4 transition-transform duration-300 ease-in-out ${expandedCompany === 'upsurge' ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">Backend Developer Intern</p>
                </div>
              </div>
              <div className="text-gray-400 flex flex-col md:text-right">
                <p>June 2025 - July 2025</p>
                <p>Bangalore, India (On-Site)</p>
              </div>
            </div>
            {expandedCompany === 'upsurge' && renderUpsurgeDetails()}
          </div>

          {/* Prepeasy */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                  PE
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Prepeasy</h3>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://prepeasy.ai">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://github.com/prepeasy">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                      </svg>
                    </a>
                    <button
                      className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                      aria-label="Expand details"
                      aria-expanded={expandedCompany === 'prepeasy'}
                      onClick={() => toggleExpand('prepeasy')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className={`size-4 transition-transform duration-300 ease-in-out ${expandedCompany === 'prepeasy' ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">Founding Engineer</p>
                </div>
              </div>
              <div className="text-gray-400 flex flex-col md:text-right">
                <p>April 2025 - June 2025</p>
                <p>Remote (India)</p>
              </div>
            </div>
            {expandedCompany === 'prepeasy' && renderPrepeasyDetails()}
          </div>

          {/* Expelee */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                  EX
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Expelee</h3>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://expelee.com">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://x.com/0xExpelee">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://www.linkedin.com/company/expelee">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-neutral-500 hover:text-white transition-colors" href="https://github.com/expeleeOfficial">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                      </svg>
                    </a>
                    <button
                      className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                      aria-label="Expand details"
                      aria-expanded={expandedCompany === 'expelee'}
                      onClick={() => toggleExpand('expelee')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className={`size-4 transition-transform duration-300 ease-in-out ${expandedCompany === 'expelee' ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">SDE-1 (Full Stack) Intern</p>
                </div>
              </div>
              <div className="text-gray-400 flex flex-col md:text-right">
                <p>Aug 2023 - April 2025</p>
                <p>Dubai, UAE (Remote)</p>
              </div>
            </div>
            {expandedCompany === 'expelee' && (
              <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
                <div className="transition-all duration-500 ease-out">
                  <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://react.dev/">
                      <span className="text-cyan-400">⚛</span>
                      <p className="ml-1 text-sm font-bold">React</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://nodejs.org/">
                      <span className="text-green-500 font-bold">⬢</span>
                      <p className="ml-1 text-sm font-bold">Node.js</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://www.mongodb.com/">
                      <span className="text-green-600 font-bold">M</span>
                      <p className="ml-1 text-sm font-bold">MongoDB</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://aws.amazon.com/">
                      <span className="text-orange-400">aws</span>
                      <p className="ml-1 text-sm font-bold">AWS</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md self-end text-black dark:text-white hover:bg-white/20 transition-colors" href="https://www.docker.com/">
                      <span className="text-blue-400 font-bold">🐳</span>
                      <p className="ml-1 text-sm font-bold">Docker</p>
                    </a>
                  </div>
                </div>
                <div className="text-gray-400 flex flex-col mt-4">
                  <p>• Developed full-stack features for the travel and expense management platform</p>
                  <p>• Built scalable RESTful APIs and implemented complex business logic in Node.js</p>
                  <p>• Created responsive and interactive UI components using React and modern CSS</p>
                  <p>• Deployed and maintained applications on AWS infrastructure with Docker containers</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a className="cursor-pointer" href="/work-experience">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-colors">
              Show all work experiences
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
