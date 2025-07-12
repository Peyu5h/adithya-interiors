"use client";

import React, { useState, useEffect } from "react";
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
import { Button } from "../ui/button";
import { ProjectCard } from "~/lib/data/data";

type Card = ProjectCard;

export function GridGallery({
  onCardSelectChangeAction,
  projects,
}: {
  onCardSelectChangeAction: (isOpen: boolean) => void;
  projects: ProjectCard[];
}) {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  useEffect(() => {
    onCardSelectChangeAction(selected !== null);
  }, [selected, onCardSelectChangeAction]);

  const ImageComponent = ({ card }: { card: Card }) => {
    return (
      <Image
        src={card.thumbnail}
        height="500"
        width="500"
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top transition duration-200",
        )}
        alt="thumbnail"
      />
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
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Project Carousel Content */}
          <ProjectCarousel project={selected} onClose={onClose} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mt-24 w-full">
        <div className="relative mx-auto grid h-auto min-h-[90vh] w-[90vw] cursor-pointer grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-10">
          {projects.map((card, i) => (
            <div key={i} className={cn(card.className, "")}>
              <motion.div
                onClick={() => handleClick(card)}
                className={cn(
                  card.className,
                  "relative h-full w-full overflow-hidden rounded-xl transition-transform duration-300",
                )}
                layoutId={`card-${card.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal Portal */}
      {selected && (
        <SelectedCard selected={selected} onClose={handleOutsideClick} />
      )}
    </>
  );
}

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
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Navigation arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute bottom-0 left-4 h-12 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white active:scale-95 md:top-1/2"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 bottom-0 h-12 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white active:scale-95 md:top-1/2"
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
            <h2 className="text-2xl font-bold text-white md:text-gray-900">
              {project.title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-white md:text-gray-600">
              <MapPin size={16} />
              <span className="text-sm">{project.fullLocation}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-700">{project.description}</p>
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
                  >
                    <Image
                      height={100}
                      width={100}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
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
