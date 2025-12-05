import { lazy, Suspense } from 'react';

const GitHubGraph = lazy(() => import('./GitHubGraph'));

export default function AboutSection() {
  return (
    <>
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
              loading="lazy"
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

          <Suspense fallback={
            <div className="border border-gray-800 rounded-2xl bg-gradient-to-br from-[#0c0d10] via-[#0c1117] to-[#0b0c12] p-10 shadow-2xl">
              <div className="flex items-center justify-center h-64">
                <div className="animate-pulse text-gray-400">Loading GitHub activity...</div>
              </div>
            </div>
          }>
            <GitHubGraph />
          </Suspense>
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
              loading="lazy"
            />
            Book a Free Call
          </button>
        </div>
      </section>
    </>
  );
}
