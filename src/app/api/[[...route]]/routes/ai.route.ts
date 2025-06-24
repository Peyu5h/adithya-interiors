import { Hono } from "hono";
import { generateBlog } from "../controllers/ai.controller";

const ai = new Hono();

ai.post("/generate-blog", generateBlog);

export default ai;
