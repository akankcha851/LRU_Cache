function StatCard({ title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-slate-600">
          {description}
        </p>
      )}

    </div>
  );
}

function Statistics({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

      <StatCard
        title="Requests"
        value={stats.totalRequests}
        description="Total GET requests"
      />

      <StatCard
        title="Hits"
        value={stats.hits}
        description="Successful lookups"
      />

      <StatCard
        title="Misses"
        value={stats.misses}
        description="Failed lookups"
      />

      <StatCard
        title="Hit Rate"
        value={`${stats.hitRate?.toFixed(1) ?? "0.0"}%`}
        description="Cache efficiency"
      />

      <StatCard
        title="Evictions"
        value={stats.evictions}
        description="LRU removals"
      />

    </div>
  );
}

export default Statistics;