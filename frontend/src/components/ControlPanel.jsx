import { useState } from "react";

function ControlPanel({
  onPut,
  onGet,
  onDelete,
  onClear,
}) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handlePut = () => {
    if (!key.trim()) return;

    onPut(key.trim(), value);
  };

  const handleGet = () => {
    if (!key.trim()) return;

    onGet(key.trim());
  };

  const handleDelete = () => {
    if (!key.trim()) return;

    onDelete(key.trim());
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Cache Operations
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Key
          </label>

          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. A"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Value
          </label>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 100"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={handlePut}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          PUT
        </button>

        <button
          onClick={handleGet}
          className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          GET
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
        >
          DELETE
        </button>
        <button
          onClick={onClear}
          className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-slate-300 transition hover:border-red-500 hover:text-red-400"
        >
            CLEAR CACHE
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;