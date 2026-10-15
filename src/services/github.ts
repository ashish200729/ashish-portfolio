const GITHUB_USERNAME = 'ashish200729';
const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubStats {
  totalContributions: number;
  contributions: GitHubContribution[];
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  contributionSource: 'contributions' | 'events' | 'unavailable';
}

interface GitHubUserResponse {
  followers?: number;
  following?: number;
  public_repos?: number;
}

interface GitHubRepoResponse {
  stargazers_count?: number;
}

interface GitHubContributionResponse {
  contributions?: Array<{
    date: string;
    count: number;
  }>;
}

interface GitHubEventResponse {
  created_at?: string;
}

// Fetch user basic info
export async function fetchGitHubUser(): Promise<GitHubUserResponse> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Failed to fetch GitHub user');
  return response.json();
}

// Fetch user repositories
export async function fetchGitHubRepos(): Promise<GitHubRepoResponse[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Failed to fetch GitHub repos');
  return response.json();
}

// Fetch contribution data from GitHub scraping service (ghchart alternative)
export async function fetchGitHubContributions(): Promise<{ contributions: GitHubContribution[]; source: GitHubStats['contributionSource'] }> {
  try {
    // Try to use GitHub's contribution API through a proxy service
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, { signal: AbortSignal.timeout(10000) });

    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await response.json() as GitHubContributionResponse;
    const contributions: GitHubContribution[] = [];

    if (Array.isArray(data.contributions) && data.contributions.length > 0) {
      data.contributions.forEach((contribution) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(contribution.date) || !Number.isFinite(Date.parse(contribution.date)) || new Date(contribution.date).toISOString().slice(0, 10) !== contribution.date || !Number.isSafeInteger(contribution.count) || contribution.count < 0) {
          throw new Error('Invalid contribution data');
        }
        const count = contribution.count;
        const level =
          count === 0 ? 0 :
          count <= 3 ? 1 :
          count <= 6 ? 2 :
          count <= 9 ? 3 : 4;

        contributions.push({
          date: contribution.date,
          count,
          level
        });
      });

      contributions.sort((a, b) => a.date.localeCompare(b.date));
      return { contributions, source: 'contributions' };
    }

    throw new Error('No contribution data found');
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    // Try to fetch events as backup to show at least some activity
    try {
      const eventsResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`, { signal: AbortSignal.timeout(10000) });
      if (eventsResponse.ok) {
        const events = await eventsResponse.json() as GitHubEventResponse[];
        if (!Array.isArray(events)) throw new Error('Invalid event data');
        return { contributions: generateContributionsFromEvents(events), source: 'events' };
      }
    } catch (eventsError) {
      console.error('Error fetching events:', eventsError);
    }
    return { contributions: [], source: 'unavailable' };
  }
}

// Generate contributions from recent events
function generateContributionsFromEvents(events: GitHubEventResponse[]): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const contributionMap = new Map<string, number>();

  // Count events per day
  events.forEach((event) => {
    if (typeof event?.created_at === 'string') {
      const date = event.created_at.split('T')[0];
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
    }
  });

  // Generate last 365 days
  const currentDate = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const count = contributionMap.get(dateStr) || 0;
    const level =
      count === 0 ? 0 :
      count <= 2 ? 1 :
      count <= 5 ? 2 :
      count <= 8 ? 3 : 4;

    contributions.push({
      date: dateStr,
      count,
      level
    });
  }

  return contributions;
}

// Fetch all GitHub stats
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [userResult, reposResult, contributionResult] = await Promise.allSettled([
    fetchGitHubUser(),
    fetchGitHubRepos(),
    fetchGitHubContributions()
  ]);
  const user = userResult.status === 'fulfilled' && userResult.value ? userResult.value : {};
  const repos = reposResult.status === 'fulfilled' && Array.isArray(reposResult.value) ? reposResult.value : [];
  const { contributions, source } = contributionResult.status === 'fulfilled' ? contributionResult.value : { contributions: [], source: 'unavailable' as const };
  const totalStars = repos.reduce((sum, repo) => sum + (repo?.stargazers_count || 0), 0);
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return {
    totalContributions,
    contributions,
    followers: user.followers || 0,
    following: user.following || 0,
    publicRepos: user.public_repos || 0,
    totalStars,
    contributionSource: source,
  };
}
