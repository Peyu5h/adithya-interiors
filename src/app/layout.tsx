import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "~/components/providers/ReactQueryProvider";
import { Toaster } from "~/components/ui/sonner";
import ClientWakeup from "~/components/ClientWakeup";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Adithya Interiors",
    default: "Adithya Interiors - Transform Your Space",
  },
  description:
    "Mumbai's One-Stop Provider for Premium Home Interior Solutions, Backed by 35+ Years of Unparalleled Trust & Expertise in Civil work, Carpentry Work and Complete Home Renovations.",
  keywords:
    "interior design, home decor, adithya interiors, adithya constructions, interior designers mumbai, home renovation, civil work, carpentry, turnkey projects, modular kitchen, vastu, commercial interiors, luxury interiors, mumbai, kandivali, malad, borivali, andheri, goregaon, home improvement, office interiors, renovation contractor, best interior designer mumbai, affordable interior design, premium interiors, custom furniture, painting, plumbing, electrical, pop, wardrobe, kitchen trolly, false ceiling, panelling, modern living, luxury living, residential design, commercial design, architecture, sustainable design, green building, project management, trusted interior company, testimonials, client reviews, partners, faq, contact, get quote, free quote, shop, biju, adithya interior works, adithya construction & interior works, shop no.1, ganga niwas, chincholi link road, malad west, mumbai",
  openGraph: {
    title: "Adithya Interiors - Transform Your Space",
    description:
      "Mumbai's One-Stop Provider for Premium Home Interior Solutions, Backed by 35+ Years of Unparalleled Trust & Expertise in Civil work, Carpentry Work and Complete Home Renovations.",
    url: "https://www.adithyaconstructions.in/",
    siteName: "Adithya Interiors",
    images: [
      {
        url: "https://www.adithyaconstructions.in/public/images/background.jpg",
        width: 1200,
        height: 630,
        alt: "Adithya Interiors - Transform Your Space",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithya Interiors - Transform Your Space",
    description:
      "Mumbai's One-Stop Provider for Premium Home Interior Solutions, Backed by 35+ Years of Unparalleled Trust & Expertise in Civil work, Carpentry Work and Complete Home Renovations.",
    images: [
      "https://www.adithyaconstructions.in/public/images/background.jpg",
    ],
    site: "@adithyainteriors",
  },
  alternates: {
    canonical: "https://www.adithyaconstructions.in/",
  },
  metadataBase: new URL("https://www.adithyaconstructions.in/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} light antialiased`}
        suppressHydrationWarning
      >
        <ClientWakeup />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {/* <Navbar /> */}
            {children}
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
