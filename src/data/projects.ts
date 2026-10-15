export interface ProjectLink {
  label: string;
  url: string;
  kind: 'website' | 'github';
}

export interface Project {
  slug: string;
  name: string;
  /** One short sentence, shown on the index and under the title. */
  summary: string;
  role: string;
  period: string;
  year: string;
  status: string;
  /** Shown on the landing page. Keep to exactly three. */
  featured?: boolean;
  /** Key of a glyph in `ProjectMark`, used when there is no `image`. */
  mark?: string;
  image?: string;
  imageClass?: string;
  /** One short paragraph: what it is and why it exists. */
  overview: string;
  /** At most three one-line points. */
  highlights: string[];
  stack: string[];
  /** Only list destinations that are public and live. */
  links: ProjectLink[];
}

const GITHUB_PROFILE: ProjectLink = { label: 'GitHub profile', url: 'https://github.com/ashish200729', kind: 'github' };
const repo = (name: string, label = 'GitHub'): ProjectLink => ({ label, url: `https://github.com/ashish200729/${name}`, kind: 'github' });

export const PROJECTS: Project[] = [
  {
    slug: 'orbit-editor',
    name: 'Orbit Editor',
    summary: 'An open-source AI code editor where you bring any model provider.',
    role: 'Founder & engineer',
    period: 'Jan 2026 – Present',
    year: '2026',
    status: 'Beta',
    featured: true,
    image: '/assets/orbit-logo.png',
    overview:
      'A VS Code-based editor with Ask, Plan, and Agent modes in a chat sidebar. Connect Anthropic, OpenAI, Google, or local models, and keep your own API keys on your machine.',
    highlights: [
      'Agents with sub-agents, checkpoints, MCP, and skills.',
      'Plan mode to review an approach before any code changes.',
      'Open source under Apache-2.0 for macOS and Windows.',
    ],
    stack: ['TypeScript', 'Electron', 'VS Code', 'MCP'],
    links: [{ label: 'Website', url: 'https://www.orbiteditorai.com', kind: 'website' }, repo('orbiteditor')],
  },
  {
    slug: 'milkey-ai',
    name: 'Milkey AI',
    summary: 'A hosted MCP server that loads curated skills into any coding agent.',
    role: 'Founder & engineer',
    period: 'Jun 2025 – Present',
    year: '2025',
    status: 'Active',
    featured: true,
    image: '/assets/milkey-icon.png',
    imageClass: 'dark:invert',
    overview:
      'Connect once and Cursor, Claude Code, Codex, or Windsurf load the right skill at runtime, so project knowledge follows the agent instead of being copied between repos.',
    highlights: [
      'MCP server in Go, plus a REST API and TypeScript SDK.',
      'Dashboard for skills, API keys, teams, and billing.',
    ],
    stack: ['Go', 'TypeScript', 'Next.js', 'Hono', 'MCP'],
    links: [repo('milkeyskills-sdk', 'SDK on GitHub')],
  },
  {
    slug: 'agentui',
    name: 'AgentUI',
    summary: 'AI agent components for React and Next.js. Copy the source, own the code.',
    role: 'Creator',
    period: 'Aug 2026',
    year: '2026',
    status: 'Live',
    featured: true,
    mark: 'agentui',
    overview:
      'A source-first library of chat, streaming, tool-call, and approval components, installed into your project through the shadcn CLI so you can change anything.',
    highlights: [
      'Live previews, usage examples, and install commands for every component.',
      'llms.txt and registry endpoints that coding agents can read.',
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'shadcn'],
    links: [{ label: 'agentui.pro', url: 'https://www.agentui.pro', kind: 'website' }, repo('agentui')],
  },
  {
    slug: 'mandatepay',
    name: 'MandatePay',
    summary: 'AI shopping agents that can only spend inside the rules you set.',
    role: 'Designer & engineer',
    period: 'Oct 2026',
    year: '2026',
    status: 'PayPal Sandbox',
    mark: 'mandatepay',
    overview:
      'You set a spending mandate, the agent proposes purchases, a deterministic policy engine allows, escalates, or blocks each one, and only then does PayPal execute.',
    highlights: [
      'Explainable verdicts, and prompt-injection screening of retailer text.',
      'An MCP server so outside agents can propose but never pay.',
    ],
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'PayPal', 'MCP'],
    links: [repo('mandatepay')],
  },
  {
    slug: 'orbit-runner',
    name: 'Orbit Runner',
    summary: 'A self-hosted runner for Orbit Editor’s coding agents.',
    role: 'Creator',
    period: 'Jul 2026',
    year: '2026',
    status: 'Open source',
    image: '/assets/orbit-logo.png',
    overview:
      'Runs the full agent loop inside Docker containers on a machine you control, so your code and provider keys never leave your infrastructure.',
    highlights: [
      'Keys encrypted at rest, and tasks that survive editor disconnects.',
      'Results handed off as a branch, pull request, or patch.',
    ],
    stack: ['TypeScript', 'Node.js', 'Docker'],
    links: [repo('orbit-editor-runner')],
  },
  {
    slug: 'orbit-backend',
    name: 'Orbit Backend',
    summary: 'Accounts, billing, and the model gateway behind Orbit Editor.',
    role: 'Engineer',
    period: 'Jul 2026',
    year: '2026',
    status: 'Private',
    image: '/assets/orbit-logo.png',
    overview:
      'The hosted half of the editor: sign-in, subscriptions and credits, and a gateway that gives the desktop app metered access to models.',
    highlights: ['Billing and webhooks through Dodo Payments.'],
    stack: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    links: [],
  },
  {
    slug: 'orbitbench',
    name: 'OrbitBench',
    summary: 'A benchmark that scores LLMs on code generation.',
    role: 'Creator',
    period: 'May 2026',
    year: '2026',
    status: 'Open source',
    image: '/assets/orbit-logo.png',
    overview:
      'Runs model-written code against hidden tests in isolation and reports a pass@1 score out of 100, from the CLI or a web dashboard.',
    highlights: [],
    stack: ['Python'],
    links: [repo('orbitbench')],
  },
  {
    slug: 'personal-ai-computer-mcp',
    name: 'Personal AI Computer MCP',
    summary: 'A macOS MCP server that lets an AI agent use a real Mac.',
    role: 'Creator',
    period: 'Mar 2026',
    year: '2026',
    status: 'Open source',
    mark: 'computer-mcp',
    overview:
      'Exposes the host itself to an agent: screenshots, mouse and keyboard, windows, files, and the accessibility tree, through 48 MCP tools.',
    highlights: [],
    stack: ['Node.js', 'Swift', 'MCP'],
    links: [repo('personal-ai-computer-mcp')],
  },
  {
    slug: 'openrunable',
    name: 'OpenRunable',
    summary: 'A local-first desktop workspace starter for chat, dictation, and notes.',
    role: 'Creator',
    period: 'Sep 2026',
    year: '2026',
    status: 'Starter',
    mark: 'openrunable',
    overview:
      'An Electron foundation that opens without an account, with a local SQLite database and provider setup for OpenAI, Anthropic, Gemini, Ollama, and more.',
    highlights: [],
    stack: ['TypeScript', 'Electron', 'Next.js', 'SQLite'],
    links: [repo('openrunable')],
  },
  {
    slug: 'voice-agent-platform',
    name: 'Voice Agent Platform',
    summary: 'A voice-agent platform for India-focused, globally available teams.',
    role: 'Engineer',
    period: 'Sep 2026',
    year: '2026',
    status: 'Private',
    mark: 'voice',
    overview:
      'Tenant-safe workspaces, immutable published agents, and a provider-neutral realtime runtime with a browser playground.',
    highlights: [],
    stack: ['TypeScript', 'Sarvam', 'Whisper', 'Plivo'],
    links: [],
  },
  {
    slug: 'stocksage',
    name: 'StockSage',
    summary: 'A finance chat app with a three-layer SEBI compliance guardrail.',
    role: 'Creator',
    period: 'Jun 2026',
    year: '2026',
    status: 'Open source',
    mark: 'shield',
    overview:
      'An assistant for Indian markets that educates and researches but never gives personalised advice, with the guardrail applied before, during, and after generation.',
    highlights: [],
    stack: ['TypeScript', 'Next.js', 'MCP'],
    links: [repo('GuardSage')],
  },
  {
    slug: 'capturepro',
    name: 'CapturePro',
    summary: 'Screenshots, annotation, and screen recording for the desktop.',
    role: 'Creator',
    period: 'Jul 2026',
    year: '2026',
    status: 'Private',
    mark: 'capture',
    overview: 'An Electron app for macOS and Windows with a searchable library of past captures.',
    highlights: [],
    stack: ['TypeScript', 'Electron'],
    links: [],
  },
  {
    slug: 'aven-browser',
    name: 'Aven Browser',
    summary: 'A native personal web browser for macOS.',
    role: 'Creator',
    period: 'Sep 2026',
    year: '2026',
    status: 'Private',
    mark: 'browser',
    overview: 'Written with SwiftUI, AppKit, and WebKit, with horizontal or vertical tabs, private windows, bookmarks, history, and downloads.',
    highlights: [],
    stack: ['Swift', 'SwiftUI', 'WebKit'],
    links: [],
  },
  {
    slug: 'syncspace',
    name: 'SyncSpace',
    summary: 'A collaborative workspace and realtime task board.',
    role: 'Creator',
    period: 'Apr 2026',
    year: '2026',
    status: 'Open source',
    mark: 'syncspace',
    overview: 'Shared workspaces with invite links, tasks, comments, and live updates, backed by server-side access control.',
    highlights: [],
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Socket.IO'],
    links: [repo('SyncSpace')],
  },
  {
    slug: 'github-clone',
    name: 'GitHub Clone',
    summary: 'A Git hosting prototype that speaks real Git over HTTP.',
    role: 'Creator',
    period: 'Mar 2026',
    year: '2026',
    status: 'Prototype',
    mark: 'git',
    overview: 'A web UI and API over a Go service that stores bare repositories, so you can browse, clone, fetch, and push.',
    highlights: [],
    stack: ['Next.js', 'Express', 'Go', 'Redis'],
    links: [repo('github-clone')],
  },
  {
    slug: 'discord-scrim',
    name: 'Discord Scrim Bot',
    summary: 'An esports tournament manager for Discord.',
    role: 'Engineer',
    period: '2024',
    year: '2024',
    status: 'Open source',
    image: '/assets/discord-scrim-logo.svg',
    overview: 'Handles scrim slots, registration, tournaments, points tables, and tickets for competitive gaming communities. Now open source as VXBot.',
    highlights: [],
    stack: ['Python', 'discord.py', 'PostgreSQL'],
    links: [repo('vxbot')],
  },
  {
    slug: 'bolt-web-client',
    name: 'Bolt.new Web Client',
    summary: 'An AI web development environment that runs in the browser.',
    role: 'Engineer',
    period: '2024',
    year: '2024',
    status: 'Shipped',
    image: '/assets/bolt-logo.svg',
    overview: 'Builds, edits, and runs web projects in the browser through AI-driven generation.',
    highlights: [],
    stack: ['TypeScript', 'React', 'Vite', 'WebContainers'],
    links: [GITHUB_PROFILE],
  },
  {
    slug: 'ai-website-builder',
    name: 'AI Website Builder',
    summary: 'An AI-powered site generator with real-time visual feedback.',
    role: 'Engineer',
    period: '2024',
    year: '2024',
    status: 'Shipped',
    image: '/assets/ai-website-builder-logo.svg',
    overview: 'A clean interface for generating a website with AI and watching it take shape.',
    highlights: [],
    stack: ['Next.js', 'TypeScript', 'Claude', 'PostgreSQL'],
    links: [GITHUB_PROFILE],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(project => project.featured);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(project => project.slug === slug);
}
