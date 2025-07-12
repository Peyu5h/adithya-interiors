"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Navbar from "~/components/navbar";
import ServiceGallery from "~/components/ServiceGallery";
import { landingPageData } from "~/lib/data/data";

const ServicesPageContent = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar data={landingPageData.navigation} />
      <motion.div className="mb-6 flex flex-col items-center pt-24">
        <motion.span
          className="mb-2 flex items-center gap-2 font-medium text-[#88734C]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <Zap className="h-4 w-4" />
          {landingPageData.services.subtitle}
        </motion.span>
        <h1 className="mb-4 text-center text-4xl font-light md:text-5xl">
          {landingPageData.services.title}
        </h1>

        <motion.div
          className="h-1 w-24 bg-[#88734C]"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        ></motion.div>
      </motion.div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServiceGallery />
      </div>
    </div>
  );
};

export default ServicesPageContent;
