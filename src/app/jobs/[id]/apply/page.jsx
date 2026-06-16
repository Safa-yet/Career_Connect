import ApplyJob from '@/Components/Apply Jobs/ApplyJob';
import { getApplicationByApplicant } from '@/lib/Api/Application';
import { getJobDetails } from '@/lib/Api/Jobs';
import { getPlanById } from '@/lib/Api/plans';
import { getUserSession } from '@/lib/ReuseableFunc/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async({params}) => { 
    const {id} = await params;
    
    const user = await getUserSession();
    const job = await getJobDetails(id);
    const applicatios = await getApplicationByApplicant(user?.id)
    const plan = await getPlanById(user?.plan || 'seeker_free')

console.log("plan ", plan);
  

    if(!user){
redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }
    return (
  <div className="min-h-screen bg-[#F4F6F8] pt-24 pb-10">
    <div className="max-w-6xl mx-auto px-5">
      {/* Top Banner */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <span className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
              Application Plan
            </span>

            <h1 className="text-3xl font-bold text-[#091E21] mt-4">
              Monthly Application Usage
            </h1>

            <p className="text-gray-500 mt-2">
              Track how many jobs you've applied for this month.
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-4xl font-bold text-[#091E21]">
              {applicatios.length}/{plan.maxApplicationlength}
            </h3>

            <p className="text-sm text-gray-500">
              Applications Used
            </p>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-[#091E21]">
              Progress
            </span>

            <span className="text-[#00B96D] font-semibold">
              {Math.round(
                (applicatios.length /
                  plan.maxApplicationlength) *
                  100
              )}
              %
            </span>
          </div>

          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                applicatios.length >=
                plan.maxApplicationlength
                  ? "bg-red-500"
                  : "bg-[#00B96D]"
              }`}
              style={{
                width: `${Math.min(
                  (applicatios.length /
                    plan.maxApplicationlength) *
                    100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Limit Crossed */}

      {applicatios.length >= plan.maxApplicationlength ? (
        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center text-5xl">
            🚫
          </div>

          <h2 className="text-3xl font-bold text-[#091E21] mt-6">
            Monthly Limit Reached
          </h2>

          <p className="text-gray-500 max-w-lg mx-auto mt-3">
            You've used all{" "}
            <span className="font-semibold">
              {plan.maxApplicationlength}
            </span>{" "}
            applications available in your current plan for this month.
          </p>

          <p className="text-gray-500 mt-2">
            Upgrade your plan to continue applying for more jobs.
          </p>

          <Link
            href="/plans"
            className="inline-block mt-8"
          >
            <button className="bg-[#00B96D] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
              Upgrade Plan
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Remaining Applications Card */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#091E21]">
                  Remaining Applications
                </h3>

                <p className="text-gray-500 mt-1">
                  You can still apply for more jobs this month.
                </p>
              </div>

              <div className="bg-[#DFF8EC] text-[#00B96D] px-5 py-3 rounded-2xl">
                <span className="text-2xl font-bold">
                  {plan.maxApplicationlength -
                    applicatios.length}
                </span>
              </div>
            </div>
          </div>

          <ApplyJob
            job={job}
            user={user}
          />
        </>
      )}
    </div>
  </div>
);
};

export default ApplyPage;