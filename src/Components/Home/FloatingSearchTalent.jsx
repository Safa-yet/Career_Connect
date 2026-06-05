"use client";

import { motion } from "framer-motion";

export default function FloatingSearchTalent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 right-0 lg:-right-4 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-4 py-4 flex flex-col gap-2.5 min-w-[190px]"
    >
      {/* Type of Work */}
      <div>
        <label className="text-[10px] text-gray-400 font-medium block mb-1">
          Type of Work
        </label>
        <div className="bg-gray-100 rounded-lg h-7 w-full" />
      </div>

      {/* Position */}
      <div>
        <label className="text-[10px] text-gray-400 font-medium block mb-1">
          Position
        </label>
        <div className="bg-gray-100 rounded-lg h-7 w-full" />
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.03, backgroundColor: "#17a348" }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-[#1DB954] text-white text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer"
      >
        Search Talent
      </motion.button>
    </motion.div>
  );
}