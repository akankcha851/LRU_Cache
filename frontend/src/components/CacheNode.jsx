import { motion } from "framer-motion";

function CacheNode({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25 }}
      className="flex items-center"
    >
      <div className="w-36 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {item.position}
          </span>

          {index === 0 && (
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
              MRU
            </span>
          )}

          {index !== 0 && index === -1 && (
            <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
              LRU
            </span>
          )}
        </div>

        <div className="text-lg font-bold text-white">
          {item.key}
        </div>

        <div className="mt-1 text-sm text-slate-400">
          {item.value}
        </div>
      </div>

      <div className="px-3 text-xl text-slate-500">
        →
      </div>
    </motion.div>
  );
}

export default CacheNode;