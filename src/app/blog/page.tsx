"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import TagButton from "../../components/blog/TagButton";
import BlogCard from "../../components/blog/BlogCard";
import { Button } from "~/components/ui/button";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import Footer from "~/components/footer/Footer";
import { activeTagsAtom } from "~/components/providers/atom";
import BlogCardLoader from "~/components/blog/loaders/BlogCardLoader";
import api from "~/lib/api";
import Navbar from "~/components/navbar";

const TEMP_TAGS = ["Inspiration", "Our works", "Material", "Clients"];

interface BlogProps {
  searchParams: { category?: string };
}

export default function Blog({ searchParams: initialSearchParams }: BlogProps) {
  const { category } = initialSearchParams;
  const [activeTags, setActiveTags] = useAtom(activeTagsAtom);

  useEffect(() => {
    if (category && !activeTags.includes(category)) {
      setActiveTags((prev) => [...prev, category]);
    }
  }, [category, setActiveTags]);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const limit = activeTags.length > 0 ? 100 : 24;
    const response = await api.get("/api/blog");
    if (!response.success) {
      return { blogs: [], hasNextPage: false, currentPage: pageParam };
    }
    console.log("blogData --->", response);
    return await response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["blogPosts", activeTags],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage: any) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const allPosts = data?.pages.flatMap((page: any) => page.blogs) || [];

  const filteredPosts = allPosts.filter((post) =>
    activeTags.length === 0
      ? true
      : activeTags.some((tag) => post.tags?.includes(tag)),
  );

  const visiblePosts =
    activeTags.length > 0
      ? filteredPosts
      : filteredPosts.slice(0, 8 * (data?.pages.length ?? 0));

  const onCategoryToggle = async (category: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(category)
        ? prevTags.filter((c) => c !== category)
        : [...prevTags, category],
    );
    await refetch();
  };

  const shouldShowLoadMore =
    activeTags.length === 0 &&
    hasNextPage &&
    visiblePosts.length >= 24 &&
    visiblePosts.length % 24 === 0;

  const searchParams = useSearchParams();
  const version = searchParams.get("version") || "default";

  return (
    <div className="flex min-h-screen flex-col">
      <div
        style={{ zIndex: 24 }}
        className="bg-background mb-[64rem] flex-grow rounded-b-[32px] p-4 md:mb-[32rem]"
      >
        <Navbar />
        <div className="text-foreground z-24 mx-auto w-full max-w-7xl rounded-b-3xl pb-12">
          <div className="mt-20 w-full lg:mt-28">
            <div className="header mb-8 flex flex-col gap-2 md:gap-4">
              <h1 className="font-gabarito text-4xl font-bold md:text-5xl">
                Blog
              </h1>
              <p className="text-lg text-gray-500 md:text-xl">
                Explore Insights on our working process.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {TEMP_TAGS.map((category) => (
                <TagButton
                  key={category}
                  title={category}
                  isActive={activeTags.includes(category)}
                  onClick={() => onCategoryToggle(category)}
                />
              ))}
            </div>

            {/* BlogPosts */}
            {isLoading ? (
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(12)].map((_, index) => (
                  <BlogCardLoader key={index} />
                ))}
              </div>
            ) : visiblePosts.length > 0 ? (
              <>
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visiblePosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
                {shouldShowLoadMore && (
                  <div className="flex w-full items-center justify-center">
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="mx-auto mt-8 text-white"
                    >
                      {isFetchingNextPage ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="mt-16">
                No posts found matching the selected categories.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
