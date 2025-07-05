"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HoverUp from "./animations/TextAnimation/HoverUp";

const OneSol = () => {
  const [activeTab, setActiveTab] = useState("Students");

  const tabs = ["Students", "Teachers", "Institutes"];

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const nextTabIndex = (tabs.indexOf(activeTab) + 1) % tabs.length;
    const timer = setTimeout(() => {
      setActiveTab(tabs[nextTabIndex]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeTab]);

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
            <div className="bg-accent/50 inline-flex h-fit w-full items-center justify-center rounded-xl p-1 md:w-fit md:rounded-[20px]">
              <button
                type="button"
                onClick={() => handleTabClick("Students")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Students"
                    ? "bg-primary text-white"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"RESIDENTIAL"} />
              </button>

              <button
                type="button"
                onClick={() => handleTabClick("Teachers")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Teachers"
                    ? "bg-primary text-white"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"COMMERCIAL"} />
              </button>

              <button
                type="button"
                onClick={() => handleTabClick("Institutes")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Institutes"
                    ? "bg-primary text-white"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"RENOVATION"} />
              </button>
            </div>

            <div className="ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:mt-12">
              {activeTab === "Students" && (
                <div className="me-auto max-w-xl">
                  <ul className="d:my-4 relative my-4 flex flex-col items-start gap-2 md:gap-4">
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Bespoke home interiors tailored to your lifestyle
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Turnkey solutions from design to execution
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Space planning, modular kitchens, wardrobes, and more
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Quality materials and on-time project delivery
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "Teachers" && (
                <div className="me-auto max-w-xl">
                  <ul className="relative flex flex-col items-start gap-2 md:gap-4">
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Modern office and retail interiors for every business
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Functional layouts and brand-focused design
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        End-to-end project management
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Renovation, remodeling, and fit-outs
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "Institutes" && (
                <div className="me-auto max-w-xl">
                  <ul className="relative flex flex-col items-start gap-2 md:gap-4">
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Complete renovation and remodeling services
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Civil work, painting, electrical, and plumbing
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Hassle-free upgrades for homes and businesses
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Transparent pricing and dedicated support
                      </div>
                    </li>
                  </ul>
                </div>
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
                src={
                  activeTab === "Students"
                    ? "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif"
                    : activeTab === "Teachers"
                      ? "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif"
                      : "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif"
                }
                alt={
                  activeTab === "Students"
                    ? "A student using the platform"
                    : activeTab === "Teachers"
                      ? "A teacher using the platform"
                      : "An institute using the platform"
                }
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
