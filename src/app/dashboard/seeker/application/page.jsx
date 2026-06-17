import Link from "next/link";
import { getApplicationByApplicant } from "@/lib/Api/Application";
import { getUserSession } from "@/lib/ReuseableFunc/session";
import SeekerApplicationsTable from "@/Components/Common Item/SeekerApplicationsTable";
// import SeekerApplicationsTable from "@/Components/Dashboard/Seeker/SeekerApplicationsTable";

const SeekerApplication = async () => {
  const user = await getUserSession();

  const applications = await getApplicationByApplicant(user.id);

  const pendingCount = applications.filter(
    (item) => item.status === "pending"
  ).length;

  const shortlistedCount = applications.filter(
    (item) => item.status === "shortlisted"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "rejected"
  ).length;

  if (!applications?.length) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-white border rounded-3xl p-12 max-w-xl w-full text-center shadow-sm">
          <h1 className="text-4xl font-bold text-[#091E21]">
            No Applications Yet
          </h1>

          <p className="text-gray-500 mt-4">
            You haven't applied to any jobs yet. Start exploring
            opportunities and track your applications here.
          </p>

          <Link
            href="/jobs"
            className="inline-flex mt-8 bg-[#00B96D] text-white px-6 py-3 rounded-xl font-medium"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-[#091E21]">
          My Applications
        </h1>

        <p className="text-gray-500 mt-2">
          Track all your job applications in one place.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Applications
          </p>

          <h2 className="text-4xl font-bold text-[#091E21] mt-2">
            {applications.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-gray-500 text-sm">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-gray-500 text-sm">
            Shortlisted
          </p>

          <h2 className="text-4xl font-bold text-[#00B96D] mt-2">
            {shortlistedCount}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-gray-500 text-sm">
            Rejected
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {rejectedCount}
          </h2>
        </div>
      </div>

      {/* Table */}

      <SeekerApplicationsTable
        applications={applications}
      />
    </div>
  );
};

export default SeekerApplication;