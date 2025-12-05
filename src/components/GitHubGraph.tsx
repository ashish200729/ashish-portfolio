import { memo, useMemo, useState } from 'react';

interface ContributionDay {
  level: number;
  date: string;
  count: number;
}

const GitHubGraph = memo(() => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Generate realistic contribution data (7 rows × 52 weeks = 364 days)
  const { graphData, stats } = useMemo(() => {
    const weeks: ContributionDay[][] = [];
    const currentDate = new Date();

    // Generate 52 weeks of data
    for (let week = 0; week < 52; week++) {
      const weekData: ContributionDay[] = [];
      for (let day = 0; day < 7; day++) {
        const daysAgo = (51 - week) * 7 + (6 - day);
        const date = new Date(currentDate);
        date.setDate(date.getDate() - daysAgo);

        // Generate more realistic contribution patterns
        const isWeekend = day === 0 || day === 6;
        const baseIntensity = isWeekend ? Math.random() * 0.3 : Math.random();
        const intensity = Math.pow(baseIntensity, 0.5); // Square root for better distribution

        const count = Math.floor(intensity * 20);
        const level =
          intensity > 0.85 ? 4 :
          intensity > 0.6 ? 3 :
          intensity > 0.35 ? 2 :
          intensity > 0.15 ? 1 : 0;

        weekData.push({
          level,
          date: date.toISOString().split('T')[0],
          count
        });
      }
      weeks.push(weekData);
    }

    // Calculate stats
    const allDays = weeks.flat();
    const totalContributions = allDays.reduce((sum, day) => sum + day.count, 0);
    const maxDay = Math.max(...allDays.map(d => d.count));
    const thisWeekContributions = weeks[weeks.length - 1].reduce((sum, day) => sum + day.count, 0);

    // Calculate current streak
    let streak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].count > 0) streak++;
      else break;
    }

    return {
      graphData: weeks,
      stats: {
        total: totalContributions,
        streak,
        maxDay,
        thisWeek: thisWeekContributions
      }
    };
  }, []);

  const getLevelColor = (level: number): string => {
    const colors = {
      0: 'bg-slate-900/50 dark:bg-slate-800/30',
      1: 'bg-emerald-900/70 dark:bg-emerald-900/50',
      2: 'bg-emerald-700 dark:bg-emerald-700/80',
      3: 'bg-emerald-500 dark:bg-emerald-500',
      4: 'bg-emerald-400 dark:bg-emerald-400'
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: { month: string; offset: number }[] = [];

    for (let i = 0; i < 12; i++) {
      const weekOffset = Math.floor((i * 52) / 12);
      labels.push({ month: months[i], offset: weekOffset });
    }

    return labels;
  };

  return (
    <div className="relative border border-gray-800/50 dark:border-gray-700/30 rounded-3xl bg-gradient-to-br from-[#0c0d10] via-[#0d1117] to-[#0b0c12] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 animate-pulse opacity-50" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div className="text-left">
            <p className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-[0.12em] mb-1">
              Featured
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              GitHub Activity
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              Total: <span className="text-white font-bold">{stats.total.toLocaleString()}</span> contributions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-gray-800/50 text-gray-300 transition-all hover:border-emerald-500/50 hover:bg-black/60">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
              Active
            </span>
            <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-gray-800/50 text-gray-300 transition-all hover:border-emerald-500/50 hover:bg-black/60">
              Yesterday: <span className="text-white font-semibold">7h 10m</span>
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Current Streak', value: `${stats.streak} days`, icon: '🔥' },
            { label: 'Best Day', value: `${stats.maxDay} commits`, icon: '⭐' },
            { label: 'This Week', value: `${stats.thisWeek} commits`, icon: '📈' }
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-gray-800/50 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm px-4 py-3 sm:py-4 text-left transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Contribution Graph */}
        <div className="bg-[#0a0b0f]/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 sm:p-6 shadow-inner">
          {/* Month labels */}
          <div className="flex justify-start gap-[2.5%] mb-3 text-[10px] sm:text-xs text-gray-500 px-1 overflow-hidden">
            {getMonthLabels().map(({ month, offset }) => (
              <span
                key={month}
                className="flex-shrink-0"
                style={{ marginLeft: offset > 0 ? `${(offset * 2) - 2}%` : '0' }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* Contribution grid - Horizontal scrollable on mobile */}
          <div className="overflow-x-auto overflow-y-hidden -mx-2 px-2 pb-2">
            <div className="inline-grid gap-1 sm:gap-1.5 min-w-max" style={{ gridTemplateColumns: `repeat(52, minmax(0, 1fr))` }}>
              {graphData.map((week, weekIdx) => (
                <div key={weekIdx} className="grid gap-1 sm:gap-1.5" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                  {week.map((day, dayIdx) => (
                    <div
                      key={`${weekIdx}-${dayIdx}`}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${getLevelColor(day.level)}
                        transition-all duration-200 cursor-pointer
                        hover:ring-2 hover:ring-emerald-400 hover:ring-offset-1 hover:ring-offset-[#0a0b0f]
                        hover:scale-125 hover:z-10`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Day labels for desktop */}
          <div className="hidden sm:grid gap-1.5 mt-2 text-[10px] text-gray-500" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              idx % 2 === 1 && <span key={day} className="h-3 flex items-center">{day}</span>
            ))}
          </div>

          {/* Legend and Tooltip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 sm:mt-5">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)} transition-transform hover:scale-125`}
                />
              ))}
              <span>More</span>
            </div>

            {/* Hover tooltip */}
            {hoveredDay && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-sm border border-emerald-500/50 text-xs text-white whitespace-nowrap">
                <span className="font-semibold text-emerald-400">{hoveredDay.count} contributions</span>
                {' '}on {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

GitHubGraph.displayName = 'GitHubGraph';

export default GitHubGraph;
