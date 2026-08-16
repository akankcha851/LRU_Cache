function OperationLog({ logs }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">
          Operation Log
        </h2>

        <p className="text-sm text-slate-500">
          Recent cache operations
        </p>
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto">

        {logs.length === 0 ? (
          <div className="py-8 text-center text-slate-600">
            No operations yet
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <div className="flex items-center gap-3">

                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${
                    log.type === "PUT"
                      ? "bg-blue-500/20 text-blue-400"
                      : log.type === "GET"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {log.type}
                </span>

                <span className="text-sm text-slate-300">
                  {log.message}
                </span>

              </div>

              <span className="text-xs text-slate-600">
                {log.time}
              </span>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default OperationLog;