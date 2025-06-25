"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ASSETS } from "~/lib/constants";
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

  return (
    <div>
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-4 md:-mb-8 md:flex-row md:py-24 xl:ps-0 xl:pe-4">
        <div className="w-full md:w-2/3">
          <h3 className="max-w-sm text-2xl font-medium tracking-[-0.2px] text-black/80 md:text-3xl md:leading-[42px] md:tracking-[-1px]">
            One Stop Solution for All
          </h3>
          <p className="text-md mt-1 text-sm text-neutral-700 md:mt-4 md:text-lg md:text-neutral-950">
            At Vignam, our software is designed to help students, teachers, and
            institutions enhance learning and teaching with interactive 3D
            simulations.
          </p>

          <div
            dir="ltr"
            data-orientation="horizontal"
            className="md:md-10 mt-6"
          >
            <div className="inline-flex h-fit w-full items-center justify-center rounded-md bg-zinc-200 p-1 md:w-fit md:rounded-[20px]">
              <button
                type="button"
                onClick={() => handleTabClick("Students")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Students"
                    ? "bg-white text-black"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"STUDENTS"} />
              </button>

              <button
                type="button"
                onClick={() => handleTabClick("Teachers")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Teachers"
                    ? "bg-white text-black"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"TEACHERS"} />
              </button>

              <button
                type="button"
                onClick={() => handleTabClick("Institutes")}
                className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2 text-xs font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-10 md:py-4 md:text-base ${
                  activeTab === "Institutes"
                    ? "bg-white text-black"
                    : "text-black/60 hover:text-black/90"
                }`}
              >
                <HoverUp text={"INSTITUTES"} />
              </button>
            </div>

            <div className="ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:mt-12">
              {activeTab === "Students" && (
                <div className="me-auto max-w-xl">
                  <ul className="d:my-4 relative my-4 flex flex-col items-start gap-2 md:gap-4">
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
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
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
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
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                    <li className="relative inline-flex items-center gap-4">
                      <div className="relative size-1.5 rounded bg-neutral-200 md:size-2"></div>
                      <div className="relative mt-[-1px] w-fit text-xs leading-5 font-normal tracking-[-0.2px] whitespace-nowrap text-neutral-600 md:text-sm">
                        Boost student engagement and participation
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full justify-end md:flex md:w-1/3">
          <div className="relative mx-auto h-full w-full max-w-sm transition-all duration-200 md:max-w-none md:py-4 lg:py-12">
            {activeTab === "Students" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-0 md:mt-24"
              >
                <Image
                  src={ASSETS.oneSol.student}
                  alt="A student using the platform"
                  className="rounded-lg transition-all duration-200"
                  width={500}
                  height={500}
                />
              </motion.div>
            )}
            {activeTab === "Teachers" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-0 md:mt-24"
              >
                <Image
                  src={ASSETS.oneSol.teacher}
                  alt="A teacher using the platform"
                  className="rounded-lg transition-all duration-200"
                  width={500}
                  height={500}
                />
              </motion.div>
            )}
            {activeTab === "Institutes" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={ASSETS.oneSol.institute}
                  alt="An institute using the platform"
                  width={500}
                  height={500}
                  className="rounded-lg transition-all duration-200"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OneSol;
