"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  FiGrid,
  FiBriefcase,
  FiFileText,
  FiLayers,
  FiUsers,
  FiFolder,
  FiBarChart2,
  FiSettings,
  FiChevronRight,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import MobileSidebar from "./MobileSidebar";
// import MobileSidebar from "./MobileSidebar";

const menuItems = [
  { name: "Dashboard", icon: FiGrid, path: "/dashboard" },
  { name: "Jobs", icon: FiBriefcase, path: "/dashboard/jobs" },
  { name: "Applications", icon: FiFileText, path: "/dashboard/applications" },
  { name: "Companies", icon: FiLayers, path: "/dashboard/companies" },
  { name: "Users", icon: FiUsers, path: "/dashboard/users" },
  { name: "Categories", icon: FiFolder, path: "/dashboard/categories" },
  { name: "Reports", icon: FiBarChart2, path: "/dashboard/reports" },
  { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
];

export default function SideBar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [notificationCount] = useState(12);

  return (
    <>
      {/* Mobile Drawer */}
      <MobileSidebar
        menuItems={menuItems}
        user={user}
        notificationCount={notificationCount}
      />

      {/* Desktop Sidebar */}
      <aside
      suppressHydrationWarning
        className="
        hidden lg:flex
        w-72
        h-[calc(100vh-80px)]
        sticky
        top-20
        left-0
        bg-slate-50/80
        dark:bg-zinc-950/80
        backdrop-blur-3xl
        shadow-xl
        border-r
        border-slate-200/60
        dark:border-zinc-900/60
        flex-col
        justify-between
        py-6
        px-4
        rounded-xl
        "
      >
        <div>
          <div className="mb-8 px-2">
            <h1 className="text-3xl font-bold text-green-500">
              Dashboard
            </h1>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.path ||
                (item.path !== "/dashboard" &&
                  pathname.startsWith(item.path));

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`relative flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 dark:text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl" />
                      <span>{item.name}</span>
                    </div>

                    <FiChevronRight />

                    {isActive && (
                      <>
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r" />

                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-[#043330] to-[#074743] rounded-2xl -z-10"
                        />
                      </>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        <div className="border-t border-default-200 pt-5 mt-2 w-full">
          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-2x w-full">
            <div className="flex items-center gap-3 w-full">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B96D] to-[#043330] flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div>
                <h4 className="font-semibold text-sm truncate">
                  {user?.name || "Guest User"}
                </h4>

                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "guest@example.com"}
                </p>
              </div>
            </div>

            <Link href="/dashboard/settings">
              <FiSettings className="text-lg" />
            </Link>
          </div>
        </div>
        </div>

      </aside>
    </>
  );
}