import { Moon, FileText, Send, Twitter, Linkedin, Github, Mail, Globe } from 'lucide-react';
import { useState } from 'react';
import RabbitMascot from './RabbitMascot';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
              alt="Profile"
              className="w-10 h-10 rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('work')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('hire')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Hire Me
            </button>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="absolute top-20 right-20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-start text-left">
              <img
                src="/image.png"
                alt="Profile"
                className="w-32 h-32 rounded-full mb-8 object-cover"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Hi, I'm Ashish — <span className="text-gray-500 font-normal">DevOps & Cloud Engineer.</span>
              </h1>
              <div className="text-lg text-gray-400 mb-8 max-w-3xl space-y-1">
                <p className="leading-relaxed">
                  I build high-performance tools and low-level utilities using{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>⚙️</span> Rust
                  </span>
                  ,{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>🌊</span> C++
                  </span>
                  ,{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>🌊</span> C
                  </span>
                </p>
                <p className="leading-relaxed">
                  ,{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>🐹</span> Go
                  </span>
                  ,{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>🐍</span> Python
                  </span>
                  ,{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>🐳</span> Docker
                  </span>
                  , and{' '}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-white">
                    <span>☸️</span> Kubernetes
                  </span>
                  . Specialized in
                </p>
                <p className="leading-relaxed">
                  <span className="text-white font-semibold">systems-level design</span>
                  ,{' '}
                  <span className="text-white font-semibold">networking</span>
                  , and{' '}
                  <span className="text-white font-semibold">performance optimization</span>
                </p>
                <p className="leading-relaxed">
                  . Passionate about creating robust{' '}
                  <span className="text-white font-semibold">infrastructure</span>
                  {' '}and contributing to{' '}
                  <span className="text-white font-semibold">open-source</span>
                  .
                </p>
              </div>
              <div className="flex gap-4 mb-8">
                <button className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-700 rounded-lg transition-colors flex items-center gap-2 text-white">
                  <FileText className="w-4 h-4" />
                  Resume / CV
                </button>
                <button className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 font-medium">
                  <Send className="w-4 h-4" />
                  Get in touch
                </button>
              </div>
              <div className="flex gap-4 text-gray-500">
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="min-h-screen px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-gray-400 mb-2">Featured</p>
              <h2 className="text-4xl font-bold">Experience</h2>
            </div>

            <div className="space-y-12">
              <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">UltraBalancer</h3>
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Working
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">September 2025 - Present</p>
                    <p className="text-gray-500">Remote</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Lead Engineer</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Technologies</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🌊 C</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🌊 C++</span>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• High-performance C/C++ load balancer handling 1M+ RPS with sub-millisecond latency</li>
                  <li>• Built with lock-free data structures, zero-copy networking, and cloud-native architecture</li>
                  <li>• Supporting multiple load balancing algorithms, SSL/TLS termination, and automatic failover</li>
                </ul>
              </div>

              <div className="border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">MegaLLM</h3>
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Working
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">September 2025 - Present</p>
                    <p className="text-gray-500">Remote</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">DevOps Engineer & Cloud Infra Engineer</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Technologies</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🐹 Go</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🐘 PostgreSQL</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🐳 Docker</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">☸️ Kubernetes</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🔧 Jenkins</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">📊 Grafana</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">🔥 Prometheus</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">☁️ AWS</span>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Built cloud infrastructure from scratch and provisioned servers</li>
                  <li>• Set up Grafana and Prometheus observability stack</li>
                  <li>• Configured custom load balancer for high availability</li>
                  <li>• Automated CI/CD pipelines with Jenkins for AI workloads</li>
                </ul>
              </div>

              <div className="text-center">
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  Show all work experiences
                </button>
              </div>
            </div>
          </div>
        </section>

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

        <section id="hire" className="min-h-screen px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-gray-400 mb-2">About</p>
              <h2 className="text-4xl font-bold">Me</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2"
                alt="About"
                className="w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="text-3xl font-bold mb-4">Shubham (Kira)</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  yo wassup, i'm a 19-year-old dev from India who likes building fast shit and breaking things (in a good way lol). right now i'm a DevOps & Cloud Infra Engineer at MegaLLM where i'm setting up servers, Grafana/Prometheus monitoring, load balancers, and Jenkins pipelines for AI workloads. i mess around with systems programming, high-frequency trading systems, and basically anything that needs to go brrrr. also pretty into open-source and building random tools when i'm bored. hmu if you wanna collab on something cool.
                </p>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Skills</p>
                  <div className="flex gap-3 flex-wrap text-3xl">
                    <span>⚙️</span>
                    <span>🌊</span>
                    <span>🌊</span>
                    <span>🐹</span>
                    <span>🐍</span>
                    <span>🔧</span>
                    <span>📘</span>
                    <span>🟧</span>
                    <span>N</span>
                    <span>🛡️</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-800 rounded-xl p-12">
              <h3 className="text-3xl font-bold mb-4">GitHub Activity</h3>
              <p className="text-gray-400 mb-2">Bas3line's coding journey over the past year</p>
              <p className="text-gray-300 mb-8">Total: 802 contributions</p>

              <div className="mb-8">
                <div className="flex gap-1 mb-2 text-xs text-gray-500">
                  <span className="w-[8.33%] text-center">Dec</span>
                  <span className="w-[8.33%] text-center">Jan</span>
                  <span className="w-[8.33%] text-center">Feb</span>
                  <span className="w-[8.33%] text-center">Mar</span>
                  <span className="w-[8.33%] text-center">Apr</span>
                  <span className="w-[8.33%] text-center">May</span>
                  <span className="w-[8.33%] text-center">Jun</span>
                  <span className="w-[8.33%] text-center">Jul</span>
                  <span className="w-[8.33%] text-center">Aug</span>
                  <span className="w-[8.33%] text-center">Sep</span>
                </div>
                <div className="grid grid-cols-52 gap-1">
                  {Array.from({ length: 364 }).map((_, i) => {
                    const intensity = Math.random();
                    const color =
                      intensity > 0.8 ? 'bg-green-500' :
                      intensity > 0.6 ? 'bg-green-600' :
                      intensity > 0.3 ? 'bg-green-700' :
                      intensity > 0.1 ? 'bg-green-800' :
                      'bg-gray-800';
                    return (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-sm ${color}`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-end">
                  <span>Less</span>
                  <div className="w-2 h-2 bg-gray-800 rounded-sm"></div>
                  <div className="w-2 h-2 bg-green-800 rounded-sm"></div>
                  <div className="w-2 h-2 bg-green-700 rounded-sm"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[50vh] px-6 py-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-gray-400 mb-8">Hey, you scrolled this far, let's talk.</p>
            <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3 mx-auto text-lg font-medium">
              <img
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2"
                alt="Profile"
                className="w-6 h-6 rounded object-cover"
              />
              Book a Free Call
            </button>
          </div>
        </section>
      </main>
      <RabbitMascot />
    </div>
  );
}

export default App;
