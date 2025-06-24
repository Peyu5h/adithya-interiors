import React from "react";

const BlogPostLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-12 mt-28 grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <div className="left flex flex-col gap-y-8 p-8">
          <div className="flex items-center gap-x-2">
            <div className="h-4 w-20 rounded bg-gray-200"></div>
            <span className="mx-0.5 flex items-center md:mx-1"></span>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
          <div className="h-10 w-3/4 rounded bg-gray-200"></div>
          <div className="splitter my-4 h-[1px] w-full bg-gray-300"></div>
          <div className="flex w-full items-center justify-between">
            <div className="">
              <div className="mb-2 h-4 w-16 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
            <div className="">
              <div className="mb-2 h-4 w-16 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className="right h-[22rem]">
          <div className="h-[22rem] w-full rounded-xl bg-gray-200"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* On this page section */}
        <div className="w-full md:w-1/4 md:pr-8">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i}>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <React.Fragment key={i}>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoader;
