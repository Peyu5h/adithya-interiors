import { Context } from "hono";
import { prisma } from "~/lib/prisma";
import { success, err, validationErr } from "../utils/response";

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const createService = async (c: Context) => {
  try {
    const { title, description, shortDescription, content, images, category } =
      await c.req.json();

    // Create service with Prisma
    const service = await prisma.service.create({
      data: {
        title,
        slug: createSlug(title),
        description,
        shortDescription,
        content,
        images: images || [],
        category: category || "construction",
      },
    });

    if (!service) {
      return c.json(err("Failed to create service"), 500);
    }

    return c.json(success(service));
  } catch (error) {
    console.log(error);
    return c.json(err("Some error occurred"), 503);
  }
};

export const deleteServiceById = async (c: Context) => {
  try {
    const id = c.req.param("id");

    // First find the service to return it
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return c.json(err("No Service found!"), 404);
    }

    // Delete the service
    const deletedService = await prisma.service.delete({
      where: { id },
    });

    return c.json(success(deletedService));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const updateServiceById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { title, description, shortDescription, content, images, category } =
      await c.req.json();

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        shortDescription,
        content,
        images,
        category,
        ...(title && { slug: createSlug(title) }),
      },
    });

    if (!updatedService) {
      return c.json(err("No Service found!"), 404);
    }

    return c.json(success(updatedService));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getAllServices = async (c: Context) => {
  try {
    const category = c.req.query("category");

    // Build where clause
    const where = {
      isDeleted: false,
      ...(category && { category }),
    };

    // Get all services (no pagination)
    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (!services || services.length === 0) {
      return c.json(err("No services found!"), 404);
    }

    return c.json(success({ services }));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getServiceBySlug = async (c: Context) => {
  try {
    const slug = c.req.param("slug");

    const service = await prisma.service.findUnique({
      where: {
        slug,
        isDeleted: false,
      },
    });

    if (!service) {
      return c.json(err("No service found!"), 404);
    }

    return c.json(success(service));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};
