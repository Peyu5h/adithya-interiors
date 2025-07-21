import { Context } from "hono";
import { prisma } from "~/lib/prisma";
import { success, err, validationErr } from "../utils/response";

// Helper function to create slug from title and location
function createSlug(title: string, location: string): string {
  const combined = `${title}-${location}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const createProject = async (c: Context) => {
  try {
    const {
      title,
      location,
      fullLocation,
      description,
      thumbnailImage,
      images,
      technologies,
      completedDate,
      category,
    } = await c.req.json();

    // Create project with Prisma
    const project = await prisma.project.create({
      data: {
        title,
        location,
        fullLocation,
        description,
        slug: createSlug(title, location),
        thumbnailImage,
        images: images || [],
        technologies: technologies || [],
        completedDate,
        category: category || "interior",
      },
    });

    if (!project) {
      return c.json(err("Failed to create project"), 500);
    }

    return c.json(success(project));
  } catch (error) {
    console.log(error);
    return c.json(err("Some error occurred"), 503);
  }
};

export const deleteProjectById = async (c: Context) => {
  try {
    const id = c.req.param("id");

    // First find the project to return it
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return c.json(err("No Project found!"), 404);
    }

    // Delete the project
    const deletedProject = await prisma.project.delete({
      where: { id },
    });

    return c.json(success(deletedProject));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const updateProjectById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const {
      title,
      location,
      fullLocation,
      description,
      thumbnailImage,
      images,
      technologies,
      completedDate,
      category,
    } = await c.req.json();

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        location,
        fullLocation,
        description,
        thumbnailImage,
        images,
        technologies,
        completedDate,
        category,
        ...(title && location && { slug: createSlug(title, location) }),
      },
    });

    if (!updatedProject) {
      return c.json(err("No Project found!"), 404);
    }

    return c.json(success(updatedProject));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getAllProjects = async (c: Context) => {
  try {
    const category = c.req.query("category");

    // Build where clause
    const where = {
      isDeleted: false,
      ...(category && { category }),
    };

    // Get all projects (no pagination)
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (!projects || projects.length === 0) {
      return c.json(err("No projects found!"), 404);
    }

    return c.json(success({ projects }));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};

export const getProjectBySlug = async (c: Context) => {
  try {
    const slug = c.req.param("slug");

    const project = await prisma.project.findUnique({
      where: {
        slug,
        isDeleted: false,
      },
    });

    if (!project) {
      return c.json(err("No project found!"), 404);
    }

    return c.json(success(project));
  } catch (error) {
    return c.json(err("Some error occurred"), 503);
  }
};
