"use client";

import React, { useRef, useState, useEffect } from "react";
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

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="bg-background relative min-h-screen w-full"
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
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12">
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

            {/* Right/Enhanced Visual Section */}
            <div className="relative flex h-[350px] w-full items-center justify-center md:h-[600px]">
              {/* Main Container with Parallax */}
              <div
                className="perspective-1000 relative h-full w-full"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 opacity-30" />

                <div
                  className="absolute bottom-12 left-12 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
                  }}
                >
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                </div>

                {/* Main Image Grid */}
                <div className="relative grid h-full w-full grid-cols-12 grid-rows-12 gap-3 p-4">
                  {/* Large Main Image */}
                  <div
                    className="group relative col-span-8 row-span-8 overflow-hidden rounded-2xl shadow-2xl"
                    style={{
                      transform: `translateZ(${scrollY * 0.05}px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                      alt="Luxury Living Room"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Small Top Right Image */}
                  <div className="group relative col-span-4 row-span-4 overflow-hidden bg-transparent"></div>

                  {/* Bottom Right Image */}
                  <div
                    className="group relative col-span-4 row-span-4 overflow-hidden rounded-xl shadow-lg"
                    style={{
                      transform: `translateZ(${scrollY * 0.04}px) rotateX(${mousePosition.y * 0.04}deg) rotateY(${mousePosition.x * 0.04}deg)`,
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=400&q=80"
                      alt="Elegant Bedroom"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Bottom Left Accent */}
                  <div
                    className="group relative col-span-8 row-span-4 overflow-hidden rounded-xl shadow-lg"
                    style={{
                      zIndex: 10,
                      transform: `translateZ(${scrollY * 0.02}px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                      alt="Contemporary Workspace"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div
                    className="group relative col-span-4 row-span-4 overflow-hidden rounded-xl shadow-lg"
                    style={{
                      transform: `translateZ(${scrollY * 0.03}px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)`,
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=400&q=80"
                      alt="Modern Kitchen"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Floating Contact Now Spinner */}
                <div className="absolute top-8 right-8 z-30 flex flex-col items-center md:top-12 md:right-12">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      style={{ zIndex: 99 }}
                      className="relative flex h-30 w-30 cursor-pointer items-center justify-center rounded-full border-[1px] border-[#CDEA67] bg-[#222222] text-black shadow-xl backdrop-blur-sm select-none"
                    >
                      <div className="m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-[#CDEA67] select-none md:h-12 md:w-12">
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
        </div>

        {/* CSS for perspective */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </section>
    </>
  );
}
