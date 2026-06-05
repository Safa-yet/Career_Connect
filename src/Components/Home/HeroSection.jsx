"use client";

import { motion } from "framer-motion";
import { Input, Button, Avatar } from "@heroui/react";
import { FiSearch, FiBell, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import BannerImg from "../../image/serious-woman-with-blue-folder.jpg";
import { IoSearch } from "react-icons/io5";

export default function HeroSection() {
  return (
    <section className="relative bg-[#F4F6F8] overflow-hidden min-h-screen pt-10 flex items-center">
      {/* ---------------- BACKGROUND TEAL SHAPE & GEOMETRICS ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 w-full lg:w-[55%] h-full bg-[#043330] rounded-bl-[70%]  hidden lg:block z-0 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-white/10 to-transparent transform -skew-y-12 origin-top-left" />
        <div className="absolute left-0 bottom-[40%] w-32 h-64 bg-[#DCD1F7]/20 rounded-r-full blur-sm" />
        <div
          className="absolute bottom-12 right-12 w-32 h-32 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 2px, transparent 2px)",
            backgroundSize: "14px 14px",
          }}
        />
      </motion.div>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* LEFT COLUMN: TEXT, SEARCH, STATS */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-[#091E21] leading-[1.1] tracking-tight font-sans"
          >
            Find Your <br />
            <span className="text-[#091E21]">Ideal Job</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-6 text-[#6B7280] text-sm md:text-base max-w-md leading-relaxed"
          >
            The digital marketing solution provider for Ford Dealers and Lincoln
            Retailers turned to the DataRobot.
          </motion.p>

          {/* MAIN SEARCH BAR SECTION */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    delay: 0.3,
  }}
  className="mt-8 w-full max-w-xl"
>
  <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">

    <div className="pl-3 text-gray-400 text-xl">
      <IoSearch />
    </div>

    <Input
      type="text"
      placeholder="Search jobs, companies..."
      variant="light"
      className="flex-1"
    />

    <Button
      size="lg"
      className="bg-[#00B96D] text-white px-6 md:px-8 rounded-xl font-medium"
    >
      Search
    </Button>

  </div>
</motion.div>
          {/* LOWER STATS / BANNER BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="bg-[#D3C7FF] p-6 rounded-2xl w-44 text-center shadow-sm">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#111827]">
                8M+
              </h3>
              <p className="text-xs text-[#4B5563] font-medium mt-1">
                Matches Made
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="text-lg font-bold text-[#111827] leading-snug">
                Unlocking your potential
              </h4>
              <p className="text-xs text-[#6B7280] mt-1 max-w-[200px]">
                Here to help with our logistics
              </p>
              <a
                href="#"
                className="text-[#00B96D] text-xs font-semibold mt-3 flex items-center gap-1 hover:underline"
              >
                Browse All Categories <FiArrowUpRight />
              </a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: MAIN IMAGE & FLOATING CARDS */}
        <div className="lg:col-span-7 relative flex justify-center items-center lg:h-[400px] w-full mt-12 lg:mt-0">
          {/* Main User Image Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl z-10 border-4 border-white/10"
          >
            <Image
              src={BannerImg}
              alt="Professional looking for jobs"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>

          {/* 1. FLOATING: JOB ALERT SUBSCRIBE */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -left-3 sm:left-4 top-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-100/50"
          >
            <div className="bg-[#FFF9E6] p-2.5 rounded-xl text-[#FFB800]">
              <FiBell className="text-xl fill-current" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#111827] whitespace-nowrap pr-2">
              Job Alert Subscribe
            </span>
          </motion.div>

          {/* 2. FLOATING: 5K+ CANDIDATES GET JOB */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute left-4 sm:left-12 -bottom-[10%] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 flex flex-col gap-2 border border-gray-100/50 min-w-[200px]"
          >
            <span className="text-xs font-bold text-[#111827]">
              5k+ candidates get job
            </span>

            {/* 💡 ফিক্সড এরিয়া: ডট বা কোনো কনফ্লিক্টিং মডিউল ছাড়া পিউর ফ্লেক্সবক্স দিয়ে এভাটার ওভারল্যাপ করা হয়েছে */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex -space-x-2 overflow-hidden py-1">
                <Avatar className="w-7 h-7 border-2 border-white">
                  <Avatar.Image
                    alt="Candidate 1"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                  />
                  <Avatar.Fallback>C1</Avatar.Fallback>
                </Avatar>

                <Avatar className="w-7 h-7 border-2 border-white">
                  <Avatar.Image
                    alt="Candidate 2"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
                  />
                  <Avatar.Fallback>C2</Avatar.Fallback>
                </Avatar>

                <Avatar className="w-7 h-7 border-2 border-white">
                  <Avatar.Image
                    alt="Candidate 3"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8"
                  />
                  <Avatar.Fallback>C3</Avatar.Fallback>
                </Avatar>

                <Avatar className="w-7 h-7 border-2 border-white">
                  <Avatar.Image
                    alt="Candidate 4"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=12"
                  />
                  <Avatar.Fallback>C4</Avatar.Fallback>
                </Avatar>

                <Avatar className="w-7 h-7 border-2 border-white">
                  <Avatar.Image
                    alt="Candidate 5"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=15"
                  />
                  <Avatar.Fallback>C5</Avatar.Fallback>
                </Avatar>
              </div>
              <button
                type="button"
                className="w-7 h-7 bg-[#00B96D] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm hover:bg-[#009b5a] transition-colors ml-2 z-10"
              >
                +
              </button>
            </div>
          </motion.div>

          {/* 3. FLOATING: SEARCH TALENT CARD */}
          {/* <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute -right-20 sm:right-0 -top-30 bg-white p-5 rounded-2xl shadow-xl z-20 w-[210px] sm:w-[230px] flex flex-col gap-4 border border-gray-100"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Type of Work
              </label>
              <div className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Location
              </label>
              <div className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg" />
            </div>

            <Button
              size="sm"
              className="w-full bg-[#043330] text-white text-xs font-semibold py-5 rounded-lg shadow-sm hover:opacity-90"
            >
              Search Talent
            </Button>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
