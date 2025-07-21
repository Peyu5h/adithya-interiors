import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Adithya Interiors",
  description:
    "Read expert tips, project stories, and the latest trends in interior design and construction from Adithya Interiors. Stay inspired and informed with our blog.",
  openGraph: {
    title: "Blog | Adithya Interiors",
    description:
      "Read expert tips, project stories, and the latest trends in interior design and construction from Adithya Interiors. Stay inspired and informed with our blog.",
    url: "https://www.adithyaconstructions.in/blog",
    siteName: "Adithya Interiors",
    images: [
      {
        url: "https://www.adithyaconstructions.in/public/images/background.jpg",
        width: 1200,
        height: 630,
        alt: "Adithya Interiors - Blog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Adithya Interiors",
    description:
      "Read expert tips, project stories, and the latest trends in interior design and construction from Adithya Interiors. Stay inspired and informed with our blog.",
    images: [
      "https://www.adithyaconstructions.in/public/images/background.jpg",
    ],
    site: "@adithyainteriors",
  },
  alternates: {
    canonical: "https://www.adithyaconstructions.in/blog",
  },
};
