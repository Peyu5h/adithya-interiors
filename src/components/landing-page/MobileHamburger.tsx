"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "~/lib/data/data";

interface MobileHamburgerProps {
  toggleMenu: boolean;
  setToggleMenu: (toggleMenu: boolean) => void;
  menuItems: MenuItem[];
}

const MobileHamburger = ({
  toggleMenu,
  setToggleMenu,
  menuItems,
}: MobileHamburgerProps) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        style={{ zIndex: 50 }}
        onClick={() => setToggleMenu(!toggleMenu)}
        className={`hamburger my-auto flex flex-col items-center justify-center space-y-1.5 px-3 py-0 focus:outline-none ${toggleMenu ? "open" : ""}`}
        type="button"
      >
        <span className="hamburger-top h-0.5 w-5 bg-black"></span>
        <span className="hamburger-middle h-0.5 w-5 bg-black"></span>
        <span className="hamburger-bottom h-0.5 w-5 bg-black"></span>
      </button>

      <div
        className={`bg-background fixed inset-0 h-screen transition-transform duration-300 ${
          toggleMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <nav className="ml-12 flex h-full flex-col items-start justify-center gap-y-8 text-black">
          {menuItems.map((item) => (
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
