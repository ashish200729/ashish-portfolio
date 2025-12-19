import { Globe, Github } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Featured Project Section */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">Featured</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Featured Project</h2>

          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src="/assets/cursor-ai.png"
                    alt="Cursor AI Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0"
                  />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">Open Source AI Editor (Cursor Alternative)</h3>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                  Building a comprehensive, open-source alternative to Cursor.com, architected directly on the Visual Studio Code (Code OSS) source code.
                  This project re-engineers the standard VS Code experience into an AI-native IDE, featuring deep LLM integration for context-aware code generation, intelligent refactoring, and autonomous agent capabilities.
                  It bridges the gap between a world-class editor and next-gen AI assistance.
                </p>
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">VS Code (Code OSS)</span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">TypeScript</span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Electron / Web</span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">AI Agents</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-2 lg:mt-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Projects Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">Archive</p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">Completed Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Library Management System */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Library Management System</h3>
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                  </a>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                A desktop application with a modern tabbed GUI built using Java Swing. Features include full CRUD operations for books, real-time search across all fields, input validation, and a polished UI with custom colors and hover effects.
              </p>
              <div className="mb-2 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Java</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Swing</span>
                </div>
              </div>
            </div>

            {/* Todo App */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Todo App</h3>
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                  </a>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                A clean and intuitive todo application for managing daily tasks. Features include add, edit, delete, and mark as complete functionalities with local storage persistence.
              </p>
              <div className="mb-2 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">HTML</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">CSS</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">JavaScript</span>
                </div>
              </div>
            </div>

            {/* AI Website Builder */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">AI Website Builder</h3>
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                  </a>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                Designed and built a clean, user-friendly interface for an AI-powered website builder. Focused on intuitive UX, responsive layouts, and real-time visual feedback to enhance the overall user experience.
              </p>
              <div className="mb-2 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Next.js 15</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">TypeScript</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Claude AI</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Discord Scrim Bot */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Discord Scrim Bot</h3>
                <div className="flex gap-2 flex-shrink-0 ml-2">
                  <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" />
                  </a>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                A feature-rich Discord bot for esports scrim and tournament management. Handles team registration, match scheduling, score tracking, leaderboards, and automated bracket generation.
              </p>
              <div className="mb-2 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Discord.py</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">Python</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs sm:text-sm text-gray-700 dark:text-gray-300">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
