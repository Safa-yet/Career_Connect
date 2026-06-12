"use client";

import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function MobileSidebar() {
  return (
    <Drawer>
      {/* Trigger */}
      <Button
        isIconOnly
        variant="light"
        className="fixed top-12 left-4 z-50 lg:hidden"
      >
        <HiOutlineMenuAlt3 size={24} />
      </Button>

      <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm">
        <Drawer.Content
          placement="left"
          className="w-[300px]"
        >
          <Drawer.Dialog className="h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">

            <Drawer.Header>
              <Drawer.Heading className="text-2xl font-bold text-green-500">
                Dashboard
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/api/jobs"
                  className="px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Jobs
                </Link>

                <Link
                  href="/dashboard/applications"
                  className="px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Applications
                </Link>
              </nav>
            </Drawer.Body>

            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Close
              </Button>
            </Drawer.Footer>

          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}