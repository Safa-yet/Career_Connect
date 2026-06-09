"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiGrid, FiMapPin, FiGlobe, FiBriefcase, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function CompanyDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Fetching company list from database
        const response = await fetch("http://localhost:5000/companies");
        if (!response.ok) throw new Error("Failed to load corporate records.");
        
        const data = await response.json();
        
        // Matching based on logged-in owner's email address
        const ownerEmail = user?.email || "guest-recruiter@example.com";
        const myCompany = data.find((c) => c.ownerEmail === ownerEmail);
        
        setCompany(myCompany || null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        >
          <FiLoader className="text-3xl text-[#00B96D]" />
        </motion.div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing Workspace Data...</p>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-24 font-sans selection:bg-emerald-500/30">
      
      {/* Header Panel */}
      <div className="mb-10 pb-6 border-b border-slate-100 dark:border-zinc-800/80">
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Company Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
          Manage your official enterprise workspace identity, branding, and verification nodes.
        </p>
      </div>

      {/* Conditional Layout Block */}
      {!company ? (
        // Route Trigger Configuration: No Company Linked State
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 rounded-[32px] p-12 text-center border border-slate-200/60 dark:border-zinc-800/80 shadow-2xl shadow-slate-100/40 dark:shadow-none max-w-2xl mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400 mx-auto mb-5 border border-slate-100 dark:border-zinc-800">
            <FiGrid className="text-xl text-slate-400/80" />
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-zinc-200 tracking-tight">No Active Corporate Profile</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            You haven&apos;t registered an organization yet. Setup a profile identity to start posting active public career listings.
          </p>
          <Link href="/dashboard/companies/create" className="inline-block mt-8">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#00B96D] hover:bg-green-600 text-white font-black px-6 py-3.5 rounded-xl shadow-xl shadow-green-500/20 dark:shadow-none text-sm transition duration-300"
            >
              <FiPlus className="text-lg" />
              Register Your Company
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        // Premium Profile Data Display Card
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-200/60 dark:border-zinc-800/80 shadow-2xl shadow-slate-100/40 dark:shadow-none overflow-hidden"
        >
          {/* Cover Placeholder Grid Banner */}
          <div className="h-40 bg-gradient-to-r from-[#043330] via-[#06423e] to-[#0a5751] relative" />
          
          <div className="px-6 pb-8 md:px-8 relative flex flex-col md:flex-row gap-6 items-start -mt-12">
            {/* Logo Wrapper Box */}
            <div className="w-28 h-28 rounded-2xl bg-white dark:bg-zinc-950 p-2 shadow-xl border border-slate-100 dark:border-zinc-800/60 relative overflow-hidden flex-shrink-0">
              <Image 
                src={company.logo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300"} 
                alt="Company Branding Logo"
                fill
                className="object-cover rounded-xl"
                sizes="112px"
              />
            </div>

            {/* Core Enterprise Parameters Metadata */}
            <div className="flex-1 md:pt-14 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{company.name}</h2>
                    {company.isApproved && (
                      <span className="flex items-center gap-1 text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md">
                        <FiCheckCircle /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-400 mt-0.5 uppercase tracking-wider text-xs">{company.industry}</p>
                </div>
                
                {/* Profile Meta Info Badge */}
                <div className="text-xs text-slate-400 font-bold bg-slate-50 dark:bg-zinc-950/60 border border-slate-100 dark:border-zinc-800 px-4 py-2 rounded-xl w-fit">
                  Owner Node: <span className="text-slate-700 dark:text-zinc-200 font-extrabold">{company.ownerEmail}</span>
                </div>
              </div>

              {/* Dynamic Geo & Hyperlink Node Trackers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 dark:text-zinc-400">
                  <FiMapPin className="text-[#00B96D] text-base" />
                  <span>{company.city}, {company.country}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 dark:text-zinc-400">
                  <FiBriefcase className="text-[#00B96D] text-base" />
                  <span>Size: {company.size} Employees</span>
                </div>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 dark:text-zinc-400 hover:text-[#00B96D] transition w-fit">
                    <FiGlobe className="text-[#00B96D] text-base" />
                    <span className="underline underline-offset-4">Visit Platform</span>
                  </a>
                )}
              </div>

              {/* Enterprise Summary Bio Panel */}
              <div className="mt-6 p-5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-100 dark:border-zinc-800/60 rounded-2xl">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Corporate Profile Overview</h4>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-medium whitespace-pre-line">
                  {company.description}
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}