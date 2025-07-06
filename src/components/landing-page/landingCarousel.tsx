"use client";

import { Carousel } from "~/components/ui/carousel";
import { useState, useEffect } from "react";
import { GridGallery } from "./GridGallery";

export function LandingCarousel() {
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

  const slideData = [
    {
      title: "Office Interior",
      description:
        "Modern office interiors that boost productivity and reflect your brand.",
      src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717552/biju/images-homemaker/7-820x999_l6ybry.jpg",
    },
    {
      title: "Vastu Interiors",
      description:
        "Interiors designed with Vastu principles for harmony and prosperity.",
      src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
    },
    {
      title: "NRI Interior Services",
      description:
        "Specialized interior solutions for NRIs, tailored to your unique needs.",
      src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717508/biju/images-homemaker/5-820x999_xhuwu6.jpg",
    },
    {
      title: "Restaurant Interior",
      description:
        "Elegant and vibrant restaurant spaces designed for memorable dining experiences.",
      src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717508/biju/images-homemaker/6-820x999_waf8bf.jpg",
    },
    {
      title: "Commercial Spaces",
      description:
        "Functional and stylish commercial interiors for all business needs.",
      src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717566/biju/images-homemaker/WhatsApp-Image-2023-06-19-at-5.32.12-PM-1-850x540_yvg45d.jpg",
    },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden pt-20">
      <div className="z-10 container mx-auto mb-12">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h2 className="mt-5 text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            OUR PROJECTS
          </h2>
          <p className="text-md mt-1 text-sm text-neutral-700 md:mt-4 md:text-lg md:text-black/40">
            Take a look at our finest work
          </p>
        </div>
      </div>
      <Carousel slides={slideData} />
      <GridGallery onCardSelectChangeAction={setIsGridGalleryOpen} />
    </div>
  );
}
