import { Hono } from "hono";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogBySlug,
  updateBlogById,
} from "../controllers/blog.controller";

const blogRouter = new Hono();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:slug", getBlogBySlug);

blogRouter.post("/", createBlog);

blogRouter.put("/:id", updateBlogById);
blogRouter.delete("/:id", deleteBlogById);

export default blogRouter;
