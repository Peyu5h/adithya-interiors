import { Hono } from "hono";
import productRoutes from "./product.route";
import blogRouter from "./blog.route";
import projectRouter from "./project.route";
import serviceRouter from "./service.route";

const indexRoute = new Hono();

// test route
indexRoute.get("/", (c) => {
  return c.json({ message: "working" });
});

// routes
indexRoute.route("/products", productRoutes);
indexRoute.route("/blog", blogRouter);
indexRoute.route("/projects", projectRouter);
indexRoute.route("/services", serviceRouter);

export default indexRoute;
