import React from "react";

const BlogCardLoader: React.FC = () => {
  return (
    <div className="group block">
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <div className="relative h-48 w-full animate-pulse overflow-hidden bg-gray-200" />
        <div className="flex flex-col justify-between gap-y-4 p-4">
          <div className="mb-2 flex items-center">
            <div className="mx-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="mx-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mx-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mb-2 h-[3.5rem]">
            <div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardLoader;
