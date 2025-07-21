import { notFound } from "next/navigation";
import Navbar from "~/components/navbar";
import { Service } from "~/lib/types";
import { ServiceContentDisplay } from "~/components/ServiceContentDisplay";
import data from "~/lib/data/data";
import { Metadata } from "next";

async function fetchService(slug: string): Promise<Service | null> {
  const res = await fetch(
    `https://www.adithyaconstructions.in/api/services/${slug}`,
  );
  const response = await res.json();
  if (!response.success) return null;
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await fetchService(params.slug);
  if (!service) {
    return {
      title: "Service Not Found | Adithya Interiors",
      description: "No service found.",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${service.title} | Services | Adithya Interiors`,
    description:
      service.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      service.title,
    openGraph: {
      title: service.title,
      description:
        service.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
        service.title,
      url: `https://www.adithyaconstructions.in/services/${service.slug}`,
      images:
        service.images && service.images.length > 0 ? [service.images[0]] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description:
        service.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
        service.title,
      images:
        service.images && service.images.length > 0 ? [service.images[0]] : [],
    },
    alternates: {
      canonical: `https://www.adithyaconstructions.in/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await fetchService(params.slug);
  if (!service) notFound();

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
