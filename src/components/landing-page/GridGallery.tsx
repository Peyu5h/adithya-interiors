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

export function GridGallery({
  onCardSelectChangeAction,
}: {
  onCardSelectChangeAction: (isOpen: boolean) => void;
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

  const sampleProjects: Card[] = [
    {
      id: 1,
      title: "Office Interior",
      location: "Andheri, Mumbai",
      fullLocation: "Andheri - Project At Mahindra Vicino - Malad West, Mumbai",
      thumbnail:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717568/biju/images-homemaker/WhatsApp-Image-2024-11-07-at-16.20.28_d400f443-scaled-1-850x540_qmosd1.png",
      images: [
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717568/biju/images-homemaker/WhatsApp-Image-2024-11-07-at-16.20.28_d400f443-scaled-1-850x540_qmosd1.png",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      ],
      description:
        "Modern office interior design with advanced ergonomic solutions and contemporary aesthetics. This space combines functionality with style to create an inspiring work environment.",
      technologies: ["Interior Design", "Space Planning", "Ergonomics"],
      completedDate: "2024-03-15",
      url: "https://example.com",
      className: "md:col-span-1",
    },
    {
      id: 2,
      title: "House above the clouds",
      location: "Bandra, Mumbai",
      fullLocation: "Bandra - Sea View Apartment - Mumbai",
      thumbnail:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/pexels-abhishek-3858771-6993194-850x540_sycdid.jpg",
      images: [
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/pexels-abhishek-3858771-6993194-850x540_sycdid.jpg",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      ],
      description:
        "Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life.",
      technologies: ["Architecture", "Residential Design", "Luxury Living"],
      completedDate: "2024-01-20",
      url: "https://example.com",
      className: "col-span-1",
    },
    {
      id: 3,
      title: "Greens all over",
      location: "Lonavala, Pune",
      fullLocation: "Lonavala - Hillside Villa - Pune",
      thumbnail:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
      images: [
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      ],
      description:
        "A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life in harmony with the natural environment.",
      technologies: [
        "Sustainable Design",
        "Landscape Architecture",
        "Green Building",
      ],
      completedDate: "2024-02-10",
      url: "https://example.com",
      className: "col-span-1",
    },
    {
      id: 4,
      title: "Rivers are serene",
      location: "Alibaug, Raigad",
      fullLocation: "Alibaug - Riverside Retreat - Raigad",
      thumbnail:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751727622/biju/images-homemaker/spacejoy-PyeXkOVmG1Y-unsplash_rr8k4o.jpg",
      images: [
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751727622/biju/images-homemaker/spacejoy-PyeXkOVmG1Y-unsplash_rr8k4o.jpg",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
      ],
      description:
        "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life by the water.",
      technologies: [
        "Waterfront Design",
        "Residential Architecture",
        "Natural Integration",
      ],
      completedDate: "2024-04-05",
      url: "https://example.com",
      className: "md:col-span-2",
    },
    {
      id: 5,
      title: "Modern Living Space",
      location: "Juhu, Mumbai",
      fullLocation: "Juhu - Contemporary Loft - Mumbai",
      thumbnail:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717564/biju/images-homemaker/bjgva8mlgjibf7j50o4n-scaled-1-850x540_yeqvgr.png",
      images: [
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717564/biju/images-homemaker/bjgva8mlgjibf7j50o4n-scaled-1-850x540_yeqvgr.png",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
      ],
      description:
        "Contemporary living space with clean lines and modern amenities. This design showcases the perfect balance of comfort and style.",
      technologies: ["Modern Design", "Interior Architecture", "Smart Home"],
      completedDate: "2024-05-12",
      url: "https://example.com",
      className: "md:col-span-1",
    },
  ];

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
          {sampleProjects.map((card, i) => (
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
