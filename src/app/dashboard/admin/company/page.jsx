import Image from "next/image";
import {
  Table,
  Card,
} from "@heroui/react";

import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import { getCompanies } from "@/lib/Api/Company";
import CompanyActions from "@/Components/Dashboard/Comapny/CompanyActions";
// import CompanyActions from "@/Components/Admin/CompanyActions";

const AdminCompanisReview = async () => {
  const companies = await getCompanies();

  const totalCompanies =
    companies?.length || 0;

  const approvedCompanies =
    companies?.filter(
      (item) => item.status === "approved"
    ).length || 0;

  const pendingCompanies =
    companies?.filter(
      (item) => item.status === "pending"
    ).length || 0;

  const rejectedCompanies =
    companies?.filter(
      (item) => item.status === "rejected"
    ).length || 0;

  return (
    <div className="p-6 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[#091E21]">
          Company Review Management
        </h1>

        <p className="text-gray-500 mt-2">
          Review, approve, reject and manage companies.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Companies
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalCompanies}
              </h2>
            </div>

            <FiBriefcase
              size={28}
              className="text-[#00B96D]"
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Approved
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {approvedCompanies}
              </h2>
            </div>

            <FiCheckCircle
              size={28}
              className="text-green-600"
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2 text-yellow-500">
                {pendingCompanies}
              </h2>
            </div>

            <FiClock
              size={28}
              className="text-yellow-500"
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Rejected
              </p>

              <h2 className="text-3xl font-bold mt-2 text-red-500">
                {rejectedCompanies}
              </h2>
            </div>

            <FiXCircle
              size={28}
              className="text-red-500"
            />
          </div>
        </Card>

      </div>

      {/* Table */}

      <Card className="p-5">

        <Table>
          <Table.ScrollContainer>

            <Table.Content
              aria-label="Companies Table"
              className="min-w-[1100px]"
            >
              <Table.Header>

                <Table.Column>
                  Company
                </Table.Column>

                <Table.Column>
                  Industry
                </Table.Column>

                <Table.Column>
                  Location
                </Table.Column>
                <Table.Column>
                Available jobs
                </Table.Column>

                <Table.Column>
                  Employees
                </Table.Column>

                <Table.Column>
                  Recruiter
                </Table.Column>

                <Table.Column>
                  Status
                </Table.Column>

                <Table.Column>
                  Actions
                </Table.Column>

              </Table.Header>

              <Table.Body>

                {companies?.map((company) => (
                  <Table.Row key={company._id}>

                    <Table.Cell>
                      <div className="flex items-center gap-3">

                        <Image
                          src={
                            company.companyLogo ||
                            "/placeholder.png"
                          }
                          alt={
                            company.companyTitle
                          }
                          width={50}
                          height={50}
                          className="rounded-xl border"
                        />

                        <div>
                          <h3 className="font-semibold">
                            {company.companyTitle}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {company.website}
                          </p>
                        </div>

                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      {company.industry}
                    </Table.Cell>

                    <Table.Cell>
                      {company.location}
                    </Table.Cell>
                    <Table.Cell>
                      {company.jobCount}
                    </Table.Cell>

                    <Table.Cell>
                      {company.employeeCount}
                    </Table.Cell>

                    <Table.Cell>
                      {company.recruiterName}
                    </Table.Cell>

                    <Table.Cell>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          company.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : company.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {company.status}
                      </span>

                    </Table.Cell>

                    <Table.Cell>
                      <CompanyActions
                        company={company}
                      />
                    </Table.Cell>

                  </Table.Row>
                ))}

              </Table.Body>
            </Table.Content>

          </Table.ScrollContainer>
        </Table>

      </Card>

    </div>
  );
};

export default AdminCompanisReview;