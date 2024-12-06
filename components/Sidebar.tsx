"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          // Handle the home route separately for exact match, others will use startsWith
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link href={link.route} key={link.label}>
              <div
                className={clsx(
                  "flex gap-4 items-center p-4 rounded-lg justify-start",
                  {
                    "bg-blue-1": isActive, // Apply the blue background when active
                    "bg-transparent": !isActive, // Transparent for inactive links
                  }
                )}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {link.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
