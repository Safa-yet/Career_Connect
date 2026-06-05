"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function HeroBanner() {
  return (
    <section className="bg-[#f8f8f8] min-h-screen pt-24 overflow-hidden">
      <div className=" mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[85vh]">

          {/* LEFT */}
          <div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[70px] leading-[75px] font-bold text-slate-900"
            >
              Find Your
              <br />
              Ideal Job
            </motion.h1>

            <p className="mt-5 text-gray-500 max-w-md">
              The digital marketing solution provider for food dealers
              and lunch retailers turned to the dashboard.
            </p>

            {/* Search */}
            <div className="mt-8 bg-white rounded-xl shadow-sm flex items-center p-2 max-w-md">
              <FiSearch className="text-gray-400 text-xl ml-3" />

              <input
                type="text"
                placeholder="Search Job"
                className="flex-1 outline-none px-3 py-2"
              />

              <button className="bg-green-500 text-white px-8 py-2 rounded-lg">
                Search
              </button>
            </div>

            {/* Bottom Stats */}
            <div className="flex flex-wrap gap-6 mt-14">

              <div className="bg-[#e8d8ff] rounded-xl p-6 min-w-[170px]">
                <h3 className="text-5xl font-bold">8M+</h3>
                <p className="text-sm mt-2 text-gray-600">
                  Matches Made
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-slate-900">
                  Unlocking your
                  <br />
                  potential
                </h3>

                <p className="text-gray-500 mt-2">
                  Here to help with your logistics
                </p>

                <button className="text-green-500 mt-4 font-medium">
                  Browse All Categories →
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">

            {/* Dark Shape */}
            <div className="absolute right-0 top-0 w-[90%] h-full bg-[#004c4d] rounded-bl-[120px]" />

            {/* Purple Shape */}
            <div className="absolute top-0 left-16 w-40 h-40 bg-purple-200 rotate-45 rounded-2xl" />

            {/* Main Image */}
            <div className="relative z-20 mt-10">
              <Image
                src="/hero-woman.png"
                alt="hero"
                width={420}
                height={520}
                className="rounded-md object-cover"
              />
            </div>

            {/* Job Alert Card */}
            <div className="absolute z-30 top-36 left-0 bg-white rounded-xl shadow-lg px-5 py-3">
              🔔 Job Alert Subscribe
            </div>

            {/* Search Talent Card */}
            <div className="absolute z-30 top-10 right-0 bg-white rounded-xl shadow-xl p-5 w-[220px]">

              <input
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Type of role"
              />

              <input
                className="w-full border rounded-md p-2 text-sm mt-3"
                placeholder="Position"
              />

              <button className="w-full bg-green-500 text-white rounded-md py-2 mt-3">
                Search Talent
              </button>

            </div>

            {/* Candidate Card */}
            <div className="absolute z-30 bottom-20 left-8 bg-white shadow-xl rounded-2xl px-5 py-4">
              <p className="font-semibold text-sm">
                5k+ candidates per job
              </p>

              <div className="flex mt-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="-mr-2 w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                  />
                ))}

                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs ml-1">
                  +
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute right-10 bottom-10 grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}