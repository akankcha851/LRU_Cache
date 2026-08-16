import { useEffect, useState } from "react";

import {
  getCache,
  getCacheItem,
  getStats,
  putCacheItem,
  deleteCacheItem,
} from "./services/api";

import CacheVisualizer from "./components/CacheVisualizer";
import ControlPanel from "./components/ControlPanel";
import Statistics from "./components/Statistics";

function App() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    hits: 0,
    misses: 0,
    hitRate: 0,
    evictions: 0,
    size: 0,
    capacity: 5,
  });

  const refreshData = async () => {
    try {
      const cacheData = await getCache();
      const statsData = await getStats();

      setItems(cacheData.items || []);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch cache data:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handlePut = async (key, value) => {
  try {
    await putCacheItem(key, value);
    await refreshData();
  } catch (error) {
    console.error("PUT failed:", error);
  }
};

const handleGet = async (key) => {
  try {
    await getCacheItem(key);
    await refreshData();
  } catch (error) {
    console.error("GET failed:", error);
  }
};

const handleDelete = async (key) => {
  try {
    await deleteCacheItem(key);
    await refreshData();
  } catch (error) {
    console.error("DELETE failed:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            CacheViz
          </h1>

          <p className="mt-2 text-slate-400">
            Interactive LRU Cache Visualizer
          </p>
        </header>

        <div className="space-y-6">

          <Statistics stats={stats} />

          <CacheVisualizer items={items} />

          <ControlPanel
            onPut={handlePut}
            onGet={handleGet}
            onDelete={handleDelete}
          />

        </div>
      </div>
    </div>
  );
}

export default App;