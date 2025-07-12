"use client";

import { motion } from "framer-motion";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Component } from "~/components/loading-carousel";
import { Service } from "~/lib/types";

interface ServiceContentDisplayProps {
  service: Service;
  mappedTips: { text: string; image: string; url: string }[];
}

export function ServiceContentDisplay({
  service,
  mappedTips,
}: ServiceContentDisplayProps) {
  // Sanitize and enhance service HTML content
  function sanitizeAndEnhanceHTML(html: string) {
    // Remove document-level tags
    const cleaned = html
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<html[^>]*>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
      .replace(/<body[^>]*>/gi, "")
      .replace(/<\/body>/gi, "");
    const sanitizedHtml = DOMPurify.sanitize(cleaned);
    return sanitizedHtml
      .replace(/<h1>(.*?)<\/h1>/g, (match, content) => {
        return `<h1 class="text-4xl font-bold mt-8 mb-6">${content}</h1>`;
      })
      .replace(/<h2>(.*?)<\/h2>/g, (match, content) => {
        const id = content
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        return `<h2 id="${id}" class="text-2xl md:text-3xl font-bold mt-8 mb-4">${content}</h2>`;
      })
      .replace(/<h3>(.*?)<\/h3>/g, (match, content) => {
        return `<h3 class="text-2xl font-semibold mt-6 mb-3">${content}</h3>`;
      })
      .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4 space-y-2">')
      .replace(/<li>/g, '<li class="ml-2">')
      .replace(
        /<table/g,
        '<table class="border-collapse border border-gray-300 my-4 w-full min-w-[600px]"',
      )
      .replace(/<thead>\s*<tr>\s*<\/tr>/g, "<thead>")
      .replace(
        /<th/g,
        '<th class="border border-gray-300 px-4 py-2 bg-gray-100"',
      )
      .replace(/<td/g, '<td class="border border-gray-300 px-4 py-2"')
      .replace(
        /<a /g,
        '<a class="text-blue-600 underline hover:text-blue-800" ',
      )
      .replace(
        /<img/g,
        '<img class="rounded-lg my-4 max-w-full h-auto" loading="lazy"',
      )
      .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
      .replace(/<section>/g, '<section class="mb-8">');
  }
  return (
    <div className="bg-background min-h-screen">
      {/* Add proper spacing from navbar */}
      <div className="pt-20 md:pt-24">
        <Component
          tips={mappedTips}
          aspectRatio="wide"
          showNavigation={true}
          showIndicators={true}
          backgroundTips={true}
          backgroundGradient={true}
          animateText={false}
        />

        {/* Service Content with proper spacing and styling */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Service Header */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {service.description}
            </p>
          </motion.div>

          {/* HTML Content with enhanced styling */}
          <motion.div
            className="prose prose-lg prose-gray max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="service-content w-full overflow-x-auto">
              {parse(sanitizeAndEnhanceHTML(service.content))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .service-content {
          line-height: 1.8;
        }

        .service-content h1 {
          @apply mt-12 mb-6 border-b-2 border-[#88734C] pb-3 text-3xl font-bold text-gray-900;
        }

        .service-content h2 {
          @apply mt-10 mb-5 text-2xl font-semibold text-gray-800;
        }

        .service-content h3 {
          @apply mt-8 mb-4 text-xl font-semibold text-gray-700;
        }

        .service-content p {
          @apply mb-6 leading-relaxed text-gray-600;
        }

        .service-content ul {
          @apply mb-6 space-y-2 pl-6;
        }

        .service-content li {
          @apply leading-relaxed text-gray-600;
        }

        .service-content ol {
          @apply mb-6 space-y-2 pl-6;
        }

        .service-content table {
          @apply my-8 w-full border-collapse overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm;
        }

        .service-content th {
          @apply border-b border-gray-200 bg-[#88734C] px-6 py-4 text-left font-semibold text-white;
        }

        .service-content td {
          @apply border-b border-gray-200 px-6 py-4 text-gray-600;
        }

        .service-content tr:nth-child(even) {
          @apply bg-gray-50;
        }

        .service-content tr:hover {
          @apply bg-gray-100 transition-colors duration-200;
        }

        .service-content blockquote {
          @apply my-6 rounded-r-lg border-l-4 border-[#88734C] bg-gray-50 py-4 pl-6;
        }

        .service-content code {
          @apply rounded bg-gray-100 px-2 py-1 font-mono text-sm;
        }

        .service-content pre {
          @apply my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-white;
        }

        .service-content a {
          @apply text-[#88734C] underline transition-colors duration-200 hover:text-[#6b5a3c];
        }

        .service-content img {
          @apply mx-auto my-6 rounded-lg shadow-md;
        }

        .service-content .highlight {
          @apply rounded bg-yellow-100 px-2 py-1;
        }
      `}</style>
    </div>
  );
}
