import React from 'react';
import { GetJobs } from '@/lib/api/jobsDAta/GetJobs';
import JobCard from '@/Components/Dashboard/JobCard';


const AllJobs = async () => {
    // Fetching jobs data from server side
    const jobsData = await GetJobs() || [];

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-[#09090b] py-12 pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Explore Available <span className="text-emerald-500 dark:text-emerald-400">Jobs</span>
                    </h1>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium">
                        Find your next career move with Career Connect. Discover high-paying remote, hybrid, and on-site opportunities.
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {jobsData.length} Open Positions
                    </div>
                </div>

                {/* Empty State Handler */}
                {jobsData.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] bg-white dark:bg-[#111115]">
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No jobs posted at the moment. Check back later!</p>
                    </div>
                ) : (
                    /* Grid Layout for Job Cards */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobsData.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default AllJobs;