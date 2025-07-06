"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Navbar from "~/components/navbar";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "home-renovation",
    title: "Home Renovation",
    description:
      "Complete home transformation with modern design principles and expert craftsmanship",
    details:
      "Transform your living space with our comprehensive renovation services. We handle everything from structural modifications to interior design, ensuring your home reflects your style and meets modern standards.",
    area: "Complete House",
    style: "Modern & Traditional",
    features: [
      "Structural renovation",
      "Interior design",
      "Quality materials",
      "Project management",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "false-ceiling",
    title: "False Ceiling",
    description:
      "Elegant ceiling solutions with integrated lighting and acoustic benefits",
    details:
      "Enhance your interiors with our premium false ceiling installations. We provide modern designs that incorporate LED lighting, improve acoustics, and add sophisticated appeal to any room.",
    area: "All Rooms",
    style: "Contemporary",
    features: [
      "Gypsum installation",
      "LED integration",
      "Acoustic solutions",
      "Custom designs",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "flooring-tiling",
    title: "Flooring & Tiling",
    description:
      "Premium flooring solutions from ceramic to natural stone and hardwood",
    details:
      "Professional flooring and tiling services using premium materials. From ceramic tiles to natural stone and hardwood, we ensure durable, beautiful surfaces that enhance your home's value.",
    area: "Indoor & Outdoor",
    style: "Versatile",
    features: [
      "Ceramic & porcelain",
      "Natural stone",
      "Hardwood flooring",
      "Waterproof solutions",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1631679706909-faf2c2d8a50c?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "electric-work",
    title: "Electric Work",
    description:
      "Professional electrical installations ensuring safety and efficiency",
    details:
      "Complete electrical solutions from basic wiring to smart home automation. Our certified electricians ensure all work meets safety standards and building codes.",
    area: "Whole Property",
    style: "Modern Systems",
    features: [
      "Complete rewiring",
      "Smart home integration",
      "Safety inspections",
      "LED systems",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description:
      "Complete plumbing solutions for reliable water supply and drainage",
    details:
      "Professional plumbing services including installation, repair, and maintenance. We ensure efficient water systems and proper drainage throughout your property.",
    area: "Bathrooms & Kitchen",
    style: "Functional Design",
    features: [
      "Pipe installation",
      "Bathroom fixtures",
      "Water heaters",
      "Drainage systems",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "kitchen-trolly",
    title: "Kitchen Trolly",
    description:
      "Custom kitchen storage solutions maximizing space and functionality",
    details:
      "Bespoke kitchen trolleys and storage systems designed to maximize efficiency. Our solutions combine functionality with aesthetic appeal for modern kitchens.",
    area: "Kitchen",
    style: "Space Efficient",
    features: [
      "Custom storage",
      "Modular systems",
      "Space optimization",
      "Durable materials",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "panelling",
    title: "Panelling",
    description: "Premium wall panelling adding elegance and sophistication",
    details:
      "Transform your walls with our premium panelling solutions. Available in various materials including wood, PVC, and decorative panels to suit any interior style.",
    area: "Living Areas",
    style: "Elegant Finish",
    features: [
      "Wood panelling",
      "PVC panels",
      "Decorative options",
      "Acoustic benefits",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ConstructionServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const handleServiceHover = (index: number) => {
    setCurrentIndex(index);
  };

  const displayIndex = currentIndex;
  const currentService = SERVICES[displayIndex];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid min-h-[80vh] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Service Details */}
            <div className="order-1 flex flex-col justify-center lg:order-2">
              <div className="sect">
                <motion.div className="mb-6 flex flex-col items-center py-4">
                  <h2 className="mb-4 text-center text-4xl font-light md:text-5xl">
                    Our Services
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-[#88734C]"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  ></motion.div>
                </motion.div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-lg shadow-lg sm:h-80 lg:h-96">
                <img
                  src={currentService.imageUrl}
                  alt={currentService.title}
                  className="h-full w-full object-cover transition-all duration-500"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </div>

            {/* Service Names */}
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <div className="space-y-4">
                {/* Header with navigation */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium tracking-wider">
                    <span className="bg-border h-px w-8"></span>
                    <span>{String(displayIndex + 1).padStart(2, "0")}</span>
                    <span className="bg-border h-px w-12"></span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="bg-primary hover:bg-primary/90 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                    >
                      <ChevronLeft className="text-primary-foreground h-4 w-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="bg-muted hover:bg-muted/80 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                    >
                      <ChevronRight className="text-muted-foreground h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Service List */}
                <div className="space-y-2">
                  {SERVICES.map((service, index) => (
                    <div
                      key={service.id}
                      className="group"
                      onClick={() => handleServiceHover(index)}
                    >
                      <h2
                        className={`cursor-pointer py-2 text-2xl font-light transition-all duration-300 sm:text-3xl lg:text-4xl xl:text-5xl ${
                          index === displayIndex
                            ? "text-primary translate-x-2 transform"
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        {service.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
