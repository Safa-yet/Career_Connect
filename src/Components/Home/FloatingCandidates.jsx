import { motion } from "framer-motion";

const AVATAR_COLORS = ["#f87171", "#60a5fa", "#34d399", "#a78bfa"];

export default function FloatingCandidates() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-6 right-0 lg:-right-4 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-4 py-3 flex items-center gap-3"
    >
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {AVATAR_COLORS.map((color, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-white shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
        <div className="w-7 h-7 rounded-full border-2 border-white bg-[#1DB954] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold leading-none">+</span>
        </div>
      </div>

      {/* Text */}
      <div>
        <p className="text-xs font-bold text-gray-800 leading-tight">
          5k+ candidates
        </p>
        <p className="text-[10px] text-gray-500">get job</p>
      </div>
    </motion.div>
  );
}