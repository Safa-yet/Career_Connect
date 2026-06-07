"use client";

import React from "react";

export default function JobFilter() {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/60 shadow-sm h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Filters</h3>
        <button className="text-xs font-bold text-blue-500 hover:underline">Reset all</button>
      </div>

      {/* Filter Group: Work Schedule */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Work schedule</h4>
        <div className="flex flex-col gap-2.5">
          {["Full-time", "Part-time", "Internship", "Project work", "Volunteering"].map((label, idx) => (
            <label key={label} className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-zinc-300 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={idx < 2 || idx === 3} 
                className="w-4 h-4 rounded text-[#043330] focus:ring-[#043330] accent-[#043330]" 
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Filter Group: Employment Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Employment type</h4>
        <div className="flex flex-col gap-2.5">
          {["Full day", "Flexible schedule", "Shift work", "Distant work"].map((label, idx) => (
            <label key={label} className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-zinc-300 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={idx === 0 || idx === 2} 
                className="w-4 h-4 rounded text-[#043330] focus:ring-[#043330] accent-[#043330]" 
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}