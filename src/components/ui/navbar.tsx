"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import MobileHamburger from "~/components/MobileHamburger";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    // GSAP animation for navbar
    const tl = gsap.timeline();
    tl.fromTo(
      ".nav-container",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // Staggered animation for nav items
    tl.fromTo(
      ".nav-item",
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      "-=0.4",
    );

    // Handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "py-1" : "py-5"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`nav-container mx-auto flex items-center justify-between px-8 py-1 transition-all duration-300 ${
          scrolled
            ? "max-w-[100%] rounded-lg bg-white/20 backdrop-blur-md"
            : "max-w-[100%] rounded-lg bg-white/10 backdrop-blur-sm md:max-w-[90%]"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-condensed py-3 text-xl font-bold tracking-tighter"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Adithya <span className="text-primary">Interiors</span>
          </motion.span>
        </Link>

        {/* Navigation - Center */}
        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
          <ul className="flex space-x-12">
            <li>
              <Link
                href={`/`}
                className={`nav-item text-sm font-medium transition-all duration-200 hover:opacity-70 ${pathname === "/" ? "text-gray-900" : "text-black/50"}`}
              >
                Home
              </Link>
            </li>
            {["About", "Projects", "Services", "Blog"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={`nav-item text-sm font-medium transition-all duration-200 hover:opacity-70 ${pathname.startsWith(`/${item.toLowerCase()}`) && item.toLowerCase() !== "" ? "text-gray-900" : "text-black/50"}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileHamburger
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
        />

        <Button
          variant={scrolled ? "outline" : "default"}
          className={`hidden rounded-md md:block ${scrolled ? "bg-background/20" : ""}`}
          size={"lg"}
          effect="shineHover"
        >
          Contact Now
        </Button>
      </div>
    </motion.header>
  );
}
