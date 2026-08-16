import { AnimatePresence, motion } from "framer-motion";
import CacheNode from "./CacheNode";

function CacheVisualizer({ items, capacity }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Cache Memory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Most Recently Used → Least Recently Used
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          Capacity:{" "}
          <span className="font-bold text-white">
            {items.length}/{capacity}
          </span>
        </div>

      </div>

      <div className="overflow-x-auto pb-4">

        {items.length === 0 ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-800 text-slate-600"
          >
            Cache is empty
          </motion.div>

        ) : (

          <motion.div
            layout
            className="flex min-w-max items-center px-4 py-6"
          >

            <AnimatePresence mode="popLayout">

              {items.map((item, index) => (
                <CacheNode
                  key={item.key}
                  item={item}
                  index={index}
                  total={items.length}
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