"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { GridPattern } from "./grid-pattern";
import { cn } from "~/lib/utils";
import Lottie from "lottie-react";
import lotte from "~/components/animations/lotte.json";
import { NumberTicker } from "./number-ticker";
import { MdArrowOutward } from "react-icons/md";
import TextRing from "./text-ring";
import { Button } from "./button";
import { ArrowRightIcon } from "lucide-react";
// import ParallaxScroll from "../animations/ParallaxScroll/Parallax";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="bg-background relative min-h-screen w-full overflow-hidden"
      >
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />

        <div className="mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Left/Main Content */}
            <div className="z-10 flex flex-col justify-center">
              <div className="mb-6 flex flex-col md:items-start">
                <div className="flex items-center text-center">
                  <h1 className="text-7xl font-bold tracking-tighter text-black sm:text-7xl md:text-8xl">
                    Interi
                  </h1>
                  <div className="relative flex h-[4rem] w-[4rem] items-center justify-center overflow-hidden rounded-full sm:h-[3.5rem] sm:w-[3.5rem] md:h-[5rem] md:w-[5rem]">
                    <Lottie
                      className="h-full w-full"
                      loop={false}
                      style={{ width: "100%", height: "100%" }}
                      animationData={lotte}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice",
                      }}
                    />
                  </div>
                  <h1 className="text-7xl font-bold tracking-tighter text-black sm:text-7xl md:text-8xl">
                    r
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="-ml-4 flex items-end">
                    <Image
                      src="https://res.cloudinary.com/dkysrpdi6/image/upload/v1749839916/pinterestdownloader.com-1749839648.404416-removebg-preview_lkg5h7.png"
                      alt="Design"
                      width={1600}
                      height={1600}
                      className="hidden h-[3em] w-[3em] object-contain px-0 md:block md:h-[5em] md:w-[5em]"
                      style={{
                        height: "3em",
                        width: "auto",
                        minHeight: "5em",
                      }}
                    />
                    <Image
                      src="https://res.cloudinary.com/dkysrpdi6/image/upload/v1749839916/pinterestdownloader.com-1749839648.404416-removebg-preview_lkg5h7.png"
                      alt="Design"
                      width={1600}
                      height={1600}
                      className="ml-2 h-[3em] w-[3em] object-contain px-0 md:hidden md:h-[5em] md:w-[5em]"
                      style={{
                        height: "3em",
                        width: "auto",
                        minHeight: "4em",
                      }}
                    />
                  </div>
                  <h1 className="ml-2 text-7xl font-bold tracking-tighter text-black sm:text-7xl md:text-8xl">
                    Design
                  </h1>
                </div>
              </div>
              <div className="mb-8 max-w-lg">
                <p className="mb-4 text-lg text-gray-700">
                  Premium interior design solutions for residential and
                  commercial spaces in Mumbai.
                </p>
                <div className="h-px w-16 bg-black"></div>
              </div>
              <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-2">
                <div className="border-l-2 border-gray-300 pl-4">
                  <h2 className="mb-1 text-4xl font-bold text-black">
                    <NumberTicker direction="up" value={35} />+
                  </h2>
                  <p className="text-sm text-gray-600">Years of experience</p>
                </div>
                <div className="border-l-2 border-gray-300 pl-4">
                  <h2 className="mb-1 text-4xl font-bold text-black">
                    <NumberTicker direction="up" value={120} />
                  </h2>
                  <p className="text-sm text-gray-600">Completed projects</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size={"lg"} effect="shineHover">
                  Get a Quote
                </Button>
                <Button
                  size={"lg"}
                  effect="expandIcon"
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  variant={"outline"}
                >
                  View Projects
                </Button>
              </div>
            </div>
            {/* Right/Background Image */}
            <div className="relative flex h-[350px] w-full items-center justify-center md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Modern Interior Hero"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
              <div className="hidden md:block">{/* <ParallaxScroll /> */}</div>
              {/* Optional overlay for text readability */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
              {/* Floating Contact Now Spinner at top right of image */}
              <div className="absolute top-6 right-6 z-20 flex flex-col items-center">
                <div
                  className="relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    style={{ zIndex: 99 }}
                    className="relative flex h-30 w-30 cursor-pointer items-center justify-center rounded-full border-[1px] border-[#CDEA67] bg-[#222222] text-black shadow-lg select-none"
                  >
                    <div className="m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-[#CDEA67] select-none md:h-12 md:w-12">
                      {/* Rotated arrow to point to top right (header contact) */}
                      <MdArrowOutward className="text-2xl text-[#222222] md:text-3xl" />
                    </div>
                  </div>
                  <div
                    style={{ zIndex: 100 }}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center text-[#CDEA67] select-none"
                  >
                    <TextRing
                      text="CONTACT NOW CONTACT NOW "
                      isPaused={isHovered}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
