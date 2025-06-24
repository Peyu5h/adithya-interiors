import { Hono } from "hono";
import productRoutes from "./product.route";
import blogRouter from "./blog.route";
import aiRouter from "./ai.route";

const indexRoute = new Hono();

// test route
indexRoute.get("/", (c) => {
  return c.json({ message: "working" });
});

// routes
indexRoute.route("/products", productRoutes);
indexRoute.route("/blog", blogRouter);
indexRoute.route("/ai", aiRouter);

export default indexRoute;
