"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // ফ্রেমার মোশন ইমপোর্ট করা হলো
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য useRouter ইমপোর্ট করা হলো
import { 
  FiBriefcase, 
  FiDollarSign, 
  FiCalendar, 
  FiFileText, 
  FiCheckCircle, 
  FiInfo,
  FiPlusCircle
} from "react-icons/fi";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

// Better-Auth সেশন হুক
import { authClient } from "@/lib/auth-client";

// mock plan / company status
const mockRecruiterStatus = {
  isCompanyApproved: true,
  currentUsage: 3,
  limit: 10, 
  planName: "Growth",
  companyName: "AB Store & Electronics Ltd." 
};

// ফ্রেমার মোশন অ্যানিমেশন ভ্যারিয়েন্টস
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PostJobPage() {
  const router = useRouter(); // রাউটার ইনিশিয়েট করা হলো
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    jobType: "Full-time",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    description: "",
    requirements: "",
    benefits: ""
  });

  const isLimitReached = mockRecruiterStatus.currentUsage >= mockRecruiterStatus.limit;
  const canPostJob = mockRecruiterStatus.isCompanyApproved && !isLimitReached;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- BACKEND SUBMISSION HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPostJob) {
      toast.error("You are not allowed to post a job!");
      return;
    }

    setLoading(true);

    const finalCity = isRemote ? "Remote" : formData.city;
    const finalCountry = isRemote ? "Remote" : formData.country;

    const submissionData = {
      ...formData,
      city: finalCity,       
      country: finalCountry, 
      isRemote,
      companyName: mockRecruiterStatus.companyName,
      isCompanyApproved: mockRecruiterStatus.isCompanyApproved,
      currentUsage: mockRecruiterStatus.currentUsage,
      limit: mockRecruiterStatus.limit,
      recruiterEmail: user?.email || "guest-recruiter@example.com", 
    };

    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Job posted successfully! 🎉", {
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#043330",
            color: "#fff",
            fontWeight: "600",
          },
        });

        // সফল হলে সরাসরি ড্যাশবোর্ড পেজে রিডাইরেক্ট করবে
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);

      } else {
        toast.error(data.message || "Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Server connection failed! Please check your network.");
    } finally { // 👈 এখানে 'final' থেকে 'finally' ফিক্স করা হয়েছে
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-5xl mx-auto px-4 pb-16 font-sans"
    >
      
      {/* ---------------- HEADER & PLAN USAGE ---------------- */}
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Post a New Job
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Create a premium job post to attract top industry talent.
          </p>
        </div>

        {/* Plan Indicator Badge */}
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800/80 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <FiBriefcase className="text-lg" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Usage ({mockRecruiterStatus.planName})</p>
            <p className="text-sm font-extrabold text-slate-800 dark:text-zinc-200 mt-0.5">
              {mockRecruiterStatus.currentUsage} <span className="text-slate-400 font-medium">/ {mockRecruiterStatus.limit} Active Jobs</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* ---------------- WARNING NOTICES ---------------- */}
      {!mockRecruiterStatus.isCompanyApproved && (
        <motion.div variants={fadeInUp} className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-amber-800 dark:text-amber-300 text-sm font-semibold flex items-center gap-3">
          <FiInfo className="text-lg flex-shrink-0" />
          <span>আপনার কোম্পানিটি এখনও এডমিন দ্বারা অ্যাপ্রুভড হয়নি। জব পোস্ট করার জন্য কোম্পানি প্রোফাইলটি Approved হওয়া বাধ্যতামূলক।</span>
        </motion.div>
      )}

      {isLimitReached && (
        <motion.div variants={fadeInUp} className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-800 dark:text-red-400 text-sm font-semibold flex items-center gap-3">
          <FiInfo className="text-lg flex-shrink-0" />
          <span>আপনার প্ল্যানের একটিভ জব পোস্টের লিমিট শেষ হয়ে গেছে। নতুন জব পোস্ট করতে অনুগ্রহ করে আপগ্রেড করুন।</span>
        </motion.div>
      )}

      {/* ---------------- MAIN FORM ---------------- */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Section 1: Job Info */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800/60 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-zinc-800/60 pb-3">
              <FiInfo className="text-green-500 text-lg" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Job Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  disabled={!canPostJob || loading}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Job Category *</label>
                <input
                  type="text"
                  name="category"
                  required
                  disabled={!canPostJob || loading}
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineering"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Job Type *</label>
                <select
                  name="jobType"
                  disabled={!canPostJob || loading}
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 text-slate-700 dark:text-zinc-300 disabled:opacity-50"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Application Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  required
                  disabled={!canPostJob || loading}
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 text-slate-700 dark:text-zinc-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Salary & Location */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800/60 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/60 pb-3">
              <div className="flex items-center gap-2.5">
                <FiDollarSign className="text-green-500 text-lg" />
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Salary & Location</h2>
              </div>
              
              {/* Remote Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">Remote Work</span>
                <input 
                  type="checkbox" 
                  checked={isRemote}
                  disabled={!canPostJob || loading}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="w-4 h-4 rounded text-[#043330] focus:ring-[#043330] accent-[#00B96D] cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Min Salary *</label>
                <input
                  type="number"
                  name="minSalary"
                  required
                  disabled={!canPostJob || loading}
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="e.g. 4000"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Max Salary *</label>
                <input
                  type="number"
                  name="maxSalary"
                  required
                  disabled={!canPostJob || loading}
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="e.g. 7000"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Currency</label>
                <select
                  name="currency"
                  disabled={!canPostJob || loading}
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 text-slate-700 dark:text-zinc-300 disabled:opacity-50"
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            {/* Location fields conditionally disabled if Remote is active */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ${isRemote ? "opacity-30 pointer-events-none" : ""}`}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">City</label>
                <input
                  type="text"
                  name="city"
                  required={!isRemote}
                  disabled={loading}
                  value={isRemote ? "" : formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Country</label>
                <input
                  type="text"
                  name="country"
                  required={!isRemote}
                  disabled={loading}
                  value={isRemote ? "" : formData.country}
                  onChange={handleChange}
                  placeholder="e.g. Bangladesh"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 3: Detailed Specifications */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800/60 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-zinc-800/60 pb-3">
              <FiFileText className="text-green-500 text-lg" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Job Details & Requirements</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Responsibilities *</label>
              <textarea
                name="description"
                required
                disabled={!canPostJob || loading}
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write detailed core responsibilities here..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 resize-none text-slate-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Requirements *</label>
              <textarea
                name="requirements"
                required
                disabled={!canPostJob || loading}
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List required skills, experience, and certifications..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 resize-none text-slate-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Benefits (Optional)</label>
              <textarea
                name="benefits"
                disabled={!canPostJob || loading}
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Lunch, Medical insurance, Performance bonus, etc."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B96D]/50 disabled:opacity-50 resize-none text-slate-800 dark:text-white"
              />
            </div>
          </motion.div>

        </div>

        {/* Right 1 Column: Summary & Meta Data */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Company Autofill Preview Card */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#043330] to-[#074743] text-white p-6 rounded-[32px] shadow-xl flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full border border-white/10 w-fit text-[10px] font-bold uppercase tracking-wider">
                <FiCheckCircle className="text-[#00B96D]" /> Connected Company
              </div>
              <h3 className="text-xl font-black mt-4 tracking-tight leading-tight">
                {mockRecruiterStatus.companyName}
              </h3>
              <p className="text-xs text-green-200/70 mt-2 font-medium leading-relaxed">
                This job will be automatically linked to your registered profile and published live.
              </p>
            </div>
            
            <div className="text-xs text-white/50 font-bold border-t border-white/10 pt-4 mt-4">
              Status: <span className="text-green-400 uppercase font-black">Approved</span>
            </div>
          </motion.div>

          {/* Action Trigger Card */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800/60 shadow-sm flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Publish Options</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              By clicking "Publish Job Post", this position will become immediately visible to all active candidates on the seeker board.
            </p>

            <Button
              type="submit"
              isLoading={loading}
              disabled={!canPostJob || loading}
              className="w-full bg-[#00B96D] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/10 flex items-center justify-center gap-2 transition duration-300 disabled:opacity-50"
            >
              {!loading && <FiPlusCircle className="text-lg" />}
              {loading ? "Publishing..." : "Publish Job Post"}
            </Button>
          </motion.div>

        </div>

      </form>
    </motion.div>
  );
}