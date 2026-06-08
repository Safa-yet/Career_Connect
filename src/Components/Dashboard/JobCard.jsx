"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function JobCard({ job }) {
  const { title, jobType, minSalary, maxSalary, currency, city, country, isRemote, deadline, category } = job;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-zinc-950 p-6 rounded-[24px] border border-slate-100 dark:border-zinc-900 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 font-sans"
    >
      <div>
        {/* Category & Job Type */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {category || "General"}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
            jobType === "Full-time" ? "bg-green-50 dark:bg-green-950/30 text-green-600" :
            jobType === "Remote" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600" :
            "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
          }`}>
            {jobType}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-black text-slate-900 dark:text-white mt-3 tracking-tight line-clamp-1">
          {title}
        </h3>

        {/* Location & Meta info */}
        <div className="flex flex-col gap-2 mt-4 text-sm font-semibold text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-slate-400 flex-shrink-0" />
            <span>{isRemote ? "Remote / Anywhere" : `${city}, ${country}`}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiDollarSign className="text-slate-400 flex-shrink-0" />
            <span>
              {minSalary} - {maxSalary} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-slate-50 dark:border-zinc-900/60 pt-4 mt-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <FiCalendar />
          <span>Deadline: {deadline}</span>
        </div>
        
        <button className="text-xs font-bold text-[#00B96D] hover:text-green-600 transition">
          Manage Job →
        </button>
      </div>
    </motion.div>
  );
}