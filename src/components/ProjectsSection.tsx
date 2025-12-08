import { Globe, Github } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-gray-400 mb-2">Featured</p>
          <h2 className="text-4xl font-bold">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">UltraBalancer</h3>
              <div className="flex gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <Github className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              High-performance C/C++ load balancer designed for 1M+ RPS throughput with NUMA-aware architecture
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Technologies</p>
              <div className="flex gap-2">
                <span className="text-2xl">🌊</span>
                <span className="text-2xl">🌊</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">aigit</h3>
              <div className="flex gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <Github className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              A contemporary Git client merging traditional version control with AI capabilities to boost developer...
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Technologies</p>
              <div className="flex gap-2">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">SSH Honeypot</h3>
              <div className="flex gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <Github className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              An SSH honeypot developed for cybersecurity training and educational purposes, helping professionals...
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Technologies</p>
              <div className="flex gap-2">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">sandbox-runtime</h3>
              <div className="flex gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <Github className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Hardcore Linux sandbox for untrusted code execution using namespaces, cgroups v2, seccomp-BPF, and capabilit...
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Technologies</p>
              <div className="flex gap-2">
                <span className="text-2xl">🌊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            Show all projects
          </button>
        </div>
      </div>
    </section>
  );
}
