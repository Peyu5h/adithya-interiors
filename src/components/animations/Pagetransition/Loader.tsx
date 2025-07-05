import React from "react";
// import Navbar from "~/components/ui/navbar";

const Loader = () => {
  return (
    <section className="bg-background relative min-h-screen w-full overflow-hidden">
      <div className="mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Left/Main Content Skeleton */}
          <div className="z-10 flex flex-col justify-center">
            {/* Title skeleton */}
            <div className="mb-6 flex flex-col md:items-start">
              <div className="flex items-center text-center">
                {/* "Interi" text skeleton */}
                <div className="h-20 w-48 animate-pulse rounded-lg bg-gray-300 sm:h-20 sm:w-48 md:h-24 md:w-64" />

                {/* "r" text skeleton */}
                <div className="h-20 w-12 animate-pulse rounded-lg bg-gray-300 sm:h-20 sm:w-12 md:h-24 md:w-16" />
              </div>

              <div className="mt-2 flex items-center">
                {/* Design icon skeleton */}
                <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 md:h-24 md:w-24" />

                {/* "Design" text skeleton */}
                <div className="ml-2 h-20 w-56 animate-pulse rounded-lg bg-gray-300 sm:h-20 sm:w-56 md:h-24 md:w-72" />
              </div>
            </div>

            {/* Description skeleton */}
            <div className="mb-8 max-w-lg">
              <div className="mb-4 space-y-2">
                <div className="h-6 w-full animate-pulse rounded bg-gray-300" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
              </div>
              <div className="h-px w-16 animate-pulse rounded bg-gray-300" />
            </div>

            {/* Stats skeleton */}
            <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-2">
              <div className="border-gray-300">
                <div className="mb-1 h-12 w-20 animate-pulse rounded bg-gray-300" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
              </div>
              <div className="border-gray-300">
                <div className="mb-1 h-12 w-16 animate-pulse rounded bg-gray-300" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-300" />
              </div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-300" />
              <div className="h-12 w-36 animate-pulse rounded-lg bg-gray-300" />
            </div>
          </div>

          {/* Right/Background Image Skeleton */}
          <div className="relative flex h-[350px] w-full items-center justify-center md:h-[500px]">
            {/* Main image skeleton */}
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
