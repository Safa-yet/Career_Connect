"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

import {
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";
import StatsGrid from "@/Components/Common Item/StateCard";


export default function RecruiterDashboard() {
  const stats = [
    {
      title: "Active Jobs",
      value: "24",
      subtitle: "Currently running",
      icon: FiBriefcase,
      color: "#00B96D",
    },
    {
      title: "Applications",
      value: "1,280",
      subtitle: "Received candidates",
      icon: FiFileText,
      color: "#7C3AED",
    },
    {
      title: "Shortlisted",
      value: "84",
      subtitle: "Ready for interview",
      icon: FiUsers,
      color: "#F59E0B",
    },
    {
      title: "Hired",
      value: "18",
      subtitle: "Successfully hired",
      icon: FiCheckCircle,
      color: "#0EA5E9",
    },
  ];

  return (
    <section className=" min-h-screen w-full">
      <div className="px-6  py-8">
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#091E21]">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage jobs, applications and hiring activity.
            </p>
          </div>

          <Link href="/company/create-company">
            <Button className="bg-[#00B96D] text-white">
              <FiPlus />
              Create Company
            </Button>
          </Link>
        </div>

        {/* Stats */}

        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}