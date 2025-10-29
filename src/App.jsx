import React, { useEffect, useMemo, useState } from 'react';
import TasbeehSelector from './components/TasbeehSelector';
import TasbeehCounter from './components/TasbeehCounter';
import CreateTasbeehModal from './components/CreateTasbeehModal';
import StatsPanel from './components/StatsPanel';
import { Bead, Trash2 } from 'lucide-react';

// Local storage helpers
const STORAGE_KEY = 'tasbeeh_app_v1';

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // ignore
  }
};

const defaultTasbeehs = [
  { id: 't1', name: 'Subhanallah', target: 33, count: 0 },
  { id: 't2', name: 'Alhamdulillah', target: 33, count: 0 },
  { id: 't3', name: 'Allahu Akbar', target: 34, count: 0 },
  { id: 't4', name: 'Astaghfirullah', target: 100, count: 0 },
];

export default function App() {
  const initial = useMemo(() => loadData(), []);
  const [tasbeehs, setTasbeehs] = useState(initial?.tasbeehs || defaultTasbeehs);
  const [selectedId, setSelectedId] = useState(initial?.selectedId || tasbeehs[0]?.id);
  const [stats, setStats] = useState(
    initial?.stats || { total: 0, perTasbeeh: {}, daily: {} }
  );
  const [showCreate, setShowCreate] = useState(false);

  // Persist on changes
  useEffect(() => {
    saveData({ tasbeehs, selectedId, stats });
  }, [tasbeehs, selectedId, stats]);

  const selected = tasbeehs.find((t) => t.id === selectedId) || tasbeehs[0];

  const increment = () => {
    if (!selected) return;
    const today = new Date().toISOString().slice(0, 10);

    setTasbeehs((prev) =>
      prev.map((t) => (t.id === selected.id ? { ...t, count: (t.count || 0) + 1 } : t))
    );

    setStats((prev) => ({
      total: (prev.total || 0) + 1,
      perTasbeeh: { ...prev.perTasbeeh, [selected.id]: (prev.perTasbeeh?.[selected.id] || 0) + 1 },
      daily: { ...prev.daily, [today]: (prev.daily?.[today] || 0) + 1 },
    }));
  };

  const decrement = () => {
    if (!selected) return;
    setTasbeehs((prev) =>
      prev.map((t) =>
        t.id === selected.id ? { ...t, count: Math.max(0, (t.count || 0) - 1) } : t
      )
    );
  };

  const reset = () => {
    if (!selected) return;
    setTasbeehs((prev) => prev.map((t) => (t.id === selected.id ? { ...t, count: 0 } : t)));
  };

  const handleCreate = ({ name, target }) => {
    const id = `c_${Date.now()}`;
    const newTasbeeh = { id, name, target, count: 0 };
    setTasbeehs((prev) => [...prev, newTasbeeh]);
    setSelectedId(id);
  };

  const deleteTasbeeh = (id) => {
    setTasbeehs((prev) => prev.filter((t) => t.id !== id));
    if (selectedId === id) {
      setSelectedId((prev) => {
        const remaining = tasbeehs.filter((t) => t.id !== id);
        return remaining[0]?.id;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-md px-4 pb-24 pt-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Bead />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Digital Tasbeeh</h1>
              <p className="text-xs text-slate-500">Count, create, and track</p>
            </div>
          </div>
        </header>

        <div className="mb-4">
          <TasbeehSelector
            tasbeehs={tasbeehs}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onCreateClick={() => setShowCreate(true)}
          />
          {selected && (
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Selected: {selected.name}</span>
              {selectedId && !defaultTasbeehs.find((d) => d.id === selectedId) && (
                <button
                  onClick={() => deleteTasbeeh(selectedId)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          )}
        </div>

        {selected && (
          <TasbeehCounter
            name={selected.name}
            count={selected.count || 0}
            target={selected.target}
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
          />
        )}

        <div className="mt-6">
          <StatsPanel stats={stats} tasbeehs={tasbeehs} />
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">
          May your remembrance be consistent and heartfelt.
        </footer>
      </div>

      <CreateTasbeehModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
