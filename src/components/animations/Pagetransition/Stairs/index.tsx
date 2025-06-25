"use client";

import React from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./anim";

export default function Stairs({ children, backgroundColor }) {
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <div className={` bg-${backgroundColor}`}>
      <motion.div
        {...anim(opacity)}
        className="fixed w-full h-full bg-black z-10 pointer-events-none transition-background"
      />
      <div className="fixed w-full h-full flex left-0 top-0 pointer-events-none z-20 transition-container">
        {[...Array(nbOfColumns)].map((_, i) => (
          <motion.div
            key={i}
            {...anim(expand, nbOfColumns - i)}
            className="relative h-full w-full bg-black"
          />
        ))}
      </div>
      {children}
    </div>
  );
}
