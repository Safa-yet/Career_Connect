"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Button,
  Select,
  ListBox,
} from "@heroui/react";

import {
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      });

      if (error) {
        alert(error.message || "Signup failed");
        return;
      }

      alert("Account created successfully");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign up and start your journey
        </p>

        <Form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <TextField isRequired name="name">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              startContent={<FiUser />}
            />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input
              placeholder="john@example.com"
              startContent={<FiMail />}
            />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input
              placeholder="Enter password"
              startContent={<FiLock />}
            />
            <FieldError />
          </TextField>

          {/* Role */}
          <Select
            name="role"
            isRequired
          >
            <Label>Select Role</Label>

            <Select.Trigger>
              <Select.Value placeholder="Choose your role" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="candidate">
                  Candidate
                </ListBox.Item>

                <ListBox.Item id="recruiter">
                  Recruiter
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
          >
            Create Account
          </Button>
        </Form>
      </div>
    </section>
  );
}