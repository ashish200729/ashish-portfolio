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
