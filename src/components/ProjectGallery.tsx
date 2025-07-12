"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { MapTemp } from "~/lib/map";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type Card = {
  id: number;
  className: string;
  thumbnail: string;
  title: string;
  location: string;
  fullLocation: string;
  images: string[];
  description: string;
  technologies: string[];
  completedDate: string;
  url: string;
};

const ProjectCarousel = ({
  project,
  onClose,
}: {
  project: Card;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
      {/* Main Image */}
      <div className="relative z-50 h-[300px] min-h-0 flex-1 bg-gray-100 lg:h-auto">
        <Image
          height={800}
          width={800}
          src={project.images[currentImageIndex]}
          alt={`${project.title} - ${project.fullLocation} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
          priority
        />

        {/* Navigation arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute bottom-0 left-4 h-12 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white active:scale-95 md:top-1/2"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 bottom-0 h-12 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white active:scale-95 md:top-1/2"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white md:block">
          {currentImageIndex + 1} / {project.images.length}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full overflow-y-auto bg-white p-6 lg:w-80 xl:w-96">
        <div className="space-y-6">
          {/* Project Title */}
          <div>
            <h1 className="text-2xl font-bold text-white md:text-gray-900">
              {project.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-white md:text-gray-600">
              <MapPin size={16} />
              <span className="text-sm">{project.fullLocation}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Completed Date */}
          <div className="flex items-center justify-between gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm font-medium">
                Completed: {project.completedDate}
              </span>
            </div>

            <div>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 font-medium"
                onClick={() => window.open(project.url, "_blank")}
                aria-label={`Visit ${project.title} project`}
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {project.images.length > 1 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Gallery
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {project.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
                      index === currentImageIndex
                        ? "ring-primary shadow-lg ring-2"
                        : "hover:shadow-md hover:ring-2 hover:ring-gray-300"
                    }`}
                    aria-label={`View image ${index + 1} of ${project.title}`}
                  >
                    <Image
                      height={100}
                      width={100}
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-200"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="border-t pt-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Location
            </h3>
            <div className="h-48 overflow-hidden rounded-lg">
              <MapTemp latitude={19.076} longitude={72.8777} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectedCard = ({
  selected,
  onClose,
}: {
  selected: Card | null;
  onClose: () => void;
}) => {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-[110] flex max-h-[98vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[120] rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        {/* Project Carousel Content */}
        <ProjectCarousel project={selected} onClose={onClose} />
      </div>
    </div>
  );
};

// Create a wrapper component for search params logic
const ProjectGalleryContent = ({}: {}) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [projects, setProjects] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const createSlug = (title: string, location: string) => {
    const combined = `${title}-${location}`;
    return combined
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (data.success) {
          const formattedProjects: Card[] = data.data.projects.map(
            (project: any, index: number) => ({
              id: project.id,
              title: project.title,
              location: project.location,
              fullLocation: project.fullLocation,
              thumbnail: project.thumbnailImage,
              images: project.images,
              description: project.description,
              technologies: project.technologies,
              completedDate: project.completedDate,
              url: `/projects/${project.slug}`,
              className: index % 3 === 0 ? "md:col-span-2" : "md:col-span-1",
            }),
          );
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle URL changes and project selection
  useEffect(() => {
    const projectSlug = searchParams.get("project");
    if (projectSlug) {
      const projectToSelect = projects.find(
        (p: Card) => createSlug(p.title, p.location) === projectSlug,
      );
      if (projectToSelect) {
        setSelected(projectToSelect);
      }
    } else {
      setSelected(null);
    }
  }, [searchParams, projects]);

  const handleClick = (card: Card) => {
    const slug = createSlug(card.title, card.location);
    // Update URL with the project slug
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("project", slug);

    // Use router.push to update the URL
    router.push(newUrl.pathname + newUrl.search, { scroll: false });

    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    // Remove the project parameter from URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("project");

    // Update URL to remove the project parameter
    router.push(newUrl.pathname + newUrl.search, { scroll: false });

    setLastSelected(selected);
    setSelected(null);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const projectSlug = new URLSearchParams(window.location.search).get(
        "project",
      );
      if (projectSlug) {
        const projectToSelect = projects.find(
          (p: Card) => createSlug(p.title, p.location) === projectSlug,
        );
        if (projectToSelect) {
          setSelected(projectToSelect);
        }
      } else {
        setSelected(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [projects]);

  const ImageComponent = ({ card }: { card: Card }) => {
    return (
      <Image
        src={card.thumbnail}
        height="500"
        width="500"
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top transition duration-200",
        )}
        alt={`${card.title} in ${card.fullLocation} - Interior Design Project`}
        priority
      />
    );
  };

  if (loading) {
    return <ProjectGalleryLoading />;
  }

  return (
    <>
      <div className="h-screen w-full">
        <div className="relative mx-auto grid h-auto min-h-[90vh] w-[90vw] cursor-pointer grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-10">
          {projects.map((card: Card, i: number) => (
            <article key={card.id} className={cn(card.className, "")}>
              <motion.div
                onClick={() => handleClick(card)}
                className={cn(
                  card.className,
                  "relative h-full w-full overflow-hidden rounded-xl transition-transform duration-300",
                )}
                layoutId={`card-${card.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${card.title} project in ${card.fullLocation}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClick(card);
                  }
                }}
              >
                <div className="relative h-full w-full">
                  <ImageComponent card={card} />
                  {/* Location Badge */}
                  <div className="absolute top-4 right-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-1 overflow-hidden rounded-full bg-black/60 p-2 text-xs text-ellipsis whitespace-nowrap text-white hover:bg-black/80 md:overflow-visible md:whitespace-normal">
                    <MapPin size={12} />
                    <span className="hidden sm:inline">
                      {card.fullLocation}
                    </span>
                    <span className="inline sm:hidden">{card.location}</span>
                  </div>
                  {/* Overlay with content */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6"></div>
                </div>
              </motion.div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Portal */}
      {selected && (
        <SelectedCard selected={selected} onClose={handleOutsideClick} />
      )}
    </>
  );
};

// Loading fallback component
const ProjectGalleryLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#88734C]"></div>
  </div>
);

// Main component with Suspense boundary
export function ProjectGallery({}: {}) {
  return (
    <Suspense fallback={<ProjectGalleryLoading />}>
      <ProjectGalleryContent />
    </Suspense>
  );
}
