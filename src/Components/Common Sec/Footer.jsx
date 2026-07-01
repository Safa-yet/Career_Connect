"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import DarkLogo from "../../image/Dark_logopreview.png";
import LightLogo from "../../image/Light logo.png"
import Image from "next/image";
import {
  FiBriefcase,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiGlobe,
} from "react-icons/fi";


const socialLinks = [
  {
    icon: FiLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FiGithub,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: FiTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
];

const footerLinks = {
  Platform: [
    "Job Search",
    "Job Alerts",
    "Companies",
    "Career Advice",
  ],

  Resources: [
    "Blog",
    "Help Center",
    "Resume Tips",
    "Interview Guide",
  ],

  Company: [
    "About Us",
    "Careers",
    "Contact",
    "Partners",
  ],

  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-divider">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">

            {/* Brand */}

            <div className="lg:col-span-2">
               <Link href="/">

          <Image
            src={LightLogo}
            alt="logo"
            width={250}
            height={100}
          />


        </Link>

              <p className="text-default-500 text-sm leading-7 max-w-sm">
                Empowering professionals to discover meaningful
                careers and helping companies build exceptional teams.
              </p>

              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-full bg-default-100 hover:bg-[#00B96D] hover:text-white transition-all flex items-center justify-center text-default-600"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Footer Menus */}

            {Object.entries(footerLinks).map(
              ([title, links]) => (
                <div key={title}>
                  <h3 className="font-semibold text-foreground mb-5">
                    {title}
                  </h3>

                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <Link
                          href="/"
                          className="text-sm text-default-500 hover:text-[#00B96D] transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Bottom */}

        <div className="border-t border-divider py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-default-500">
            © 2026 CarrerConnect. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-default-500">
            <FiGlobe size={16} />
            <span className="text-sm">
              English (US)
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}