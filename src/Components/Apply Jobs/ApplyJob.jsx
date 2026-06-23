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
  FieldError,
  Button,
} from "@heroui/react";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiLink,
  FiUpload,
} from "react-icons/fi";
import { submitApplication } from "@/lib/Actions/Application";
import toast from "react-hot-toast";

export default function ApplyJob({ job, user }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setResume(file);
  };

  const uploadResumeToImageBB = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    return result?.data?.url || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      let resumeUrl = "";

      if (resume) {
        resumeUrl = await uploadResumeToImageBB(resume);
      }

      const applicationData = {
        jobId: job?._id,
        jobTitle: job?.jobTitle,

        recruiterId: job?.recruiterId,
        companyId: job?.companyId,

        applicantId: user?.id,
        applicantName: user?.name,
        applicantEmail: user?.email,

        phone: formData.get("phone"),
        portfolio: formData.get("portfolio"),

        coverLetter: formData.get("coverLetter"),

        resume: resumeUrl,

        status: "pending",
      };

      // console.log("Application",applicationData);

      await submitApplication(applicationData)

      toast("Application submitted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F4F6F8] min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side */}

          <div>
            <span className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
              Job Application
            </span>

            <h1 className="text-4xl font-bold text-[#091E21] mt-4">
              Apply For This Job
            </h1>

            <p className="text-gray-500 mt-3">
              Complete the application form and submit your
              profile to the recruiter.
            </p>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mt-8">
              <h3 className="font-bold text-xl text-[#091E21]">
                {job?.jobTitle}
              </h3>

              <p className="text-gray-500 mt-2">
                {job?.companyName}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-[#DFF8EC] text-[#00B96D] px-3 py-1 rounded-full text-sm">
                  {job?.type}
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {job?.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}

          <Form onSubmit={handleSubmit}>
            <Fieldset className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <Fieldset.Legend className="text-2xl font-bold text-[#091E21]">
                Application Form
              </Fieldset.Legend>

              <Description>
                Fill all required information.
              </Description>

              <FieldGroup>
                <TextField
                  name="applicantName"
                  defaultValue={user?.name}
                  isDisabled
                >
                  <Label>Applicant Name</Label>

                  <Input startContent={<FiUser />} />
                </TextField>

                <TextField
                  name="email"
                  defaultValue={user?.email}
                  isDisabled
                >
                  <Label>Email Address</Label>

                  <Input startContent={<FiMail />} />
                </TextField>

                <TextField isRequired name="phone">
                  <Label>Phone Number</Label>

                  <Input
                    placeholder="+8801XXXXXXXXX"
                    startContent={<FiPhone />}
                  />

                  <FieldError />
                </TextField>

                <TextField name="portfolio">
                  <Label>Portfolio / Github</Label>

                  <Input
                    placeholder="https://github.com/username"
                    startContent={<FiLink />}
                  />
                </TextField>

                <TextField name="coverLetter">
                  <Label>Cover Letter</Label>

                  <TextArea
                    placeholder="Tell recruiter why you are a good fit for this role..."
                  />
                </TextField>

                {/* Resume Upload */}

                <div>
                  <Label>Resume</Label>

                  <label className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B96D] transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />

                    <FiUpload
                      size={35}
                      className="text-[#00B96D]"
                    />

                    <p className="mt-3 font-medium">
                      Upload Resume
                    </p>

                    <span className="text-sm text-gray-500">
                      PDF, DOC, DOCX
                    </span>

                    {resume && (
                      <span className="text-[#00B96D] text-sm mt-2">
                        {resume.name}
                      </span>
                    )}
                  </label>
                </div>
              </FieldGroup>

              <Fieldset.Actions>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00B96D] text-white"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Application"}
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
      </div>
    </section>
  );
}