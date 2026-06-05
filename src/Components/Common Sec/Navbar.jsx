// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// const NAV_LINKS = ["Platform", "Solution", "Resources", "Company"];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);

//     window.addEventListener("scroll", onScroll);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -70, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white/90 backdrop-blur-md shadow-md"
//           : "bg-white"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 select-none group"
//         >
//           <motion.div
//             whileHover={{ scale: 1.08 }}
//             className="w-8 h-8 bg-[#1DB954] rounded-md flex items-center justify-center shadow-sm"
//           >
//             <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
//               <path d="M4 4h3.5l9 12H20V4h-3.5L7.5 16H4V4z" />
//             </svg>
//           </motion.div>

//           <span className="text-xl font-bold tracking-tight text-gray-900">
//             Career<span className="text-[#1DB954]">Connect</span>
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <nav className="hidden md:flex items-center gap-8">
//           {NAV_LINKS.map((link, i) => (
//             <motion.div
//               key={link}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.15 + i * 0.07 }}
//             >
//               <Link
//                 href="#"
//                 className="text-sm font-medium text-gray-600 hover:text-gray-900 relative group transition-colors"
//               >
//                 {link}
//                 <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1DB954] group-hover:w-full transition-all duration-300 rounded-full" />
//               </Link>
//             </motion.div>
//           ))}
//         </nav>

//         {/* CTA Button */}
//         <motion.button
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5 }}
//           whileHover={{ scale: 1.05, backgroundColor: "#17a348" }}
//           whileTap={{ scale: 0.97 }}
//           className="hidden md:inline-flex items-center gap-2 bg-[#1DB954] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-green-200 transition-colors cursor-pointer"
//         >
//           Book A Demo
//         </motion.button>

//         {/* Mobile Hamburger */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="md:hidden p-2 rounded-lg hover:bg-gray-100 flex flex-col gap-1"
//           aria-label="Toggle menu"
//         >
//           <motion.span
//             animate={
//               mobileOpen
//                 ? { rotate: 45, y: 6 }
//                 : { rotate: 0, y: 0 }
//             }
//             className="block w-5 h-0.5 bg-gray-700 origin-center transition-all"
//           />

//           <motion.span
//             animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
//             className="block w-5 h-0.5 bg-gray-700"
//           />

//           <motion.span
//             animate={
//               mobileOpen
//                 ? { rotate: -45, y: -6 }
//                 : { rotate: 0, y: 0 }
//             }
//             className="block w-5 h-0.5 bg-gray-700 origin-center transition-all"
//           />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden overflow-hidden bg-white border-t border-gray-100 px-6 pb-5"
//           >
//             <div className="pt-3 flex flex-col gap-1">
//               {NAV_LINKS.map((link) => (
//                 <Link
//                   key={link}
//                   href="#"
//                   className="block py-2.5 text-sm font-medium text-gray-700 hover:text-[#1DB954] transition-colors"
//                 >
//                   {link}
//                 </Link>
//               ))}

//               <button className="mt-3 w-full bg-[#1DB954] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#17a348] transition-colors">
//                 Book A Demo
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

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
{/* Logo */} <Link
       href="/"
       className="flex items-center gap-2"
     > <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
J </div>


      <span className="text-xl font-bold text-slate-900 dark:text-white">
        Job<span className="text-green-500">Fine</span>
      </span>
    </Link>

    {/* Desktop Menu */}
    <nav className="hidden lg:flex items-center gap-10">
      {navLinks.map((item) => (
        <Link
          key={item}
          href="#"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-green-500 transition-colors"
        >
          {item}
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
