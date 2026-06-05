import { motion } from "framer-motion";

export default function FloatingJobAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-4 left-2 lg:-left-4 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-4 py-3 flex items-center gap-3"
    >
      <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center text-lg shrink-0">
        🔔
      </div>
      <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
        Job Alert Subscribe
      </span>
    </motion.div>
  );
}