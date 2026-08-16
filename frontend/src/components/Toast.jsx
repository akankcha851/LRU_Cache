import { AnimatePresence, motion } from "framer-motion";

function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`fixed right-6 top-6 z-50 rounded-xl border px-5 py-4 shadow-2xl ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-950 text-emerald-300"
              : toast.type === "error"
              ? "border-red-500/30 bg-red-950 text-red-300"
              : "border-yellow-500/30 bg-yellow-950 text-yellow-300"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;