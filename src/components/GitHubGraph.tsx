import { memo, useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { RefreshCw } from 'lucide-react';
import { fetchGitHubStats } from '../services/github';
import { useTheme } from '../context/theme';

type GitHubData = Awaited<ReturnType<typeof fetchGitHubStats>>;

const GitHubGraph = memo(() => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [request, setRequest] = useState(0);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 480px)').matches);
  const { theme } = useTheme();

  useEffect(() => {
    const query = window.matchMedia('(max-width: 480px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        const data = await fetchGitHubStats();
        if (active) { setGithubData(data); setUpdated(new Date()); }
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchData();
    const interval = window.setInterval(() => void fetchData(), 5 * 60 * 1000);
    return () => { active = false; window.clearInterval(interval); };
  }, [request]);

  const contributions = githubData?.contributions ?? [];
  const midpoint = Math.ceil(contributions.length / 2);
  const calendars = compact && contributions.length > 180
    ? [contributions.slice(0, midpoint), contributions.slice(midpoint)]
    : [contributions];

  return (
    <section aria-labelledby="github-title" aria-busy={loading}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="github-title" className="text-xs font-medium text-ink-2">GitHub activity</h2>
        <button type="button" className="icon-button" aria-label="Refresh GitHub activity" title="Refresh GitHub activity" disabled={loading} onClick={() => { setLoading(true); setRequest(value => value + 1); }}><RefreshCw size={13} className={loading ? 'animate-spin' : ''} /></button>
      </div>
      {loading && !githubData ? <p role="status" className="py-8 text-xs text-ink-2">Loading GitHub activity…</p> : (
        <>
          <div className="rounded-xl border border-edge-subtle p-4">
            <div className="github-calendar space-y-5" role="group" aria-label="GitHub contribution calendar for the last year">
              {contributions.length ? calendars.map((data, index) => <ActivityCalendar
                key={data[0].date} data={data}
                theme={{ light: ['#edf0e9', '#c5d2bc', '#95ad85', '#698660', '#48634b'], dark: ['#292d25', '#43513b', '#69855a', '#97b27f', '#bfcea9'] }}
                colorScheme={theme} blockSize={8} blockMargin={2} fontSize={11} showWeekdayLabels={false} showTotalCount={false} showColorLegend={index === calendars.length - 1}
                style={{ color: theme === 'dark' ? '#b4b8ac' : '#62655e', width: '100%' }}
              />) : <p role="status" className="py-5 text-xs text-ink-2">GitHub activity is unavailable. Try refreshing or <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer" className="text-link">view my profile</a>.</p>}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-ink-3">
            <a href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer" className="text-link">{githubData?.contributions.length ? githubData.contributionSource === 'events' ? `${githubData.totalContributions.toLocaleString()} recent public events (partial activity)` : `${githubData.totalContributions.toLocaleString()} contributions in the last year` : 'View GitHub profile'}<span className="sr-only"> — opens in a new tab</span></a>
            {updated && githubData?.contributions.length ? <time dateTime={updated.toISOString()} title={updated.toLocaleString()}>Updated {updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time> : null}
          </div>
        </>
      )}
    </section>
  );
});

GitHubGraph.displayName = 'GitHubGraph';
export default GitHubGraph;
