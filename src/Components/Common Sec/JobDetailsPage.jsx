"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobDetailsPage({ job, user }) {
  const [saved, setSaved] = useState(false);

  const isRecruiter = user?.role === "recruiter";

  const handleSave = () => {
    setSaved(!saved);
  };

//   const handleApply = () => {
//     alert("Application sent!");
//   };

  const salaryRange = `${job?.minSalary} - ${job?.maxSalary} USD`;

  return (
    <div className="min-h-screen transition-colors duration-300
      bg-gray-50 text-gray-900
      dark:bg-gray-950 dark:text-white">

      {/* HERO */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 pt-6 lg:pt-12">

        <div className="absolute inset-0 bg-gradient-to-r
          from-green-100/40 via-transparent to-blue-100/30
          dark:from-green-500/10 dark:to-blue-500/10" />

        <div className="relative max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-5">

            <div className="p-1 rounded-2xl bg-white dark:bg-gray-900 shadow-md">
              <img
                src={job?.companyLogo}
                alt="logo"
                className="h-16 w-16 rounded-xl object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {job?.jobTitle}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {job?.companyName} • {job?.location}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">

            {/* SAVE */}
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl border transition-all duration-200
                ${
                  saved
                    ? "bg-green-500 text-black border-green-500"
                    : "border-gray-300 dark:border-gray-700 hover:border-green-500"
                }`}
            >
              {saved ? "Saved ❤️" : "Save"}
            </button>

            {/* APPLY */}
            {!isRecruiter && (
                <Link href={`/jobs/${job._id}/apply`}>
                
              <button
                
                className="px-5 py-2 rounded-xl font-semibold
                bg-green-500 text-black hover:bg-green-400
                shadow-md hover:shadow-green-400/30 transition"
              >
                Apply Now
              </button>
                </Link>
            )}

          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* DESCRIPTION (since not in DB, fallback) */}
          <div className="p-6 rounded-2xl border
            bg-white border-gray-200 shadow-sm
            dark:bg-gray-900 dark:border-gray-800">

            <h2 className="text-xl font-semibold mb-3">Job Details</h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This is a {job?.category} role for a {job?.jobTitle} position.
              Join {job?.companyName} and work in a {job?.type} environment.
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div className="p-6 rounded-2xl border
            bg-white border-gray-200 shadow-sm
            dark:bg-gray-900 dark:border-gray-800">

            <h2 className="text-xl font-semibold mb-3">Requirements</h2>

            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              {job?.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* OVERVIEW */}
          <div className="p-6 rounded-2xl border
            bg-white border-gray-200 shadow-sm
            dark:bg-gray-900 dark:border-gray-800">

            <h3 className="text-lg font-semibold mb-4">Job Overview</h3>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

              <p><span className="text-gray-500 dark:text-gray-400">Category:</span> {job?.category}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Type:</span> {job?.type}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Salary:</span> {salaryRange}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Location:</span> {job?.location}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Applications:</span> {job?.applicationCount}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Status:</span> {job?.status}</p>

            </div>
          </div>

          {/* COMPANY */}
          <div className="p-6 rounded-2xl border
            bg-white border-gray-200 shadow-sm
            dark:bg-gray-900 dark:border-gray-800">

            <h3 className="text-lg font-semibold mb-3">Company</h3>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={job?.companyLogo}
                className="h-10 w-10 rounded-lg"
                alt="company"
              />
              <p className="font-medium">{job?.companyName}</p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Recruiter managed job posting from {job?.companyName}.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}