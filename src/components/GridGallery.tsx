"use client";

import PropertyDetails from "./PropertyDetails";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

type Card = {
  id: number;
  content: React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export function GridGallery() {
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

  const ImageComponent = ({ card }: { card: Card }) => {
    return (
      <Image
        src={card.thumbnail}
        height="500"
        width="500"
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top transition duration-200 hover:scale-102",
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
    return (
      <div className="relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-[80] rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.6,
          }}
          className="absolute inset-0 z-10 h-full w-full bg-black opacity-60"
        />
        <motion.div
          layoutId={`content-${selected?.id}`}
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 100,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="relative z-[70] px-8 pb-4"
        >
          {selected?.content}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full pt-20">
      <div className="relative mx-auto grid h-[90vh] w-[90vw] cursor-pointer grid-cols-1 gap-4 p-10 md:grid-cols-3">
        {cards.map((card, i) => (
          <div key={i} className={cn(card.className, "")}>
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                card.className,
                "relative overflow-hidden",
                selected?.id === card.id
                  ? "absolute inset-0 z-50 m-auto flex w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-lg"
                  : lastSelected?.id === card.id
                    ? "z-40 h-full w-full rounded-xl bg-white"
                    : "h-full w-full rounded-xl bg-white",
              )}
              layoutId={`card-${card.id}`}
            >
              {selected?.id === card.id && (
                <SelectedCard
                  selected={selected}
                  onClose={handleOutsideClick}
                />
              )}
              <div className="">
                <ImageComponent card={card} />
                <div className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                  New
                </div>
              </div>
            </motion.div>
          </div>
        ))}
        <motion.div
          onClick={handleOutsideClick}
          className={cn(
            "absolute top-0 left-0 z-10 h-full w-full bg-black opacity-0",
            selected?.id ? "pointer-events-auto" : "pointer-events-none",
          )}
          animate={{ opacity: selected?.id ? 0.3 : 0 }}
        />
      </div>
    </div>
  );
}

// Sample project data - replace with your actual data
const sampleProjects = [
  {
    id: 1,
    title: "Office Interior",
    location: "San Francisco, CA",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    ],
    description:
      "Modern e-commerce platform with advanced filtering and payment integration",
    technologies: ["React", "Node.js", "PostgreSQL"],
    completedDate: "2024-03-15",
    url: "https://example.com",
  },
  {
    id: 2,
    title: "Healthcare Dashboard",
    location: "New York, NY",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
    ],
    description:
      "Comprehensive healthcare management system with patient tracking",
    technologies: ["Vue.js", "Python", "MongoDB"],
    completedDate: "2024-01-20",
    url: "https://example.com",
  },
  {
    id: 3,
    title: "Real Estate Portal",
    location: "Los Angeles, CA",
    thumbnail:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    description:
      "Full-featured real estate platform with virtual tours and advanced search",
    technologies: ["Next.js", "GraphQL", "AWS"],
    completedDate: "2024-02-10",
    url: "https://example.com",
  },
];

const ProjectCarousel = ({
  project,
  onClose,
}: {
  project: any;
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
    <div className="bg-opacity-95 fixed inset-0 z-50 flex items-center justify-center bg-black p-2 sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Main Image */}
          <div className="relative min-h-0 flex-1 bg-gray-100">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-contain sm:object-cover"
            />

            {/* Navigation arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="bg-opacity-90 hover:bg-opacity-100 absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all active:scale-95 sm:left-4 sm:p-3"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-opacity-90 hover:bg-opacity-100 absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all active:scale-95 sm:right-4 sm:p-3"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="bg-opacity-70 absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black px-3 py-1.5 text-sm font-medium text-white">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:w-80 xl:w-96">
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Thumbnail Gallery */}
              {project.images.length > 1 && (
                <div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
                          index === currentImageIndex
                            ? "shadow-lg ring-2 ring-blue-500"
                            : "hover:shadow-md hover:ring-2 hover:ring-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-200 hover:scale-110"
                        />
                        {index === currentImageIndex && (
                          <div className="bg-opacity-20 absolute inset-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="">
                <MapTemp latitude={19.076} longitude={72.8777} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonOne = () => {
  return (
    <div className="flex h-[90vh] w-[90vw] flex-col items-center justify-center">
      <ProjectCarousel project={sampleProjects[0]} onClose={() => {}} />
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">
        House above the clouds
      </p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">
        Greens all over
      </p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="text-xl font-bold text-white md:text-4xl">
        Rivers are serene
      </p>
      <p className="text-base font-normal text-white"></p>
      <p className="my-4 max-w-lg text-base font-normal text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717568/biju/images-homemaker/WhatsApp-Image-2024-11-07-at-16.20.28_d400f443-scaled-1-850x540_qmosd1.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/pexels-abhishek-3858771-6993194-850x540_sycdid.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751727622/biju/images-homemaker/spacejoy-PyeXkOVmG1Y-unsplash_rr8k4o.jpg",
  },
  {
    id: 5,
    content: <SkeletonFour />,
    className: "md:col-span-1",
    thumbnail:
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717564/biju/images-homemaker/bjgva8mlgjibf7j50o4n-scaled-1-850x540_yeqvgr.png",
  },
];

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { MapTemp } from "~/lib/map";
