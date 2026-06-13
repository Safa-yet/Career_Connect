"use client";

import { useState } from "react";
import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  Input,
  Label,
  Description,
  FieldError,
  Button,
  Select,
  ListBox,
  toast,
} from "@heroui/react";

import { AiFillBuild } from "react-icons/ai";
import { FiGlobe, FiUpload } from "react-icons/fi";
import Image from "next/image";
import { createCompany } from "@/lib/Actions/Company";
import { useRouter } from "next/navigation";

export default function CreateCompanyForm({user,CompanyOwnerId}) {
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
  };

const uploadToImageBB = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  console.log("ImageBB Response:", result);

  return result?.data?.display_url || result?.data?.url || "";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const getFormInfo = Object.fromEntries(formData.entries());

    let companyLogo = "";

    // Upload image to ImageBB
    if (logoFile) {
      companyLogo = await uploadToImageBB(logoFile);
    }

    const companyData = {
      ...getFormInfo,
      recruite: user?.id,
      recruiterName: user?.name,
      employeeCount,
      companyLogo, 
      status: "pending",
    };

    console.log("Final Company Data:", companyData);

     createCompany(companyData);

    toast("Company Data Ready");
    router.push("/dashboard/recruiter")
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className=" w-full min-h-screen py-10">
      <div className="w-full mx-auto px-8">
        <div className="flex flex-col gap-8 items-start">
          {/* LEFT SIDE */}

          <div>
            <div className="mb-6">
              <span className="inline-flex bg-[#DFF8EC] text-[#00B96D]  p-4 rounded-full text-xl font-bold">
                Recruiter Panel
              </span>

              <h1 className="text-4xl font-bold text-[#091E21] mt-4">
                Create Your Company
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Add company information to start posting jobs and receiving
                applications from candidates.
              </p>
            </div>

           
          </div>

          {/* RIGHT SIDE */}

          <Form onSubmit={handleSubmit} className="w-full" >
            <Fieldset className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <Fieldset.Legend className="text-2xl font-bold text-[#091E21]">
                Company Details
              </Fieldset.Legend>

              <Description>
                Fill in all required company information.
              </Description>

              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextField isRequired name="companyTitle">
                  <Label>Company Name</Label>

                  <Input
                    placeholder="Google LLC"
                    startContent={<AiFillBuild />}
                  />

                  <FieldError />
                </TextField>
                <TextField isRequired name="industry">
                  <Label>Industry</Label>

                  <Input
                    placeholder="Software"
                    startContent={<AiFillBuild />}
                  />

                  <FieldError />
                </TextField>
                <TextField isRequired name="location">
                  <Label>Location</Label>

                  <Input
                    placeholder="Dhaka,Bangladesh"
                    startContent={<AiFillBuild />}
                  />

                  <FieldError />
                </TextField>

                <TextField isRequired name="website">
                  <Label>Website</Label>

                  <Input
                    placeholder="https://company.com"
                    startContent={<FiGlobe />}
                  />

                  <FieldError />
                </TextField>

                <Select
                  selectedKey={employeeCount}
                  onSelectionChange={(key) =>
                    setEmployeeCount(String(key))
                  }
                >
                  <Label>Employee Count</Label>

                  <Select.Trigger>
                    <Select.Value placeholder="Select employee range" />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="1-10">
                        <Label>1 - 10 Employees</Label>
                      </ListBox.Item>

                      <ListBox.Item id="11-50">
                        <Label>11 - 50 Employees</Label>
                      </ListBox.Item>

                      <ListBox.Item id="51-100">
                        <Label>51 - 100 Employees</Label>
                      </ListBox.Item>

                      <ListBox.Item id="101-500">
                        <Label>101 - 500 Employees</Label>
                      </ListBox.Item>

                      <ListBox.Item id="501-1000">
                        <Label>501 - 1000 Employees</Label>
                      </ListBox.Item>

                      <ListBox.Item id="1000-plus">
                        <Label>1000+ Employees</Label>
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Logo Upload */}

                <div >
                  <Label>Company Logo</Label>

                  <label className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl h-52 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B96D] transition overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />

                    {preview ? (
                      <Image
                      width={500}
                      height={500}
                        src={preview}
                        alt="Company Preview"
                        className="w-full  h-full object-contain"
                      />
                    ) : (
                      <>
                        <FiUpload
                          size={40}
                          className="text-[#00B96D]"
                        />

                        <p className="font-medium mt-3">
                          Upload Company Logo
                        </p>

                        <span className="text-sm text-gray-500">
                          PNG, JPG, WEBP
                        </span>
                      </>
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
                  {loading ? "Creating..." : "Create Company"}
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