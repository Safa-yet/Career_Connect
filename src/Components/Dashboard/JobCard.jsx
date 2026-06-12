"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiArrowUpRight,
  FiBookmark,
  FiZap,
} from "react-icons/fi";

const typeStyles = {
  "Full-time": {
    chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    dot: "bg-emerald-500",
  },
  "Part-time": {
    chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    dot: "bg-amber-500",
  },
  Remote: {
    chip: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20",
    dot: "bg-sky-500",
  },
  Contract: {
    chip: "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",
    dot: "bg-violet-500",
  },
  Internship: {
    chip: "bg-pink-50 text-pink-700 ring-1 ring-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-500/20",
    dot: "bg-pink-500",
  },
};

const formatSalary = (n) => {
  if (n == null || n === "") return "";
  const num = Number(n);
  if (Number.isNaN(num)) return n;
  if (num >= 1000) return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
  return num.toString();
};

const getDaysLeft = (deadline) => {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return null;
  const diff = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function JobCard({ job = {} }) {
  const {
    _id,
    title = "Untitled role",
    jobType = "Full-time",
    minSalary,
    maxSalary,
    currency = "USD",
    city,
    country,
    isRemote,
    deadline,
    category = "General",
    company,
    isFeatured,
  } = job;

  const style = typeStyles[jobType] || typeStyles["Full-time"];
  const daysLeft = getDaysLeft(deadline);
  const urgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 font-sans shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)] dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-emerald-400/30 via-teal-300/20 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top row: company + bookmark */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <FiBriefcase size={20} />
            {isFeatured && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] text-white ring-2 ring-white dark:ring-zinc-950">
                <FiZap size={10} />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {category}
            </p>
            <p className="truncate text-sm font-semibold text-slate-700 dark:text-zinc-300">
              {company || "Lovable Inc."}
            </p>
          </div>
        </div>

        <button
          aria-label="Save job"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-zinc-800 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10"
        >
          <FiBookmark size={16} />
        </button>
      </div>

      {/* Title */}
      <h3 className="relative mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900 line-clamp-2 dark:text-white">
        {title}
      </h3>

      {/* Chips */}
      <div className="relative mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {jobType}
        </span>
        {isRemote && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:bg-zinc-900 dark:text-zinc-300">
            Remote OK
          </span>
        )}
        {urgent && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-600 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20">
            <FiClock size={10} /> Closing soon
          </span>
        )}
      </div>

      {/* Info grid */}
      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 dark:bg-zinc-900/60">
          <FiMapPin className="flex-shrink-0 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Location
            </p>
            <p className="truncate text-xs font-bold text-slate-700 dark:text-zinc-200">
              {isRemote ? "Anywhere" : [city, country].filter(Boolean).join(", ") || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 dark:bg-zinc-900/60">
          <FiDollarSign className="flex-shrink-0 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Salary
            </p>
            <p className="truncate text-xs font-bold text-slate-700 dark:text-zinc-200">
              {minSalary || maxSalary
                ? `${formatSalary(minSalary)}${maxSalary ? `–${formatSalary(maxSalary)}` : ""} ${currency}`
                : "Negotiable"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-5 flex items-center justify-between border-t border-dashed border-slate-200 pt-4 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
          <FiCalendar className="text-slate-400" />
          <span>
            {deadline ? `Deadline: ${deadline}` : "Open until filled"}
            {daysLeft !== null && daysLeft >= 0 && (
              <span className={`ml-1.5 ${urgent ? "text-rose-500" : "text-emerald-600"}`}>
                · {daysLeft}d left
              </span>
            )}
          </span>
        </div>

<Link href={`/alljobs/${_id}`}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:gap-2.5 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 dark:bg-white dark:text-zinc-900 dark:hover:bg-emerald-400 dark:hover:text-white"
        >
          Manage
          <FiArrowUpRight size={14} />
        </motion.button>

</Link>
      </div>
    </motion.div>
  );
}
