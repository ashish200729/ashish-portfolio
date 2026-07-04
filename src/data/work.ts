export interface WorkLink {
  label: string;
  url: string;
  type: 'website' | 'github' | 'x';
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  year: string;
  location?: string;
  description: string;
  logo: string;
  logoAlt?: string;
  logoFit?: 'contain' | 'cover';
  logoClass?: string;
  technologies: string[];
  highlights?: string[];
  links?: WorkLink[];
  status?: 'active' | 'shipped';
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'hooman-digital',
    title: 'Hooman Digital',
    subtitle: 'AI/ML Intern',
    period: 'Jun 2026 - Present',
    year: '2026',
    location: 'Remote',
    logo: '/assets/hooman-logo.svg',
    logoAlt: 'Hooman Digital',
    logoFit: 'cover',
    description:
      'AI/ML intern at Hooman Digital, building Lori (lori.sh), a local-first, vendor-neutral workspace for agentic coding. Shipping end-to-end features with a Tauri and Rust backend for the desktop app, and React with Next.js on the marketing landing page.',
    technologies: [
      'Tauri',
      'Rust',
      'React',
      'Next.js',
      'TypeScript',
      'LLMs',
      'MCP',
      'AI/ML',
    ],
    highlights: [
      'Building and shipping end-to-end features on Lori, a vendor-neutral workspace for agentic coding at lori.sh.',
      'Developing the desktop application backend with Tauri and Rust for a local-first, cross-platform agent workspace.',
      'Building the Lori landing page with React and Next.js, focused on clean UX and production-ready frontend delivery.',
      'Implementing AI/ML integrations, MCP configuration, and session management for multi-agent developer workflows.',
    ],
    links: [
      { label: 'Company', url: 'https://hooman.digital/', type: 'website' },
      { label: 'Lori', url: 'https://lori.sh/', type: 'website' },
    ],
    status: 'active',
  },
  {
    id: 'milkey',
    title: 'Milkey AI',
    subtitle: 'Founder & Engineer',
    period: 'June 2025 - Present',
    year: '2025',
    location: 'India, Remote',
    logo: '/assets/milkey-icon.png',
    logoAlt: 'Milkey AI',
    logoClass: 'dark:invert',
    description:
      'A hosted MCP server that gives AI coding agents a shared skills layer. Connect once and load curated skills into Cursor, Claude Code, Codex, and Windsurf at runtime, so skills travel across every agent and project without copying prompt files or wasting tokens.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Model Context Protocol',
      'Go',
      'Hono.js',
      'REST API',
      'TypeScript SDK',
    ],
    highlights: [
      'Built Milkey as a shared skills layer for AI coding agents with runtime skill loading over MCP to reduce token waste.',
      'Integrated Cursor, Claude Code, Codex, and Windsurf so teams load curated skills once instead of copying prompt files per project.',
      'Shipped the REST API and official TypeScript SDK with resolve_skill and get_skill flows for product integrations.',
      'Built the dashboard for managing skills, API keys, access, and delivery across agent workflows.',
    ],
    links: [
      { label: 'Website', url: 'https://milkeyai.com/', type: 'website' },
      { label: 'GitHub', url: 'https://github.com/ashish200729/milkeyskills-sdk', type: 'github' },
    ],
  },
  {
    id: 'orbit-editor',
    title: 'Orbit Editor',
    subtitle: 'Founder, AI Code Editor',
    period: 'Jan 2026 - Present',
    year: '2026',
    description:
      'An open-source AI code editor with the same layout, agent workflow, and chat sidebar as Cursor, but you connect any provider you want. Supports Anthropic, OpenAI, Google, DeepSeek, Ollama, and custom endpoints with Ask, Plan, and Agent modes.',
    logo: '/assets/orbit-logo.png',
    logoAlt: 'Orbit Editor',
    logoFit: 'cover',
    technologies: [
      'TypeScript',
      'Electron',
      'VS Code Source',
      'Multi-Provider AI',
      'Open Source',
      'macOS',
    ],
    highlights: [
      'Shipped Orbit Editor as a Cursor-style AI IDE where developers bring their own provider: API keys, cloud models, or local endpoints like Ollama.',
      'Built Ask, Plan, and Agent modes in a unified chat sidebar so teams can Q&A on the repo, review plans before edits, and run multi-file agent workflows.',
      'Forked from Void Editor (VS Code) with a focus on provider flexibility, inline AI editing, and local-first development without vendor lock-in.',
    ],
    links: [
      { label: 'Website', url: 'https://www.orbiteditorai.com/', type: 'website' },
      { label: 'GitHub', url: 'https://github.com/ashish200729/orbiteditor', type: 'github' },
    ],
    status: 'shipped',
  },
  {
    id: 'infolabz',
    title: 'InfoLabz',
    subtitle: 'Machine Learning Intern',
    period: 'May - Jul 2025',
    year: '2025',
    location: 'Ahmedabad, Remote',
    logo: '/assets/infolabz-logo.png',
    logoAlt: 'InfoLabz',
    logoFit: 'cover',
    logoClass: 'brightness-125 contrast-125 saturate-150',
    description:
      'Applied machine learning techniques on real datasets, building practical models and strengthening fundamentals in Python-based ML workflows.',
    technologies: ['Python', 'Machine Learning', 'scikit-learn'],
    highlights: [
      'Worked on supervised learning pipelines for structured data analysis and prediction tasks.',
      'Practiced data preprocessing, feature engineering, and model evaluation with Python and scikit-learn.',
      'Collaborated with mentors on ML experiments and documented findings for team review.',
    ],
  },
  {
    id: 'sofcon',
    title: 'Sofcon India',
    subtitle: 'Python Intern',
    period: 'Jun 2024 - Apr 2025',
    year: '2024',
    location: 'Ahmedabad, Remote',
    logo: '/assets/sofcon-logo.png',
    logoAlt: 'Sofcon India',
    logoFit: 'cover',
    description:
      'Hands-on Python development through real-world projects, automation scripting, and mentor-led engineering sessions.',
    technologies: ['Python', 'Git', 'GitHub'],
    highlights: [
      'Gained hands-on experience in Python programming through real-world projects and mentor-led sessions.',
      'Worked on automation scripting, file handling, and API integration across intermediate-level tasks.',
      'Built small applications to automate processes and practiced version control with Git and GitHub.',
    ],
  },
  {
    id: 'bolt',
    title: 'Bolt.new Web Client',
    subtitle: 'AI Web Development Environment',
    period: '2024',
    year: '2024',
    logo: '/assets/bolt-logo.svg',
    logoAlt: 'Bolt.new',
    logoFit: 'cover',
    description:
      'A comprehensive client application leveraging the bolt.new environment to build, edit, and orchestrate web-based projects natively in the browser through AI-driven generation.',
    technologies: ['TypeScript', 'React', 'Vite', 'WebContainers'],
    links: [{ label: 'GitHub', url: 'https://github.com/ashish200729', type: 'github' }],
    status: 'shipped',
  },
  {
    id: 'ai-website-builder',
    title: 'AI Website Builder',
    subtitle: 'AI-Powered Site Generator',
    period: '2024',
    year: '2024',
    logo: '/assets/ai-website-builder-logo.svg',
    logoAlt: 'AI Website Builder',
    logoFit: 'contain',
    description:
      'Designed and built a clean, user-friendly interface for an AI-powered website builder. Focused on intuitive UX, responsive layouts, and real-time visual feedback.',
    technologies: ['Next.js 15', 'TypeScript', 'Claude AI', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/ashish200729', type: 'github' }],
    status: 'shipped',
  },
  {
    id: 'discord-scrim',
    title: 'Discord Scrim Bot',
    subtitle: 'Esports Tournament Manager',
    period: '2024',
    year: '2024',
    logo: '/assets/discord-scrim-logo.svg',
    logoAlt: 'Discord Scrim Bot',
    logoFit: 'contain',
    description:
      'A feature-rich Discord bot for esports scrim and tournament management. Handles team registration, match scheduling, and automated bracket generation.',
    technologies: ['Discord.py', 'Python', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/ashish200729', type: 'github' }],
    status: 'shipped',
  },
];
