import React from 'react';
import { ChevronDown } from 'lucide-react';

const TasbeehSelector = ({ tasbeehs, selectedId, onSelect, onCreateClick }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <select
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {tasbeehs.map((t) => (
            <option value={t.id} key={t.id}>
              {t.name} {t.target ? `(Target: ${t.target})` : ''}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
      <button
        onClick={onCreateClick}
        className="rounded-xl bg-indigo-600 px-4 py-3 text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
      >
        Add
      </button>
    </div>
  );
};

export default TasbeehSelector;
