"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface ParagraphProps {
  paragraph: string;
}

export default function CharRevealV2({ paragraph }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(/(\s+)/);

  return (
    <p
      ref={container}
      className="font-aspekta relative max-w-4xl text-balance text-4xl font-medium leading-[1.1] tracking-[-0.4px] md:text-[40px] md:leading-[1.05]"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className="relative">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        const isLast = i === children.length - 1;
        return (
          <Char
            key={`c_${i}`}
            progress={progress}
            range={[start, end]}
            isLast={isLast}
          >
            {char}
          </Char>
        );
      })}
    </span>
  );
};

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isLast: boolean;
}

const Char = ({ children, progress, range, isLast }: CharProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block ${isLast ? "text-black" : ""}`}
    >
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
};
