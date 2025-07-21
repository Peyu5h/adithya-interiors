"use client";
import Link from "next/link";

export default function BlogTOC({ headings }: { headings: string[] }) {
  return (
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
                  className={`block rounded px-2 py-1 transition-colors`}
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
  );
}
