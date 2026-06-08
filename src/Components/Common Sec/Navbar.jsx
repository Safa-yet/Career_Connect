"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiLogOut, FiUser, FiChevronDown, FiLogIn, FiCheckCircle } from "react-icons/fi"; // অতিরিক্ত আইকনসমূহ
import { Spinner, toast } from "@heroui/react"; // HeroUI থেকে Spinner ও Toast আনা হয়েছে

import DarkLogo from "../../image/Dark_logopreview.png";
import LightLogo from "../../image/Light logo.png";
import Image from "next/image";

// Better-Auth ক্লায়েন্ট ও রাউটার
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

const navLinks = [
  "Platform",
  "Solution",
  "Resources",
  "Company",
  "Dashboard"
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [isLoggingOut, setIsLoggingOut] = useState(false); // লগআউট লোডার স্টেট

  // Better-Auth সেশন হুক
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // লগআউট হ্যান্ডলার (উইথ টোস্ট অ্যান্ড স্পিনার)
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setDropdownOpen(false);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast("Logged Out", {
            description: "You have been successfully signed out.",
            variant: "flat",
            color: "success",
            indicator: <FiCheckCircle />,
          });
          router.push("/");
          router.refresh();
        },
        onError: () => {
          setIsLoggingOut(false);
        }
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-zinc-950 shadow-lg"
          : "bg-white/10 dark:bg-black/10 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={LightLogo}
            alt="logo"
            width={250}
            height={100}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`/${item.toLocaleLowerCase()}`}
              className={`relative text-sm font-semibold transition-all duration-300 group
                ${
                  scrolled
                    ? "text-slate-900 dark:text-slate-200"
                    : "text-foreground"
                }
                hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                hover:from-green-400 hover:via-emerald-500 hover:to-lime-400
              `}
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA / User Profile Area */}
        <div className="hidden lg:block min-w-[150px] flex justify-end">
          {/* সেশন চেক পেন্ডিং বা লগআউট প্রসেস রানিং থাকলে স্পিনার দেখাবে */}
          {isPending || isLoggingOut ? (
            <div className="flex items-center justify-center px-6">
              <Spinner color="success" size="sm" />
            </div>
          ) : user ? (
            /* ১. ইউজার থাকলে: প্রোফাইল ড্রপডাউন মেনু */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 transition"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-green-400"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden xl:block">
                  <p className="text-xs text-gray-400 font-medium leading-none">Welcome</p>
                  <p className={`text-sm font-semibold mt-0.5 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-foreground'}`}>
                    {user.name}
                  </p>
                </div>
                <FiChevronDown className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-2 z-10"
                    >
                      {/* প্রোফাইল অপশন */}
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl transition"
                      >
                        <FiUser className="text-lg text-gray-400" />
                        My Profile
                      </Link>

                      {/* লগআউট অপশন */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                      >
                        <FiLogOut className="text-lg" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ২. ইউজার না থাকলে: Sign In এবং Sign Up বাটন */
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/signin" 
                className={`text-sm font-semibold transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-foreground'} hover:text-green-500`}
              >
                Sign In
              </Link>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push("/auth/signup")}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-900 dark:text-white"
        >
          {mobileOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-zinc-950"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              
              {/* মোবাইল রেসপন্সিভে প্রোফাইল পার্ট */}
              {user && (
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400">Welcome</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  </div>
                </div>
              )}

              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLocaleLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-700 dark:text-slate-300 hover:text-green-500 font-medium"
                >
                  {item}
                </Link>
              ))}

              {/* মোবাইল রেসপন্সিভ কন্ডিশনাল অ্যাকশন */}
              {isPending || isLoggingOut ? (
                <div className="py-2 flex justify-center">
                  <Spinner color="success" size="sm" />
                </div>
              ) : user ? (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"
                  >
                    <FiUser /> My Profile
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full bg-red-500 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 text-sm"
                  >
                    <FiLogOut /> Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => { router.push("/auth/signin"); setMobileOpen(false); }}
                    className="border border-gray-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl py-3 text-sm font-semibold transition"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { router.push("/auth/signup"); setMobileOpen(false); }}
                    className="bg-green-500 text-white rounded-xl py-3 text-sm font-semibold shadow-md transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}