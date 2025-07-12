import { Hono } from "hono";
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectBySlug,
  updateProjectById,
} from "../controllers/project.controller";

const projectRouter = new Hono();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:slug", getProjectBySlug);

projectRouter.post("/", createProject);

projectRouter.put("/:id", updateProjectById);
projectRouter.delete("/:id", deleteProjectById);

export default projectRouter;
