"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiGlobe, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function CompanyDashboardPage() {
  const [company, setCompany] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/company")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCompany(data[0]); // অ্যারের প্রথম কোম্পানিটি সরাসরি দেখাবে
        } else if (data && !Array.isArray(data)) {
          setCompany(data); // যদি এপিআই সরাসরি অবজেক্ট রিটার্ন করে
        }
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-24 font-sans selection:bg-emerald-500/30">
      
      {/* Header Panel */}
      <div className="mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Company Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Manage your official enterprise workspace identity, branding, and verification nodes.
        </p>
      </div>

      {/* Premium Standard Profile View */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white dark:bg-[#121212] rounded-[24px] border border-zinc-200 dark:border-zinc-800/80 shadow-sm overflow-hidden">
        
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-[#161616] dark:to-[#0d0d0d] relative" />
        
        <div className="px-6 pb-8 md:px-8 relative flex flex-col md:flex-row gap-6 items-start -mt-10">
          
          {/* Logo Container */}
          <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-950 p-1.5 shadow-md border border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex-shrink-0">
            <Image 
              src={company.logo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300"} 
              alt="Company Logo"
              fill
              className="object-cover rounded-lg"
              sizes="96px"
              priority
            />
          </div>

          {/* Content Body */}
          <div className="flex-1 md:pt-12 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {company.name || "Loading Company..."}
                  </h2>
                  {company.isApproved && (
                    <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">
                      <FiCheckCircle /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-wider">
                  {company.company || "Technology / Category"}
                </p>
              </div>
              
              <div className="text-[11px] text-zinc-400 font-bold bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg w-fit">
                Owner: <span className="text-zinc-700 dark:text-zinc-200 font-black">{company.ownerEmail || "N/A"}</span>
              </div>
            </div>

            {/* Grid Metadata Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <FiMapPin className="text-zinc-400 text-sm" />
                <span>{company.location || "Location Not Set"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <FiBriefcase className="text-zinc-400 text-sm" />
                <span>Size: {company.size || "1-10"} Employees</span>
              </div>
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition w-fit">
                  <FiGlobe className="text-zinc-400 text-sm" />
                  <span className="underline underline-offset-2">Visit Platform</span>
                </a>
              )}
            </div>

            {/* Overview Section */}
            <div className="mt-5 p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/60 rounded-xl">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider mb-1">Corporate Profile Overview</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium whitespace-pre-line">
                {company.description || "No description provided."}
              </p>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  );
}