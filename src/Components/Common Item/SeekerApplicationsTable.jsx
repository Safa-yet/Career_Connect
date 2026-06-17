import Link from "next/link";
import { Table } from "@heroui/react";

export default function SeekerApplicationsTable({
  applications,
}) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Applications"
            className="min-w-[900px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                Job Title
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Applied Date
              </Table.Column>

              <Table.Column>
                Resume
              </Table.Column>

              <Table.Column>
                Action
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {applications.map((application) => (
                <Table.Row key={application._id}>
                  <Table.Cell>
                    <div>
                      <h3 className="font-semibold">
                        {application.jobTitle}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {application.applicantEmail}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        application.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : application.status === "shortlisted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      application.createAt
                    ).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <a
                      href={application.resume}
                      target="_blank"
                      className="text-[#00B96D] font-medium"
                    >
                      View Resume
                    </a>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      href={`/dashboard/seeker/applications/${application._id}`}
                      className="bg-[#00B96D] text-white px-4 py-2 rounded-lg text-sm"
                    >
                      View Details
                    </Link>
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