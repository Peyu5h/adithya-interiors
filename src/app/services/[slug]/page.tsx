"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Navbar from "~/components/navbar";
import { Service } from "~/lib/types";
import api from "~/lib/api";
import data from "~/lib/data/data";
import { ServiceContentDisplay } from "~/components/ServiceContentDisplay";

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await api.get(`api/services/${params.slug}`);

        if (response.success) {
          // @ts-expect-error - API response type mismatch
          setService(response.data);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError("Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navbar data={data.navigation} />
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-[#88734C]"></div>
            <p className="mt-4 text-lg text-gray-600">Loading service...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !service) {
    notFound();
  }

  const mappedTips = service.images.map((image, index) => ({
    text: `${service.title} Image ${index + 1}`,
    image: image,
    url: `/services/${service.slug}`,
  }));

  return (
    <>
      <Navbar data={data.navigation} />
      <main className="min-h-screen">
        <ServiceContentDisplay service={service} mappedTips={mappedTips} />
      </main>
    </>
  );
}
