"use client";

import { useState } from "react";
import { Form, Button, Input, Label, TextField, FieldError, TextArea, Select, ListBox } from "@heroui/react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateComapny } from "@/lib/Actions/Server";


export default function RegisterCompanyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Handle ImgBB Image Upload Directly on Change
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Logo size should be up to 5MB");
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    // Integrated your active ImgBB API key directly
    const apiKey = "cbe3ccfd4a46d605cec0c1bcf20bf0af"; 
    
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    setUploadingImage(false);

    if (data.success) {
      setImageUrl(data.data.url);
      toast.success("Logo uploaded to cloud! ☁️");
    } else {
      toast.error("Failed to upload logo to ImgBB.");
    }
  };

  // Form Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const finalSubmissionData = {
      name: rawData.name,
      company: rawData.company,
      website: rawData.website ? `https://${rawData.website}` : "",
      location: rawData.location,
      size: rawData.size,
      description: rawData.description,
      logo: imageUrl, // Directly passing the ImgBB cloud link
      isApproved: true
    };

    const data = await CreateComapny(finalSubmissionData);
    setLoading(false);

    if (data?.success || data?._id) {
      toast.success("Company registered successfully! 🎉");
      return setTimeout(() => router.push("/dashboard/companies"), 1500);
    }
    
    toast.error(data?.message || "Failed to create company.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0a0a0a] p-4 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="w-full max-w-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-xl dark:shadow-2xl">
        
        {/* Form Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight">Register New Company</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Enter your business details to start hiring on HireLoop.</p>
        </div>

        {/* HeroUI Form Structure */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          
          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField isRequired name="name" type="text">
              <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Company Name</Label>
              <Input placeholder="e.g. Acme Corp" className="bg-white dark:bg-[#1a1a1a] border-zinc-200 dark:border-zinc-800 rounded-xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField isRequired name="company" type="text">
              <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Company / Category</Label>
              <Input placeholder="e.g. Technology" className="bg-white dark:bg-[#1a1a1a] border-zinc-200 dark:border-zinc-800 rounded-xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

          {/* Row 2: Website & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField name="website" type="text">
              <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Website URL</Label>
              <Input startContent={<span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">https://</span>} placeholder="www.company.com" className="bg-white dark:bg-[#1a1a1a] border-zinc-200 dark:border-zinc-800 rounded-xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField isRequired name="location" type="text">
              <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Location</Label>
              <Input placeholder="City, Country" className="bg-white dark:bg-[#1a1a1a] border-zinc-200 dark:border-zinc-800 rounded-xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

          {/* Row 3: Workforce Range & ImgBB Logo Upload Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            
            <Select isRequired name="size" placeholder="Select workforce range" defaultSelectedKeys={["1-10"]}>
              <Label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Employee Count Range</Label>
              <Select.Trigger className="bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 h-[40px]">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl">
                <ListBox>
                  {["1-10", "11-50", "51-200", "201+"].map((range) => (
                    <ListBox.Item key={range} id={range} textValue={`${range} employees`} className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">
                      {range} employees
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Logo Dropzone */}
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Company Logo</span>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a1a1a] border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-xl min-h-[56px] transition relative">
                
                {uploadingImage ? (
                  <span className="text-xs text-zinc-500 animate-pulse pl-2">Uploading logo to cloud...</span>
                ) : imageUrl ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="Preview" className="w-10 h-10 object-cover rounded-md border" />
                      <span className="text-xs text-green-500 font-medium">Uploaded Successfully</span>
                    </div>
                    <Button isIconOnly size="sm" variant="light" onClick={() => setImageUrl("")} className="text-red-500 hover:bg-red-500/10">
                      <FiX size={16} />
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="logo-upload" className="flex items-center gap-3 w-full cursor-pointer">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500"><FiUploadCloud size={16} /></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">Upload Image</span>
                      <span className="text-[10px] text-zinc-400">PNG, JPG up to 5MB</span>
                    </div>
                    <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Row 4: Description */}
          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Brief Description</span>
            <TextArea isRequired name="description" placeholder="Tell us about your company's mission and culture..." className="bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-xl h-32 w-full p-3 focus:outline-none" />
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/60 w-full">
            <Button type="button" variant="flat" className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 px-5 rounded-xl text-sm" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} isDisabled={uploadingImage} className="bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold px-6 rounded-xl text-sm">
              Register Company
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}