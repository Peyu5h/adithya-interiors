"use client";

import { Carousel } from "~/components/ui/carousel_landing";
import { useState, useEffect } from "react";
import { GridGallery } from "./GridGallery";
import { ProjectsData } from "~/lib/data/data";

interface LandingCarouselProps {
  data: ProjectsData;
}

export function LandingCarousel({ data }: LandingCarouselProps) {
  const [isGridGalleryOpen, setIsGridGalleryOpen] = useState(false);

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

  return (
    <div className="relative h-full w-full overflow-hidden pt-20">
      <div className="z-10 container mx-auto mb-12">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h2 className="mt-5 text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {data.section.title}
          </h2>
          <p className="text-md mt-1 text-sm text-neutral-700 md:mt-4 md:text-lg md:text-black/40">
            {data.section.subtitle}
          </p>
        </div>
      </div>
      <Carousel slides={data.carousel} />
      <GridGallery
        onCardSelectChangeAction={setIsGridGalleryOpen}
        projects={data.gallery}
      />
    </div>
  );
}
