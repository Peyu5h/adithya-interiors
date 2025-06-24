"use client";

import { PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { BsStars } from "react-icons/bs";

export default function BlogNav() {
  return (
    <header
      className={`bg-background/60 fixed top-0 z-10 ms-auto w-full shadow-sm backdrop-blur-md transition-all duration-300`}
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="mx-auto flex max-w-[94rem] items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            Adithya Interiors
          </Link>

          <Link
            href={"/blog"}
            target="_blank"
            className="gradient-button flex items-center justify-center gap-1 rounded-[8px] px-8 py-3 text-white transition-all duration-300 ease-in-out"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              Contact now
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
