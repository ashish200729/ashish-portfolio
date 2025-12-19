import { Github, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const COMPLETED_PROJECTS: Project[] = [
  {
    title: "Library Management System",
    description: "A desktop application with a modern tabbed GUI built using Java Swing. Features include full CRUD operations, real-time search, and a polished user interface.",
    technologies: ["Java", "Swing"],
    githubUrl: "https://github.com/ashish200729",
  },
  {
    title: "Todo App",
    description: "A clean and intuitive todo application for managing daily tasks. Features include add, edit, delete, and mark as complete functionalities with local storage persistence.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ashish200729",
  },
  {
    title: "AI Website Builder",
    description: "Designed and built a clean, user-friendly interface for an AI-powered website builder. Focused on intuitive UX, responsive layouts, and real-time visual feedback.",
    technologies: ["Next.js 15", "TypeScript", "Claude AI", "PostgreSQL"],
    githubUrl: "https://github.com/ashish200729",
  },
  {
    title: "Discord Scrim Bot",
    description: "A feature-rich Discord bot for esports scrim and tournament management. Handles team registration, match scheduling, and automated bracket generation.",
    technologies: ["Discord.py", "Python", "PostgreSQL"],
    githubUrl: "https://github.com/ashish200729",
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen px-6 py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* Featured Project Header */}
        <div className="mb-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-3 uppercase tracking-[0.2em]">Currently Building</p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Project</h2>
        </div>

        {/* Featured Project */}
        <div className="mb-16 sm:mb-24">
          <div className="group relative border border-gray-100 dark:border-gray-800/60 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/20 dark:to-transparent rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-none">

            {/* Mobile: Stack everything vertically | Desktop: More complex layout */}
            <div className="flex flex-col gap-5 sm:gap-8">

              {/* Header Row: Icon, Title & Badge */}
              <div className="flex items-start gap-4">
                {/* Project Icon */}
                <div className="shrink-0 size-12 sm:size-14 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
                  <img src="/assets/cursor-ai.png" alt="Cursor AI" className="size-6 sm:size-8 object-contain" />
                </div>

                {/* Title & Badge Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                      Open Source AI Editor
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-medium rounded-full border border-emerald-500/20 w-fit shrink-0">
                      <span className="relative flex size-1.5 sm:size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full size-1.5 sm:size-2 bg-emerald-500"></span>
                      </span>
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    VS Code OSS • TypeScript • Electron
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
                Building a comprehensive, open-source alternative to Cursor.com. This project re-engineers VS Code into an AI-native IDE with deep LLM integration for context-aware code generation and autonomous agent capabilities.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {["VS Code OSS", "TypeScript", "Electron", "AI Agents"].map((tech) => (
                  <span key={tech} className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-tight">
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Button - Full width on mobile */}
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all w-full sm:w-auto sm:self-start"
              >
                <Github className="size-4" />
                Coming Soon
              </a>
            </div>
          </div>
        </div>

        {/* Completed Projects Header */}
        <div className="mb-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-3 uppercase tracking-[0.2em]">Archive</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Completed Projects</h2>
        </div>

        {/* Completed Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPLETED_PROJECTS.map((project, index) => (
            <div key={index} className="group relative border border-inset border-gray-100 dark:border-gray-800/40 bg-white dark:bg-transparent rounded-[1.5rem] p-8 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl hover:shadow-gray-100/50 dark:hover:shadow-none">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                  {project.title}
                </h4>
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110">
                      <Github className="size-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110">
                      <ArrowUpRight className="size-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 h-auto">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
