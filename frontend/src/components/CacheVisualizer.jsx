import { AnimatePresence, motion } from "framer-motion";
import CacheNode from "./CacheNode";

function CacheVisualizer({ items }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Cache Memory
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Most Recently Used → Least Recently Used
          </p>
        </div>
      </div>

      <div className="min-h-40 overflow-x-auto">
        {items.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center text-slate-500">
            Cache is empty
          </div>
        ) : (
          <motion.div
            layout
            className="flex min-w-max items-center"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <CacheNode
                  key={item.key}
                  item={item}
                  index={
                    index === items.length - 1
                      ? -1
                      : index
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CacheVisualizer;