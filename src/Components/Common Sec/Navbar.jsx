
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

import DarkLogo from "../../image/Dark_logopreview.png";
import LightLogo from "../../image/Light logo.png"
import Image from "next/image";

const navLinks = [
"Platform",
"Solution",
"Resources",
"Company",
];

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

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
> <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
{/* Logo */} {/* Logo */}
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
      href="#"
      className={`relative text-sm font-semibold transition-all duration-300
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

      {/* animated underline */}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}
</nav>

    {/* CTA */}
    <div className="hidden lg:block">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-xl font-medium transition"
      >
        Book A Demo
      </motion.button>
    </div>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="lg:hidden text-slate-900 dark:text-white"
    >
      {mobileOpen ? (
        <HiX size={28} />
      ) : (
        <HiOutlineMenuAlt3 size={28} />
      )}
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
          {navLinks.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-green-500"
            >
              {item}
            </Link>
          ))}

          <button className="mt-2 bg-green-500 text-white rounded-xl py-3">
            Book A Demo
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>


);
}
