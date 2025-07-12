import { Hono } from "hono";
import {
  createService,
  deleteServiceById,
  getAllServices,
  getServiceBySlug,
  updateServiceById,
} from "../controllers/service.controller";

const serviceRouter = new Hono();

serviceRouter.get("/", getAllServices);
serviceRouter.get("/:slug", getServiceBySlug);

serviceRouter.post("/", createService);

serviceRouter.put("/:id", updateServiceById);
serviceRouter.delete("/:id", deleteServiceById);

export default serviceRouter;
