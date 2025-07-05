"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { Shapes } from "lucide-react"; // Only Shapes is needed, Settings, MdOutlineAssignment, MdOutlineChatBubbleOutline are not used in the project structure
import {
  MdOutlineAssignment,
  MdOutlineChatBubbleOutline,
} from "react-icons/md"; // Keeping these imports for now, but they will likely be removed later if not used.

const MobileHamburger = ({
  toggleMenu,
  setToggleMenu,
}: {
  toggleMenu: boolean;
  setToggleMenu: (toggleMenu: boolean) => void;
}) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="md:hidden">
      <div className="absolute top-9 right-6 z-50">
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className={`hamburger block focus:outline-none ${toggleMenu ? "open" : ""}`}
          type="button"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      <div
        className={`bg-background fixed inset-0 h-screen transition-transform duration-300 ${
          toggleMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <nav className="ml-12 flex h-full flex-col items-start justify-center gap-y-8 text-black">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-x-4 text-2xl font-medium ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-gray-900"
                  : "text-gray-600"
              }`}
              onClick={() => setToggleMenu(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileHamburger;
