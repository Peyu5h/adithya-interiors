"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface MaskTextProps {
  phrase: string;
  className?: string;
  animationDuration?: number;
  animationDelay?: number;
}

export function TextReveal({
  phrase,
  className = "",
  animationDuration = 0.75,
  animationDelay = 0,
}: MaskTextProps) {
  const animation = {
    initial: { y: "100%" },
    enter: {
      y: "0",
      transition: {
        duration: animationDuration,
        delay: animationDelay,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        className={className}
        variants={animation}
        initial="initial"
        animate={inView ? "enter" : ""}
      >
        {phrase}
      </motion.p>
    </div>
  );
}

export default TextReveal;
