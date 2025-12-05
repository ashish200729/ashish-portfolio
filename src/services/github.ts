const GITHUB_USERNAME = 'ashish200729'; // Replace with your GitHub username
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
}

// Fetch user basic info
export async function fetchGitHubUser() {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  if (!response.ok) throw new Error('Failed to fetch GitHub user');
  return response.json();
}

// Fetch user repositories
export async function fetchGitHubRepos() {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
  if (!response.ok) throw new Error('Failed to fetch GitHub repos');
  return response.json();
}

// Fetch contribution data from GitHub scraping service (ghchart alternative)
export async function fetchGitHubContributions(): Promise<GitHubContribution[]> {
  try {
    // Try to use GitHub's contribution API through a proxy service
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);

    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await response.json();
    const contributions: GitHubContribution[] = [];

    if (data.contributions) {
      data.contributions.forEach((contribution: any) => {
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

      return contributions;
    }

    throw new Error('No contribution data found');
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    // Try to fetch events as backup to show at least some activity
    try {
      const eventsResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`);
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        return generateContributionsFromEvents(events);
      }
    } catch (eventsError) {
      console.error('Error fetching events:', eventsError);
    }
    // Final fallback to mock data
    return generateMockContributions();
  }
}

// Generate contributions from recent events
function generateContributionsFromEvents(events: any[]): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const contributionMap = new Map<string, number>();

  // Count events per day
  events.forEach((event: any) => {
    if (event.created_at) {
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

// Generate mock contributions as fallback
function generateMockContributions(): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const currentDate = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseIntensity = isWeekend ? Math.random() * 0.4 : Math.random();
    const intensity = Math.pow(baseIntensity, 0.6);

    const count = Math.floor(intensity * 15);
    const level =
      intensity > 0.8 ? 4 :
      intensity > 0.5 ? 3 :
      intensity > 0.25 ? 2 :
      intensity > 0.1 ? 1 : 0;

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level
    });
  }

  return contributions;
}

// Fetch all GitHub stats
export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const [user, repos, contributions] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepos(),
      fetchGitHubContributions()
    ]);

    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

    return {
      totalContributions,
      contributions,
      followers: user.followers || 0,
      following: user.following || 0,
      publicRepos: user.public_repos || 0,
      totalStars
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    // Return fallback data
    const contributions = generateMockContributions();
    return {
      totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
      contributions,
      followers: 0,
      following: 0,
      publicRepos: 0,
      totalStars: 0
    };
  }
}
