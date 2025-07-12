"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";

import { Zap } from "lucide-react";
import { ProjectGallery } from "~/components/ProjectGallery";
import Navbar from "~/components/navbar";
import api from "~/lib/api";
import { landingPageData } from "~/lib/data/data";

// Projects are now fetched from API

// Create a separate component for the content that uses useSearchParams
const ProjectPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/projects");

        if (response.success) {
          // @ts-expect-error - API response type mismatch
          setProjects(response.data.projects || []);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const createSlug = (title: string, location: string) => {
    const combined = `${title}-${location}`;
    return combined
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Get current project for SEO
  const projectSlug = searchParams.get("project");
  const currentProject = projectSlug
    ? projects.find((p) => createSlug(p.title, p.location) === projectSlug)
    : null;

  // Generate dynamic meta tags
  const pageTitle = currentProject
    ? `${currentProject.title} - ${currentProject.location} | Your Company Name`
    : "Our Projects | Your Company Name";

  const pageDescription = currentProject
    ? currentProject.description
    : "Discover our portfolio of stunning interior design projects across Mumbai and Maharashtra. From modern offices to luxury residences, explore our creative solutions.";

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"}${pathname}${projectSlug ? `?project=${projectSlug}` : ""}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <div>
        {/* <Stairs backgroundColor={"#0e0e0e"}> */}
        <Navbar data={landingPageData.navigation} />

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
          <h1 className="mb-4 text-center text-4xl font-light md:text-5xl">
            {currentProject ? currentProject.title : "Recent Works"}
          </h1>
          {currentProject && (
            <p className="mb-4 max-w-2xl text-center text-gray-600">
              {currentProject.description}
            </p>
          )}
          <motion.div
            className="h-1 w-24 bg-[#88734C]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
        <ProjectGallery />
        {/* </Stairs> */}
      </div>
    </>
  );
};

const ProjectPageLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#88734C]"></div>
  </div>
);

export default function ProjectPage() {
  return (
    <Suspense fallback={<ProjectPageLoading />}>
      <ProjectPageContent />
    </Suspense>
  );
}
