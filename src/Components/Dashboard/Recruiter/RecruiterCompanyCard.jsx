"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  FiMapPin,
  FiUsers,
  FiGlobe,
  FiEdit,
  FiClock,
} from "react-icons/fi";

export default function RecruiterCompanyCard({ company }) {
  if (!company) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
        {/* Banner */}
        <div className="h-40 bg-[#043330]" />

        <div className="px-8 pb-8 relative">
          {/* Logo */}
          <div className="-mt-16">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-white border-4 border-white shadow-lg">
              {company?.companyLogo ? (
                <Image
                  src={company.companyLogo}
                  alt={company.companyTitle}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  No Logo
                </div>
              )}
            </div>
          </div>

          {/* Header */}
          <div className="mt-5 flex flex-col lg:flex-row lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#091E21]">
                {company.companyTitle}
              </h1>

              <p className="text-gray-500 mt-2">
                {company.industry || "Industry not specified"}
              </p>

              <div className="flex flex-wrap gap-5 mt-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FiMapPin />
                  <span>{company.location || "No location"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiUsers />
                  <span>{company.employeeCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiGlobe />
                  <span>{company.website}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                  company.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : company.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {company.status}
              </span>

              <Link
                href={`/dashboard/recruiter/company/edit/${company._id}`}
              >
                <Button className="bg-[#00B96D] text-white w-full">
                  <FiEdit />
                  Edit Company
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            <div className="bg-[#F4F6F8] rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Recruiter
              </p>

              <h3 className="font-bold text-lg mt-1">
                {company.recruiterName}
              </h3>
            </div>

            <div className="bg-[#F4F6F8] rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Employees
              </p>

              <h3 className="font-bold text-lg mt-1">
                {company.employeeCount}
              </h3>
            </div>

            <div className="bg-[#F4F6F8] rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Review Status
              </p>

              <div className="flex items-center gap-2 mt-1">
                <FiClock />
                <span className="font-bold">
                  {company.status}
                </span>
              </div>
            </div>
          </div>

          {/* Pending Notice */}
          {company.status === "pending" && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <h4 className="font-semibold text-yellow-700">
                Company Under Review
              </h4>

              <p className="text-sm text-yellow-600 mt-2">
                Your company has been submitted successfully.
                An administrator will review your company before
                allowing job postings.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}