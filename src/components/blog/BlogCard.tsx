import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "~/lib/types";

const BlogCard: React.FC<BlogPost> = ({
  tags,
  createdAt,
  readTime,
  title,
  author,
  thumbnailImgUrl,
  slug,
}) => {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="hover:bg-muted/50 overflow-hidden rounded-lg border shadow-sm transition-all duration-300">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={thumbnailImgUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-between gap-y-4 p-4">
          <div className="mb-2 flex items-center text-sm text-gray-600">
            <span className="text-primary">{tags[0]}</span>
            <span className="mx-2">•</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{readTime} min read</span>
          </div>
          <h2 className="mb-2 line-clamp-2 h-[3.5rem] text-xl font-bold">
            {title}
          </h2>
          <p className="text-sm text-gray-600">{author}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
