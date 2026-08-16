import { motion } from "framer-motion";

function CacheNode({ item, index, total }) {
  const isMRU = index === 0;
  const isLRU = index === total - 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
    >
      <div className="relative w-40 rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
        
        <div className="absolute -top-3 left-4">
          {isMRU && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              MRU
            </span>
          )}

          {isLRU && !isMRU && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              LRU
            </span>
          )}
        </div>

        <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">
          Cache Entry
        </div>

        <div className="mt-2 text-2xl font-bold text-white">
          {item.key}
        </div>

        <div className="mt-1 break-all text-sm text-slate-400">
          {item.value}
        </div>
      </div>

      {!isLRU && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 text-2xl text-slate-600"
        >
          →
        </motion.div>
      )}
    </motion.div>
  );
}

export default CacheNode;