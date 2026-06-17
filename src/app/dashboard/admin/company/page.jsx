import {
  Card,
  Table,
  Button,
} from "@heroui/react";

import {
  FiEye,
  FiCheckCircle,
  FiSlash,
  FiTrash2,
} from "react-icons/fi";

import { getCompanies } from "@/lib/Api/Company";

const AdminCompanisReview = async () => {
  const companies = await getCompanies();

  const companyList = Array.isArray(companies)
    ? companies
    : [];

  const totalCompanies = companyList.length;

  const activeCompanies = companyList.filter(
    (item) => item.status === "active"
  ).length;

  const pendingCompanies = companyList.filter(
    (item) => item.status === "pending"
  ).length;

  const blockedCompanies = companyList.filter(
    (item) => item.status === "blocked"
  ).length;

  return (
    <div className="space-y-8 p-6">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-[#091E21]">
          Company Review
        </h1>

        <p className="text-gray-500 mt-2">
          Review, approve and manage recruiter companies.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <Card>
          <Card.Content className="p-6">
            <p className="text-sm text-gray-500">
              Total Companies
            </p>

            <h2 className="text-4xl font-bold text-[#091E21] mt-2">
              {totalCompanies}
            </h2>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <p className="text-sm text-gray-500">
              Active Companies
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {activeCompanies}
            </h2>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <p className="text-sm text-gray-500">
              Pending Companies
            </p>

            <h2 className="text-4xl font-bold text-yellow-500 mt-2">
              {pendingCompanies}
            </h2>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <p className="text-sm text-gray-500">
              Blocked Companies
            </p>

            <h2 className="text-4xl font-bold text-red-500 mt-2">
              {blockedCompanies}
            </h2>
          </Card.Content>
        </Card>

      </div>

      {/* Table */}

      <Card>
        <Card.Content className="p-0">

          <Table>
            <Table.ScrollContainer>

              <Table.Content
                aria-label="Companies Table"
                className="min-w-[1200px]"
              >

                <Table.Header>

                  <Table.Column>
                    Company
                  </Table.Column>

                  <Table.Column>
                    Recruiter
                  </Table.Column>

                  <Table.Column>
                    Location
                  </Table.Column>

                  <Table.Column>
                    Website
                  </Table.Column>

                  <Table.Column>
                    Employees
                  </Table.Column>

                  <Table.Column>
                    Status
                  </Table.Column>

                  <Table.Column>
                    Actions
                  </Table.Column>

                </Table.Header>

                <Table.Body>

                  {companyList.map((company) => (
                    <Table.Row
                      key={company._id}
                    >
                      <Table.Cell>

                        <div className="flex items-center gap-3">

                          <img
                            src={company.companyLogo}
                            alt={company.companyTitle}
                            className="w-12 h-12 rounded-xl object-cover border"
                          />

                          <div>
                            <h4 className="font-semibold text-[#091E21]">
                              {company.companyTitle}
                            </h4>

                            <p className="text-xs text-gray-500">
                              {company.industry}
                            </p>
                          </div>

                        </div>

                      </Table.Cell>

                      <Table.Cell>
                        {company.recruiterName}
                      </Table.Cell>

                      <Table.Cell>
                        {company.location}
                      </Table.Cell>

                      <Table.Cell>
                        {company.website}
                      </Table.Cell>

                      <Table.Cell>
                        {company.employeeCount}
                      </Table.Cell>

                      <Table.Cell>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            company.status === "active"
                              ? "bg-green-100 text-green-700"
                              : company.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {company.status}
                        </span>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="flex items-center gap-2">

                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <FiEye />
                            View
                          </Button>

                          <Button
                            size="sm"
                            className="bg-[#00B96D] text-white"
                          >
                            <FiCheckCircle />
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            className="bg-orange-500 text-white"
                          >
                            <FiSlash />
                            Block
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                          >
                            <FiTrash2 />
                            Delete
                          </Button>

                        </div>

                      </Table.Cell>

                    </Table.Row>
                  ))}

                </Table.Body>

              </Table.Content>

            </Table.ScrollContainer>
          </Table>

        </Card.Content>
      </Card>

    </div>
  );
};

export default AdminCompanisReview;