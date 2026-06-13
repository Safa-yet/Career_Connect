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

import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";
import { createJob } from "@/lib/Actions/CreateJob";

export default function CreateJobForm({ company, user }) {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const jobData = {
      companyId: company._id,
      companyName: company.companyTitle,
      companyLogo: company.companyLogo,

      recruiterId: user.id,

      jobTitle: formData.get("jobTitle"),

      category,
      type: jobType,

      minSalary: Number(formData.get("minSalary")),
      maxSalary: Number(formData.get("maxSalary")),

      location: formData.get("location"),

      requirements: formData
        .get("requirements")
        .split(",")
        .map((item) => item.trim()),

      applicationCount: 0,

      status: "active",
    };

    console.log(jobData);

    await createJob(jobData);

    setLoading(false);
  };

  return (
    <section className="bg-[#F4F6F8] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-5">
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
                  startContent={<FiBriefcase />}
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
                      <Label>Web Development</Label>
                    </ListBox.Item>

                    <ListBox.Item id="UI UX Design">
                      <Label>UI/UX Design</Label>
                    </ListBox.Item>

                    <ListBox.Item id="Mobile Development">
                      <Label>Mobile Development</Label>
                    </ListBox.Item>

                    <ListBox.Item id="Marketing">
                      <Label>Marketing</Label>
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
                  startContent={<FiDollarSign />}
                />
              </TextField>

              <TextField isRequired name="maxSalary">
                <Label>Maximum Salary</Label>

                <Input
                  type="number"
                  placeholder="60000"
                  startContent={<FiDollarSign />}
                />
              </TextField>

              <TextField isRequired name="location">
                <Label>Location</Label>

                <Input
                  placeholder="Dhaka, Bangladesh"
                  startContent={<FiMapPin />}
                />
              </TextField>

              <TextField name="requirements">
                <Label>Requirements</Label>

                <TextArea
                  placeholder="React, Next.js, Tailwind CSS"
                />

                <Description>
                  Separate skills with commas.
                </Description>
              </TextField>

            </FieldGroup>

            <Fieldset.Actions>
              <Button
                type="submit"
                className="bg-[#00B96D] text-white"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Job"}
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
      </div>
    </section>
  );
}