import { useEffect, useState } from "react";

import {
  getCache,
  getCacheItem,
  getStats,
  putCacheItem,
  deleteCacheItem,
  clearCache,
} from "./services/api";

import CacheVisualizer from "./components/CacheVisualizer";
import ControlPanel from "./components/ControlPanel";
import Statistics from "./components/Statistics";
import OperationLog from "./components/OperationLog";
import Toast from "./components/Toast";

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

  const [logs, setLogs] = useState([]);

  const [toast, setToast] = useState(null);

  const addLog = (type, message) => {
    const newLog = {
      id: Date.now(),
      type,
      message,
      time: new Date().toLocaleTimeString(),
    };

    setLogs((previous) => [
      newLog,
      ...previous,
    ].slice(0, 20));
  };

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const refreshData = async () => {
    try {
      const [cacheData, statsData] = await Promise.all([
        getCache(),
        getStats(),
      ]);

      setItems(cacheData.items || []);
      setStats(statsData);
    } catch (error) {
      console.error(error);

      showToast(
        "Unable to connect to C++ backend",
        "error"
      );
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handlePut = async (key, value) => {
    if (!value.trim()) {
      showToast(
        "Value cannot be empty",
        "error"
      );
      return;
    }

    try {
      await putCacheItem(key, value);

      addLog(
        "PUT",
        `${key} = ${value}`
      );

      showToast(
        `Inserted ${key}`
      );

      await refreshData();
    } catch (error) {
      console.error(error);

      showToast(
        "PUT operation failed",
        "error"
      );
    }
  };

  const handleGet = async (key) => {
    try {
      const result = await getCacheItem(key);

      if (result.hit) {
        addLog(
          "GET",
          `${key} → cache hit`
        );

        showToast(
          `${key} → CACHE HIT`
        );
      } else {
        addLog(
          "GET",
          `${key} → cache miss`
        );

        showToast(
          `${key} → CACHE MISS`,
          "error"
        );
      }

      await refreshData();
    } catch (error) {
      console.error(error);

      showToast(
        "GET operation failed",
        "error"
      );
    }
  };

  const handleDelete = async (key) => {
    try {
      const result = await deleteCacheItem(key);

      if (result.success) {
        addLog(
          "DELETE",
          `${key} removed`
        );

        showToast(
          `${key} deleted`
        );
      } else {
        showToast(
          `${key} not found`,
          "error"
        );
      }

      await refreshData();
    } catch (error) {
      console.error(error);

      showToast(
        "DELETE operation failed",
        "error"
      );
    }
  };

  const handleClear = async () => {
    try {
      await clearCache();

      addLog(
        "DELETE",
        "Cache cleared"
      );

      showToast(
        "Cache cleared"
      );

      await refreshData();
    } catch (error) {
      console.error(error);

      showToast(
        "Unable to clear cache",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Toast toast={toast} />

      <div className="mx-auto max-w-7xl px-6 py-10">

        <header className="mb-10">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-black tracking-tight">
                CacheViz
              </h1>

              <p className="mt-2 text-slate-500">
                High-Performance LRU Cache Visualizer
              </p>
            </div>

            <div className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 md:block">
              ● Backend Connected
            </div>

          </div>

        </header>

        <div className="space-y-6">

          <Statistics stats={stats} />

          <CacheVisualizer
            items={items}
            capacity={stats.capacity}
          />

          <div className="grid gap-6 lg:grid-cols-2">

            <ControlPanel
              onPut={handlePut}
              onGet={handleGet}
              onDelete={handleDelete}
              onClear={handleClear}
            />

            <OperationLog logs={logs} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;