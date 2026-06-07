"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiHeart } from "react-icons/fi";

export default function JobCard({ job, index }) {
  // যদি স্পেশাল প্রিমিয়াম প্রো ব্যানার কার্ড হয়
  if (job.isPro) {
    return (
      <div className="bg-gradient-to-b from-[#1E0A3C] via-[#0A051D] to-[#41106E] text-white p-6 rounded-[32px] flex flex-col justify-between shadow-xl min-h-[320px]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight leading-snug">Find your <br />dream job</h2>
          <p className="text-xs text-purple-200/70 mt-3 font-medium leading-relaxed">
            Get hired faster with premium perks! Boost your visibility!
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-white text-gray-900 py-3 rounded-2xl text-xs font-bold shadow-md transition"
        >
          Get PRO for $12 per month
        </motion.button>
      </div>
    );
  }

  // নরমাল রেগুলার জব কার্ড
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${job.bgColor} p-6 rounded-[32px] flex flex-col justify-between shadow-sm border border-black/5 dark:border-white/5 min-h-[320px] transition-all`}
    >
      <div>
        {/* Salary & Brand Logo */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-black tracking-tight">{job.salary}</span>
            <span className="text-xs opacity-60 font-medium">/month</span>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${job.logoBg}`}>
            {job.logo}
          </div>
        </div>

        {/* Job Details */}
        <h3 className="text-base font-extrabold tracking-tight mb-1">{job.title}</h3>
        <p className="text-xs opacity-70 font-semibold mb-4">{job.company}</p>

        {/* Location & Time */}
        <div className="flex flex-col gap-1.5 text-[11px] font-bold opacity-75 mb-5">
          <div className="flex items-center gap-1.5">
            <FiMapPin /> <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiClock /> <span>{job.date} • <span className="opacity-90">{job.applicants} applicants</span></span>
          </div>
        </div>
      </div>

      {/* Tags & Actions */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white/50 dark:bg-black/20 rounded-full border border-black/5 dark:border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex-1 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-950 py-3 rounded-2xl text-xs font-bold shadow-sm transition">
            Apply now
          </button>
          <button className="p-3 bg-white/80 dark:bg-zinc-900/50 hover:bg-white text-zinc-800 dark:text-white rounded-2xl border border-black/5 dark:border-white/5 transition shadow-sm">
            <FiHeart className="text-base" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}