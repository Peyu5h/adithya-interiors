"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import Stairs from "~/components/animations/Pagetransition/Stairs";
import Navbar from "~/components/ui/navbar";
import { GridGallery } from "~/components/GridGallery";
import { Zap } from "lucide-react";
import { ProjectGallery } from "~/components/ProjectGallery";

export default function ProjectPage() {
  const [isGridGalleryOpen, setIsGridGalleryOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSlug = (title: string, location: string) => {
    const combined = `${title}-${location}`;
    return combined
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleProjectSelect = (project: any | null) => {
    if (project) {
      const slug = createSlug(project.title, project.fullLocation);
      router.push(`${pathname}?project=${slug}`);
    } else {
      router.push(pathname);
    }
    setIsGridGalleryOpen(project !== null);
  };

  useEffect(() => {
    if (isGridGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGridGalleryOpen]);

  useEffect(() => {
    const projectSlug = searchParams.get("project");
    // Here you would typically fetch the project data based on the slug
    // For now, we'll assume the GridGallery will handle opening the correct project
    // if projectSlug exists, though GridGallery needs to be modified to support this.
    if (projectSlug) {
      // This part would ideally find the project by slug and then setSelected(project)
      // in GridGallery. For now, just set the overlay open.
      setIsGridGalleryOpen(true);
    }
  }, [searchParams]);

  return (
    <div>
      {/* <Stairs backgroundColor={"#0e0e0e"}> */}
      <Navbar />

      <motion.div className="mb-6 flex flex-col items-center pt-24">
        <motion.span
          className="mb-2 flex items-center gap-2 font-medium text-[#88734C]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <Zap className="h-4 w-4" />
          DISCOVER OUR PROJECTS
        </motion.span>
        <h2 className="mb-4 text-center text-4xl font-light md:text-5xl">
          Recent Works
        </h2>
        <motion.div
          className="h-1 w-24 bg-[#88734C]"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        ></motion.div>
      </motion.div>
      <ProjectGallery
        onCardSelectChange={setIsGridGalleryOpen}
        onProjectSelect={handleProjectSelect}
      />
      {/* </Stairs> */}
    </div>
  );
}
