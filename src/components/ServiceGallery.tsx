"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import api from "~/lib/api";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  content: string;
  images: string[];
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServicesResponse {
  services: Service[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const ServiceGalleryContent = () => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching services from API...");
        const response = await api.get<ServicesResponse>("api/services");
        console.log("API Response:", response);
        if (response.success) {
          const services = response.data.services || [];
          console.log("Services data:", services);
          setServices(services);
        } else {
          console.error("API returned success: false");
          setError("Failed to fetch services");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleClick = (service: Service) => {
    router.push(`/services/${service.slug}`);
  };

  const ImageComponent = ({ service }: { service: Service }) => {
    const imageUrl =
      service.images && service.images.length > 0 ? service.images[0] : null;

    if (!imageUrl || imageUrl === "") {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-gray-500">No image available</div>
        </div>
      );
    }

    return (
      <Image
        src={imageUrl}
        height={500}
        width={500}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center transition duration-200",
        )}
        alt={`${service.title} - ${service.shortDescription}`}
        priority
      />
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#88734C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-gray-500">No services available</div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid h-auto w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {services.map((service, i) => (
        <article key={service.id}>
          <motion.div
            onClick={() => handleClick(service)}
            className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.01]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${service.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(service);
              }
            }}
          >
            <div className="relative h-full w-full">
              <ImageComponent service={service} />
              {/* Title Badge */}

              {/* Overlay with content */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-white/90">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </article>
      ))}
    </div>
  );
};

const ServiceGalleryLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#88734C]"></div>
  </div>
);

export default function ServiceGallery() {
  return (
    <div>
      <ServiceGalleryContent />
    </div>
  );
}
