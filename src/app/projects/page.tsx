"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";
import Navbar from "~/components/ui/navbar";
import { Zap } from "lucide-react";
import { ProjectGallery } from "~/components/ProjectGallery";

// Sample projects data (you can move this to a separate file)
const sampleProjects = [
  {
    id: 1,
    title: "Office Interior",
    location: "Andheri, Mumbai",
    fullLocation: "Andheri - Project At Mahindra Vicino - Malad West, Mumbai",
    description:
      "Modern office interior design with advanced ergonomic solutions and contemporary aesthetics. This space combines functionality with style to create an inspiring work environment.",
  },
  {
    id: 2,
    title: "House above the clouds",
    location: "Bandra, Mumbai",
    fullLocation: "Bandra - Sea View Apartment - Mumbai",
    description:
      "Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life.",
  },
  {
    id: 3,
    title: "Greens all over",
    location: "Lonavala, Pune",
    fullLocation: "Lonavala - Hillside Villa - Pune",
    description:
      "A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life in harmony with the natural environment.",
  },
  {
    id: 4,
    title: "Rivers are serene",
    location: "Alibaug, Raigad",
    fullLocation: "Alibaug - Riverside Retreat - Raigad",
    description:
      "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life by the water.",
  },
  {
    id: 5,
    title: "Modern Living Space",
    location: "Juhu, Mumbai",
    fullLocation: "Juhu - Contemporary Loft - Mumbai",
    description:
      "Contemporary living space with clean lines and modern amenities. This design showcases the perfect balance of comfort and style.",
  },
];

// Create a separate component for the content that uses useSearchParams
const ProjectPageContent = () => {
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

  // Get current project for SEO
  const projectSlug = searchParams.get("project");
  const currentProject = projectSlug
    ? sampleProjects.find(
        (p) => createSlug(p.title, p.location) === projectSlug,
      )
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
