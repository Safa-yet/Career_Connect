"use client";

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

import JobFilter from "@/Components/Dashboard/JobFilter";
import JobCard from "@/Components/Dashboard/JobCard";
;

const jobsData = [
  {
    id: 1,
    title: "UX Researcher",
    company: "Motorola",
    logo: "M",
    logoBg: "bg-black text-white",
    salary: "$7,800",
    location: "Houston, TX",
    date: "5 September",
    applicants: 159,
    tags: ["Full-time", "Hybrid", "4-6 years"],
    bgColor: "bg-purple-100/70 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200",
  },
  {
    id: "pro-card",
    isPro: true,
  },
  {
    id: 3,
    title: "Lead UX Researcher",
    company: "PayPal",
    logo: "P",
    logoBg: "bg-blue-600 text-white",
    salary: "$6,000",
    location: "Los-Angeles, CA",
    date: "3 September",
    applicants: 179,
    tags: ["Project work", "Office", "8+ years"],
    bgColor: "bg-blue-100/70 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200",
  },
  {
    id: 4,
    title: "Middle UI Designer",
    company: "Microsoft",
    logo: "MS",
    logoBg: "bg-white text-black border",
    salary: "$5,250",
    location: "Redmond, WA",
    date: "2 September",
    applicants: 196,
    tags: ["Full-time", "Office", "4-6 years"],
    bgColor: "bg-green-100/70 dark:bg-green-950/20 text-green-900 dark:text-green-200",
  },
  {
    id: 5,
    title: "Interface designer",
    company: "Netflix",
    logo: "N",
    logoBg: "bg-red-600 text-white",
    salary: "$3,700",
    location: "San-Francisco, CA",
    date: "29 August",
    applicants: 115,
    tags: ["Part-time", "Office", "4-6 years"],
    bgColor: "bg-red-100/70 dark:bg-red-950/20 text-red-900 dark:text-red-200",
  },
  {
    id: 6,
    title: "Art Director",
    company: "X Corp.",
    logo: "X",
    logoBg: "bg-black text-white",
    salary: "$9,500",
    location: "Houston, TX",
    date: "28 August",
    applicants: 159,
    tags: ["Full-time", "Hybrid", "7-10 years"],
    bgColor: "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-zinc-200",
  },
];

export default function EmployerPage() {
  const [search, setSearch] = useState("UX/UI Designer");

  return (
    <div className="flex bg-[#F8FAFC] dark:bg-zinc-950 min-h-screen">


      {/* ২. মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        
        {/* Top Header / Search Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#043330]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl text-xs font-bold shadow-sm">
              <span>United States</span>
              <FiX className="cursor-pointer text-gray-400 hover:text-red-500" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl text-xs font-bold shadow-sm">
              <span>5+ years experience</span>
              <FiX className="cursor-pointer text-gray-400 hover:text-red-500" />
            </div>
          </div>
        </div>

        {/* 3 Column Grid Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">


          {/* জব কার্ড গ্রিড কলাম */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobsData.map((job, index) => (
              <JobCard key={job.id || index} job={job} index={index} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}