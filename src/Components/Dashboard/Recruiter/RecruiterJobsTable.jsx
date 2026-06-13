"use client";

import Link from "next/link";
import { Table, Button } from "@heroui/react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function RecruiterJobsTable({ jobs }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#091E21]">
            My Job Posts
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage all jobs posted by your company
          </p>
        </div>

        <div className="bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-semibold">
          {jobs?.length || 0} Jobs
        </div>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Recruiter Jobs"
            className="min-w-[1000px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                Job Title
              </Table.Column>

              <Table.Column>
                Category
              </Table.Column>

              <Table.Column>
                Location
              </Table.Column>

              <Table.Column>
                Salary
              </Table.Column>

              <Table.Column>
                Applications
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs?.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell>
                    <div>
                      <h4 className="font-semibold text-[#091E21]">
                        {job.jobTitle}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {job.type}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {job.category}
                  </Table.Cell>

                  <Table.Cell>
                    {job.location}
                  </Table.Cell>

                  <Table.Cell>
                    ৳{job.minSalary} - ৳{job.maxSalary}
                  </Table.Cell>

                  <Table.Cell>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {job.applicationCount}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${job._id}`}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <FiEye />
                        </Button>
                      </Link>

                      <Link
                        href={`/dashboard/recruiter/jobs/edit/${job._id}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <FiEdit2 />
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="danger-soft"
                        onPress={() =>
                          console.log(
                            "Delete:",
                            job._id
                          )
                        }
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}