"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiLoader, FiAlertCircle, FiPlus, FiEye, FiEdit3, FiCalendar, FiMapPin, FiLayers } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Table } from "@heroui/react";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function MyJobsDashboard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        if (!response.ok) {
          throw new Error("Failed to synchronize corporate database listings.");
        }
        const data = await response.json();

        // Filtering listings by synchronized recruiter credentials
        const ownerEmail = user?.email || "guest-recruiter@example.com";
        const myPostedJobs = data.filter(job => job.recruiterEmail === ownerEmail);

        setJobs(myPostedJobs);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?.email]);

  // 1. Enhanced Premium Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-transparent">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
          />
          <FiBriefcase className="absolute text-xl text-[#00B96D]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-slate-800 dark:text-zinc-200 tracking-wider uppercase">Fetching Workspace</p>
          <p className="text-xs text-slate-400 mt-1">Synchronizing active placement criteria...</p>
        </div>
      </div>
    );
  }

  // 2. Clean Minimalist Error State
  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center px-4">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl text-red-500 shadow-sm border border-red-100 dark:border-red-900/30">
          <FiAlertCircle className="text-3xl" />
        </div>
        <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 mt-2">Database Connection Failed</h3>
        <p className="text-xs text-red-500 max-w-sm font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 font-sans selection:bg-emerald-500/30">
      
      {/* Premium Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100 dark:border-zinc-800/80">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Vacancy Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Monitor, update, and manage your active corporate listings from a unified control deck.
          </p>
        </div>

        <Link href="/dashboard/jobs">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 bg-[#00B96D] hover:bg-green-600 text-white font-black px-6 py-3.5 rounded-xl shadow-xl shadow-green-500/20 dark:shadow-none transition duration-300 text-sm tracking-wide"
          >
            <FiPlus className="text-lg" />
            Create New Vacancy
          </motion.button>
        </Link>
      </div>

      {/* Conditional Layout Strategy: Empty Workspace View vs Data Grid */}
      {jobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900/60 rounded-[32px] p-16 text-center border border-slate-200/60 dark:border-zinc-800/80 shadow-2xl shadow-slate-100/60 dark:shadow-none"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-center text-slate-400 mx-auto mb-5 border border-slate-100 dark:border-zinc-800">
            <FiLayers className="text-2xl text-slate-400/80" />
          </div>
          <h3 className="text-lg font-black text-slate-800 dark:text-zinc-200 tracking-tight">No Vacancies Published Yet</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Your active pipeline is currently empty. Initialize your recruitment process by distributing your first vacancy statement.
          </p>
          <Link href="/dashboard/jobs" className="inline-block mt-6">
            <span className="text-xs font-bold text-[#00B96D] hover:text-green-600 transition underline underline-offset-4 cursor-pointer">
              Launch Setup Configuration &rarr;
            </span>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full bg-white dark:bg-zinc-900 rounded-[28px] border border-slate-200/60 dark:border-zinc-800/80 shadow-2xl shadow-slate-100/50 dark:shadow-none overflow-hidden"
        >
          <Table aria-label="Premium Recruiter Placements Board" className="shadow-none">
            <Table.ScrollContainer>
              <Table.Content className="min-w-[900px]">
                <Table.Header>
                  <Table.Column isRowHeader className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4">Job Specification</Table.Column>
                  <Table.Column className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4">Category</Table.Column>
                  <Table.Column className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4">Operational Model</Table.Column>
                  <Table.Column className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4">Budget Provision</Table.Column>
                  <Table.Column className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4">Placement Node</Table.Column>
                  <Table.Column className="bg-slate-50/70 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 font-bold py-4 text-center">Actions</Table.Column>
                </Table.Header>
                
                <Table.Body>
                  {jobs.map((job) => (
                    <Table.Row 
                      key={job._id} 
                      className="border-b border-slate-100 dark:border-zinc-800/50 hover:bg-slate-50/40 dark:hover:bg-zinc-950/20 transition-colors"
                    >
                      {/* Job Profile Context Column */}
                      <Table.Cell className="py-4">
                        <div className="flex flex-col gap-1">
                          <div className="font-black text-slate-900 dark:text-white text-sm tracking-tight hover:text-[#00B96D] transition cursor-pointer line-clamp-1">
                            {job.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
                            <FiCalendar className="text-slate-400/80" /> Closes: {job.deadline}
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Specialized Target Category Column */}
                      <Table.Cell className="py-4 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                        {job.category || "General Core"}
                      </Table.Cell>

                      {/* Standardized Operational Model Badge Column */}
                      <Table.Cell className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          job.jobType === "Full-time" ? "bg-emerald-50/60 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30 text-emerald-600" :
                          job.jobType === "Remote" ? "bg-blue-50/60 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/30 text-blue-600" :
                          "bg-amber-50/60 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/30 text-amber-600"
                        }`}>
                          {job.jobType}
                        </span>
                      </Table.Cell>

                      {/* Financial Remuneration Parameters Column */}
                      <Table.Cell className="py-4 font-black text-slate-800 dark:text-zinc-200 text-xs tracking-wide">
                        {job.minSalary?.toLocaleString()} - {job.maxSalary?.toLocaleString()} <span className="text-slate-400 text-[10px] font-bold">{job.currency}</span>
                      </Table.Cell>

                      {/* Geographic Parameters Mapping Column */}
                      <Table.Cell className="py-4 text-xs font-bold text-slate-500 dark:text-zinc-400">
                        {job.isRemote ? (
                          <span className="text-[#00B96D] font-black tracking-widest uppercase text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-md">Distributed</span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <FiMapPin className="text-slate-400" /> {job.city}, {job.country}
                          </span>
                        )}
                      </Table.Cell>

                      {/* Action Command Framework Controls Column */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center justify-center gap-2.5">
                          {/* Deep Inspection Route */}
                          <Link href={`/jobs/${job._id}`} title="Inspect Dynamic View">
                            <motion.div 
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.93 }}
                              className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 hover:text-[#00B96D] dark:hover:text-[#00B96D] hover:bg-emerald-500/5 transition border border-slate-100 dark:border-zinc-700/50 cursor-pointer shadow-sm"
                            >
                              <FiEye className="text-sm" />
                            </motion.div>
                          </Link>

                          {/* Data Mutation Route */}
                          <Link href={`/dashboard/jobs/edit/${job._id}`} title="Modify Parameters">
                            <motion.div 
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.93 }}
                              className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/5 transition border border-slate-100 dark:border-zinc-700/50 cursor-pointer shadow-sm"
                            >
                              <FiEdit3 className="text-sm" />
                            </motion.div>
                          </Link>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </motion.div>
      )}

    </div>
  );
}