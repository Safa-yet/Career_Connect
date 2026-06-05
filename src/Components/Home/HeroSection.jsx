"use client";

import { motion } from "framer-motion";
// import SearchBar from "./SearchBar";
// import StatsBlock from "./StatsBlock";
// import HeroImage from "./HeroImage";
import FloatingJobAlert from "./FloatingJobAlert";
import FloatingSearchTalent from "./FloatingSearchTalent";
import FloatingCandidates from "./FloatingCandidates";


export default function HeroSection() {
  return (
    <section className="relative  bg-[#f4f6f8] overflow-hidden pt-16">
      {/* Teal Background Blob */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 w-[52%] h-full bg-[#0d4f4a] rounded-bl-[80px] overflow-hidden"
      >
        <div
          className="absolute bottom-10 right-10 w-36 h-36 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1DB954 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="absolute top-0 right-0 w-40 h-40 bg-[#7ed9b2]/10 rounded-bl-full" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-64px)]">
        <div className="z-10 flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight"
          >
            Find Your
            <br />
            Ideal Job
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 text-gray-500 text-sm lg:text-base max-w-sm leading-relaxed"
          >
            The digital marketing solution for top companies and recruiters
            turned to CareerConnect — your bridge to opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8"
          >
            {/* <SearchBar /> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.46,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            {/* <StatsBlock /> */}
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-center items-end h-[460px] lg:h-[320px]">
          {/* <HeroImage /> */}

          <FloatingJobAlert />
          <FloatingSearchTalent />
          <FloatingCandidates/>
        </div>
      </div>
    </section>
  );
}