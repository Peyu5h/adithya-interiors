"use client";
import { useState } from "react";
import Projects from "./Projects";
import HoverCard from "./HoverCard";

const projects = [
  {
    title: "C2 Montreal",
    src: "/images/c2montreal.png",
    color: "#000000",
  },
  {
    title: "Office Studio",
    src: "/images/officestudio.png",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    src: "/images/locomotive.png",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "/images/silencio.png",
    color: "#706D63",
  },
];
export default function MainModal() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-[1000px] flex-col items-center justify-center">
        {projects.map((project, index) => {
          return (
            <Projects
              index={index}
              title={project.title}
              setModal={setModal}
              key={index}
            />
          );
        })}
      </div>
      <HoverCard modal={modal} projects={projects} />
    </main>
  );
}
