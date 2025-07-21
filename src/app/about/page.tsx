import type { Metadata } from "next";
import AboutUsSection from "~/components/about-us-section";
import Navbar from "~/components/navbar";
import { landingPageData } from "~/lib/data/data";

export const metadata: Metadata = {
  title: "About Us | Adithya Interiors",
  description:
    "Learn about Adithya Interiors, Mumbai's trusted provider of premium home and office interior solutions. Discover our story, values, and commitment to excellence.",
  openGraph: {
    title: "About Us | Adithya Interiors",
    description:
      "Learn about Adithya Interiors, Mumbai's trusted provider of premium home and office interior solutions. Discover our story, values, and commitment to excellence.",
    url: "https://www.adithyaconstructions.in/about",
    siteName: "Adithya Interiors",
    images: [
      {
        url: "https://www.adithyaconstructions.in/public/images/background.jpg",
        width: 1200,
        height: 630,
        alt: "Adithya Interiors - About Us",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Adithya Interiors",
    description:
      "Learn about Adithya Interiors, Mumbai's trusted provider of premium home and office interior solutions. Discover our story, values, and commitment to excellence.",
    images: [
      "https://www.adithyaconstructions.in/public/images/background.jpg",
    ],
    site: "@adithyainteriors",
  },
  alternates: {
    canonical: "https://www.adithyaconstructions.in/about",
  },
};

export default function Aboutpage() {
  return (
    <div>
      <Navbar data={landingPageData.navigation} />
      <AboutUsSection data={landingPageData.about} />
    </div>
  );
}
