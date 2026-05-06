import { useState } from 'react';

export default function WorkSection() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleExpand = (company: string) => {
    setExpandedCompany(expandedCompany === company ? null : company);
  };


  return (
    <section id="work" className="px-6 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Featured</p>
          <h2 className="text-2xl font-bold">Experience</h2>
        </div>

        <div className="mt-4 flex flex-col gap-8">
          {/* First Company - with blur effect on name */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Milkey MCP</h3>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="https://milkeyai.com/">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="https://x.com/">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                      </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="size-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="https://github.com/ashish200729">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                      </svg>
                    </a>
                    <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                      <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                      Working
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Founder & Engineer</p>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex flex-col md:text-right">
                <p>June 2025 - Present</p>
                <p>India (Remote)</p>
              </div>
            </div>

            <div className="overflow-hidden">
              <div>
                <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://nextjs.org/">
                    <span className="font-bold text-black dark:text-white">N</span>
                    <p className="ml-1 text-sm font-bold">Next.js</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://typescriptlang.org/">
                    <span className="text-blue-500 font-bold text-xs">TS</span>
                    <p className="ml-1 text-sm font-bold">TypeScript</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://modelcontextprotocol.io/">
                    <span className="text-purple-500 font-bold">M</span>
                    <p className="ml-1 text-sm font-bold">Model Context Protocol</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://go.dev/">
                    <span className="text-cyan-500 font-bold">Go</span>
                    <p className="ml-1 text-sm font-bold">Go</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://hono.dev/">
                    <span className="text-orange-500 font-bold">H</span>
                    <p className="ml-1 text-sm font-bold">Hono.js</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://react.dev/">
                    <span className="text-cyan-400">⚛</span>
                    <p className="ml-1 text-sm font-bold">React</p>
                  </a>
                  <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://tailwindcss.com/">
                    <span className="text-cyan-400">~</span>
                    <p className="ml-1 text-sm font-bold">Tailwind CSS</p>
                  </a>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex flex-col mt-4 gap-1">
                <p>• Built Milkey as premium hosted skills infrastructure for AI agents, teams, and AI-powered products.</p>
                <p>• Engineered a hosted MCP flow that lets Cursor, Claude Code, Codex, and other agents resolve reusable skills without local setup drift.</p>
                <p>• Developed the product-facing REST API using <strong>Hono.js</strong> and an official <strong>TypeScript</strong> SDK for embedding Milkey skills into existing AI stacks.</p>
                <p>• Built the <strong>Next.js</strong> dashboard for managing skills, access, delivery, and usage visibility across integrations.</p>
              </div>
            </div>
          </div>

          {/* InfoLabz - Machine Learning Intern */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
                  iL
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">InfoLabz</h3>
                    <button
                      className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                      aria-label="Expand details"
                      aria-expanded={expandedCompany === 'infolabz'}
                      onClick={() => toggleExpand('infolabz')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className={`size-4 transition-transform duration-300 ease-in-out ${expandedCompany === 'infolabz' ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Machine Learning Intern</p>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex flex-col md:text-right">
                <p>May 2025 - Jul 2025 · 3 mos</p>
                <p>Ahmedabad, Gujarat, India (Remote)</p>
              </div>
            </div>
            {expandedCompany === 'infolabz' && (
              <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
                <div className="transition-all duration-500 ease-out">
                  <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://www.python.org/">
                      <span className="text-yellow-400 font-bold">🐍</span>
                      <p className="ml-1 text-sm font-bold">Python</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://scikit-learn.org/">
                      <span className="text-orange-500 font-bold">ML</span>
                      <p className="ml-1 text-sm font-bold">Machine Learning</p>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sofcon India Pvt. Ltd. - Python Intern */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-md bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Sofcon India Pvt. Ltd.</h3>
                    <button
                      className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                      aria-label="Expand details"
                      aria-expanded={expandedCompany === 'sofcon'}
                      onClick={() => toggleExpand('sofcon')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className={`size-4 transition-transform duration-300 ease-in-out ${expandedCompany === 'sofcon' ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Python Intern</p>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex flex-col md:text-right">
                <p>Jun 2024 - Apr 2025 · 11 mos</p>
                <p>Ahmedabad, Gujarat, India (Remote)</p>
              </div>
            </div>
            {expandedCompany === 'sofcon' && (
              <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
                <div className="transition-all duration-500 ease-out">
                  <h4 className="text-md mt-4 mb-2 font-semibold">Technologies &amp; Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://www.python.org/">
                      <span className="text-yellow-400 font-bold">🐍</span>
                      <p className="ml-1 text-sm font-bold">Python</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://git-scm.com/">
                      <span className="text-orange-600 font-bold">⎇</span>
                      <p className="ml-1 text-sm font-bold">Git</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm bg-gray-100 dark:bg-white/15 border border-dashed border-gray-300 dark:border-white/30 py-1 px-2 rounded-md self-end text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" href="https://github.com/">
                      <span className="text-gray-900 dark:text-white font-bold">⌘</span>
                      <p className="ml-1 text-sm font-bold">GitHub</p>
                    </a>
                  </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 flex flex-col mt-4">
                  <p>• Gained hands-on experience in Python programming through real-world projects and mentor-led sessions</p>
                  <p>• Worked on basic to intermediate-level tasks including automation scripting, file handling, and API integration</p>
                  <p>• Built small applications to automate simple processes and explored essential software development practices</p>
                  <p>• Practiced debugging, problem-solving, and version control using Git and GitHub</p>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </section >
  );
}
