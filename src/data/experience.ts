export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  /** External company site. */
  website?: string;
  /** Internal page, used for founder roles whose detail lives on a project page. */
  to?: string;
  logo: string;
  logoClass?: string;
  /**
   * Employer and product are intentionally undisclosed. `company` is then a
   * placeholder that is rendered blurred.
   * Never add the real company, product, domain, or logo to the site's code or data.
   * (The résumé PDF names them by the owner's choice; see PRODUCT.md.)
   */
  confidential?: boolean;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'confidential-ai',
    company: 'Stealth AI Labs',
    role: 'AI/ML Intern',
    period: 'Jun 2026 - Present',
    location: 'Remote',
    logo: '/assets/confidential-logo.svg',
    confidential: true,
  },
  {
    id: 'orbit-editor',
    company: 'Orbit Editor',
    role: 'Founder, AI Code Editor',
    period: 'Jan 2026 - Present',
    location: 'Remote',
    to: '/projects/orbit-editor',
    logo: '/assets/orbit-logo.png',
  },
  {
    id: 'milkey-ai',
    company: 'Milkey AI',
    role: 'Founder & Engineer',
    period: 'Jun 2025 - Present',
    location: 'India, Remote',
    to: '/projects/milkey-ai',
    logo: '/assets/milkey-icon.png',
  },
  {
    id: 'infolabz',
    company: 'InfoLabz',
    role: 'Machine Learning Intern',
    period: 'May - Jul 2025',
    location: 'Ahmedabad, Remote',
    website: 'https://infolabz.in/',
    logo: '/assets/infolabz-logo.png',
    logoClass: 'brightness-125 contrast-125 saturate-150',
  },
  {
    id: 'sofcon',
    company: 'Sofcon India',
    role: 'Python Intern',
    period: 'Jun 2024 - Apr 2025',
    location: 'Ahmedabad, Remote',
    website: 'https://www.sofcontraining.com/',
    logo: '/assets/sofcon-logo.png',
  },
];
