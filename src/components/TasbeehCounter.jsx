import React from 'react';
import { Minus, RotateCcw, Target } from 'lucide-react';

const ringVibrate = () => {
  try {
    if (navigator.vibrate) navigator.vibrate(10);
  } catch (_) {
    // ignore
  }
};

const Progress = ({ current, target }) => {
  if (!target) return null;
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="mt-3">
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><Target size={14}/>Target</span>
        <span>
          {current} / {target} ({pct}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const TasbeehCounter = ({
  name,
  count,
  target,
  onIncrement,
  onDecrement,
  onReset,
}) => {
  const handleTap = () => {
    onIncrement();
    ringVibrate();
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 text-center">
        <div className="text-sm uppercase tracking-wide text-slate-500">Current Tasbeeh</div>
        <div className="mt-1 text-2xl font-semibold text-slate-900">{name}</div>
      </div>

      <button
        onClick={handleTap}
        className="mx-auto mb-4 block h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg transition active:scale-95"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="text-6xl font-bold tabular-nums">{count}</div>
          <div className="mt-1 text-sm text-indigo-100">Tap to count</div>
        </div>
      </button>

      <Progress current={count} target={target} />

      <div className="mt-5 grid grid-cols-3 gap-3">
        <button
          onClick={onDecrement}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
        >
          <div className="flex items-center justify-center gap-2"><Minus size={18}/>Minus</div>
        </button>
        <button
          onClick={handleTap}
          className="rounded-xl bg-indigo-600 px-4 py-3 text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
        >
          +1
        </button>
        <button
          onClick={onReset}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
        >
          <div className="flex items-center justify-center gap-2"><RotateCcw size={18}/>Reset</div>
        </button>
      </div>
    </div>
  );
};

export default TasbeehCounter;
