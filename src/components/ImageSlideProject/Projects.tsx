"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const anim = {
  initial: { width: 0, height: 100 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  closed: { width: 0, height: 100 },
};

export default function Projects({ project }: any) {
  const [isActive, setIsActive] = useState(false);

  const { title1, title2, src } = project;

  return (
    <div
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      className="flex h-32 w-full cursor-pointer items-center justify-center border-t-2 border-black py-2"
    >
      <p className="text-7xl">{title1}</p>
      <motion.div
        initial="closed"
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className="flex justify-center overflow-hidden"
      >
        <Image
          src={`${src}`}
          width={144}
          height={100}
          alt="project"
          className="mx-4 overflow-hidden"
        />
      </motion.div>
      <p className="text-7xl">{title2}</p>
    </div>
  );
}
