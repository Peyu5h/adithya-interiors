import { Context } from "hono";
import { prisma } from "~/lib/prisma";
import { success, err, validationErr } from "../utils/response";
import { randomUUID } from "crypto";

// Helper function to create slug from title
function createSlug(title: string): string {
  const lowerCaseTitle = title.toLowerCase();
  const slug = lowerCaseTitle.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return slug;
}

export const createBlog = async (c: Context) => {
  try {
    const { title, blogContent, thumbnailImgUrl, isHtml, tags } =
      await c.req.json();

    // Create blog with Prisma
    const blog = await prisma.blog.create({
      data: {
        title,
        blogContent,
        thumbnailImgUrl,
        slug: createSlug(title),
        isHtml: isHtml || false,
        tags: tags || [],
      },
    });

    if (!blog) {
      return c.json(err("Failed to create blog"), 500);
    }

    return c.json(success(blog));
  } catch (error) {
    console.log(error);
    return c.json(err("Some error occurred"), 503);
  }
};

export const deleteBlogById = async (c: Context) => {
  try {
    const id = c.req.param("id");

    // First find the blog to return it
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return c.json(err("No Blog found!"), 404);
    }

    // Delete the blog
    const deletedBlog = await prisma.blog.delete({
      where: { id },
    });

    return c.json(success(deletedBlog));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const updateBlogById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { title, blogContent, thumbnailImgUrl, isHtml, tags } =
      await c.req.json();

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        blogContent,
        thumbnailImgUrl,
        isHtml,
        tags,
        ...(title && { slug: createSlug(title) }), // Update slug if title is updated
      },
    });

    if (!updatedBlog) {
      return c.json(err("No Blog found!"), 404);
    }

    return c.json(success(updatedBlog));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getAllBlogs = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "6");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalDocs = await prisma.blog.count({
      where: { isDeleted: false },
    });

    const totalPages = Math.ceil(totalDocs / limit);

    // Get blogs with pagination
    const blogs = await prisma.blog.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        thumbnailImgUrl: true,
        slug: true,
        isHtml: true,
        tags: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
        // Exclude blogContent
      },
    });

    if (!blogs || blogs.length === 0) {
      return c.json(err("No blog found!"), 404);
    }

    const responseData = {
      blogs,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
    };

    return c.json(success(responseData));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getBlogBySlug = async (c: Context) => {
  try {
    const slug = c.req.param("slug");

    const blog = await prisma.blog.findUnique({
      where: {
        slug,
        isDeleted: false,
      },
    });

    if (!blog) {
      return c.json(err("No blog found!"), 404);
    }

    return c.json(success(blog));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};
