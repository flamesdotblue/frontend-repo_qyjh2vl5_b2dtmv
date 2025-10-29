import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CreateTasbeehModal = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setTarget('');
      setError('');
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a name.');
      return;
    }
    const t = target ? parseInt(target, 10) : undefined;
    if (target && (isNaN(t) || t <= 0)) {
      setError('Target must be a positive number.');
      return;
    }
    onCreate({ name: trimmed, target: t });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Create Tasbeeh</h3>
          <button onClick={onClose} className="rounded-full p-1 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-600">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Subhanallah"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-600">Target (optional)</label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g., 33 or 100"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTasbeehModal;
