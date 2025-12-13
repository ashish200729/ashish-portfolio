import { memo, useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { fetchGitHubStats } from '../services/github';
import { useTheme } from '../context/ThemeContext';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
}

const GitHubGraph = memo(() => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { theme } = useTheme();

  // Fetch GitHub data
  const fetchData = async () => {
    try {
      setLoading(true);
      const stats = await fetchGitHubStats();
      setGithubData(stats);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Format time ago
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading && !githubData) {
    return (
      <div className="w-full max-w-[1200px] mx-auto p-8 sm:p-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading GitHub stats...</p>
          </div>
        </div>
      </div>
    );
  }

  const data = githubData?.contributions || [];
  const totalContributions = githubData?.totalContributions || 0;

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 sm:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2" style={{ opacity: 1, transform: 'none' }}>Featured</p>
            <h2 className="text-2xl font-bold" style={{ opacity: 1, transform: 'none' }}>
              GitHub Activity
              {loading && (
                <span className="ml-3 inline-block animate-spin text-primary">↻</span>
              )}
            </h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-primary font-medium">
            Total: <span className="font-black">{totalContributions.toLocaleString()}</span> contributions
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
            <span className="hidden sm:inline">Offline</span>
            <img
              src="/assets/cursor-ai.png"
              alt="Cursor"
              width="16"
              height="16"
              className="inline-block"
            />
            <span className="hidden sm:inline">Yesterday worked</span>
            <span className="sm:hidden">Yesterday</span>
            <b className="font-bold">7h 10m</b>
          </div>
        </div>
      </div>

      {/* Contribution Graph Container */}
      <div
        className="relative bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-800 p-2 sm:p-4 md:p-6 group shadow-sm"
        title={`Last updated: ${getTimeAgo(lastUpdated)}`}
      >
        <div className="w-full overflow-hidden">
          <div className="w-full flex justify-center items-center">
            {data.length > 0 ? (
              <ActivityCalendar
                data={data}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
                colorScheme={theme}
                blockSize={10}
                blockMargin={3}
                fontSize={11}
                showWeekdayLabels={false}
                style={{
                  color: theme === 'dark' ? '#8b949e' : '#57606a',
                  maxWidth: '100%'
                }}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 py-10">No contribution data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

GitHubGraph.displayName = 'GitHubGraph';

export default GitHubGraph;
