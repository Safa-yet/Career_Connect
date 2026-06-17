"use client";

import { useState } from "react";
import {
Form,
Fieldset,
FieldGroup,
TextField,
Input,
TextArea,
Label,
Description,
Button,
Select,
ListBox,
} from "@heroui/react";

// import {
// FiBriefcase,
// FiMapPin,
// FiDollarSign,
// FiBuilding,
// FiGlobe,
// } from "react-icons/fi";

import { createJob } from "@/lib/Actions/CreateJob";
import { FiBriefcase, FiDollarSign, FiGlobe, FiMapPin } from "react-icons/fi";
import { BsFillBuildingFill } from "react-icons/bs";

export default function CreateJobForm({
company,
user,
}) {
const [jobType, setJobType] = useState("");
const [category, setCategory] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const formData = new FormData(
    e.currentTarget
  );

  const jobData = {
    companyId: company._id,
    companyName: company.companyTitle,
    companyLogo: company.companyLogo,

    recruiterId: user.id,

    jobTitle: formData.get("jobTitle"),

    category,
    type: jobType,

    minSalary: Number(
      formData.get("minSalary")
    ),

    maxSalary: Number(
      formData.get("maxSalary")
    ),

    location: formData.get("location"),

    requirements: formData
      .get("requirements")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    applicationCount: 0,

    status: "active",
  };

  console.log(jobData);

  await createJob(jobData);
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}


};

return ( <section className="bg-[#F4F6F8] min-h-screen py-10"> <div className="max-w-5xl mx-auto px-5">


    {/* COMPANY CARD */}

    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-5">

        <img
          src={company?.companyLogo}
          alt={company?.companyTitle}
          className="w-24 h-24 rounded-3xl object-cover border"
        />

        <div className="flex-1">

          <h2 className="text-3xl font-bold text-[#091E21]">
            {company?.companyTitle}
          </h2>

          <p className="text-gray-500 mt-1">
            {company?.industry}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">

            <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
              <FiMapPin className="inline mr-1" />
              {company?.location}
            </span>

            <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
              <BsFillBuildingFill className="inline mr-1" />
              {company?.employeeCount}
            </span>

            <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
              <FiGlobe className="inline mr-1" />
              {company?.website}
            </span>

          </div>
        </div>

        <div>
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              company?.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {company?.status}
          </span>
        </div>
      </div>
    </div>

    {/* PENDING MESSAGE */}

    {company?.status !== "active" ? (
      <div className="bg-white rounded-3xl border border-yellow-200 p-10 text-center shadow-sm">

        <div className="text-6xl">
          ⏳
        </div>

        <h2 className="text-3xl font-bold text-[#091E21] mt-4">
          Company Approval Required
        </h2>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Before posting a job, please make sure
          your company is approved by our admin
          team.
        </p>

        <div className="mt-6 inline-flex px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
          Current Status :
          {" "}
          {company?.status}
        </div>
      </div>
    ) : (
      <Form onSubmit={handleSubmit}>
        <Fieldset className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">

          <Fieldset.Legend className="text-3xl font-bold text-[#091E21]">
            Create New Job
          </Fieldset.Legend>

          <Description>
            Post a new job for candidates.
          </Description>

          <FieldGroup>

            <TextField isRequired name="jobTitle">
              <Label>Job Title</Label>

              <Input
                placeholder="Frontend Developer"
                startContent={
                  <FiBriefcase />
                }
              />
            </TextField>

            <Select
              selectedKey={category}
              onSelectionChange={(key) =>
                setCategory(String(key))
              }
            >
              <Label>Category</Label>

              <Select.Trigger>
                <Select.Value placeholder="Select category" />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>

                  <ListBox.Item id="Web Development">
                    <Label>
                      Web Development
                    </Label>
                  </ListBox.Item>

                  <ListBox.Item id="UI UX Design">
                    <Label>
                      UI/UX Design
                    </Label>
                  </ListBox.Item>

                  <ListBox.Item id="Mobile Development">
                    <Label>
                      Mobile Development
                    </Label>
                  </ListBox.Item>

                  <ListBox.Item id="Marketing">
                    <Label>
                      Marketing
                    </Label>
                  </ListBox.Item>

                </ListBox>
              </Select.Popover>
            </Select>

            <Select
              selectedKey={jobType}
              onSelectionChange={(key) =>
                setJobType(String(key))
              }
            >
              <Label>Job Type</Label>

              <Select.Trigger>
                <Select.Value placeholder="Select type" />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>

                  <ListBox.Item id="Remote">
                    <Label>Remote</Label>
                  </ListBox.Item>

                  <ListBox.Item id="Hybrid">
                    <Label>Hybrid</Label>
                  </ListBox.Item>

                  <ListBox.Item id="On Site">
                    <Label>On Site</Label>
                  </ListBox.Item>

                  <ListBox.Item id="Part Time">
                    <Label>Part Time</Label>
                  </ListBox.Item>

                </ListBox>
              </Select.Popover>
            </Select>

            <TextField isRequired name="minSalary">
              <Label>Minimum Salary</Label>

              <Input
                type="number"
                placeholder="30000"
                startContent={
                  <FiDollarSign />
                }
              />
            </TextField>

            <TextField isRequired name="maxSalary">
              <Label>Maximum Salary</Label>

              <Input
                type="number"
                placeholder="60000"
                startContent={
                  <FiDollarSign />
                }
              />
            </TextField>

            <TextField isRequired name="location">
              <Label>Location</Label>

              <Input
                placeholder="Dhaka, Bangladesh"
                startContent={
                  <FiMapPin />
                }
              />
            </TextField>

            <TextField name="requirements">
              <Label>Requirements</Label>

              <TextArea
                placeholder="React.js, Next.js, Tailwind CSS"
              />

              <Description>
                Separate skills with commas.
              </Description>
            </TextField>

          </FieldGroup>

          <Fieldset.Actions>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00B96D] text-white"
            >
              {loading
                ? "Publishing..."
                : "Publish Job"}
            </Button>

            <Button
              type="reset"
              variant="secondary"
            >
              Reset
            </Button>

          </Fieldset.Actions>

        </Fieldset>
      </Form>
    )}
  </div>
</section>


);
}
