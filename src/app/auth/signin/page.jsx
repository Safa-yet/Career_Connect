"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 
import SocialAuth from "@/Components/Common Sec/SocialAuth";


export default function SignInPage() {
  const router = useRouter();

  // স্টেট ম্যানেজমেন্ট
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  // ফর্ম ভ্যালিডেশন
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // সাবমিট হ্যান্ডলার (Better-Auth Credentials)
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        alert(error.message || "Sign In Failed", {
          description: "Incorrect email or password. Please try again.",
          variant: "flat",
          color: "danger",
          indicator: <FiAlertCircle />,
        });
      } else {
        alert("Welcome Back!", {
          description: "You have successfully logged into your account.",
          variant: "flat",
          color: "success",
          indicator: <FiCheckCircle />,
        });
        
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      alert("Unexpected Error", {
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
      
      {/* ---------------- BACKGROUND SHAPE (Luxury Teal Theme) ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 w-full lg:w-[45%] h-full bg-[#043330] rounded-bl-[100%] hidden lg:block z-0"
      >
        <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-white/5 to-transparent transform -skew-y-12 origin-top-left" />
        <div className="absolute left-0 bottom-[20%] w-24 h-48 bg-[#DCD1F7]/10 rounded-r-full blur-md" />
      </motion.div>

      {/* ---------------- LOGIN CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white/95 backdrop-blur-md w-full max-w-xl p-8 sm:p-10 rounded-[32px] shadow-2xl border border-gray-100/50 z-10"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#091E21] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* EMAIL & PASSWORD FORM */}
        <form onSubmit={handleSignIn} className="space-y-5">
          
          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#091E21]">Email Address</label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 transition-all ${errors.email ? 'border-danger text-danger' : 'border-gray-200 focus-within:border-[#00B96D]'}`}>
              <FiMail className="text-gray-400 text-lg" />
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#091E21]">Password</label>
              <a href="/auth/forgot-password" className="text-xs font-semibold text-[#00B96D] hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 transition-all ${errors.password ? 'border-danger text-danger' : 'border-gray-200 focus-within:border-[#00B96D]'}`}>
              <FiLock className="text-gray-400 text-lg" />
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
            className="w-full text-white font-medium rounded-xl shadow-lg mt-2 bg-[#00B96D] hover:bg-[#009b5a] transition-transform active:scale-[0.98]"
            endContent={!isLoading && <FiArrowRight />}
          >
            Sign In
          </Button>
        </form>

        {/* ---------------- SEPARATOR ---------------- */}
        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* ---------------- SOCIAL LOGINS ---------------- */}
        <SocialAuth />

        {/* FOOTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Dont have an account yet?{" "}
          <a href="/auth/signup" className="text-[#00B96D] font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </section>
  );
}