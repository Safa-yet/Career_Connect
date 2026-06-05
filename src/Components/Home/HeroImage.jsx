import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full flex items-end"
    >
      {/* Glow circle behind */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#1a6b60] opacity-40 blur-sm" />

      {/* Image container */}
      <div className="relative z-10 w-56 sm:w-64 lg:w-96 h-80 lg:h-[400px] rounded-2xl  overflow-hidden">
        
          {/* Replace the div below with your actual image: */}
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRehXRvvfx15La4zBCmbqXwI4QBegf3TDPkJTUWu9iVM9fzLkkSsGi9KsE&s"
            alt="Job Seeker"
            fill
            className="object-cover object-top"
            priority
          />
       
        <div className="w-full h-full bg-[#2a7a6e]/40 flex items-end justify-center">
          <svg viewBox="0 0 200 340" className="w-full h-full" fill="none">
            <ellipse cx="100" cy="95" rx="52" ry="58" fill="#7fd8be" opacity="0.55" />
            <path d="M15 340 Q25 210 100 195 Q175 210 185 340Z" fill="#7fd8be" opacity="0.45" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}