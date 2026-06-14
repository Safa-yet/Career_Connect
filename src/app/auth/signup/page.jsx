"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Button, toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiBriefcase, 
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/'

  // স্টেট ম্যানেজমেন্ট
  const [role, setRole] = useState("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
const plan = role === "seeker" ? "seeker_free" : "recruiter_free"; 
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: undefined,
        role,
        plan
      });

      if (error) {
        toast(error.message || "Registration Failed", {
          description: "Please check your information and try again.",
          variant: "flat",
          color: "danger",
          indicator: <FiAlertCircle />,
        });
      } else {
        toast("Welcome to our platform!", {
          description: "Your account has been created successfully.",
          variant: "flat",
          color: "success",
          indicator: <FiCheckCircle />,
        });
        router.push(redirectTo);
      }
    } catch (err) {
      toast("Unexpected Error", {
        description: "Something went wrong. Please try again later.",
        variant: "flat",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-[#F4F6F8] overflow-hidden lg:pt-22 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ---------------- BACKGROUND SHAPE ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 w-full lg:w-[45%] h-full bg-[#043330] rounded-bl-[100%] hidden lg:block z-0"
      >
        <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-white/5 to-transparent transform -skew-y-12 origin-top-left" />
        <div className="absolute left-0 bottom-[20%] w-24 h-48 bg-[#DCD1F7]/10 rounded-r-full blur-md" />
      </motion.div>

      {/* ---------------- FORM CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white/95 backdrop-blur-md  w-full max-w-xl p-8 sm:p-10 rounded-[32px] shadow-2xl border border-gray-100/50 z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#091E21] tracking-tight">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join our modern job portal platform today
          </p>
        </div>

        {/* ROLE SELECTION */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole("seeker")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
              role === "seeker"
                ? "border-[#00B96D] bg-[#00B96D]/5 text-[#00B96D]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <FiUser className="text-lg" />
            Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
              role === "recruiter"
                ? "border-[#043330] bg-[#043330]/5 text-[#043330]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <FiBriefcase className="text-lg" />
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* FULL NAME */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#091E21]">Full Name</label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 transition-all ${errors.name ? 'border-danger text-danger' : 'border-gray-200 focus-within:border-[#00B96D]'}`}>
              <FiUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <p className="text-xs text-danger mt-0.5 ml-1">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#091E21]">Email Address</label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 transition-all ${errors.email ? 'border-danger text-danger' : 'border-gray-200 focus-within:border-[#00B96D]'}`}>
              <FiMail className="text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="text-xs text-danger mt-0.5 ml-1">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#091E21]">Password</label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 transition-all ${errors.password ? 'border-danger text-danger' : 'border-gray-200 focus-within:border-[#00B96D]'}`}>
              <FiLock className="text-gray-400" />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className="focus:outline-none text-gray-400 hover:text-gray-600 transition" 
                type="button" 
                onClick={toggleVisibility}
              >
                {isVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger mt-0.5 ml-1">{errors.password}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className={`w-full text-white font-medium rounded-xl shadow-lg mt-4 transition-transform active:scale-[0.98] ${
              role === "seeker" ? "bg-[#00B96D] hover:bg-[#009b5a]" : "bg-[#043330] hover:opacity-95"
            }`}
            endContent={!isLoading && <FiArrowRight />}
          >
            Sign Up as {role === "seeker" ? "Seeker" : "Recruiter"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href={`/auth/signin?redirect=${redirectTo}`} className="text-[#00B96D] font-semibold hover:underline">
            Log In
          </a>
        </p>
      </motion.div>
    </section>
  );
}