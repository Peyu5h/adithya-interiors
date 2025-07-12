"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TabButton from "~/components/ui/tab-button";
import { ServicesData } from "~/lib/data/data";

interface OneSolProps {
  data: ServicesData;
}

const OneSol = ({ data }: OneSolProps) => {
  const [activeTab, setActiveTab] = useState(data.tabs[0].id);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const nextTabIndex =
      (data.tabs.findIndex((tab) => tab.id === activeTab) + 1) %
      data.tabs.length;
    const timer = setTimeout(() => {
      setActiveTab(data.tabs[nextTabIndex].id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeTab, data.tabs]);

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
          {data.title}
        </h2>
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-4 md:-mb-8 md:flex-row md:pt-12 md:pb-24 xl:ps-0 xl:pe-4">
        <div className="w-full md:w-2/3">
          <h3 className="max-w-sm text-xl font-medium tracking-[-0.2px] text-black/80 md:text-3xl md:leading-[42px] md:tracking-[-1px]">
            {data.subtitle}
          </h3>
          <p className="text-md mt-1 text-sm text-neutral-700 md:mt-4 md:text-lg md:text-black/40">
            {data.description}
          </p>

          <div
            dir="ltr"
            data-orientation="horizontal"
            className="md:md-10 mt-6"
          >
            <div className="bg-accent/50 flex h-fit flex-wrap gap-x-2 rounded-xl p-1 md:w-fit md:gap-x-0 md:rounded-[20px]">
              {data.tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  text={tab.label}
                  onClick={() => handleTabClick(tab.id)}
                  isActive={activeTab === tab.id}
                />
              ))}
            </div>

            <div className="ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:mt-12">
              {data.tabs.map(
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
                src={data.tabs.find((tab) => tab.id === activeTab)?.image || ""}
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
