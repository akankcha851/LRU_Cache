function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function Statistics({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        title="Requests"
        value={stats.totalRequests}
      />

      <StatCard
        title="Hits"
        value={stats.hits}
      />

      <StatCard
        title="Misses"
        value={stats.misses}
      />

      <StatCard
        title="Hit Rate"
        value={`${stats.hitRate?.toFixed(2) ?? "0.00"}%`}
      />
    </div>
  );
}

export default Statistics;