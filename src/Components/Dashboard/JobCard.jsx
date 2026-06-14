
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import {
  FiMapPin,
  FiDollarSign,
  FiUsers,
  FiArrowUpRight,
  FiBriefcase,
} from "react-icons/fi";

const formatSalary = (salary) => {
  if (!salary) return "N/A";

  const num = Number(salary);

  if (num >= 1000) {
    return `${num / 1000}k`;
  }

  return num;
};

export default function JobCard({ job }) {
  const {
    _id,
    companyName,
    companyLogo,
    jobTitle,
    category,
    type,
    minSalary,
    maxSalary,
    location,
    requirements = [],
    applicationCount = 0,
    status,
  } = job || {};

  const skills = Array.isArray(requirements)
    ? requirements
    : requirements
    ? [requirements]
    : [];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Card
        className="
          h-full
          overflow-hidden
          rounded-[30px]
          border
          border-default-200
          bg-background
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-success
          hover:shadow-[0_20px_60px_rgba(0,185,109,0.15)]
        "
      >
        {/* Top Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#00B96D] via-emerald-400 to-[#043330]" />

        {/* HEADER */}
        <Card.Header className="p-6">
          <div className="flex w-full items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                src={companyLogo}
                name={companyName || "Company"}
                className="h-16 w-16 ring-4 ring-success/10"
              />

              <div>
                <h3 className="font-bold text-lg text-foreground">
                  {companyName || "Unknown Company"}
                </h3>

                <p className="text-sm text-default-500">
                  {category || "General"}
                </p>
              </div>
            </div>

            <Chip
              size="sm"
              variant="flat"
              color={status === "active" ? "success" : "default"}
            >
              {status || "N/A"}
            </Chip>
          </div>
        </Card.Header>

        {/* CONTENT */}
        <Card.Content className="px-6 pb-6">
          {/* Job Title */}
          <h2 className="text-2xl font-extrabold leading-tight text-foreground">
            {jobTitle || "Untitled Job"}
          </h2>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip
              variant="flat"
              className="bg-success/10 text-success"
            >
              <div className="flex items-center gap-1">
                <FiBriefcase />
                {type || "N/A"}
              </div>
            </Chip>

            <Chip
              variant="flat"
              className="bg-secondary/10"
            >
              <div className="flex items-center gap-1">
                <FiUsers />
                {applicationCount} Applicants
              </div>
            </Chip>
          </div>

          {/* Info Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-default-100 bg-default-50 p-4">
              <FiMapPin className="text-success text-lg" />

              <p className="mt-2 text-xs text-default-500">
                Location
              </p>

              <h4 className="font-semibold text-foreground">
                {location || "Not Specified"}
              </h4>
            </div>

            <div className="rounded-2xl border border-default-100 bg-default-50 p-4">
              <FiDollarSign className="text-success text-lg" />

              <p className="mt-2 text-xs text-default-500">
                Salary
              </p>

              <h4 className="font-semibold text-foreground">
                ${formatSalary(minSalary)} - $
                {formatSalary(maxSalary)}
              </h4>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h4 className="mb-3 font-semibold text-foreground">
              Skills Required
            </h4>

            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="
                      rounded-full
                      bg-success/10
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-success
                    "
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-default-400">
                  No skills listed
                </span>
              )}
            </div>
          </div>
        </Card.Content>

        {/* FOOTER */}
        <Card.Footer className="border-t border-default-200 px-6 py-5">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm text-default-500">
                {applicationCount} Applications
              </p>
            </div>

            <Link href={`/jobs/${_id}`}>
              <Button
                radius="full"
                className="
                  bg-[#043330]
                  text-white
                  hover:bg-[#00B96D]
                  transition-all
                "
                endContent={<FiArrowUpRight />}
              >
                View Details
              </Button>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
}

