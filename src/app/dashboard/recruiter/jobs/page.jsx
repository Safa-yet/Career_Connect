import Link from "next/link";
import { Button } from "@heroui/react";

import RecruiterJobsTable from "@/Components/Dashboard/Recruiter/RecruiterJobsTable";
import { getRecruiterJobs } from "@/lib/Api/Jobs";
import { getUserSession } from "@/lib/ReuseableFunc/session";

export default async function RecruiterJobsPage() {
  const user = await getUserSession();

  const jobs = await getRecruiterJobs(user.id);

  const hasJobs = Array.isArray(jobs) && jobs.length > 0;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
              Recruiter Dashboard
            </span>

            <h1 className="text-3xl font-bold text-[#091E21] mt-3">
              Manage Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              Create, edit and manage all your job postings.
            </p>
          </div>

          {hasJobs && (
            <Link href="/dashboard/recruiter/jobs/create">
              <Button className="bg-[#00B96D] text-white">
                Create New Job
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Jobs Section */}

      {hasJobs ? (
        <RecruiterJobsTable jobs={jobs} />
      ) : (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-12 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#DFF8EC] flex items-center justify-center text-5xl">
            💼
          </div>

          <h2 className="text-3xl font-bold text-[#091E21] mt-6">
            No Jobs Posted Yet
          </h2>

          <p className="text-gray-500 max-w-md mx-auto mt-3">
            Your company hasn't posted any jobs yet.
            Create your first job post and start receiving
            applications from talented candidates.
          </p>

          <Link href="/dashboard/recruiter/jobs/create">
            <Button className="bg-[#00B96D] text-white mt-8">
              Create First Job
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}