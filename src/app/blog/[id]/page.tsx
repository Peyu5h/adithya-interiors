"use client";

import { BreadCrumb } from "~/components/blog/BreadCrumb";
import type { BlogPost as BlogPostType } from "~/lib/types";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BlogNav from "~/components/blog/BlogNav";
import { useEffect, useState } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import Footer from "~/components/footer/Footer";
import BlogPostLoader from "~/components/blog/loaders/BlogPostLoader";
import ScrollProgress from "~/components/ui/scroll-progress";
import api from "~/lib/api";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

const fetchPosts = async (id: string | string[]): Promise<any> => {
  const blogId = Array.isArray(id) ? id[0] : id;
  const response = await api.get(`/api/blog/${blogId}`);

  if (!response.success) {
    throw new Error("No blog found!");
  }

  console.log("blogData --->", response);
  return response.data;
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const [activeHeading, setActiveHeading] = useState("");
  const [headings, setHeadings] = useState<string[]>([]);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogPostType>({
    queryKey: ["blogPost", id],
    queryFn: () => fetchPosts(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (post?.blogContent) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.blogContent;
      const h2Elements = tempDiv.getElementsByTagName("h2");
      setHeadings(Array.from(h2Elements).map((h2) => h2.textContent || ""));
    }
  }, [post]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      },
    );

    const h2Elements = document.querySelectorAll("h2[id]");
    h2Elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [post]);

  const sanitizeAndEnhanceHTML = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
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
        '<table class="border-collapse border border-gray-300 my-4 w-full"',
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
  };

  if (isLoading) return <BlogPostLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!post) return <div>No blog post found</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <div
        style={{ zIndex: 24 }}
        className="bg-background mb-[64rem] flex-grow rounded-b-[32px] md:mb-[32rem]"
      >
        <BlogNav />
        <ScrollProgress className="top-[70px]" />
        <div className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 md:pt-20 lg:px-8">
          <BreadCrumb category={post?.tags?.[0] || ""} />

          {/* Header */}
          <div className="mt-12 mb-12 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="left flex flex-col gap-y-4 p-4 sm:gap-y-8 sm:p-8">
              <div className="flex items-center gap-x-2">
                <p className="text-primary text-xs sm:text-sm md:text-[16px]">
                  {post?.tags?.[0] || "General"}
                </p>
                <span className="mx-0.5 flex items-center sm:mx-1">•</span>
                <p className="text-xs sm:text-sm md:text-[16px]">4 min read</p>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                {post?.title}
              </h1>

              <div className="splitter my-4 h-[1px] w-full bg-gray-300"></div>
              <div className="flex w-full items-center justify-between text-sm sm:flex-col sm:items-start sm:gap-y-2 md:flex-row md:items-center">
                <div className="">
                  <h4 className="font-bold">Author</h4>
                  <p className="text-gray-500">Admin</p>{" "}
                </div>

                <div className="">
                  <h4 className="font-bold">Published</h4>
                  <p className="text-gray-500">
                    {post?.createdAt ? formatDate(post.createdAt) : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="right flex h-[22rem] w-full justify-center">
              <img
                className="h-[22rem] w-full rounded-xl object-cover object-center shadow-none"
                style={{ boxShadow: "none" }}
                src={post?.thumbnailImgUrl}
                alt={post?.title || "Blog thumbnail"}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* On this page section */}
            <div className="w-full md:w-1/4 md:pr-8">
              <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <h3 className="mb-4 text-lg font-semibold">On this page</h3>
                <ul className="space-y-2">
                  {headings.map((heading) => {
                    const id = heading
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "");
                    return (
                      <li key={id}>
                        <Link
                          href={`#${id}`}
                          className={`block rounded px-2 py-1 transition-colors ${
                            activeHeading === id
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(id)?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          {heading}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="prose prose-lg prose-headings:font-bold prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 max-w-none">
                {post?.blogContent &&
                  parse(sanitizeAndEnhanceHTML(post.blogContent))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
