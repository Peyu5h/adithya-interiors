"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HoverUp from "./animations/TextAnimation/HoverUp";
import TabButton from "~/components/ui/tab-button";

const OneSol = () => {
  const tabData = [
    {
      id: "renovation",
      label: "Home renovation",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Complete renovation and remodeling services",
        "Civil work, painting, electrical, and plumbing",
        "Hassle-free upgrades for homes and businesses",
        "Transparent pricing and dedicated support",
      ],
    },
    {
      id: "false_ceiling",
      label: "FALSE CEILING",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Innovative false ceiling designs for aesthetic appeal",
        "Variety of materials including gypsum, POP, and more",
        "Expert installation for homes and commercial spaces",
        "Enhanced lighting and sound insulation solutions",
      ],
    },
    {
      id: "tiling",
      label: "Flooring & TILING",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Professional tiling services for floors and walls",
        "Wide range of tile options including ceramic, porcelain, and natural stone",
        "Precision installation for a flawless finish",
        "Grouting and sealing for durability and easy maintenance",
      ],
    },
    {
      id: "electric_work",
      label: "ELECTRIC WORK",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Comprehensive electrical solutions for new and renovated spaces",
        "Wiring, lighting, power outlets, and panel installations",
        "Safety compliance and energy-efficient solutions",
        "Experienced electricians for reliable service",
      ],
    },
    {
      id: "plumbing",
      label: "PLUMBING",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Complete plumbing installations and repairs",
        "Water supply, drainage, and fixture fittings",
        "Leak detection and pipe replacement",
        "Quality workmanship for lasting solutions",
      ],
    },
    {
      id: "trolly",
      label: "Kitchen TROLLY",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Customized kitchen trolleys for optimal storage",
        "High-quality materials for durability and style",
        "Space-saving designs for modern kitchens",
        "Seamless integration with existing kitchen layouts",
      ],
    },
    {
      id: "panelling_tv_ac",
      label: "PANELLING",
      image:
        "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
      content: [
        "Custom paneling solutions for TVs and ACs",
        "Elegant designs to conceal wires and enhance aesthetics",
        "Variety of materials and finishes to match your decor",
        "Integrated storage and display options",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabData[0].id);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const nextTabIndex =
      (tabData.findIndex((tab) => tab.id === activeTab) + 1) % tabData.length;
    const timer = setTimeout(() => {
      setActiveTab(tabData[nextTabIndex].id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeTab, tabData]);

  const LOGO_HEIGHT = 340;
  const LOGO_WIDTH = 340;

  function PartnerLogo({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) {
    return (
      <div
        className={`relative ${className}`}
        style={{ height: LOGO_HEIGHT, width: LOGO_WIDTH, minWidth: LOGO_WIDTH }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${LOGO_WIDTH}px`}
          className={`object-contain ${className}`}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto flex flex-col items-center justify-center">
        <h2 className="mt-5 text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Why Choose Us?
        </h2>
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-4 md:-mb-8 md:flex-row md:pt-12 md:pb-24 xl:ps-0 xl:pe-4">
        <div className="w-full md:w-2/3">
          <h3 className="max-w-sm text-xl font-medium tracking-[-0.2px] text-black/80 md:text-3xl md:leading-[42px] md:tracking-[-1px]">
            One Stop Solution for All
          </h3>
          <p className="text-md mt-1 text-sm text-neutral-700 md:mt-4 md:text-lg md:text-black/40">
            We are a Mumbai-based interior design and construction company,
            delivering exceptional spaces for homes, offices, and commercial
            projects.
          </p>

          <div
            dir="ltr"
            data-orientation="horizontal"
            className="md:md-10 mt-6"
          >
            <div className="bg-accent/50 flex h-fit flex-wrap gap-x-2 rounded-xl p-1 md:w-fit md:gap-x-0 md:rounded-[20px]">
              {tabData.map((tab) => (
                <TabButton
                  key={tab.id}
                  text={tab.label}
                  onClick={() => handleTabClick(tab.id)}
                  isActive={activeTab === tab.id}
                />
              ))}
            </div>

            <div className="ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:mt-12">
              {tabData.map(
                (tab) =>
                  activeTab === tab.id && (
                    <div key={tab.id} className="me-auto max-w-xl">
                      <ul className="d:my-4 relative my-4 flex flex-col items-start gap-2 md:gap-4">
                        {tab.content.map((item, index) => (
                          <li
                            key={index}
                            className="relative inline-flex items-center gap-4"
                          >
                            <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                            <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                              {item}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full justify-end md:flex md:w-1/3">
          <div className="relative mx-auto h-full w-full max-w-sm transition-all duration-200 md:max-w-none md:pb-4 lg:pb-12">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-0 md:mt-24"
            >
              <PartnerLogo
                src={tabData.find((tab) => tab.id === activeTab)?.image || ""}
                alt={activeTab}
                className="rounded-lg transition-all duration-200"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OneSol;
