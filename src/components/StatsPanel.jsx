import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const formatDate = (d) => new Date(d).toLocaleDateString();

const StatsPanel = ({ stats, tasbeehs }) => {
  const totalAllTime = stats.total || 0;
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayTotal = stats.daily?.[todayKey] || 0;

  const topTasbeeh = [...tasbeehs]
    .map((t) => ({ name: t.name, count: stats.perTasbeeh?.[t.id] || 0 }))
    .sort((a, b) => b.count - a.count)[0];

  const history = Object.entries(stats.daily || {})
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, 7);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 className="text-indigo-600" size={20} />
        <h3 className="text-lg font-semibold text-slate-900">Statistics</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Today</div>
          <div className="mt-1 text-xl font-semibold">{todayTotal}</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">All Time</div>
          <div className="mt-1 text-xl font-semibold">{totalAllTime}</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-500">Top</div>
          <div className="mt-1 text-sm font-medium flex items-center justify-center gap-1">
            <TrendingUp size={14} className="text-indigo-600" />
            {topTasbeeh ? `${topTasbeeh.name} (${topTasbeeh.count})` : '—'}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-sm font-medium text-slate-700">Last 7 days</div>
        <div className="grid grid-cols-7 gap-2">
          {history.length ? (
            history.map(([date, value]) => (
              <div key={date} className="flex flex-col items-center rounded-lg border border-slate-100 bg-white p-2">
                <div className="text-xs text-slate-500">{formatDate(date)}</div>
                <div className="mt-1 text-base font-semibold">{value}</div>
              </div>
            ))
          ) : (
            <div className="col-span-7 text-center text-sm text-slate-500">No history yet. Start counting!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
