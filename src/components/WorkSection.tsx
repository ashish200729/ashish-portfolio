import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { WORK_ITEMS, type WorkItem } from '../data/work';

const EASE = [0.22, 1, 0.36, 1] as const;

function WorkLogo({ item }: { item: WorkItem }) {
  const cover = item.logoFit === 'cover';

  return (
    <img
      src={item.logo}
      alt={item.logoAlt ?? item.title}
      className={`${cover ? 'size-full object-cover' : 'size-6 sm:size-7 object-contain'} ${item.logoClass ?? ''}`}
      loading="lazy"
    />
  );
}

function WorkLinks({ links }: { links: WorkItem['links'] }) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200"
        >
          {link.type === 'github' ? <Github className="size-4" /> : <ArrowUpRight className="size-4" />}
          {link.label}
        </a>
      ))}
    </div>
  );
}

function WorkEntry({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: WorkItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
      className="border-b border-gray-200/80 dark:border-gray-800/80 last:border-b-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="group relative w-full text-left py-6 sm:py-7 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0a] rounded-lg"
      >
        <div className="flex items-start justify-between gap-4 sm:gap-8">
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
            <div className="shrink-0 size-10 sm:size-11 rounded-xl overflow-hidden flex items-center justify-center ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-[#161616]">
              <WorkLogo item={item} />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors duration-200 ${
                    isExpanded
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200'
                  }`}
                >
                  {item.title}
                </h3>

                {item.status === 'active' && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                    <span className="relative flex size-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full size-1.5 bg-green-500" />
                    </span>
                    Now
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-sm sm:text-base text-gray-500 dark:text-gray-400 transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                {item.subtitle}
              </p>

              {(item.period || item.location) && (
                <p className="mt-1 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                  {[item.period, item.location].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-1">
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500 tabular-nums transition-colors duration-200 group-hover:text-gray-500 dark:group-hover:text-gray-400">
              {item.year}
            </span>
            <span
              className={`text-lg leading-none select-none transition-all duration-200 ${
                isExpanded
                  ? 'rotate-45 text-gray-500 dark:text-gray-400'
                  : 'rotate-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500'
              }`}
              aria-hidden
            >
              +
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-8 sm:pb-9 pl-[3.25rem] sm:pl-[3.75rem]">
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {item.highlights.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-gray-300 dark:before:bg-gray-600"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <WorkLinks links={item.links} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function WorkSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="min-h-screen px-4 sm:px-6 py-20 sm:py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            Products, companies, and systems I've built, from founding AI infrastructure to
            shipping full-stack applications.
          </p>
        </motion.header>

        <div>
          {WORK_ITEMS.map((item, index) => (
            <WorkEntry
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() =>
                setExpandedId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
